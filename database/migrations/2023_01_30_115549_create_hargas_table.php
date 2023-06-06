<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHargasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('hargas', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idProduk');
      $table->string('jenisHarga')->nullable();
      $table->string('namaHarga'); //misal kalau warna merah/biru
      $table->integer('hrgJual');
      $table->integer('hrgBeli');
      $table->integer('stokToko')->default(0);
      $table->integer('stokGudang')->default(0);
      $table->integer('diskon')->nullable()->default(0);
      $table->date('tglAwalDiskon')->nullable();
      $table->date('tglAkhirDiskon')->nullable();
      $table->integer('terjual')->nullable()->default(0);
      $table->string('imgName')->nullable();
      $table->string('imgUrl')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('hargas');
  }
}
