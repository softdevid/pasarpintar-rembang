<?php

namespace App\Http\Controllers;

use App\Models\KategoriGlobal;
use App\Models\Keranjang;
use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
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
    }, 'hargaTerkecil:id,idProduk,hrgJual'])->select(
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

    $kategori = KategoriGlobal::select('namaKategoriGlobal', 'slug')->get();

    return Inertia::render('HomePage', [
      "title" => "Situs belanja online yang aman, terpercaya dan mudah di Indonesia",
      "kategori" => $kategori,
      "produks" => [
        "produkTerlaris" => $produkTerlaris
      ],
    ]);
  }

  public function kategori(Request $request, KategoriGlobal $kategoriGlobal)
  {
    $produks = $kategoriGlobal->produks()->with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko');
    }, 'hargaTerkecil:id,idProduk,hrgJual'])->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )->get();

    return Inertia::render('Pencarian', [
      "query" => $kategoriGlobal->namaKategoriGlobal,
      "hasil" => $produks
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
        "level" => $toko->statusToko
      ],
      "produk" => [
        "idProduk" => $produk->id,
        "idToko" => $produk->idToko,
        "namaProduk" => $produk->namaProduk,
        "slug" => $produk->slug,
        "terjual" => $produk->terjual,
        "deskripsi" => $produk->deskripsi,
        "jenisHarga" => $produk->jenisHarga,
        "hargas" => $produk
          ->hargas()
          ->select('id', 'idProduk', 'namaHarga', 'hrgJual', 'stokToko', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon', 'imgName', 'imgUrl')
          ->orderBy('hrgJual', 'asc')
          ->get()
          ->toArray() ?? [0]
      ],
      "images" => [
        [
          "imgName" => $produk->imgName,
          "imgUrl" => $produk->imgUrl
        ],
        ...$produk->hargas()->select('imgName', 'imgUrl')->orderBy('hrgJual', 'asc')->get()->toArray(),
      ]
    ];

    // dd($dataProduk);
    return Inertia::render('Produk', $dataProduk);
  }

  public function produkAcak()
  {
    return Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko');
    }, 'hargaTerkecil:id,idProduk,hrgJual'])->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )->latest()->limit(200)
      ->paginate(18);
  }

  public function toko(Toko $toko)
  {
    $produkTerlaris = $toko
      ->select('id', 'slug as slugToko')->where('slug', $toko->slug)
      ->with([
        'produks' => fn ($q) => $q->select(
          'produks.id',
          'produks.idToko',
          'produks.namaProduk',
          'produks.slug as slugProduk',
          'produks.terjual',
          'produks.imgUrl',
        )->orderBy('terjual', 'desc')->limit(10),
        'produks.hargaTerkecil:id,idProduk,hrgJual'
      ])->get();

    return Inertia::render('Toko', [
      "toko" => [
        "namaToko" => $toko->namaToko,
        "slug" => $toko->slug,
        "namaPengelola" => $toko->namaPengelola,
        "noHp" => $toko->noHp,
        "alamat" => $toko->alamat,
        "statusToko" => $toko->statusToko,
      ],
      "produks" => [
        "produkLaris" => $produkTerlaris,
      ]
    ]);
  }

  public function semuaProduk(Toko $toko)
  {
    return Produk::with(
      [
        'toko' => fn ($q) => $q->select('id', 'slug as slugToko'),
        'hargaTerkecil:id,idProduk,hrgJual'
      ]
    )->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )->where('produks.idToko', $toko->id)->latest()->limit(200)
      ->paginate(18);
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
          "harga" => [
            "namaHarga" => $item->pivot->harga->namaHarga,
            "hrgJual" => $item->pivot->harga->hrgJual,
            "hrgBeli" => $item->pivot->harga->hrgBeli,
            "stokToko" => $item->pivot->harga->stokToko,
            "diskon" => $item->pivot->harga->diskon,
          ],
        ],
      ];
    });

    $authUser = auth()->user();

    return Inertia::render('Checkout', [
      'title' => 'Checkout',
      'filteredProduk' => $krjPrdk,
      'user' => [
        'email' => $authUser->email,
        'name' => $authUser->name,
        'noHp' => $authUser->no_hp,
        'alamat' => $authUser->alamat,
      ],
    ]);
  }

  public function order(Request $request)
  {

    $authUser = auth()->user()->id;
    $keranjang = Keranjang::where('idUser', $authUser)->latest()->first();
    $no = Order::count() + 1;

    Order::create([
      "idUser" => $authUser,
      "namaCustomer" => $request->recipient['nama'],
      "email" => $request->recipient['email'],
      "noHp" => $request->recipient['noHp'],
      "alamatPengiriman" => $request->recipient['alamat'],
      "noFaktur" => date("Y-m-d H:i:s") . '=N' . $no,
      "tglOrder" => date("Y-m-d H:i:s"),
      "statusBayar" => "belum bayar",
      "metodeBayar" => $request->payment,
      "biayaAdmin" => 1000,
    ]);

    foreach ($request->produks as $produk) {
      $keranjang->produks()->wherePivot('idHarga', $produk['idHarga'])->detach($produk['idProduk']);

      RinciOrder::create([
        "idOrder" => Order::select('id')->latest()->first()->id,
        "idToko" => $produk['idToko'],
        "idProduk" => $produk['idProduk'],
        "idHarga" => $produk['idHarga'],
        "hrgJual" => $produk['hrgJual'],
        "hrgDiskon" => $produk['hrgDiskon'],
        "qty" => $produk['qty'],
        "statusOrder" => "diproses",
        "biayaAdmin" => 1000,
        "total" => $produk['qty'] * ($produk['hrgJual'] - $produk['hrgDiskon']),
        "statusKomisi" => "tunda",
        "tglOrder" => date("Y-m-d H:i:s"),
      ]);
    }

    return response()->json(["data" => "Pesanan telah dibuat!"]);
  }

  public function about()
  {
    return Inertia::render('About', [
      'title' => 'Tentang Pasar Pintar',
    ]);
  }

  public function privacyPolicy()
  {
    return Inertia::render('PrivacyPolicy', [
      'title' => 'Kebijakan dan Privasi',
    ]);
  }
}
