<?php

use App\Http\Controllers\Master\PenggunaController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('master')->name('master.')->group(function () {
    Route::controller(PenggunaController::class)->prefix('pengguna')->name('pengguna.')->group(function () {
        Route::middleware('can:pengguna-index')->post('data', 'data')->name('data');
    });
    Route::resource('pengguna', PenggunaController::class)->middleware('can:pengguna-index');
});
