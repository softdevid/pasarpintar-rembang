<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminTokoController;
use App\Http\Controllers\GambarSementaraController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\KategoriController;
use App\Http\Controllers\KurirController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProdukController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\GrafikController;
use App\Http\Controllers\KategoriGlobalController;
use App\Http\Controllers\KeranjangController;
use App\Http\Controllers\LaporanSuperAdminController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SuperAdminSettingController;
use App\Http\Controllers\TokoController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DiskonController;
use Inertia\Inertia;

// home route
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/produk-acak', [HomeController::class, 'produkAcak'])->name('produk.acak');
Route::get('/cari', [SearchController::class, 'search'])->name('pencarian');
Route::get('/kategori/{kategoriGlobal:slug}', [HomeController::class, 'kategori'])->name('kategori');

Route::middleware('auth')->group(function () {

  // route user
  Route::get('/user/profile', [UserController::class, 'profile'])->name('user.profile');
  Route::get('/user/orders', [UserController::class, 'orders'])->name('user.orders');
  Route::get('/user/get-orders', [UserController::class, 'getOrders'])->name('user.orders.get');
  Route::patch('/user/orders', [UserController::class, 'konfirmasi'])->name('user.orders.konfirmasi');
  Route::get('/user/orders/detail', [UserController::class, 'orderDetail'])->name('user.order.detail');

  // route keranjang
  Route::get('/cart', [KeranjangController::class, 'index'])->name('cart.index');
  Route::get('/carts-get', [KeranjangController::class, 'getCarts'])->name('cart.get');
  Route::post('/cart-add', [KeranjangController::class, 'add'])->name('cart.add');
  Route::patch('/cart-update', [KeranjangController::class, 'update'])->name('cart.update');
  Route::delete('/cart-delete', [KeranjangController::class, 'delete'])->name('cart.delete');
  Route::get('/cart-count', [KeranjangController::class, 'cartCount'])->name('cart.count');

  // route checkout
  Route::get('/checkout', [HomeController::class, 'checkout'])->name('checkout');

  // route order
  Route::post('/order', [HomeController::class, 'order'])->name('order');

  // route kurir
  Route::get('/kurir', function () {
    return Inertia::render('Kurir');
  })->name('kurir.index');

  Route::get('/kurir/profile/{id}', function () {
    return Inertia::render('ProfilKurir');
  })->name('profilKurir');
});

//Dashboard Super Admin
Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.index');

//Super Admin Laporan
Route::get('/admin/laporan', [LaporanSuperAdminController::class, 'index'])->name('laporan.index');
Route::get('/admin/laporan/rincian', [LaporanSuperAdminController::class, 'show'])->name('laporan.show');
Route::get('/admin/laporan/today', [LaporanSuperAdminController::class, 'today'])->name('laporan.today');
Route::get('/admin/laporan/month', [LaporanSuperAdminController::class, 'month'])->name('laporan.month');
Route::get('/admin/laporan/year', [LaporanSuperAdminController::class, 'year'])->name('laporan.year');

//Admin Setting
Route::get('/admin/setting', [SuperAdminSettingController::class, 'edit'])->name('superadminsetting.edit');
Route::patch('/admin/setting', [SuperAdminSettingController::class, 'update'])->name('superadminsetting.update');

//Toko Global
Route::get('/admin/toko', [TokoController::class, 'index'])->name('admin.index');
Route::get('/admin/toko/create', [TokoController::class, 'create'])->name('toko.create');
Route::get('/admin/toko/{id}/edit', [TokoController::class, 'edit'])->name('toko.edit');
Route::post('/admin/toko/delete', [TokoController::class, 'destroy'])->name('toko.destroy');
Route::patch('/admin/toko', [TokoController::class, 'update'])->name('toko.update');
Route::post('/admin/toko', [TokoController::class, 'store'])->name('toko.store');

//Kategori Global
Route::get('/admin/kategori', [KategoriGlobalController::class, 'index'])->name('kategoriglobal.kategori');
Route::get('/admin/kategori/create', [KategoriGlobalController::class, 'create'])->name('kategoriglobal.create');
Route::get('/admin/kategori/{id}/edit', [KategoriGlobalController::class, 'edit'])->name('kategoriglobal.edit');
Route::patch('/admin/kategori', [KategoriGlobalController::class, 'update'])->name('kategoriglobal.update');
Route::post('/admin/kategori', [KategoriGlobalController::class, 'store'])->name('kategoriglobal.store');
Route::post('/admin/kategori/delete', [KategoriGlobalController::class, 'destroy'])->name('kategoriglobal.destroy');



//toko admin
Route::get('/toko/dashboard', [AdminTokoController::class, 'index'])->name('toko.index');

Route::get('/toko/pesanan', [AdminTokoController::class, 'pesanan'])->name('toko.pesanan');

//route toko produk/list produk
Route::get('/toko/produk', [ProdukController::class, 'index'])->name('toko.list');
Route::get('/toko/produk/{slug}/edit', [ProdukController::class, 'edit'])->name('produk.edit');
Route::get('/toko/produk/create', [ProdukController::class, 'create'])->name('produk.create');
Route::post('/toko/produk', [ProdukController::class, 'store'])->name('produk.store');
Route::patch('/toko/produk/update', [ProdukController::class, 'update'])->name('produk.update');
Route::post('/toko/produk/delete', [ProdukController::class, 'destroy'])->name('produk.destroy');

//route toko kategori
Route::get('/toko/kategori', [KategoriController::class, 'index'])->name('kategori.index');
Route::get('/toko/kategori/create', [KategoriController::class, 'create'])->name('kategori.create');
Route::post('/toko/kategori/update', [KategoriController::class, 'update'])->name('kategoriToko.update');
Route::post('/toko/kategori', [KategoriController::class, 'store'])->name('kategoriToko.store');
Route::post('/toko/kategori/delete', [KategoriController::class, 'destroy'])->name('kategoriToko.delete');

//route order/pesanan toko
Route::get('/toko/pesanan', [OrderController::class, 'pesananBaru'])->name('pesananBaru');
Route::get('/toko/pesanan/dikirim', [OrderController::class, 'dikirim'])->name('dikirim');
Route::get('/toko/pesanan/sampai', [OrderController::class, 'sampai'])->name('sampai');
Route::get('/toko/pesanan/dibatalkan', [OrderController::class, 'dibatalkan'])->name('dibatalkan');

//ubah status
Route::post('/ubah-status-dikirim', [OrderController::class, 'ubahDikrim'])->name('toko.ubahDikrim');
Route::post('/ubah-status-dibatalkan', [OrderController::class, 'ubahDibatalkan'])->name('toko.ubahDibatalkan');

//route diskon
Route::get('/toko/diskon', [DiskonController::class, 'index'])->name('diskon.index');
Route::post('/toko/diskon/update', [DiskonController::class, 'update'])->name('diskon.update');

// route kurir
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
Route::post('/delete-image-edit', [ProdukController::class, 'deleteImageEdit'])->name('deleteImageEdit');

Route::get('/toko/setting', [AdminTokoController::class, 'setting'])->name('toko.setting');

//route grafik 7 hari kebelakang
Route::get('/oneWeekData', [GrafikController::class, 'index']);
Route::get('/oneWeek', function () {
  Inertia::render('Grafik/OneWeek');
});

Route::post('/image/session', [GambarSementaraController::class, 'insertgbrutama'])->name('gambarUtama');
Route::post('/image-lainnya/session', [GambarSementaraController::class, 'gbrlain'])->name('gambarLainnya');
Route::post('/delete-image-variasi-inaktive', [ProdukController::class, 'deleteImageVarian'])->name('deleteImageAllVariant');
Route::post('/delete-image-variasi-inaktive-edit', [ProdukController::class, 'deleteImageVarianEdit'])->name('deleteImageAllVariantEdit');
Route::post('/delete-harga', [ProdukController::class, 'deleteHarga'])->name('deleteHarga');

// route autentikasi
require __DIR__ . '/auth.php';
require __DIR__ . '/api.php';

Route::get('/{toko:slug}', [HomeController::class, 'toko'])->name('toko');
Route::get('/{toko:slug}/semua-produk', [HomeController::class, 'semuaProduk'])->name('produk.semua');
Route::get('/{toko:slug}/{produk:slug}', [HomeController::class, 'produk'])->name('toko.produk')->scopeBindings();
