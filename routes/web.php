<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\AdminController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/instructors', [AdminController::class, 'index'])->name('admin.instructor');
    Route::get('/admin/manage-account', [AdminController::class, 'manageInstructor'])->name('instructor.manage');
    Route::post('/instructor/store', [AdminController::class, 'store'])->name('instructor.store');
    Route::get('/instructor/{user}/edit', [AdminController::class, 'edit'])->name('instructor.edit');
    Route::put('/instructor/{user}', [AdminController::class, 'update'])->name('instructor.update');
    Route::delete('/instructor/{user}', [AdminController::class, 'destroy'])->name('instructor.destroy');
    Route::get('/admin/classroom', [AdminController::class, 'classroomView'])->name('classroom.view');
    Route::get('/admin/profile', [AdminController::class, 'profile'])->name('admin.profile');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('redirect.google');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';
