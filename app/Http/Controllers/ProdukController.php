<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use App\Models\Kategori;
use App\Models\KategoriGlobal;
use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Inertia\Inertia;

class ProdukController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $produk = Produk::where('idToko', $toko->id)->paginate(10)->withQueryString();
    return Inertia::render('TokoProduk/Index', [
      'produk' => $produk,
      'title' => 'List Produk'
    ]);
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $kategori = Kategori::where('idToko', $toko->idToko)->select('id', 'namaKategori')->get();
    $kategoriGlobal = KategoriGlobal::select('id', 'namaKategoriGlobal')->get();
    return Inertia::render('TokoProduk/Create', [
      'title' => 'Tambah Produk',
      'kategori' => $kategori,
      'kategoriGlobal' => $kategoriGlobal,
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
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $request->validate(
      [
        'values.namaProduk' => 'required|max:225',
        'values.idKategori' => 'required',
        'values.idKategoriGlobal' => 'required',
        'values.satuan' => 'required',
        'values.deskripsi' => 'max:225',
        'values.hrgBeli' => 'required',
        'values.hrgJual' => 'required',
        'values.stokToko' => 'required',
        'values.stokGudang' => 'required',
        'values.stokGudang' => 'required',
        // 'image.url' => 'required|max:2048',
      ],
      [
        'values.namaProduk.required' => 'Nama produk harus diisi!',
        'values.idKategori.required' => 'Kategori Toko harus dipilih!',
        'values.idKategoriGlobal.required' => 'Kategori Global harus dipilih!',
        'values.satuan.required' => 'Satuan harus dipilih!',
        'values.deskripsi.required' => 'Deskripsi harus diisi!',
        'values.hrgBeli.required' => 'Harga Beli harus diisi',
        'values.hrgJual.required' => 'Harga Jual harus diisi',
        'values.stokToko.required' => 'Stok Toko harus diisi',
        'values.stokGudang.required' => 'Stok Gudang harus diisi',
        // 'image.url.required' => 'Gambar utama harus ada harus diisi',
      ]
    );

    $id = Produk::create([
      'namaProduk' => $request->input('values.namaProduk'),
      'slug' => Str::slug($request->input('values.namaProduk')),
      'idKategori' => $request->input('values.idKategori'),
      'idKategoriGlobal' => $request->input('values.idKategoriGlobal'),
      'satuan' => $request->input('values.satuan'),
      'deskripsi' => $request->input('values.satuan'),
      'hrgBeli' => $request->input('values.hrgBeli'),
      'hrgJual' => $request->input('values.hrgJual'),
      'stokToko' => $request->input('values.stokToko'),
      'stokGudang' => $request->input('values.stokGudang'),
      'terjual' => 0,
      'diskon' => $request->input('values.diskon') ?? 0,
      'tglAwalDiskon' => $request->input('values.tglAwalDiskon') ?? null,
      'tglAkhirDiskon' => $request->input('values.tglAkhirDiskon') ?? null,
      'imgName' => $request->input('image.public_id') ?? null,
      'imgUrl' => $request->input('image.url') ?? null,
      'idToko' => $toko->id,
    ]);

    if ($request->images) {
      $images = $request->input('images');
      foreach ($images as $key => $file) {
        Gambar::create([
          'img' => $request->input('images.public_id') ?? null,
          'url' => $request->input('images.url') ?? null,
          'idProduk' => $id,
        ]);
      }
    }

    return redirect()->to('/toko/produk')->with('message', 'Berhasil ditambah');
  }

  /**
   * Display the specified resource.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function show(Produk $produk, Request $request)
  {
    $produk = Produk::find($request->id);
    //
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function edit(Produk $produk, Request $request)
  {
    $kategori = Kategori::select('id', 'namaKategori')->get();
    $kategoriGlobal = KategoriGlobal::select('id', 'namaKategoriGlobal')->get();
    $produk = Produk::find($request->id);
    return Inertia::render('TokoProduk/Edit', [
      'title' => 'Edit Produk',
      'produk' => $produk,
      'kategori' => $kategori,
      'kategoriGlobal' => $kategoriGlobal,
    ]);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, Produk $produk, $id)
  {
    $produk = Produk::find($id);
    $request->validate(
      [
        'namaProduk' => 'required|max:225',
        'idKategori' => 'required',
        'idKategoriGlobal' => 'required',
        'idSatuan' => 'required',
        'deskripsi' => 'required',
        'hrgBeli' => 'required',
        'hrgJual' => 'required',
        'stok' => 'required',
        'imgName' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      ],
      [
        'namaProduk.required' => 'Nama produk harus diisi!',
        'idKategori.required' => 'Kategori Toko harus dipilih!',
        'idKategoriGlobal.required' => 'Kategori Global harus dipilih!',
        'idSatuan.required' => 'Satuan harus dipilih!',
        'deskripsi.required' => 'Deskripsi harus diisi!',
        'hrgBeli.required' => 'Harga Beli harus diisi',
        'hrgJual.required' => 'Harga Jual harus diisi',
        'stok.required' => 'Stok harus diisi',
      ]
    );

    $produk->update([
      'namaProduk' => $request->namaProduk,
      'slug' => Str::slug($request->namaProduk),
      'idKategori' => $request->idKategori,
      'idKategoriGlobal' => $request->idKategoriGlobal,
      'idSatuan' => $request->idSatuan,
      'deskripsi' => $request->deskripsi,
      'hrgBeli' => $request->hrgBeli,
      'hrgJual' => $request->hrgJual,
      'stokToko' => $request->stokToko,
      'stokGudang' => $request->stokGudang,
      'terjual' => $request->terjual,
      'diskon' => $request->diskon,
      'tglAwalDiskon' => $request->tglAwalDiskon,
      'tglAkhirDiskon' => $request->tglAkhirDiskon,
      'idToko' => $request->idToko,
    ]);

    if ($request->hasFile('imgName')) {
      $imgName = $produk->imgName;
      Cloudinary::destroy($imgName);

      $file = $request->file('imgName');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();

      $produk->update([
        'imgName' => $public_id,
        'imgUrl' => $url,
      ]);
    }

    if ($request->hasFile('images')) {
      $file = $request->file('images');
      $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
      $public_id = $image->getPublicId();
      $url = $image->getSecurePath();
      Gambar::create([
        'imgName' => $public_id,
        'imgUrl' => $url,
        'idToko' => auth()->user()->idToko,
      ]);
    }

    return redirect()->to('/list-produk')->with('message', 'Berhasil ditambah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function destroy(Produk $produk, Request $request)
  {
    $produk = Produk::find($request->id);
    $produk->delete();
    return back()->with('message', 'Produk berhasil dihapus');
    // $produk = Produk::find($id);
    // Cloudinary::destroy($produk->imgName);
    // $images = Gambar::where('idProduk', $id)->get();
    // foreach ($images as $key => $image) {
    //   Cloudinary::destroy($image->imgName);
    // }
    // $images->delete();
    // $produk->delete();
    // return back()->with('message', 'Produk berhasil dihapus');
  }
}
