<?php

namespace Database\Seeders;

use App\Models\Toko;
use App\Models\User;
use App\Models\Harga;
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
      'name' => "Me",
      'email' => "mee@gmail.com",
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'no_hp' => "085225041144",
      'alamat' => "Manduraga RT02 RW02 Kalimanah Purbalingga",
      'level' => "customer",
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
      'idUser' => '3',
      'namaToko' => 'Software Store',
      'slug' => 'software-store',
      'email' => 'softdev@gmail.com',
      'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
      'namaPengelola' => 'Ardianto',
      'noHp' => '088888888888',
      'alamat' => 'Kalikabong',
      'statusToko' => 'premium',
    ]);


    User::factory(20)->has(Toko::factory()->count(1), 'toko')->create();
    Produk::factory(100)->create();
    Harga::factory(200)->create();


    // Order::create([
    //   'idUser' => 3,
    //   'namaCustomer' => 'Software Store',
    //   'email' => 'softdev@gmail.com',
    //   'noHp' => '088888888888',
    //   'alamatPengiriman' => 'Pluto',
    //   'noFaktur' => '12345',
    //   'tglOrder' => '2023-02-02',
    //   'statusBayar' => 'sudah bayar',
    //   'metodeBayar' => 'cod',
    // ]);

    // RinciOrder::create([
    //   'idOrder' => 1,
    //   'idToko' => 1,
    //   'idProduk' => 1,
    //   'idHarga' => 1,
    //   'hrgJual' => 2000,
    //   'hrgDiskon' => 0,
    //   'qty' => 1,
    //   'statusOrder' => 'diterima',
    //   'alasanPembatalan' => '-',
    // ]);
  }
}
