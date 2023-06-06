<?php

namespace Database\Seeders;

use App\Models\Toko;
use App\Models\User;
use App\Models\Harga;
use App\Models\KategoriGlobal;
use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run()
  {
    User::create([
      'name' => "admin",
      'email' => "admin@gmail.com",
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'no_hp' => "082222334455",
      'alamat' => "nan jauh di sana",
      'level' => "admin",
      'remember_token' => Str::random(10),
    ]);

    User::create([
      'name' => "Software Store",
      'email' => "softdev@gmail.com",
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'no_hp' => "088888888",
      'alamat' => "Kalikabong",
      'level' => "toko",
      'remember_token' => Str::random(10),
    ]);

    Toko::create([
      'idUser' => '2',
      'namaToko' => 'Software Store',
      'slug' => 'software-store',
      'email' => 'softdev@gmail.com',
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'namaPengelola' => 'Ardianto',
      'noHp' => '088888888888',
      'alamat' => 'Kalikabong',
      'statusToko' => 'premium',
    ]);

    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Alat Elektronik',
      'slug' => 'alat-elektronik',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Komputer dan Aksesoris',
      'slug' => 'komputer-dan-aksesoris',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Pakaian Pria',
      'slug' => 'pakaian-pria',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Sepatu Pria',
      'slug' => 'sepatu-pria',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Tas Pria',
      'slug' => 'tas-pria',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Aksesoris Fashion',
      'slug' => 'aksesoris-fashion',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Jam Tangan',
      'slug' => 'jam-tangan',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Hobi dan Koleksi',
      'slug' => 'hobi-dan-koleksi',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Olahraga dan Outdoor',
      'slug' => 'olahraga-dan-outdoor',
    ]);

    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Fotografi',
      'slug' => 'fotografi',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Buku dan Alat Tulis',
      'slug' => 'buku-dan-alat-tulis',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Otomotif',
      'slug' => 'otomotif',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Tas Wanita',
      'slug' => 'tas-wanita',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Sepatu Wanita',
      'slug' => 'sepatu-wanita',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Ibu dan Bayi',
      'slug' => 'ibu-dan-bayi',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Fashion bayi dan anak',
      'slug' => 'fashion-bayi-dan-anak',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Fashion Muslim',
      'slug' => 'fashion-muslim',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Pakaian Wanita',
      'slug' => 'pakaian-wanita',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Perlengkapan Rumah',
      'slug' => 'perlengkapan-rumah',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Perawatan dan Kecantikan',
      'slug' => 'perawatan-dan-kecantikan',
    ]);
    KategoriGlobal::create([
      'namaKategoriGlobal' => 'Makanan dan Minuman',
      'slug' => 'makanan-dan-minuman',
    ]);

    // User::factory(20)->has(Toko::factory()->count(1), 'toko')->create();
    // Produk::factory(100)->create();
    // Harga::factory(200)->create();
    // KategoriGlobal::factory(10)->create();

  }
}
