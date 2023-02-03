<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
use App\Models\Toko;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
      'name' => "toko",
      'email' => "toko@gmail.com",
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'no_hp' => "082222334455",
      'alamat' => "nan jauh di sana",
      'level' => "toko",
      'remember_token' => Str::random(10),
    ]);

    Toko::create([
      'idUser' => 2,
      'namaToko' => 'Softdev',
      'slug' => 'softdev',
      'email' => 'toko@gmail.com',
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'namaPengelola' => 'Ardianto',
      'noHp' => '0888888824242',
      'alamat' => 'rumah di pluto',
    ]);

    User::create([
      'name' => "toko2",
      'email' => "toko2@gmail.com",
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'no_hp' => "082222334455",
      'alamat' => "nan jauh di sana",
      'level' => "toko",
      'remember_token' => Str::random(10),
    ]);

    Toko::create([
      'idUser' => 3,
      'namaToko' => 'Softdev 2',
      'slug' => 'softdev-2',
      'email' => 'toko2@gmail.com',
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'namaPengelola' => 'Putra',
      'noHp' => '0888888824242',
      'alamat' => 'rumah di pluto2',
    ]);

    Produk::create([
      'namaProduk' => 'Laptop',
      'slug' => 'laptop',
      'idToko' => 1,
      'idKategori' => '1',
      'idKategoriGlobal' => '1',
      'satuan' => '1',
      'deskripsi' => 'Ini laptop baru guys',
      'hrgBeli' => 3000000,
      'hrgJual' => 4000000,
      'jenisHarga' => '',
      'stokToko' => 10,
      'stokGudang' => 10,
      'terjual' => 1,
      'imgName' => '-',
      'imgUrl' => '-',
    ]);

    Order::create([
      'noFaktur' => 'PS-20230202',
      'idToko' => 1,
      'idProduk' => 1,
      'namaProduk' => 'Laptop',
      'hrgBeli' => 3000000,
      'hrgJual' => 4000000,
      'jumlah' => 1,
      'tglOrder' => '2023-02-02',
    ]);

    RinciOrder::create([
      'idUser' => 1,
      'namaCustomer' => 'Ardianto',
      'alamatPengiriman' => 'Mars sebelah bumi',
      'idToko' => 1,
      'idProduk' => 1,
      'noFaktur' => 'PS-20230202',
      'total' => 4000000,
      'totalItem' => 1,
      'tglOrder' => '2023-02-02',
      'statusBayar' => 'sudah bayar',
      'statusOrder' => 'selesai',
      'metodeBayar' => 'cod',
    ]);

    // User::factory(20)->has(Toko::factory()->count(1), 'toko')->create();

    // Produk::factory(100)->create();
  }
}
