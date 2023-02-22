<?php

namespace App\Http\Controllers;

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
    $orders = RinciOrder::with(
      [
        'toko' => function ($q) {
          $q->select('id', 'namaToko', 'slug');
        },
        'produk' => function ($q) {
          $q->select('id', 'namaProduk', 'slug');
        },
        'harga' => function ($q) {
          $q->select('id', 'jenisHarga', 'namaHarga', 'hrgJual', 'imgName', 'imgUrl', 'diskon');
        }
      ]
    )
      ->where('idUser', auth()->id())
      ->get()
      ->sortByDesc(function ($item) {
        return $item->id;
      })
      ->groupBy('statusOrder')->map(function ($ordersByStatus) {
        return $ordersByStatus->groupBy('toko.namaToko')->map(function ($ordersByToko) {
          return $ordersByToko->map(function ($order) {
            return [
              'id' => $order->id,
              'idToko' => $order->idToko,
              'idProduk' => $order->idProduk,
              'idHarga' => $order->idHarga,
              'toko' => [
                'namaToko' => $order->toko->namaToko,
                'slugToko' => $order->toko->slug,
              ],
              'produk' => [
                'namaProduk' => $order->produk->namaProduk,
                'slugProduk' => $order->produk->slug,
              ],
              'harga' => [
                'namaHarga' => $order->harga->namaHarga,
                'hrgJual' => $order->harga->hrgJual,
                'diskon' => $order->harga->diskon ?? 0,
                'imgName' => $order->harga->imgName,
                'imgUrl' => $order->harga->imgUrl,
              ],
              'qty' => $order->totalItem,
              'tglOrder' => $order->tglOrder,
              'metodeBayar' => $order->metodeBayar,
            ];
          });
        });
      })
      ->toArray();

    return Inertia::render('User/UserOrders', [
      "title" => "Pesanan User",
      "orders" => $orders,
    ]);
  }
}
