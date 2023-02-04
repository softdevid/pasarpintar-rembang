<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduksTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('produks', function (Blueprint $table) {
      $table->id();
      $table->string('namaProduk');
      $table->string('slug');
      $table->foreignId('idToko');
      $table->foreignId('idKategori')->nullable();
      $table->foreignId('idKategoriGlobal')->nullable();
      $table->string('satuan')->nullable();
      $table->text('deskripsi')->nullable();
      $table->integer('hrgBeli')->nullable();
      $table->integer('hrgJual')->nullable();
      $table->string('jenisHarga')->nullable(); //mendefinisikan nama harga, misal warna, kendaraan dll
      $table->bigInteger('terjual')->nullable();
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
    Schema::dropIfExists('produks');
  }
}
