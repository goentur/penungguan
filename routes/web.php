<?php

use App\Http\Controllers\BerandaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    redirect('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('beranda', function () {
        return Inertia::render('dashboard');
    })->name('beranda');
});

require __DIR__ . '/user.php';
require __DIR__ . '/master.php';
require __DIR__ . '/settings.php';
