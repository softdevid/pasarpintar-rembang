<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
  /**
   * Define the application's command schedule.
   *
   * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
   * @return void
   */
  protected function schedule(Schedule $schedule)
  {
    // $schedule->command('inspire')->hourly();

    // menjalankan fungsi updateProductDiscountStatus pada ProductController setiap hari pukul 00:00
    $schedule->call('App\Http\Controllers\ProductController@updateProductDiscountStatus')->daily();

    // mengirim email pengingat setiap hari pukul 08:00
    // $schedule->call(function () {
    //   // code untuk mengirim email pengingat
    // })->dailyAt('08:00');
  }

  /**
   * Register the commands for the application.
   *
   * @return void
   */
  protected function commands()
  {
    $this->load(__DIR__ . '/Commands');

    require base_path('routes/console.php');
  }
}
