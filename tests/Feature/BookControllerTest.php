<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;

beforeEach(function () {
    Config::set('services.gemini.key', 'test-api-key');
    Config::set('services.gemini.url', 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent');
});

it('returns 5 books from mocked Gemini API when given valid input', function () {
    $geminiBody = [
        'candidates' => [
            [
                'content' => [
                    'parts' => [
                        [
                            'text' => '[{"title":"Book One","author":"Author One"},{"title":"Book Two","author":"Author Two"},{"title":"Book Three","author":"Author Three"},{"title":"Book Four","author":"Author Four"},{"title":"Book Five","author":"Author Five"}]',
                        ],
                    ],
                ],
            ],
        ],
    ];

    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response($geminiBody, 200),
    ]);

    $response = $this->postJson('/api/books/recommendations-from-favorite', [
        'favorite_book' => 'Project Hail Mary',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'recommendations' => [
                '*' => ['title', 'author'],
            ],
        ])
        ->assertJsonCount(5, 'recommendations')
        ->assertJsonPath('recommendations.0.title', 'Book One')
        ->assertJsonPath('recommendations.0.author', 'Author One');

    Http::assertSent(function ($request) {
        $body = $request->data();
        $prompt = $body['contents'][0]['parts'][0]['text'] ?? '';
        return str_contains($prompt, 'Project Hail Mary')
            && str_contains($prompt, 'Recommend 5 books');
    });
});

it('returns 400 with empty recommendations when favorite_book is empty', function () {
    Http::fake();

    $response = $this->postJson('/api/books/recommendations-from-favorite', [
        'favorite_book' => '',
    ]);

    $response->assertStatus(400)
        ->assertJsonStructure(['recommendations'])
        ->assertJsonPath('recommendations', []);

    Http::assertNothingSent();
});

it('returns fallback books when Gemini responds with 429 quota exceeded', function () {
    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response(['error' => 'Quota exceeded'], 429),
    ]);

    $response = $this->postJson('/api/books/recommendations-from-favorite', [
        'favorite_book' => 'The Martian',
    ]);

    $response->assertStatus(200)
        ->assertJsonStructure([
            'recommendations' => [
                '*' => ['title', 'author'],
            ],
            'error',
        ])
        ->assertJsonCount(5, 'recommendations')
        ->assertJsonPath('recommendations.0.title', 'Project Hail Mary')
        ->assertJsonPath('recommendations.1.title', 'The Martian');
});

it('returns generic error message when Gemini API returns 500', function () {
    Http::fake([
        'generativelanguage.googleapis.com/*' => Http::response(['error' => 'Internal Server Error'], 500),
    ]);

    $response = $this->postJson('/api/books/recommendations-from-favorite', [
        'favorite_book' => 'Dune',
    ]);

    $response->assertStatus(502)
        ->assertJsonStructure(['recommendations', 'error'])
        ->assertJsonPath('recommendations', [])
        ->assertJsonPath('error', 'Something went wrong. Try again.');
});
