<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRinciOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('rinci_orders', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idOrder');
      $table->foreignId('idToko');
      $table->foreignId('idProduk');
      $table->foreignId('idHarga');
      $table->bigInteger('hrgJual');
      $table->bigInteger('hrgDiskon');
      $table->bigInteger('qty');
      $table->bigInteger('biayaAdmin');
      $table->bigInteger('total');
      $table->string('statusOrder');  //diproses, dikirim, diterima, dibatalkan
      $table->string('statusKomisi'); //tunda, selesai
      $table->text('alasanPembatalan')->nullable();
      $table->date('tglOrder');
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
    Schema::dropIfExists('rinci_orders');
  }
}
