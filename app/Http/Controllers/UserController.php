<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{

  public function profile()
  {
    return Inertia::render('User/UserProfile');
  }

  public function orders()
  {

    $rinciOrder = RinciOrder::with(
      [
        'order' => function ($q) {
          $q->select('id', 'namaCustomer', 'email', 'noHp', 'alamatPengiriman', 'noFaktur', 'tglOrder', 'statusBayar', 'metodeBayar');
        },
        'produk' => function ($q) {
          $q->select('id', 'namaProduk', 'slug');
        },
        'produk.toko' => function ($q) {
          $q->select('id', 'namaToko', 'slug');
        },
        'harga' => function ($q) {
          $q->select('id', 'jenisHarga', 'namaHarga', 'hrgJual', 'imgName', 'imgUrl', 'diskon');
        }
      ]
    )
      ->whereHas('order', function ($q) {
        return $q->where('idUser', 2);
      })
      ->get()
      ->sortByDesc(function ($item) {
        return $item->id;
      })->groupBy('statusOrder')->map(function ($statusOrder) {
        return $statusOrder->groupBy('idOrder')->map(function ($idOrder) {
          return $idOrder->groupBy('toko.namaToko')->map(function ($toko) {
            return $toko->map(function ($rinci) {
              return [
                'id' => $rinci->id,
                'idOrder' => $rinci->order->id,
                'order' => [
                  'namaCustomer' => $rinci->order->namaCustomer,
                  'email' => $rinci->order->email,
                  'noHp' => $rinci->order->noHp,
                  'alamatPengiriman' => $rinci->order->alamatPengiriman,
                  'noFaktur' => $rinci->order->noFaktur,
                  'tglOrder' => $rinci->order->tglOrder,
                  'statusBayar' => $rinci->order->statusBayar,
                  'metodeBayar' => $rinci->order->metodeBayar,
                ],
                'toko' => [
                  'namaToko' => $rinci->toko->namaToko,
                  'slug' => $rinci->toko->slug,
                ],
                'produk' => [
                  'namaProduk' => $rinci->produk->namaProduk,
                  'slug' => $rinci->produk->slug,
                ],
                'harga' => [
                  'idHarga' => $rinci->idHarga,
                  'namaHarga' => $rinci->harga->namaHarga,
                  'hrgJual' => $rinci->hrgJual,
                  'hrgDiskon' => $rinci->hrgDiskon,
                  'imgName' => $rinci->harga->imgName,
                  'imgUrl' => $rinci->harga->imgUrl,
                ],
                'qty' => $rinci->qty
              ];
            });
          });
        });
      });

    // return response()->json($rinciOrder);
    return Inertia::render('User/UserOrders', [
      "title" => "Pesanan User",
      "orders" => $rinciOrder,
    ]);
  }
}
