<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokosTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('tokos', function (Blueprint $table) {
      $table->id();
      $table->foreignId('idUser');
      $table->string('namaToko');
      $table->string('slug')->unique();
      $table->string('email')->unique();
      $table->string('password');
      $table->string('namaPengelola');
      $table->string('noHp');
      $table->text('alamat');
      $table->string('statusToko')->nullable()->default('free');
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
    Schema::dropIfExists('tokos');
  }
}
