<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Book;
use App\Models\Message;
use App\Http\Controllers\BookCommentController;
use App\Http\Controllers\BookController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/books', function () {
    return \App\Models\Book::with('comments')->latest()->get();
});

Route::post('/books', function (Request $request) {
    return Book::create($request->all());
});

// Update this to 'rating' instead of 'status' since we migrated!
Route::patch('/books/{id}', function (Request $request, $id) {
    $book = Book::findOrFail($id);
    $book->update($request->only('rating'));
    return $book;
});

Route::post('/messages', function (Request $request) {
    return Message::create($request->all());
});

Route::delete('/books/{id}', function ($id) {
    Book::findOrFail($id)->delete();
    return response()->json(['message' => 'Deleted successfully']);
});

Route::post('/comments', [BookCommentController::class, 'store']);
Route::delete('/comments/{id}', [BookCommentController::class, 'destroy']);
Route::post('/books/recommend', [BookController::class, 'getAiRecommendation']);
Route::post('/books/recommendations-from-favorite', [BookController::class, 'getRecommendationsFromFavorite']);
Route::post('/books/{book}/refresh-recommendation', [BookController::class, 'refreshRecommendation']);
