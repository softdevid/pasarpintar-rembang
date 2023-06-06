<?php

namespace App\Http\Controllers;

use App\Models\Harga;
use App\Models\Kategori;
use App\Models\Order;
use App\Models\Produk;
use App\Models\RinciOrder;
use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Rules\PhoneNumber;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TokoController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $toko = Toko::latest()->paginate(10)->withQueryString();
    $toko = Toko::all();
    return Inertia::render('AdminToko/AdminToko', [
      "tokos" => $toko,
      "title" => "Admin Toko",
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('AdminToko/TambahToko', [
      "title" => "Admin Tambah Toko",
    ]);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    // dd($request->all());
    $request->validate([
      'namaToko' => 'required|max:255',
      'namaPengelola' => 'required|max:255',
      'email' => 'required|email|unique:tokos,email',
      'password' => 'required|min:8',
      'noHp' => ['required', 'string'],
      'alamat' => 'required|min:10',
      'statusToko' => 'required',
    ]);

    $user = User::where('email', $request->email)->first();

    DB::transaction(function () use ($request, $user) {
      if ($user != null) {
        $user->update([
          'name' => $request->namaPengelola,
          'email' => $request->email,
          'password' => Hash::make($request->password),
          'no_hp' => $request->noHp,
          'alamat' => $request->alamat,
          'level' => 'toko',
        ]);
      }

      if ($user === null) {
        $user = User::create([
          'name' => $request->namaPengelola,
          'email' => $request->email,
          'password' => Hash::make($request->password),
          'no_hp' => $request->noHp,
          'alamat' => $request->alamat,
          'level' => 'toko',
        ]);
      }

      Toko::create([
        'idUser' => $user->id,
        'namaToko' => $request->namaToko,
        'slug' => Str::slug($request->namaToko),
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'namaPengelola' => $request->namaPengelola,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat,
        'statusToko' => $request->statusToko,
      ]);
    });
    // return redirect()->to('/admin/toko')->with('message', 'Berhasil menambahkan toko');
    return response()->json(['data' => 'Berhasil menambah akun toko']);
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function show(Toko $toko, Request $request)
  {
    $toko = Toko::find($request->id);
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function edit(Toko $toko)
  {
    $toko = Toko::find($toko->id);
    return Inertia::render('AdminToko/UbahToko', [
      'title' => 'Admin Ubah Toko',
      'tokos' => $toko,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Toko $toko)
  {
    // dd($request->all());

    $toko = Toko::find($toko->id);
    $user = User::where('email', $toko->email)->first();
    if ($request->email !== $toko->email && $request->email !== $user->email) {
      $request->validate(['email' => 'required|unique:tokos,email']);
    };

    if ($request->password) {
      $pass = Hash::make($request->password);
    } else {
      $pass = $user->password;
    }

    $request->validate([
      'namaToko' => 'required',
      'namaPengelola' => 'required',
      'password' => 'min:8',
      'noHp' => ['required', 'string'],
      'alamat' => 'required|min:10',
      'statusToko' => 'required'
    ]);

    DB::transaction(function () use ($request, $toko, $user, $pass) {
      $toko->update([
        'namaToko' => $request->namaToko,
        'slug' => Str::slug($request->namaToko),
        'namaPengelola' => $request->namaPengelola,
        'email' => $request->email,
        'password' => $pass,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat,
        'statusToko' => $request->statusToko,
      ]);

      $user->update([
        'name' => $request->namaPengelola,
        'email' => $request->email,
        'password' => $pass,
        'no_hp' => $request->noHp,
        'alamat' => $request->alamat,
        'level' => 'toko',
      ]);
    });

    return response()->json(['data' => 'Berhasil mengubah toko']);
    // return redirect()->to('/admin/toko')->with('message', 'Toko berhasil di ubah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function destroy(Toko $toko)
  {

    $toko = Toko::where('id', $toko->id)->first();
    $user = User::where('email', $toko->email)->first();
    $produks = Produk::where('idToko', $toko->id)->get();

    foreach ($produks as $produk) {
      $hargas = Harga::where('idProduk', $produk->id)->get();
      foreach ($hargas as $harga) {
        if ($harga->imgName != null) {
          Cloudinary::destroy($harga->imgName);
        }
        $harga->delete();
      }
      $produk->delete();
    }

    $orders = Order::where('idUser', $user->id)->get();
    foreach ($orders as $order) {
      $rinci = RinciOrder::where('idOrder', $order->id)->get();
      foreach ($rinci as $r) {
        $r->delete();
      }
      $order->delete();
    }

    $kategori = Kategori::where('idToko', $toko->id)->get();
    foreach ($kategori as $k) {
      $k->delete();
    }

    $user->delete();
    $toko->delete();


    return response()->json(['data' => 'Berhasil menghapus toko']);
  }

  //data toko json
  public function dataToko()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->first();
    return response()->json($toko);
  }
}
