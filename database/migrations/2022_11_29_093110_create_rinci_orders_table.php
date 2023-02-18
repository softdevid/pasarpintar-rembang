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
      $table->foreignId('idUser');
      $table->string('namaCustomer');
      $table->text('alamatPengiriman');
      $table->foreignId('idToko');
      $table->foreignId('idProduk');
      $table->string('noFaktur', 20);
      $table->bigInteger('total');
      $table->bigInteger('totalItem');
      $table->date('tglOrder');
      $table->string('statusBayar');
      $table->string('statusOrder');
      $table->string('metodeBayar');
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
    Schema::dropIfExists('order_rincian');
  }
}
