<?php

namespace App\Http\Controllers;

use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
  public function search(Request $request)
  {
    $querySearch = $request->input('query');

    $produk = Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko');
    }, 'hargaTerkecil:id,idProduk,hrgJual'])->select(
      'produks.id',
      'produks.idToko',
      'produks.namaProduk',
      'produks.slug as slugProduk',
      'produks.terjual',
      'produks.imgUrl',
    )->where('namaProduk', 'like', '%' . $querySearch . '%')->get();

    return Inertia::render('Pencarian', [
      "query" => $querySearch,
      "hasil" => $produk
    ]);
  }
}
