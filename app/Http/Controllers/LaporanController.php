<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Support\Facades\DB;

class LaporanController extends Controller
{
  public function Index()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = RinciOrder::where('idToko', $toko->id)->latest()->paginate(10)->withQueryString();
    return Inertia::render('LaporanToko/Index', [
      'title' => 'Laporan Keuangan',
      'rinciOrder' => $rinciOrder,
    ]);
  }

  public function today(Request $request)
  {
    //validasi
    $request->validate(['date' => 'required'], ['date.required' => 'Tanggal harus dipilih']);


    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first(); //ambil id toko
    $date = date('Y-m-d', strtotime($request->date)); //mengubah format tanggalnya

    $laporan = Order::whereDate('tglOrder', $date) //Select dari order
      ->where('idToko', $toko->id)
      ->get();

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
    $request->validate(['month' => 'required'], ['month.required' => 'Bulan harus pilih']);
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $date = $request->month;
    $month = date('m', strtotime($date));
    $year = date('Y', strtotime($date));

    $laporan = Order::whereMonth('tglOrder', $month)
      ->whereYear('tglOrder', $year)
      ->where('idToko', $toko->id)
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
    $request->validate(['year' => 'required'], ['year.required' => 'Tahun harus dipilih']);

    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first();

    $date = $request->year;
    // $laporan = RinciOrder::whereYear('tglOrder', $date)
    //   ->where('idToko', $toko->id)
    //   ->get();

    $laporan =  DB::table('rinci_orders')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', 'orders.biayaAdmin')
      ->where('rinci_orders.idToko', $toko->id)
      ->whereYear('rinci_orders.tglOrder', $date)
      ->get();
    // dd($laporan);

    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += ($value->hrgJual + $value->hrgDiskon + $value->biayaAdmin) * $value->qty;
    }
    // dd($omset);

    return Inertia::render('LaporanToko/LaporanTahunan', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $omset,
      'toko' => $toko,
    ]);
  }
}
