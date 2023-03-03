<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Support\Facades\DB;

class DiskonController extends Controller
{
  public function index()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    // $no =  !0;
    $diskon = DB::table('hargas')
      ->join('produks', 'hargas.idProduk', '=', 'produks.id')
      ->select('hargas.*', 'produks.namaProduk')
      ->where('hargas.diskon', '>', 0)
      ->where('produks.idToko', $toko->id)
      ->paginate(10);

    // dd($diskon);

    return Inertia::render('DiskonToko/Index', [
      'title' => 'Data Diskon',
      'diskon' => $diskon,
    ]);
  }
}
