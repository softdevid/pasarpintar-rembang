<?php

namespace App\Http\Controllers;

use App\Models\Keranjang;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KeranjangController extends Controller
{

  public function index()
  {
    return Inertia::render('Keranjang', [
      'title' => 'Keranjang Belanja',
    ]);
  }

  public function getCarts()
  {
    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();

    $krjPrdk = $keranjang
      ->produks()
      ->orderByPivot('created_at', 'desc')
      ->get()
      ->sortByDesc(function ($item) {
        return $item->pivot->created_at;
      })
      ->mapToGroups(function ($item, $key) {
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
              "stokToko" => $item->pivot->harga->stokToko,
              "diskon" => $item->pivot->harga->diskon,
            ],
          ],
        ];
      });

    return response()->json(["data" => $krjPrdk]);
  }

  public function add(Request $request)
  {

    $keranjang = Keranjang::where('idUser', auth()->id())->latest()->first();
    if ($keranjang == null) {
      $keranjang = Keranjang::create([
        "idUser" => auth()->id()
      ]);
    }

    $krjPrdk = $keranjang->produks()->where('idProduk', $request->idProduk)->where('idHarga', $request->idHarga)->first();
    if ($krjPrdk != null) {
      $keranjang->produks()->updateExistingPivot((string) $request->idProduk, [
        'qty' => (string) $request->qty + $krjPrdk->pivot->qty,
        'idHarga' => (string) $request->idHarga,
        'subtotal' => (string) $request->subtotal + $krjPrdk->pivot->subtotal
      ]);
    } else if ($krjPrdk == null) {
      $keranjang->produks()->attach((string) $request->idProduk, [
        'qty' => (string) $request->qty,
        'idHarga' => (string) $request->idHarga,
        'idToko' => (string) $request->idToko,
        'subtotal' => (string) $request->subtotal
      ]);
    }

    return response()->json(["data" => "Berhasil Memasukkan Produk!"]);
  }

  public function update(Request $request)
  {
    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();
    $keranjang->produks()->wherePivot('idHarga', $request->idHarga)->updateExistingPivot((string) $request->idProduk, [
      'qty' => (string) $request->qty,
      'subtotal' => (string) $request->subtotal
    ]);

    return response()->json(["data" => "Berhasil mengupdate produk!"]);
  }

  public function delete(Request $request)
  {
    $toDelete = $request->all();
    $keranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first();

    foreach ($toDelete as $item) {
      $idProduk = $item['idProduk'];
      $idHarga = $item['idHarga'];

      $keranjang->produks()->wherePivot('idHarga', $idHarga)->detach($idProduk);
    }

    return response()->json(["data" => "Berhasil menghapus produk!"]);
  }

  public function cartCount()
  {
    $jumlahKeranjang = Keranjang::where('idUser', auth()->user()->id)->latest()->first()->produks()->count();
    return response()->json(["cartCount" => $jumlahKeranjang]);
  }
}
