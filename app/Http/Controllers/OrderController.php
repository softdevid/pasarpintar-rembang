<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
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

  // JSON DATA
  public function dataPesananBaru()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diproses'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);

    // $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    // $rinciOrder = RinciOrder::with(['toko' => function ($q) {
    //   $q->select('id', 'slug as slugToko', 'namaToko');
    // }, 'orders' => function ($q) {
    //   $q->select('orders.*')->orderBy('created_at', 'asc');
    // }])->select(
    //   'rinci_orders.*',
    // )->orderBy('created_at', 'desc')
    //   ->where(['idToko' => $toko->id, 'statusOrder' => 'diproses'])
    //   ->get();

    // return response()->json($rinciOrder);
  }

  public function dataDikirim()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dikirim'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);
  }

  public function dataSampai()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'sampai'])->get();
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
