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
      $table->string('noInvoice', 20)->default('-');
      $table->foreignId('idUser');
      $table->double('subtotal', 12, 2)->default(0);
      $table->double('diskon', 12, 2)->default(0);
      $table->double('total', 12, 2)->default(0);
      $table->date('tglOrder')->nullable();
      $table->string('namaCustomer')->default('-');
      $table->text('alamatPengiriman')->default('-');
      $table->string('statusBayar')->default('-');
      $table->string('metodeBayar')->default('-');
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
