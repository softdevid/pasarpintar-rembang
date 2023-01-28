<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TokoAdminController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $toko = Toko::latest()->paginate(10)->withQueryString();
    return Inertia::render('AdminToko/AdminToko', [
      'title' => 'Data Toko',
      'toko' => $toko,
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
      'title' => 'Tambah TOko',
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
    $user = User::where('email', $request->email)->select('id', 'email')->first();

    $request->validate([
      'namaPengelola' => 'required',
      'namaToko' => 'required',
      'email' => 'required|unique:tokos,email',
      'password' => 'required',
      'noHp' => 'required',
      'alamat' => 'required',
    ]);

    if ($user->email == null) {
      DB::transaction(function (Request $request) {
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

        return back()->with('message', 'Berhasil menambahkan toko');
      });
    } else {
      Toko::create([
        'idUser' => $user->id,
        'namaToko' => $request->namaToko,
        'slug' => Str::slug($request->namaToko),
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'namaPengelola' => $request->namaPengelola,
        'noHp' => $request->noHp,
        'alamat' => $request->alamat,
      ]);
    }
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    //
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
