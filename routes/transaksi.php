<?php

use App\Http\Controllers\Transaksi\PenungguanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->prefix('transaksi')->name('transaksi.')->group(function () {
    Route::controller(PenungguanController::class)->prefix('penungguan')->name('penungguan.')->group(function () {
        Route::post('data', 'data')->name('data');
    });
    Route::resource('penungguan', PenungguanController::class);
});
