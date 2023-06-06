<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use App\Models\User;
use App\Models\Produk;
use App\Models\RinciOrder;
use App\Models\KategoriGlobal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    $toko = Toko::count();
    $customer = User::where('level', 'customer')->count();
    $produk = Produk::count();
    $kategoriGlobal = KategoriGlobal::count();

    $tokos = Toko::paginate(5);
    $kategoriGlobals = KategoriGlobal::paginate(5);

    return Inertia::render('Admin', [
      "title" => "Admin Page",
      'toko' => $toko,
      'customer' => $customer,
      'produk' => $produk,
      'kategoriGlobal' => $kategoriGlobal,
      'tokos' => $tokos,
      'kategoriGlobals' => $kategoriGlobals,
    ]);
  }

  public function komisi()
  {
    $komisi = DB::table('tokos')
      ->join('rinci_orders', 'tokos.id', '=', 'rinci_orders.idToko')
      ->select('tokos.namaToko as namaToko', 'tokos.id', DB::raw('SUM(rinci_orders.biayaAdmin) as totalKomisi'), 'rinci_orders.statusKomisi')
      ->where(['rinci_orders.statusKomisi' => 'tunda', 'rinci_orders.statusOrder' => 'diterima'])
      ->groupBy('tokos.namaToko', 'tokos.id', 'rinci_orders.statusKomisi')
      ->get();


    return Inertia::render('KomisiToko/KomisiIndex', [
      'title' => 'Komisi',
      'komisi' => $komisi,
    ]);
  }

  public function komisiUpdate(Request $request)
  {
    // dd($request->all());
    $komisi = RinciOrder::where('idToko', $request->input('data.id'))->get();
    foreach ($komisi as $k) {
      $k->update(['statusKomisi' => $request->statusKomisi]);
    }
    return response()->json(['data' => 'Berhasil mengubah jadi lunas']);
  }
}
