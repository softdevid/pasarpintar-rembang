<?php

use App\Http\Controllers\GambarSementaraController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\TokoController;
use App\Http\Controllers\ValidateProdukController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

//mengambil data toko
Route::get('/api/data-toko', [TokoController::class, 'dataToko']);

Route::get('/api/data-produk', [ProdukController::class, 'dataProduk']);

Route::get('/api/data-pesanan-baru', [OrderController::class, 'dataPesananBaru']);
Route::get('/api/data-pesanan-dikirim', [OrderController::class, 'dataDikirim']);
Route::get('/api/data-pesanan-sampai', [OrderController::class, 'dataSampai']);
Route::get('/api/data-pesanan-dibatalkan', [OrderController::class, 'dataDibatalkan']);

//validation produk step
Route::post('/validate-step-1', [ValidateProdukController::class, 'validate1']);
Route::post('/check-public-ids', [GambarSementaraController::class, 'checkPublicIds']);


//chart/diagram
Route::get('/api/laporan', [LaporanController::class, 'dataSales']);
