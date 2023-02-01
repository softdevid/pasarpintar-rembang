<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminTokoController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\KurirController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\GrafikController;
use App\Http\Controllers\TokoAdminController;
use App\Http\Controllers\TokoController;
use Inertia\Inertia;

// home route
Route::get('/', [HomeController::class, 'index'])->name('index');

Route::get('/cari', [SearchController::class, 'search'])->name('pencarian');

Route::middleware('auth',)->group(function () {

  // route user
  Route::get('/user/profile', function () {
    return Inertia::render('Dashboard');
  })->name('dashboard');

  // route admin
  // Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.index');

  // route keranjang
  Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');


  //   Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');
  // });


  // route checkout
  Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');


  // route kurir
  Route::get('/kurir', function () {
    return Inertia::render('Kurir');
  })->name('kurir.index');

  Route::get('/kurir/profile/{id}', function () {
    return Inertia::render('ProfilKurir');
  })->name('profilKurir');
});

Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.index');
Route::get('/admin/toko', [AdminController::class, 'toko'])->name('admin.toko');
Route::get('/admin/kategori', [AdminController::class, 'kategori'])->name('admin.kategori');
Route::get('/admin/setting', [AdminController::class, 'setting'])->name('admin.setting');
Route::get('/admin/toko/create', [TokoController::class, 'create'])->name('toko.create');
Route::get('/admin/toko/{id}/edit', [TokoController::class, 'edit'])->name('toko.edit');
Route::post('/admin/toko/delete', [TokoController::class, 'destroy'])->name('toko.destroy');
Route::patch('/admin/toko', [TokoController::class, 'update'])->name('toko.update');
Route::post('/admin/toko', [TokoController::class, 'store'])->name('toko.store');


//toko admin
Route::get('/toko/dashboard', [AdminTokoController::class, 'index'])->name('toko.index');

Route::get('/toko/pesanan', [AdminTokoController::class, 'pesanan'])->name('toko.pesanan');


//route toko produk/list produk
Route::get('/toko/produk', [ProdukController::class, 'index'])->name('toko.list');
Route::get('/toko/produk/1/edit', [ProdukController::class, 'edit'])->name('produk.edit');
Route::get('/toko/produk/create', [ProdukController::class, 'create'])->name('produk.create');
Route::post('/toko/produk', [ProdukController::class, 'store'])->name('produk.store');
Route::post('/toko/produk/delete', [ProdukController::class, 'destroy'])->name('produk.destroy');

//route toko kategori

Route::get('/toko/kategori', [KategoriController::class, 'index'])->name('kategori.index');
Route::get('/toko/kategori/create', [KategoriController::class, 'create'])->name('kategori.create');
Route::get('/toko/kategori/1/edit', [KategoriController::class, 'edit'])->name('kategoriToko.edit');
Route::post('/toko/kategori', [KategoriController::class, 'store'])->name('kategoriToko.store');
Route::post('/toko/kategori/delete', [KategoriController::class, 'destroy'])->name('kategoriToko.delete');

//route order toko
Route::get('/toko/pesanan', [AdminTokoController::class, 'pesananBaru'])->name('pesananBaru');
Route::get('/toko/pesanan/konfirmasi-bayar', [AdminTokoController::class, 'konfirmasiBayar'])->name('konfirmasiBayar');
Route::get('/toko/pesanan/dikemas', [AdminTokoController::class, 'dikemas'])->name('dikemas');
Route::get('/toko/pesanan/dikirim', [AdminTokoController::class, 'dikirim'])->name('dikirim');
Route::get('/toko/pesanan/sampai', [AdminTokoController::class, 'sampai'])->name('sampai');

Route::get('/toko/kurir', [AdminTokoController::class, 'kurir'])->name('kurir');
Route::get('/toko/kurir/create', [KurirController::class, 'create'])->name('kurir.create');
Route::get('/toko/kurir/1/edit', [KurirController::class, 'edit'])->name('kurir.edit');

//route laporan
Route::get('/toko/laporan', [LaporanController::class, 'index'])->name('laporan.index');
Route::get('/toko/laporan/today', [LaporanController::class, 'today'])->name('laporan.today');
Route::get('/toko/laporan/month', [LaporanController::class, 'month'])->name('toko.month');
Route::get('/toko/laporan/year', [LaporanController::class, 'year'])->name('laporan.year');

//route hapus gambar cloudinary
Route::post('/delete-image', [ProdukController::class, 'deleteImage'])->name('deleteImage');


Route::get('/toko/setting', [AdminTokoController::class, 'setting'])->name('toko.setting');



//route grafik 7 hari kebelakang
Route::get('/oneWeekData', [GrafikController::class, 'index']);
Route::get('/oneWeek', function () {
  Inertia::render('Grafik/OneWeek');
});

// route autentikasi
require __DIR__ . '/auth.php';

// route toko
Route::get('/{toko:slug}', [HomeController::class, 'toko'])->name('toko');

// route produk toko

// Route::get('/{toko:slug}/{produks:slug}', [HomeController::class, 'produk'])->name('toko.produk')->scopeBindings();

Route::get('/{toko:slug}/{produk:slug}', [HomeController::class, 'produk'])->name('toko.produk')->scopeBindings();
