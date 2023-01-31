<?php

namespace App\Http\Controllers;

use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminController extends Controller
{
  public function index()
  {
    return Inertia::render('Admin', [
      "title" => "Admin Page",
    ]);
  }
  public function toko()
  {
    $toko = Toko::all();
    return Inertia::render('AdminToko/AdminToko', [
      "tokos" => $toko,
      "title" => "Admin Toko",
    ]);
  }
  public function kategori()
  {
    return Inertia::render('AdminKategori', [
      "title" => "Admin Kategori",
    ]);
  }
  public function setting()
  {
    return Inertia::render('AdminSetting', [
      "title" => "Admin Setting",
    ]);
  }
  public function create()
  {
    return Inertia::render('AdminToko/TambahToko', [
      "title" => "Admin Tambah Toko",
    ]);
  }
  public function store(Request $request)
  {
    Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $request->validate(
      [
        'namaToko' => 'required|max:225',
        'email' => 'required|unique:users,email',
        'password' => 'required',
        'namaPengelola' => 'required',
        'noHp' => 'required',
        'alamat' => 'max:225',
      ],
    );

    Toko::create([
      'namaToko' => $request->input('namaToko'),
      'slug' => Str::slug($request->input('namaToko')),
      'email' => $request->input('email'),
      'password' => $request->input('password'),
      'namaPengelola' => $request->input('namaPengelola'),
      'noHp' => $request->input('noHp'),
      'alamat' => $request->input('alamat'),
      'idUser' => auth()->user()->id,
    ]);
    return redirect()->to('/admin/toko')->with('message', 'Berhasil ditambah');
  }
}
