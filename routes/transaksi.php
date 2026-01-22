<?php

use App\Http\Controllers\Transaksi\PenungguanController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth', 'verified')->prefix('transaksi')->name('transaksi.')->group(function () {
    Route::resource('penungguan', PenungguanController::class);
});
