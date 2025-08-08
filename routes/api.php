<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

// classrooms
Route::get('/classroom', [AdminController::class, 'classroom'])->name('classroom');

// students api
Route::get('/students', [AdminController::class, 'getStudents']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


