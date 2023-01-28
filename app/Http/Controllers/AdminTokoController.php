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
      ->select('total')
      ->get();

    $totalOrder = RinciOrder::where('statusOrder', 'pesanan-baru')
      ->where('idToko', $toko->id)
      ->count();

    $totalKategori = Kategori::where('idToko', $toko->id)->count();

    $totalProduk = Produk::where('idToko', $toko->id)->count();

    $produk = Produk::where('idToko', $toko->id)->latest()->paginate(5);
    $kategori = Kategori::where('idToko', $toko->id)->latest()->paginate(5);

    return Inertia::render('DashboardToko/Dashboard', [
      "title" => "Admin Toko",
      'omset' => $today->sum('total'),
      'totalOrder' => $totalOrder,
      'totalKategori' => $totalKategori,
      'totalProduk' => $totalProduk,
      'produk' => $produk,
      'kategori' => $kategori,
    ]);
  }

  public function list()
  {
    return Inertia::render('TokoProduk', [
      "title" => "Admin Toko Produk",
    ]);
  }

  public function kategori()
  {
    return Inertia::render('TokoAdminKategori', [
      "title" => "Admin Toko Kategori",
    ]);
  }
  public function setting()
  {
    return Inertia::render('TokoAdminSetting', [
      "title" => "Admin Toko Setting",
    ]);
  }

  public function pesananBaru()
  {
    return Inertia::render('PesananToko/PesananBaru', [
      'title' => 'Pesanan Baru',
    ]);
  }

  public function konfirmasiBayar()
  {
    return Inertia::render('PesananToko/KonfirmasiBayar', [
      'title' => 'Konfirmasi Bayar',
    ]);
  }

  public function dikemas()
  {
    return Inertia::render('PesananToko/Dikemas', [
      'title' => 'Dikemas',
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

  public function kurir()
  {
    return Inertia::render('KurirToko/KurirToko', [
      'title' => 'Kurir',
    ]);
  }
}
