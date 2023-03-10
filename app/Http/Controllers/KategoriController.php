<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\Toko;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $kategori = Kategori::latest()->paginate(10)->withQueryString();
    return Inertia::render('KategoriToko/Index', [
      'title' => 'Kategori',
      'kategori' => $kategori,
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('TokoAdminKategori/TokoAdminKategoriCreate', [
      'title' => 'Tambah Kategori',
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
    $request->validate(['namaKategori' => 'required|max:255']);

    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    Kategori::create([
      'namaKategori' => $request->namaKategori,
      'slug' => Str::slug($request->namaKategori),
      'idToko' => $toko->id,
    ]);

    return redirect()->to('/toko/kategori')->with('message', 'Berhasil di tambah');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Kategori  $kategori
   * @return \Illuminate\Http\Response
   */
  public function show(Kategori $kategori)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Kategori  $kategori
   * @return \Illuminate\Http\Response
   */
  public function edit(Kategori $kategori)
  {
    return Inertia::render('TokoAdminKategori/TokoAdminKategoriEdit', [
      'title' => 'Edit Kategori',
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Kategori  $kategori
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Kategori $kategori)
  {
    $request->validate([
      'namaKategori' => 'required|max:255',
    ]);
    $kategori = Kategori::where('id', $request->id)->first();

    $kategori->update([
      'namaKategori' => $request->namaKategori,
      'slug' => Str::slug($request->namaKategori, '-'),
      'idToko' => $kategori->idToko
    ]);
    return redirect()->to('/toko/kategori')->with('message', 'Kategori sudah berhasil diupdate');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Kategori  $kategori
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {
    // dd($request->all());
    Kategori::where('id', $request->id)->delete();
    return back()->with('message', 'Kategori toko berhasil dihapus');
  }
}
