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
    $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diproses'])->get();
    return response()->json(['rinciOrder' => $rinciOrder]);
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

  public function dataDibatalkan()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dibatalkan'])->get();
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
