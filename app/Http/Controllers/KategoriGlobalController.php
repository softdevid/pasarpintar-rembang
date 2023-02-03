<?php

namespace App\Http\Controllers;

use App\Models\Kategori;
use App\Models\KategoriGlobal;
use Illuminate\Support\Str;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KategoriGlobalController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $kategoriGlobal = KategoriGlobal::latest()->paginate(10)->withQueryString();
    $kategoriGlobal = KategoriGlobal::all();
    return Inertia::render('AdminKategoriGlobal/AdminKategori', [
      "title" => "Admin Kategori Global",
      "kategori_globals" => $kategoriGlobal
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return Inertia::render('AdminKategoriGlobal/Tambah', [
      "title" => "Admin Tambah Kategori Global",
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
    $data = $request->validate([
      'namaKategoriGlobal' => 'required',
    ]);
    $data['slug'] = Str::slug($request->namaKategoriGlobal);

    KategoriGlobal::create($data);
    return redirect()->to('/admin/kategori')->with('message', 'Kategori global berhasil di tambah!');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function show(KategoriGlobal $kategoriGlobal)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function edit(KategoriGlobal $kategoriGlobal, Request $request)
  {
    // $kategoriGlobal = KategoriGlobal::find($id);
    $kategoriGlobal = KategoriGlobal::find($request->id);
    return Inertia::render('AdminKategoriGlobal/Ubah', [
      'title' => 'Admin Ubah Kategori Global',
      'kategori_globals' => $kategoriGlobal,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, KategoriGlobal $kategoriGlobal)
  {
    $kategoriGlobal = KategoriGlobal::find($request->id);

    $request->validate([
      'namaKategoriGlobal' => 'required',
    ]);

    $kategoriGlobal->update([
      'namaKategoriGlobal' => $request->namaKategoriGlobal,
      'slug' => Str::slug($request->namaKategoriGlobal),
    ]);
    return redirect()->to('/admin/kategori')->with('message', 'Kategori Global berhasil diubah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\KategoriGlobal  $kategoriGlobal
   * @return \Illuminate\Http\Response
   */
  public function destroy(Request $request)
  {
    $kategoriGlobal = KategoriGlobal::where('id', $request->id)->first();
    $kategoriGlobal->delete();

    return back()->with('message', 'Toko berhasil di hapus');
  }
}
