<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use Illuminate\Http\Request;
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
    public function show(Request $request)
    {
        $toko = Toko::where('id', $request->id)->first();
        $order = Order::where('idToko', $request->id)->get();

        return Inertia::render('LaporanSuperAdmin/RincianLaporan', [
            'title' => 'Laporan Keuangan',
            'rincianToko' => $toko,
            'orders' => $order,
        ]);
    }

    public function today(Request $request)
    {
        //validasi
        $request->validate(['date' => 'required'], ['date.required' => 'Tanggal harus dipilih']);


        $toko = Toko::where('id', $request->id)->first();
        $date = date('Y-m-d', strtotime($request->date)); //mengubah format tanggalnya

        $laporan = Order::whereDate('tglOrder', $date) //Select dari order
            ->where('idToko', $toko->id)
            ->get();

        $omset = 0;
        foreach ($laporan as $key => $value) {
            $omset += $value['hrgJual'] * $value['jumlah'];
        }

        return Inertia::render('LaporanSuperAdmin/LaporanHarian', [
            'title' => 'Laporan Harian',
            'laporan' => $laporan,
            'omset' => $omset,
            'date' => $date,
        ]);
    }

    public function month(Request $request)
    {
        $request->validate(['month' => 'required'], ['month.required' => 'Bulan harus pilih']);
        $toko = Toko::where('id', $request->id)->first();

        $date = $request->month;
        $month = date('m', strtotime($date));
        $year = date('Y', strtotime($date));

        $laporan = Order::whereMonth('tglOrder', $month)
            ->whereYear('tglOrder', $year)
            ->where('idToko', $toko->id)
            ->get();

        // dd($laporan);

        $omset = 0;
        foreach ($laporan as $key => $value) {
            $omset += $value['hrgJual'] * $value['jumlah'];
        }

        return Inertia::render('LaporanSuperAdmin/LaporanBulanan', [
            'title' => 'Laporan Harian',
            'laporan' => $laporan,
            'date' => $date,
            'omset' => $omset,
        ]);
    }

    public function year(Request $request)
    {
        $request->validate(['year' => 'required'], ['year.required' => 'Tahun harus dipilih']);

        $toko = Toko::where('id', $request->id)->first();

        $date = $request->year;
        $laporan = Order::whereYear('tglOrder', $date)
            ->where('idToko', $toko->id)
            ->get();

        $omset = 0;
        foreach ($laporan as $key => $value) {
            $omset += $value['hrgJual'] * $value['jumlah'];
        }

        return Inertia::render('LaporanSuperAdmin/LaporanTahunan', [
            'title' => 'Laporan Harian',
            'laporan' => $laporan,
            'date' => $date,
            'omset' => $omset,
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
