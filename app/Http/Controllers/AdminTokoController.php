<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTokoController extends Controller
{
  public function index()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $today = RinciOrder::where('idToko', $toko->id)
      ->whereDay('tglOrder', date('Y-m-d'))
      ->select('hrgJual', 'hrgDiskon', 'qty')
      ->get();
    $omset = 0;
    foreach ($today as $t) {
      $omset += ($t->hrgJual + $t->hrgDiskon) * $t->qty;
    }

    $totalOrder = RinciOrder::where('statusOrder', 'diproses')
      ->where('idToko', $toko->id)
      ->count();

    $totalKategori = Kategori::where('idToko', $toko->id)->count();

    $totalProduk = Produk::where('idToko', $toko->id)->count();

    $produk = Produk::where('idToko', $toko->id)->latest()->paginate(5);
    $kategori = Kategori::where('idToko', $toko->id)->latest()->paginate(5);

    return Inertia::render('DashboardToko/Dashboard', [
      "title" => "Admin Toko",
      'omset' => $omset,
      'totalOrder' => $totalOrder,
      'totalKategori' => $totalKategori,
      'totalProduk' => $totalProduk,
      'produk' => $produk,
      'kategori' => $kategori,
    ]);
  }
}
