<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
  // untuk toko
  public function pesananBaru()
  {
    return Inertia::render('PesananToko/PesananBaru', [
      'title' => 'Pesanan baru',
    ]);
  }

  public function dikirim()
  {
    return Inertia::render('PesananToko/Dikirim', [
      'title' => 'Pesanan dikirim',
    ]);
  }

  public function sampai()
  {
    return Inertia::render('PesananToko/Sampai', [
      'title' => 'Pesanan diterima',
    ]);
  }

  public function dibatalkan()
  {
    return Inertia::render('PesananToko/Dibatalkan', [
      'title' => 'Pesanan dibatalkan',
    ]);
  }

  // JSON DATA
  public function dataPesananBaru()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'diproses')
      ->select('orders.*', 'rinci_orders.*', 'rinci_orders.id as idRinciOrder', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diproses'])->get();
    return response()->json($rinciOrder);
  }

  public function dataDikirim()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'dikirim')
      ->select('orders.*', 'rinci_orders.*', 'rinci_orders.id as idRinciOrder', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dikirim'])->get();
    return response()->json($rinciOrder);
  }

  public function dataSampai()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'diterima')
      ->select('orders.*', 'rinci_orders.*', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // dd($rinciOrder);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'diterima'])->get();
    return response()->json($rinciOrder);
  }

  public function dataDibatalkan()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->first();
    // dd($toko);

    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->where('rinci_orders.idToko', $toko->id)
      ->where('rinci_orders.statusOrder', 'dibatalkan')
      ->select('orders.*', 'rinci_orders.*', 'rinci_orders.id as idRinciOrder', 'produks.namaProduk', 'hargas.*')
      ->limit(100)
      ->paginate(10);

    // $rinciOrder = RinciOrder::where(['idToko' => $toko->id, 'statusOrder' => 'dibatalkan'])->get();
    return response()->json($rinciOrder);
  }



  // untuk customer

  public function ubahDikirim(Request $request)
  {
    // dd($request->all());
    RinciOrder::where('id', $request->idRinciOrder)
      ->update(['statusOrder' => $request->statusOrder]);

    return response()->json(['data' => 'Berhasil mengubah status jadi dikirim']);
  }

  public function ubahSampai(Request $request)
  {
    RinciOrder::where('id', $request->idRinciOrder)
      ->update(['statusOrder' => $request->statusOrder]);

    return back()->with('message', 'Status berubah menjadi dikirim');
  }

  public function ubahDibatalkan(Request $request)
  {
    // dd($request->all());
    $request->validate(['alasanPembatalan' => 'required'], ['alasanPembatalan.required' => 'Alasan pembatalan harus diisi']);

    RinciOrder::where('id', $request->input('statusOrder.idRinciOrder'))
      ->update(['statusOrder' => 'dibatalkan', 'alasanPembatalan' => $request->alasanPembatalan]);
    // return redirect()->to('/toko/pesanan')->with('message', 'Order berhasil dibatalkan');
    return response()->json(['data' => 'Berhasil dibatalkan']);
  }
}
