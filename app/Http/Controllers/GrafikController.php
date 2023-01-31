<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GrafikController extends Controller
{
  public function index()
  {
    // $oneWeek = Order::select(DB::raw('date(tglJual) as date, sum(quantity) as quantity'))
    //   ->where('tglJual', '>=', Carbon::now()->subDays(7)) // hanya ambil data dari 7 hari yang lalu
    //   ->groupBy('date')
    //   ->get();

    // $twoWeek = Order::select(DB::raw('date(tglJual) as date, sum(quantity) as quantity'))
    //   ->where('tglJual', '>=', Carbon::now()->subWeeks(2)) // hanya ambil data dari 2 minggu yang lalu
    //   ->groupBy('date')
    //   ->get();

    $sales = DB::table('orders')
      ->select(DB::raw('DATE(tglOrder) as tglOrder, SUM(jumlah) as jumlah'))
      ->whereBetween('tglOrder', [Carbon::now()->subDays(7), Carbon::now()])
      ->groupBy(DB::raw('DATE(tglOrder)'))
      ->get();

    return response()->json(['sales' => $sales]);
  }
}
