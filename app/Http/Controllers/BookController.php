<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    private const FALLBACK_RECOMMENDATIONS = [
        ['title' => 'Project Hail Mary', 'author' => 'Andy Weir'],
        ['title' => 'The Martian', 'author' => 'Andy Weir'],
        ['title' => 'The Hitchhiker\'s Guide to the Galaxy', 'author' => 'Douglas Adams'],
        ['title' => 'Dune', 'author' => 'Frank Herbert'],
        ['title' => 'Ender\'s Game', 'author' => 'Orson Scott Card'],
    ];

    public function getRecommendationsFromFavorite(Request $request)
    {
        try {
            $favorite = trim($request->input('favorite_book', ''));
            if (empty($favorite)) {
                return response()->json(['recommendations' => []], 400);
            }

            $apiKey = config('services.gemini.key');
            if (empty($apiKey)) {
                Log::warning('GEMINI_API_KEY is not set in .env');
                return response()->json([
                    'recommendations' => [],
                    'error' => 'Recommendation service not configured.',
                ], 502);
            }

            $prompt = "The user says their favorite book they've read recently is: \"{$favorite}\".
Recommend 5 books they might enjoy based on that. Return ONLY a JSON array of objects with \"title\" and \"author\".
Example: [{\"title\": \"Book One\", \"author\": \"Author One\"}, {\"title\": \"Book Two\", \"author\": \"Author Two\"}].
No markdown, no backticks, no other text.";

            $url = config('services.gemini.url') . '?key=' . $apiKey;
            $response = Http::timeout(30)->post($url, [
                'contents' => [
                    ['parts' => [['text' => $prompt]]],
                ],
            ]);

            if ($response->status() === 429) {
                return response()->json([
                    'recommendations' => self::FALLBACK_RECOMMENDATIONS,
                    'error' => 'Recommendation limit reached. Here are some picks to try.',
                ], 200);
            }

            if (! $response->successful()) {
                Log::error('Gemini API error: ' . $response->status() . ' ' . $response->body());
                return response()->json([
                    'recommendations' => [],
                    'error' => 'Something went wrong. Try again.',
                ], $response->status() >= 500 ? 502 : 400);
            }

            $body = $response->json();
            $text = $body['candidates'][0]['content']['parts'][0]['text'] ?? '';
            $list = json_decode($text, true);
            if (! is_array($list)) {
                return response()->json([
                    'recommendations' => self::FALLBACK_RECOMMENDATIONS,
                    'error' => 'Could not parse recommendations.',
                ], 200);
            }
            $recommendations = array_values(array_filter($list, function ($item) {
                return is_array($item) && isset($item['title']) && isset($item['author']);
            }));

            return response()->json(['recommendations' => $recommendations]);
        } catch (\Exception $e) {
            Log::error('Recommendations from favorite error: ' . $e->getMessage());
            return response()->json(['recommendations' => [], 'error' => 'Something went wrong. Try again.'], 500);
        }
    }
}
