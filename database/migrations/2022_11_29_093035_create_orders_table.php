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
      $table->foreignId('idUser');
      $table->string('namaCustomer');
      $table->string('email');
      $table->string('noHp');
      $table->text('alamatPengiriman');
      $table->string('noFaktur');
      $table->date('tglOrder');
      $table->string('statusBayar');  //belum bayar. sudah bayar
      $table->string('metodeBayar'); //cod
      $table->integer('biayaAdmin')->default(0); //cod
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
