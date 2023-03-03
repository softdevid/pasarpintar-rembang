<?php

namespace App\Http\Controllers;

use App\Models\Harga;
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

    $diskon = DB::table('hargas')
      ->join('produks', 'hargas.idProduk', '=', 'produks.id')
      ->select('hargas.*', 'produks.namaProduk', 'produks.imgUrl as imgUtama')
      ->where('hargas.diskon', '>', 0)
      ->where('produks.idToko', $toko->id)
      ->paginate(10);


    return Inertia::render('DiskonToko/Index', [
      'title' => 'Data Diskon',
      'diskon' => $diskon,
    ]);
  }

  public function update(Request $request)
  {
    // dd($request->all());
    $data = $request->validate([
      'diskon' => 'required',
      'tglAwalDiskon' => 'required',
      'tglAkhirDiskon' => 'required',
    ]);

    $hargas = Harga::where('id', $request->id)->first();
    $hargas->update($data);
    return back()->with('message', 'Diskon berhasil diubah');
  }
}
