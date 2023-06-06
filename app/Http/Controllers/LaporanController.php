<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LaporanController extends Controller
{
  public function Index()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first();

    $rinciOrder =  DB::table('rinci_orders')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', 'orders.biayaAdmin', 'orders.noFaktur')
      ->where('rinci_orders.idToko', $toko->id)
      ->paginate(10);

    return Inertia::render('LaporanToko/Index', [
      'title' => 'Laporan Keuangan',
      'rinciOrder' => $rinciOrder,
      'namaToko' => $toko->namaToko,
    ]);
  }

  public function dataSales()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first();

    $sales = DB::table('rinci_orders')
      ->select(DB::raw('DATE_FORMAT(tglOrder, "%M") AS tglOrder'), DB::raw('SUM(total) AS total'))
      ->groupBy('tglOrder')
      ->where(['idToko' => $toko->id, 'statusOrder' => 'diterima'])
      ->whereYear('tglOrder', date('Y'))
      ->get();

    return response()->json($sales);
  }

  public function today(Request $request)
  {
    //validasi
    $request->validate(['date' => 'required'], ['date.required' => 'Tanggal harus dipilih']);


    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first(); //ambil id toko
    $date = date('Y-m-d', strtotime($request->date)); //mengubah format tanggalnya

    $laporan =  DB::table('rinci_orders')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', DB::raw("DATE_FORMAT(rinci_orders.updated_at, '%H:%i') as hour"), 'orders.biayaAdmin')
      ->where('rinci_orders.idToko', $toko->id)
      ->whereDate('rinci_orders.tglOrder', $date)
      ->get();


    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += ($value->hrgJual + $value->hrgDiskon + $value->biayaAdmin) * $value->qty;
    }

    return Inertia::render('LaporanToko/LaporanHarian', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'omset' => $omset,
      'date' => $date,
      'namaToko' => $toko->namaToko,
    ]);
  }

  public function month(Request $request)
  {
    $request->validate(['month' => 'required'], ['month.required' => 'Bulan harus pilih']);
    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first();

    $date = $request->month;
    $month = date('m', strtotime($date));
    $year = date('Y', strtotime($date));

    $laporan =  DB::table('rinci_orders')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', 'orders.biayaAdmin')
      ->where('rinci_orders.idToko', $toko->id)
      ->whereMonth('rinci_orders.tglOrder', $month)
      ->whereYear('rinci_orders.tglOrder', $year)
      ->get();

    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += ($value->hrgJual + $value->hrgDiskon + $value->biayaAdmin) * $value->qty;
    }

    return Inertia::render('LaporanToko/LaporanBulanan', [
      'title' => 'Laporan Bulanan',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $omset,
      'namaToko' => $toko->namaToko,
    ]);
  }

  public function year(Request $request)
  {
    $request->validate(['year' => 'required'], ['year.required' => 'Tahun harus dipilih']);

    $toko = Toko::where('idUser', auth()->user()->id)->select('id', 'namaToko')->first();
    $date = date('Y', strtotime($request->year));

    $laporan =  DB::table('rinci_orders')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', DB::raw('DATE_FORMAT(rinci_orders.tglOrder, "%M") as tglOrder'), 'orders.biayaAdmin')
      ->where(['rinci_orders.idToko' => $toko->id, 'rinci_orders.statusOrder' => 'diterima'])
      ->whereYear('rinci_orders.tglOrder', $date)
      ->get();

    $omset = 0;
    foreach ($laporan as $key => $value) {
      $omset += ($value->hrgJual + $value->hrgDiskon + $value->biayaAdmin) * $value->qty;
    }

    return Inertia::render('LaporanToko/LaporanTahunan', [
      'title' => 'Laporan Tahunan',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $omset,
      'namaToko' => $toko->namaToko,
    ]);
  }
}
