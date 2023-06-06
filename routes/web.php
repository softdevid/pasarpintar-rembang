<?php

use App\Events\TokoEvent;
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
use App\Http\Controllers\MessageController;
use Inertia\Inertia;

// home route
Route::get('/', [HomeController::class, 'index'])->name('index');
Route::get('/produk-acak', [HomeController::class, 'produkAcak'])->name('produk.acak');
Route::get('/cari', [SearchController::class, 'search'])->name('pencarian');
Route::get('/kategori/{kategoriGlobal:slug}', [HomeController::class, 'kategori'])->name('kategori');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/privacy-policy', [HomeController::class, 'privacyPolicy'])->name('privacyPolicy');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');

Route::middleware('auth')->group(function () {

  // route user
  Route::get('/user/profile', [UserController::class, 'profile'])->name('user.profile');
  Route::patch('/user/profile/{id}', [UserController::class, 'profileUpdate'])->name('user.profile.update');
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
});


Route::group([
  'middleware' => 'auth',
  'prefix' => '/admin'
], function () {
  //Dashboard Super Admin
  Route::get('/dashboard', [AdminController::class, 'index'])->name('admin.index');

  //Route komisi
  Route::get('/komisi', [AdminController::class, 'komisi'])->name('komisi.index');
  Route::post('/komisi/update', [AdminController::class, 'komisiUpdate'])->name('komisi.update');

  //Super Admin Laporan
  // Route::get('/admin/laporan', [LaporanSuperAdminController::class, 'index'])->name('laporan.index');
  // Route::get('/admin/laporan/rincian', [LaporanSuperAdminController::class, 'show'])->name('laporan.show');
  Route::get('/laporan/today/{toko:id}', [LaporanSuperAdminController::class, 'today'])->name('laporan.today');
  Route::get('/laporan/month/{toko:id}', [LaporanSuperAdminController::class, 'month'])->name('laporan.month');
  Route::get('/laporan/year/{toko:id}', [LaporanSuperAdminController::class, 'year'])->name('laporan.year');
  Route::resource('/laporan', LaporanSuperAdminController::class);

  //admin Setting
  Route::get('/setting', [SuperAdminSettingController::class, 'edit'])->name('superadminsetting.edit');
  Route::patch('/setting', [SuperAdminSettingController::class, 'update'])->name('superadminsetting.update');

  //Toko Global superadmin
  Route::resource('/toko', TokoController::class);

  //Kategori Global
  Route::resource('/kategori', KategoriGlobalController::class);
});


Route::group([
  'middleware' => 'auth',
  'prefix' => 'toko',
], function () {

  //toko admin
  Route::get('/dashboard', [AdminTokoController::class, 'index'])->name('toko.dashbaord');

  Route::get('/pesanan', [AdminTokoController::class, 'pesanan'])->name('toko.pesanan');

  //route toko produk/list produk
  Route::post('/produk/delete', [ProdukController::class, 'destroy'])->name('produkDestroy');
  Route::resource('/produk', ProdukController::class);
  Route::post('/produk/storeKategori', [ProdukController::class, 'storeKategori'])->name('produk.addKategoriToko');

  //route toko kategori
  Route::get('/kategori', [KategoriController::class, 'index'])->name('kategoriToko.list');
  Route::get('/kategori/create', [KategoriController::class, 'create'])->name('kategoriToko.create');
  Route::post('/kategori/update', [KategoriController::class, 'update'])->name('kategoriToko.update');
  Route::post('/kategori', [KategoriController::class, 'store'])->name('kategoriToko.store');
  Route::post('/kategori/delete', [KategoriController::class, 'destroy'])->name('kategoriToko.delete');

  //route order/pesanan toko
  Route::get('/pesanan', [OrderController::class, 'pesananBaru'])->name('pesananBaru');
  Route::get('/pesanan/dikirim', [OrderController::class, 'dikirim'])->name('dikirim');
  Route::get('/pesanan/sampai', [OrderController::class, 'sampai'])->name('sampai');
  Route::get('/pesanan/dibatalkan', [OrderController::class, 'dibatalkan'])->name('dibatalkan');

  //route diskon
  Route::get('/diskon', [DiskonController::class, 'index'])->name('diskon.index');
  Route::post('/diskon/update', [DiskonController::class, 'update'])->name('diskon.update');

  //route laporan
  Route::get('/laporan', [LaporanController::class, 'index'])->name('laporanToko.index');
  Route::get('/laporan/today', [LaporanController::class, 'today'])->name('laporanToko.today');
  Route::get('/laporan/month', [LaporanController::class, 'month'])->name('laporanToko.month');
  Route::get('/laporan/year', [LaporanController::class, 'year'])->name('laporanToko.year');

  Route::get('/setting', [AdminTokoController::class, 'setting'])->name('toko.setting');
  Route::get('/tutorial', [AdminTokoController::class, 'tutorial'])->name('toko.tutorial');
});

//ubah status
Route::post('/ubah-status-dikirim', [OrderController::class, 'ubahDikirim'])->name('pesanan.ubahDikirim');
Route::post('/ubah-status-dibatalkan', [OrderController::class, 'ubahDibatalkan'])->name('pesanan.ubahDibatalkan');

//route hapus gambar cloudinary
Route::post('/delete-image', [ProdukController::class, 'deleteImage'])->name('deleteImage');
Route::post('/delete-image-edit', [ProdukController::class, 'deleteImageEdit'])->name('deleteImageEdit');

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

Route::get('/send', function () {
  event(new TokoEvent(date('Y-m-d H:i:s') . "selamat datang"));
});

Route::get('/send-data', function () {
  // $data = ['message' => 'Hello from Laravel'];
  // event(new App\Events\TokoEvent($data));
  TokoEvent::dispatch();

  return view('welcome');
});
