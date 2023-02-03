<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LaporanController extends Controller
{
  // public function today(Request $request)
  // {
  //   $date = date('Y-m-d', strtotime($request->date));
  //   $data = Order::whereDay(['created_at' => $date, 'idToko' => auth()->user()->id])->get();

  //   $omset = 0;
  //   foreach ($data as $key => $value) {
  //     $omset += $value['hrgJual'] * $value['jumlah'];
  //   }

  //   return;
  // }

  // public function month(Request $request)
  // {
  //   $month = date('m', strtotime($request->month));
  //   $year = date('Y', strtotime($request->year));
  //   $data = Order::whereMonth(['created_at' => [$month, $year]])->get();

  //   $omset = 0;
  //   foreach ($data as $key => $value) {
  //     $omset += $value['hrgJual'] * $value['jumlah'];
  //   }
  //   return;
  // }

  // public function year(Request $request)
  // {
  //   $year = date('Y', strtotime($request->year));
  //   $data = Order::whereYear(['created_at' => $year])->get();

  //   $omset = 0;
  //   foreach ($data as $key => $value) {
  //     $omset += $value['hrgJual'] * $value['jumlah'];
  //   }
  //   return;
  // }

  public function Index()
  {
    return Inertia::render('LaporanToko/Index', [
      'title' => 'Laporan Keuangan',
    ]);
  }

  public function today(Request $request)
  {
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
    $date = $request->date;
    $month = date('m', strtotime($request->date));
    $year = date('Y', strtotime($request->date));

    $laporan = Order::whereMonth('tglOrder', $month)
      ->whereYear('tglOrder', $year)
      ->get();

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
    $year = date('Y', strtotime($request->year));

    $laporan = Order::whereYear('tglOrder', $year)->get();

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
