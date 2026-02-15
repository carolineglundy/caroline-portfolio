<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// SPA fallback: serve the app for any other path (avoids 404 on refresh/direct links)
Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
