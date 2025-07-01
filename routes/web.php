<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\Auth\RegisterInstructorController;
use App\Http\Controllers\SubmissionController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\NotificationController;
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

Route::get('/instructor/register', [RegisterInstructorController::class, 'create'])->name('instructor.create');
Route::post('/instructor/register', [RegisterInstructorController::class, 'store'])->name('instructor.register');

Route::middleware(['auth'])->group(function () {
    Route::get('/student/dashboard', [StudentController::class, 'dashboard'])->name('student.dashboard');
    Route::get('/student/classroom', [StudentController::class, 'classroom'])->name('classroom');
    Route::get('/classroom/{id}', [StudentController::class, 'show'])->name('classes.show');
    Route::post('/assignment/submit', [StudentController::class, 'submit'])->name('assignment.submit');
    Route::put('/submissions/{submission}/grade', [SubmissionController::class, 'addGrade']);
    Route::get('/student/notifications', [NotificationController::class, 'notification'])->name('student.notifications');
    Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
    Route::post('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/instructors', [AdminController::class, 'index'])->name('admin.instructor');
    Route::get('/admin/manage-account', [AdminController::class, 'manageInstructor'])->name('instructor.manage');
    Route::post('/instructor/store', [AdminController::class, 'store'])->name('instructor.store');
    Route::get('/instructor/{user}/edit', [AdminController::class, 'edit'])->name('instructor.edit');
    Route::put('/instructor/{user}', [AdminController::class, 'update'])->name('instructor.update');
    Route::delete('/instructor/{user}', [AdminController::class, 'destroy'])->name('instructor.destroy');
    Route::get('/classroom', [AdminController::class, 'createClassroom'])->name('classroom.create');
    Route::post('/classroom', [AdminController::class, 'storeClassroom'])->name('classroom.store');
    Route::get('/admin/classroom/{id}', [AdminController::class, 'showClassroom'])->name('admin.classroom.show');
    Route::get('/admin/classroom', [AdminController::class, 'classroomView'])->name('classroom.view');
    Route::get('/admin/profile', [AdminController::class, 'profile'])->name('admin.profile');
    Route::put('/admin/profile/update', [AdminController::class, 'updateProfile'])->name('admin.profile.update');
    Route::post('/admin/classroom/{id}/add-student', [AdminController::class, 'addStudent'])->name('admin.classroom.addStudent');
});

Route::middleware(['auth', 'instructor'])->group(function () {
    Route::get('/instructor/dashboard', [InstructorController::class, 'dashboard'])->name('instructor.dashboard');
    Route::get('/instructor/class', [InstructorController::class, 'classList'])->name('instructor.classList');
    Route::get('/instructor/create-class', [InstructorController::class, 'create'])->name('instructor.create');
    Route::post('/instructor/classes', [InstructorController::class, 'store'])->name('instructor.classes.store');
    Route::get('/instructor/classroom/{id}', [InstructorController::class, 'show'])->name('instructor.classroom.show');
    Route::get('/instructor/profile', [InstructorController::class, 'showProfile'])->name('instructor.profile');
    Route::put('/instructor/profile', [InstructorController::class, 'update']);
});

Route::post('/classroom/{classroom}/materials', [MaterialController::class, 'store'])->name('materials.store');
Route::post('/classroom/{classroom}/assignments', [InstructorController::class, 'storeAss'])->name('assignments.store');
Route::post('/classroom/{id}/thread', [InstructorController::class, 'storeThread'])->name('thread.store');
Route::post('/thread/{thread}/reply', [InstructorController::class, 'storeReply'])->name('thread.reply');

Route::middleware('auth')->group(function () {
    Route::post('/instructor/classroom/{id}/add-student', [InstructorController::class, 'addStudent'])->name('instructor.classroom.addStudent');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('redirect.google');
Route::get('auth/google/redirect/instructor', [GoogleController::class, 'redirectToGoogleInstructor'])->name('google.instructor.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

require __DIR__.'/auth.php';
