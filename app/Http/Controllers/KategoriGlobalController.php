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
    $kategori = KategoriGlobal::all();
    return Inertia::render('AdminKategoriGlobal/AdminKategori', [
      "title" => "Kategori Global",
      "kategori_globals" => $kategori
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

    return response()->json(['data' => 'Berhasil menambah kategori Global']);
    // return redirect()->to('/admin/kategori')->with('message', 'Kategori global berhasil di tambah!');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategori
   * @return \Illuminate\Http\Response
   */
  public function show(KategoriGlobal $kategori)
  {
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\KategoriGlobal  $kategori
   * @return \Illuminate\Http\Response
   */
  public function edit(KategoriGlobal $kategori)
  {
    // $kategori = KategoriGlobal::find($id);
    $kategori = KategoriGlobal::find($kategori->id);
    return Inertia::render('AdminKategoriGlobal/Ubah', [
      'title' => 'Admin Ubah Kategori Global',
      'kategori_globals' => $kategori,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\KategoriGlobal  $kategori
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, KategoriGlobal $kategori)
  {
    $kategori = KategoriGlobal::find($kategori->id);

    $request->validate([
      'namaKategoriGlobal' => 'required',
    ]);

    $kategori->update([
      'namaKategoriGlobal' => $request->namaKategoriGlobal,
      'slug' => Str::slug($request->namaKategoriGlobal),
    ]);
    return response()->json(['data' => 'Berhasil mengubah kategori Global']);
    // return redirect()->to('/admin/kategori')->with('message', 'Kategori Global berhasil diubah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\KategoriGlobal  $kategori
   * @return \Illuminate\Http\Response
   */
  public function destroy(KategoriGlobal $kategori)
  {
    $kategori = KategoriGlobal::where('id', $kategori->id)
      ->delete();

    return response()->json(['data' => 'Berhasil menghapus kategori global']);
    // return back()->with('message', 'Toko berhasil di hapus');
  }
}
