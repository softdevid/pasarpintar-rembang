<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Rules\PhoneNumber;
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
    $request->validate([
      'namaToko' => 'required',
      'namaPengelola' => 'required',
      'email' => 'required|email|unique:tokos,email|unique:users,email',
      'password' => 'required|min:8',
      'noHp' => ['required', 'string', new PhoneNumber],
      'alamat' => 'required|min:10',
    ]);

    DB::transaction(function () use ($request) {
      $idUser = DB::table('users')->insert([
        'name' => $request->namaPengelola,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'no_hp' => $request->noHp,
        'alamat' => $request->alamat,
        'level' => 'toko',
      ]);
      DB::table('tokos')->insert([
        'idUser' => $idUser,
        'namaToko' => $request->namaToko,
        'slug' => Str::slug($request->namaToko),
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'namaPengelola' => $request->namaPengelola,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat,
      ]);
    });
    return redirect()->to('/admin/toko')->with('message', 'Berhasil menambahkan toko');
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
  public function edit(Toko $toko, Request $request)
  {
    $toko = Toko::find($request->id);
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
    $toko = Toko::find($request->id);
    $user = User::where('email', $toko->email)->first();
    if ($request->email !== $toko->email && $request->email !== $user->email) {
      $request->validate(['email' => 'required|unique:tokos,email|unique:users,email']);
    };
    $request->validate([
      'namaToko' => 'required',
      'namaPengelola' => 'required',
      // 'email' => 'required|email|unique:tokos,email',
      'password' => 'min:8',
      'noHp' => ['required', 'string', new PhoneNumber],
      'alamat' => 'required|min:10',
    ]);
    DB::transaction(function () use ($request, $toko, $user) {
      $toko->update([
        'namaToko' => $request->namaToko,
        'slug' => Str::slug($request->namaToko),
        'namaPengelola' => $request->namaPengelola,
        'email' => $request->email,
        'password' => Hash::make($request->password) ?? $toko->password,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat,
      ]);

      $user->update([
        'name' => $request->namaPengelola,
        'email' => $request->email,
        'password' => Hash::make($request->password) ?? $toko->password,
        'no_hp' => $request->noHp,
        'alamat' => $request->alamat,
        'level' => 'toko',
      ]);
    });
    return redirect()->to('/admin/toko')->with('message', 'Toko berhasil di ubah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Toko  $toko
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {

    $toko = Toko::where('id', $request->id)->first();
    User::where('email', $toko->email)->delete();
    $toko->delete();

    return back()->with('message', 'Toko berhasil di hapus');
  }

  //data toko json
  public function dataToko()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->first();
    return response()->json($toko);
  }
}
