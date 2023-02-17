<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeranjangController extends Controller
{

  public function index()
  {

    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();

    if ($keranjang == null) {
      return Inertia::render('Keranjang', [
        'title' => 'Keranjang Belanja',
        "keranjang" => "kosong",
      ]);
    }

    $krjPrdk = $keranjang->produks()->orderByPivot('created_at', 'desc')->get()->sortByDesc(function ($item) {
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

    return Inertia::render('Keranjang', [
      'title' => 'Keranjang Belanja',
      "keranjang" => $krjPrdk,
    ]);
  }

  public function tambah(Request $request)
  {
    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();
    if ($keranjang == null) {
      $keranjang = Keranjang::create([
        "idUser" => auth()->user()->id
      ]);
    }

    $krjPrdk = $keranjang->produks()->where('idProduk', $request->idProduk)->where('idHarga', $request->idHarga)->first();
    if ($krjPrdk != null) {
      $keranjang->produks()->updateExistingPivot((string) $request->idProduk, [
        'qty' => (string) $request->qty + $krjPrdk->pivot->qty,
        'idHarga' => (string) $request->idHarga,
        'diskon' => (string) $request->diskon,
        'subtotal' => (string) $request->subtotal + $krjPrdk->pivot->subtotal
      ]);
    } else if ($krjPrdk == null) {
      $keranjang->produks()->attach((string) $request->idProduk, [
        'qty' => (string) $request->qty,
        'idHarga' => (string) $request->idHarga,
        'idToko' => (string) $request->idToko,
        'diskon' => (string) $request->diskon,
        'subtotal' => (string) $request->subtotal
      ]);
    }

    return response()->json(["data" => "Berhasil Memasukkan Produk!"]);
  }

  public function cartCount()
  {
    $jumlahKeranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first()->produks()->count();
    return response()->json(["cartCount" => $jumlahKeranjang]);
  }
}
