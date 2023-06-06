<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    $totalKomisi = RinciOrder::where(['idToko' => $toko->id, 'statusKomisi' => 'tunda', 'statusOrder' => 'diterima'])->sum('biayaAdmin');

    $produk = Produk::where('idToko', $toko->id)->latest()->paginate(5);
    $kategori = Kategori::where('idToko', $toko->id)->latest()->paginate(5);

    return Inertia::render('DashboardToko/Dashboard', [
      "title" => "Admin Toko",
      'omset' => $omset ?? 0,
      'totalOrder' => $totalOrder ?? '',
      'totalKategori' => $totalKategori ?? 0,
      'totalProduk' => $totalProduk ?? 0,
      'totalKomisi' => $totalKomisi ?? 0,
      'produk' => $produk ?? 0,
      'kategori' => $kategori ?? 0,
    ]);
  }

  public function setting()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->first();
    return Inertia::render('TokoAdminSetting', [
      'title' => 'Pengaturan',
      'toko' => $toko,
    ]);
  }

  public function tutorial()
  {
    return Inertia::render('Tutorial', [
      'title' => 'Tutorial',
    ]);
  }
}
