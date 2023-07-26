<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class Trigger extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    DB::unprepared(
      'CREATE TRIGGER `updateStokToko` AFTER UPDATE ON `rinci_orders`
         FOR EACH ROW BEGIN
            UPDATE hargas set stokToko = stokToko - NEW.qty where id = NEW.idHarga AND NEW.statusOrder = "dikirim";
        END'
    );

    DB::unprepared(
      'CREATE TRIGGER `updateStokGudangKeToko` AFTER UPDATE ON `rinci_orders`
         FOR EACH ROW BEGIN
            UPDATE hargas set stokToko = stokToko + stokGudang where id = NEW.idHarga AND NEW.statusOrder = "dikirim";
        END'
    );

    DB::unprepared(
      'CREATE TRIGGER `updateStokGudangJadiKosong` AFTER UPDATE ON `rinci_orders`
         FOR EACH ROW BEGIN
            UPDATE hargas set stokGudang = 0 where id = NEW.idHarga AND NEW.statusOrder = "dikirim";
        END'
    );

    DB::unprepared(
      'CREATE TRIGGER `updateTerjual` AFTER UPDATE ON `rinci_orders`
         FOR EACH ROW BEGIN
            UPDATE produks set terjual = terjual + NEW.qty where id = NEW.idProduk AND NEW.statusOrder = "dikirim";
        END'
    );

    DB::unprepared(
      'CREATE TRIGGER `updatePoint` AFTER UPDATE ON rinci_orders
      FOR EACH ROW
      BEGIN
          IF NEW.statusOrder = "diterima" THEN
              UPDATE users
              SET point = point + 5
              WHERE id = (SELECT idUser FROM orders WHERE orders.id = NEW.idOrder);
          END IF;
      END;'
    );

    DB::unprepared(
      'CREATE TRIGGER `updateTerjualHarga` AFTER UPDATE ON `rinci_orders`
         FOR EACH ROW BEGIN
            UPDATE hargas set terjual = terjual + NEW.qty where id = NEW.idHarga AND NEW.statusOrder = "dikirim";
        END'
    );
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    DB::unprepared('DROP TRIGGER trigger');
  }
}
