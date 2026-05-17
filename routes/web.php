<?php

use App\Http\Controllers\SocialAuthController;
use Illuminate\Support\Facades\Route;

// Google OAuth
Route::get('/auth/google',          [SocialAuthController::class, 'redirectToGoogle']);
Route::get('/auth/google/callback', [SocialAuthController::class, 'handleGoogleCallback']);

// Serve the React SPA for all non-API routes
Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api|auth/google).*');
