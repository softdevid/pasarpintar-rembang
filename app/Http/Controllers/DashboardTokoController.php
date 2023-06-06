<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\RinciOrder;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardTokoController extends Controller
{
  public function today()
  {
    $date = date('Y-m-d', strtotime(Carbon::now()));
    $dataRinciOrder = RinciOrder::whereDay(['tglOrder' => $date, 'idToko' => auth()->user()->id])->get();
    $data = 0;
    foreach ($dataRinciOrder as $r) {
      $data += ($r->hrgJual + $r->hrgDiskon) * $r->qty;
    }
    return;
  }

  public function month()
  {
    $date = date('Y-m', strtotime(Carbon::now()));
    $dataRinciOrder = RinciOrder::whereDay(['tglOrder' => $date, 'idToko' => auth()->user()->id])->get();
    $data = 0;
    foreach ($dataRinciOrder as $r) {
      $data += ($r->hrgJual + $r->hrgDiskon) * $r->qty;
    }
    return;
  }

  public function year()
  {
    $date = date('Y', strtotime(Carbon::now()));
    $dataRinciOrder = RinciOrder::whereDay(['tglOrder' => $date, 'idToko' => auth()->user()->id])->get();
    $data = 0;
    foreach ($dataRinciOrder as $r) {
      $data += ($r->hrgJual + $r->hrgDiskon) * $r->qty;
    }
    return;
  }

  public function totalProduk()
  {
    $produk = Produk::where('idToko', auth()->user()->id)->count();
    return;
  }
}
