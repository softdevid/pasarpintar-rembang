<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
  // untuk toko
  public function pesananBaru()
  {
    return Inertia::render('PesananToko/PesananBaru', [
      'title' => 'Pesanan Baru',
    ]);
  }

  public function dikirim()
  {
    return Inertia::render('PesananToko/Dikirim', [
      'title' => 'Dikirim',
    ]);
  }

  public function sampai()
  {
    return Inertia::render('PesananToko/Sampai', [
      'title' => 'Sampai',
    ]);
  }

  public function dibatalkan()
  {
    return Inertia::render('PesananToko/Dibatalkan', [
      'title' => 'Dibatalkan',
    ]);
  }

  // JSON DATA
  public function dataPesananBaru()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'diproses')
      ->select('orders.*', 'rinci_orders.*', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diproses'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);
  }

  public function dataDikirim()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'dikirim')
      ->select('orders.*', 'rinci_orders.*', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dikirim'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);
  }

  public function dataSampai()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'diterima')
      ->select('orders.*', 'rinci_orders.*', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // dd($rinciOrder);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diterima'])->get();
    return response()->json($rinciOrder);
  }

  public function dataDibatalkan()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'diterima')
      ->select('orders.*', 'rinci_orders.*', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dibatalkan'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);
  }



  // untuk customer

  public function dikemasCustomer()
  {
    //
  }

  public function dikirimKurirCustomer()
  {
    //
  }

  public function sampaiCustomer()
  {
    //
  }
}
