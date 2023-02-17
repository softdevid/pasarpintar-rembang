<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGambarSementarasTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('gambar_sementaras', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idUser');
      $table->text('index');
      $table->text('public_id');
      $table->text('url');
      $table->text('kategoriGambar'); //utama / lainnya
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
    Schema::dropIfExists('gambar_sementaras');
  }
}
