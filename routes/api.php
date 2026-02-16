<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Book;
use App\Models\Message;
use App\Http\Controllers\BookCommentController;
use App\Http\Controllers\BookController;

Route::post('/books/recommendations-from-favorite', [BookController::class, 'getRecommendationsFromFavorite']);
