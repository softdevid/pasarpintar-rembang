<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('orders', function (Blueprint $table) {
      $table->id();
      $table->string('noFaktur');
      $table->foreignId('idToko');
      $table->foreignId('idProduk');
      $table->foreignId('idHarga');
      $table->string('namaProduk');
      $table->bigInteger('hrgBeli');
      $table->bigInteger('hrgJual');
      $table->bigInteger('jumlah');
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
    Schema::dropIfExists('orders');
  }
}
