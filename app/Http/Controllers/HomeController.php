<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use App\Models\Produk;
use App\Models\Toko;
use Carbon\Carbon;
use Illuminate\Http\Request;
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
        "idProduk" => $produk->id,
        "idToko" => $produk->idToko,
        "namaProduk" => $produk->namaProduk,
        "slug" => $produk->slug,
        "terjual" => $produk->terjual,
        "deskripsi" => $produk->deskripsi,
        "diskon" => $produk->diskon ?? 0,
        "jenisHarga" => $produk->jenisHarga,
        "hargas" => $produk
          ->hargas()
          ->select('id', 'idProduk', 'namaHarga', 'hrgJual', 'stokToko', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon')
          ->orderBy('hrgJual', 'asc')
          ->get()
          ->toArray()

      ],
      "images" => [
        [
          "imgName" => $produk->imgName,
          "imgUrl" => $produk->imgUrl
        ],
        ...$produk->hargas()->select('imgName', 'imgUrl')->get()->toArray(),
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
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )->orderBy('terjual', 'desc')->limit(200)
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

  public function checkout(Request $request)
  {

    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();

    if ($keranjang == null) {
      return Inertia::render('Keranjang', [
        'title' => 'Checkout',
        'produk' => "kosong"
      ]);
    }

    $krjPrdk = $keranjang->produks()->wherePivotIn('id', explode(',', $request->idPivot))->orderByPivot('created_at', 'desc')->get()->sortByDesc(function ($item) {
      return $item->pivot->created_at;
    })->mapToGroups(function ($item, $key) {
      return [
        $item->pivot->produk->toko->namaToko => [
          "id" => $item->pivot->id,
          "idProduk" => $item->pivot->idProduk,
          "idHarga" => $item->pivot->idHarga,
          "idToko" => $item->pivot->idToko,
          "produk" => [
            "namaProduk" => $item->pivot->produk->namaProduk,
            "slugProduk" => $item->pivot->produk->slug,
            "slugToko" => $item->pivot->produk->toko->slug,
            "imgName" => $item->pivot->produk->imgName,
            "imgUrl" => $item->pivot->produk->imgUrl,
          ],
          "qty" => $item->pivot->qty,
          "diskon" => $item->pivot->diskon,
          "harga" => [
            "namaHarga" => $item->pivot->harga->namaHarga,
            "hrgJual" => $item->pivot->harga->hrgJual,
            "stokToko" => $item->pivot->harga->stokToko,
          ],
        ],
      ];
    });

    return Inertia::render('Checkout', [
      'title' => 'Checkout',
      'filteredProduk' => $krjPrdk
    ]);
  }
}
