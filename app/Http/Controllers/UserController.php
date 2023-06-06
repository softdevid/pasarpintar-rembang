<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\RinciOrder;
use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{

  public function profile()
  {
    return Inertia::render('User/UserProfile', [
      "title" => "User Profil",
      "user" => auth()->user(),
    ]);
  }

  public function profileUpdate(Request $request, $id)
  {
    // dd($request->all());
    $data = User::where("id", $id)->first();
    // dd($data);
    $toko = Toko::where('idUser', $id)->first();

    if ($request->email != $data->email) {
      $request->validate([
        'email' => 'required|email|unique:users,email|unique:tokos,email',
      ]);
    }

    if ($request->password != '') {
      $pass = Hash::make($request->password);
      $request->validate([
        'password' => 'required|min:8|max:255',
      ]);
    }

    $request->validate([
      'name' => 'required|max:255',
      'noHp' => 'required',
      'alamat' => 'required'
    ]);

    $data->update([
      "name" => $request->name,
      "email" => $request->email,
      "password" => $pass ?? $data->password,
      "no_hp" => $request->noHp,
      "alamat" => $request->alamat
    ]);

    if ($toko) {
      $toko->update([
        'namaPengelola' => $request->name,
        'email' => $request->email,
        'password' => $data->password,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat
      ]);
    }

    return response()->json(["data" => "Berhasil mengupdate profil!"]);
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
      $rinci->statusOrder = "diterima";
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
