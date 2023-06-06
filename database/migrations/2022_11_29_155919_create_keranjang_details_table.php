<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKeranjangDetailsTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('keranjang_details', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idKeranjang');
      $table->foreignId('idProduk');
      $table->foreignId('idHarga');
      $table->foreignId('idToko');
      $table->integer('qty');
      $table->bigInteger('subtotal')->default(0);
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
    Schema::dropIfExists('keranjang_details');
  }
}
