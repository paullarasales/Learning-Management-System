<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::get('/classroom', [AdminController::class, 'classroom'])->name('classroom');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


