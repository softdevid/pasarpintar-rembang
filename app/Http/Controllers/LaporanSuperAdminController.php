<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LaporanSuperAdminController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $laporanToko = Toko::all();
    return Inertia::render("LaporanSuperAdmin/Laporan", [
      'title' => 'Data Laporan',
      'tokos' => $laporanToko
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    //
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    //
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show(Toko $laporan)
  {
    $toko = Toko::where('id', $laporan->id)->first();
    // $rincianOrder = RinciOrder::where('id', $toko->id)->latest()->paginate(10);
    $rinciOrder = DB::table('rinci_orders')
      ->join('orders', 'orders.id', '=', 'rinci_orders.idOrder')
      ->join('tokos', 'rinci_orders.idToko', '=', 'tokos.id')
      ->select('rinci_orders.*', 'orders.*', 'rinci_orders.idToko as idTOko', 'orders.id as idOrder', 'rinci_orders.id as idRinciOrder')
      ->where(['rinci_orders.idToko' => $toko->id, 'rinci_orders.statusOrder' => 'diterima'])
      ->orderBy('rinci_orders.created_at', 'desc')
      ->limit(100)
      ->get();

    return Inertia::render('LaporanSuperAdmin/RincianLaporan', [
      'title' => 'Laporan Keuangan',
      'rinciOrder' => $rinciOrder,
      'toko' => $toko,
    ]);
  }

  public function today(Request $request, Toko $toko)
  {
    //validasi
    $request->validate(['date' => 'required'], ['date.required' => 'Tanggal harus dipilih']);
    $date = date('Y-m-d', strtotime($request->date)); //mengubah format tanggalnya

    $laporan = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('tokos', 'rinci_orders.idToko', '=', 'tokos.id')
      ->whereDate('rinci_orders.tglOrder', $date)
      ->where(['rinci_orders.idToko' => $toko->id, 'rinci_orders.statusOrder' => 'diterima'])
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', DB::raw('DATE_FORMAT(rinci_orders.updated_at, "%H:%i") as tglOrder'))
      ->get();

    return Inertia::render('LaporanSuperAdmin/LaporanHarian', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan ?? '',
      'date' => $date ?? '',
      'toko' => Toko::where('id', $toko->id)->first(),
      'omset' => $laporan->sum('total'),
    ]);
  }

  public function month(Request $request, Toko $toko)
  {
    $request->validate(['month' => 'required'], ['month.required' => 'Bulan harus pilih']);

    $date = $request->month;
    $month = date('m', strtotime($date));
    $year = date('Y', strtotime($date));

    $laporan = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('tokos', 'rinci_orders.idToko', '=', 'tokos.id')
      ->whereMonth('rinci_orders.tglOrder', $month)
      ->whereYear('rinci_orders.tglOrder', $year)
      ->where(['rinci_orders.idToko' => $toko->id, 'rinci_orders.statusOrder' => 'diterima'])
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', DB::raw('DATE_FORMAT(rinci_orders.tglOrder, "%d-%m-%Y") as tglOrder'))
      ->get();

    return Inertia::render('LaporanSuperAdmin/LaporanBulanan', [
      'title' => 'Laporan Harian',
      'laporan' => $laporan,
      'date' => $date,
      'toko' => Toko::where('id', $toko->id)->first(),
      'omset' => $laporan->sum('total'),
    ]);
  }

  public function year(Request $request, Toko $toko)
  {

    $request->validate(['year' => 'required'], ['year.required' => 'Tahun harus dipilih']);
    $date = $request->year;

    $laporan = DB::table('rinci_orders')
      ->join('orders', 'rinci_orders.idOrder', '=', 'orders.id')
      ->join('produks', 'rinci_orders.idProduk', '=', 'produks.id')
      ->join('hargas', 'rinci_orders.idHarga', '=', 'hargas.id')
      ->join('tokos', 'rinci_orders.idToko', '=', 'tokos.id')
      ->whereYear('rinci_orders.tglOrder', $date)
      ->where(['rinci_orders.idToko' => $toko->id, 'rinci_orders.statusOrder' => 'diterima'])
      ->select('produks.namaProduk', 'hargas.hrgBeli', 'rinci_orders.*', DB::raw('DATE_FORMAT(rinci_orders.tglOrder, "%M") as tglOrder'))
      ->get();

    return Inertia::render('LaporanSuperAdmin/LaporanTahunan', [
      'title' => 'Laporan Tahunan',
      'laporan' => $laporan,
      'date' => $date,
      'omset' => $laporan->sum('total'),
      'toko' => Toko::where('id', $toko->id)->first(),
    ]);
  }


  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
