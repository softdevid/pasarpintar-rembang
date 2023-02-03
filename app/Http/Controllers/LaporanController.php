<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RinciOrder;
use App\Models\Toko;

class LaporanController extends Controller
{
  public function Index()
  {
    $rinciOrder = RinciOrder::latest()->paginate(10)->withQueryString();
    return Inertia::render('LaporanToko/Index', [
      'title' => 'Laporan Keuangan',
      'rinciOrder' => $rinciOrder,
    ]);
  }

  public function today(Request $request)
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $date = date('Y-m-d', strtotime($request->date));
    $laporan = Order::whereDate('tglOrder', $date)->get();
    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += $value['hrgJual'] * $value['jumlah'];
    }

    return Inertia::render('LaporanToko/LaporanHarian', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'omset' => $omset,
      'date' => $date,
    ]);
  }

  public function month(Request $request)
  {
    $date = $request->month;
    $month = date('m', strtotime($date));
    $year = date('Y', strtotime($date));

    $laporan = Order::whereMonth('tglOrder', $month)
      ->whereYear('tglOrder', $year)
      ->get();

    // dd($laporan);

    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += $value['hrgJual'] * $value['jumlah'];
    }

    return Inertia::render('LaporanToko/LaporanBulanan', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $omset,
    ]);
  }

  public function year(Request $request)
  {
    $date = $request->year;
    // $year = date('Y', strtotime($date));

    $laporan = Order::whereYear('tglOrder', $date)->get();
    // dd($date, $laporan);

    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += $value['hrgJual'] * $value['jumlah'];
    }

    return Inertia::render('LaporanToko/LaporanTahunan', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $omset,
    ]);
  }
}
