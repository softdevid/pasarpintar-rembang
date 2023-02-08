<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use App\Models\Toko;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
  public function index()
  {

    $produkTerlaris = Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko');
    }, 'hargas' => function ($q) {
      $q->select('idProduk', 'hrgJual')->orderBy('hrgJual', 'asc');
    }])->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )
      ->orderBy('terjual', 'desc')
      ->limit(10)
      ->get();

    return Inertia::render('HomePage', [
      "title" => "HomePage",
      "produk" => [
        "produkTerlaris" => $produkTerlaris
      ],
    ]);
  }

  public function produk(Toko $toko, Produk $produk)
  {
    $lamaBergabung = "";
    if ($toko->created_at->diffInYears(Carbon::now()) < 1) {
      $lamaBergabung = $toko->created_at->format('d F');
    } else {
      $lamaBergabung = $toko->created_at->diffInYears(Carbon::now()) . "tahun yang lalu";
    }

    $dataProduk = [
      "toko" => [
        "namaToko" => $toko->namaToko,
        "slug" => $toko->slug,
        "jumlahProduk" => $produk->where("idToko", $toko->id)->count(),
        "lamaBergabung" => $lamaBergabung,
      ],
      "produk" => [
        "namaProduk" => $produk->namaProduk,
        "slug" => $produk->slug,
        "terjual" => $produk->terjual,
        "deskripsi" => $produk->deskripsi,
        "diskon" => $produk->diskon,
        "jenisHarga" => $produk->jenisHarga,
        "hargas" => $produk
          ->hargas()
          ->select('idProduk', 'namaHarga', 'hrgJual', 'stokToko', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon')
          ->orderBy('hrgJual', 'asc')
          ->get()
          ->toArray()

      ],
      "images" => [
        [
          "imgName" => $produk->imgName,
          "imgUrl" => $produk->imgUrl
        ],
        ...$produk->gambars()->select('imgName', 'imgUrl')->limit(3)->get()->toArray(),
      ]
    ];
    return Inertia::render('Produk', $dataProduk);
  }

  public function produkAcak()
  {
    return Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko');
    }, 'hargas' => function ($q) {
      $q->select('idProduk', 'hrgJual')->orderBy('hrgJual', 'asc');
    }])->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug',
      'produks.terjual',
      'produks.imgUrl',
    )->orderBy('terjual', 'desc')
      ->paginate(18);
  }

  public function toko(Toko $toko)
  {
    return Inertia::render('Toko', [
      "toko" => [
        "namaToko" => $toko->namaToko,
        "namaPengelola" => $toko->namaPengelola,
        "noHp" => $toko->noHp,
        "alamat" => $toko->alamat
      ]
    ]);
  }

  public function checkout()
  {
    return Inertia::render('Checkout', [
      'title' => 'Checkout',
    ]);
  }
}
