<?php

namespace App\Http\Controllers;

use App\Broadcasting\Chat;
use App\Events\NewMessageEvent;
use App\Events\TokoEvent;
use App\Models\Harga;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Support\Facades\DB;
use Pusher\Pusher;

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

    // Harga::where('id', $request->id)
    //   ->update($data);

    // $hargas = Harga::where('id', $request->id)->get();
    // dd($request->all());
    Harga::where('id', $request->idHarga)
      ->update($data);
    // foreach ($request->all() as $value) {
    //   Harga::createOrUpdate(
    //     ['id' => $value['id']],
    //     [
    //       'diskon' => $value['diskon'] ?? 0,
    //       'tglAwalDiskon' => $value['tglAwalDiskon'] ?? null,
    //       'tglAkhirDiskon' => $value['tglAkhirDiskon'] ?? null,
    //     ]
    //   );
    // }

    return response()->json(['data' => 'Berhasil mengubah diskon']);
    // return back()->with('message', 'Diskon berhasil diubah');
  }
}
