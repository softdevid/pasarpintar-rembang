<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
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
    return Inertia::render('User/UserOrders', [
      "title" => "Pesanan User",
    ]);
  }

  public function getOrders()
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
        return $q->where('idUser', auth()->id());
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
                'statusOrder' => $rinci->statusOrder,
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

    return response()->json($rinciOrder);
  }

  public function konfirmasi(Request $request)
  {
    $konfirmasi = RinciOrder::whereIn('id', explode(',', $request->rinciId))->get();
    foreach ($konfirmasi as $rinci) {
      $rinci->statusOrder = "selesai";
      $rinci->save();
    }

    return $this->getOrders();
  }

  public function orderDetail(Request $request)
  {

    $order = Order::whereHas('rinciOrder', function ($q) use ($request) {
      $q->whereIn('id', explode(',', $request->rinciId));
    })->get();

    $rinciOrder = RinciOrder::with(
      [
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
    )->whereIn('id', explode(',', $request->rinciId))
      ->get()
      ->sortByDesc(function ($item) {
        return $item->id;
      })->groupBy('toko.namaToko')->map(function ($namaToko) {
        return $namaToko->map(function ($rinci) {
          return [
            'id' => $rinci->id,
            'idOrder' => $rinci->order->id,
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

    return Inertia::render('User/UserOrderDetail', [
      "title" => "Detail Pesanan User",
      "order" => $order[0],
      "rinciOrder" => $rinciOrder
    ]);
  }
}
