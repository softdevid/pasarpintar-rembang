<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use App\Models\GambarSementara;
use App\Models\Harga;
use App\Models\Kategori;
use App\Models\KategoriGlobal;
use App\Models\Produk;
use App\Models\Toko;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Validator;
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
    // $produk = Produk::latest()->paginate(10)->get();
    return Inertia::render('TokoProduk/Index', [
      // 'produk' => $produk,
      'title' => 'List Produk',
      // 'produk' => $produk,
    ]);
  }

  public function dataProduk()
  {
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $produk = Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko', 'namaToko');
    }, 'hargas' => function ($q) {
      $q->select('idProduk', 'hrgJual', 'hrgBeli', 'stokGudang', 'stokToko', 'namaHarga', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon')->orderBy('hrgJual', 'asc');
    }])->select(
      'produks.*',
    )->orderBy('terjual', 'desc')->limit(100)
      ->where('idToko', $toko->id)
      ->paginate(5);
    // dd($data);
    return response()->json($produk);
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
    $images = GambarSementara::where('idUser', auth()->user()->id)->where('kategoriGambar', 'lainnya')->get();
    $image = GambarSementara::where('idUser', auth()->user()->id)->where('kategoriGambar', 'utama')->get();
    return Inertia::render('TokoProduk/Create2', [
      'title' => 'Tambah Produk',
      'kategori' => $kategori,
      'kategoriGlobal' => $kategoriGlobal,
      'images' => $images,
      'image' => $image
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
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    // $validator = Validator::make($request->all(), [
    //   'forms.namaHarga' => 'required|max:255',
    //   'forms.hrgBeli' => 'required|numeric|min:0',
    //   'forms.hrgJual' => 'required|numeric|min:0',
    //   'forms.stokGudang' => 'required|numeric|min:0',
    //   'forms.stokToko' => 'required|numeric|min:0',
    // ]);

    // if ($validator->fails()) {
    //   return Redirect::back()->withErrors($validator)->withInput();
    // }

    // $request->validate([
    //   'values.namaProduk' => 'required|max:255',
    //   'values.idKategori' => 'required',
    //   'values.idKategoriGlobal' => 'required',
    // ]);

    // $request->validate([
    //   'forms.*.namaHarga' => 'required|max:255',
    //   'forms.*.hrgBeli' => 'required|numeric|min:0',
    //   'forms.*.hrgJual' => 'required|numeric|min:0',
    //   'forms.*.stokGudang' => 'required|numeric|min:0',
    //   'forms.*.stokToko' => 'required|numeric|min:0',
    // ]);

    // dd($request->all());
    $image = GambarSementara::where(['idUser' => auth()->user()->id, 'kategoriGambar' => 'utama'])->first();
    $produk = Produk::create([
      'namaProduk' => $request->input('values.namaProduk'),
      'slug' => Str::slug($request->input('values.namaProduk')),
      'idKategori' => $request->input('values.idKategori'),
      'idKategoriGlobal' => $request->input('values.idKategoriGlobal'),
      'deskripsi' => $request->input('values.satuan'),
      'jenisHarga' => $request->input('values.jenisHarga'),
      'terjual' => 0,
      'imgName' => $image->public_id,
      'imgUrl' => $image->url,
      'idToko' => $toko->id,
    ]);
    // dd($id);
    foreach ($request->input('forms') as $value) {
      Harga::create([
        'idProduk' => $produk->id,
        'jenisHarga' => $request->input('values.jenisHarga') ?? '',
        'namaHarga' => $value['namaHarga'] ?? '',
        'hrgJual' => $value['hrgJual'],
        'hrgBeli' => $value['hrgBeli'],
        'stokToko' => $value['stokToko'],
        'stokGudang' => $value['stokGudang'],
        'diskon' => $value['diskon'] ?? '0',
        'tglAwalDiskon' => $value['tglAwalDiskon'] ?? null,
        'tglAkhirDiskon' => $value['tglAkhirDiskon'] ?? null,
        'imgName' => $value['public_id'] ?? null,
        'imgUrl' => $value['url'] ?? null,
      ]);
    }

    return redirect()->to('/toko/produk')->with('message', 'Berhasil ditambah');
    // return back()->with('message', 'Berhasil di tambah');
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
  public function edit(Produk $produk, Request $request, $id)
  {
    $kategori = Kategori::select('id', 'namaKategori')->get();
    $kategoriGlobal = KategoriGlobal::select('id', 'namaKategoriGlobal')->get();
    // $produk = Produk::find($id);

    $produk = Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko', 'namaToko');
    }, 'hargas' => function ($q) {
      $q->select('hargas.*')->orderBy('hrgJual', 'asc');
    }])->select(
      'produks.*',
    )->where('id', $id)
      ->first();

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

    // if ($request->hasFile('images')) {
    //   $file = $request->file('images');
    //   $image = Cloudinary::upload($file->getRealPath(), ['folder' => 'products']);
    //   $public_id = $image->getPublicId();
    //   $url = $image->getSecurePath();
    //   Gambar::create([
    //     'imgName' => $public_id,
    //     'imgUrl' => $url,
    //     'idToko' => auth()->user()->idToko,
    //   ]);
    // }

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

  public function deleteImage(Request $request)
  {
    if ($request->publicId) {
      Cloudinary::destroy($request->publicId);
      GambarSementara::where('public_id', $request->publicId)->delete();
      return back()->with('message', 'Berhasil dihapus');
    } else {
      return back()->with('message', 'Berhasil dihapus');
    }
  }

  public function deleteImageVarian(Request $request)
  {
    $forms = $request->input('forms');
    // dd($forms);
    foreach ($forms as $form) {
      $publicId = $form['public_id'];

      if ($publicId) {
        Cloudinary::destroy($publicId);
        GambarSementara::where('public_id', $publicId)->first();
        return back()->with('message', 'Berhasil dihapus');
      } else {
        return back()->with('message', 'Berhasil dihapus');
      }
    }
  }

  public function deleteHarga(Request $request)
  {
    // dd($request->all());
    $harga = Harga::where('id', $request->input('id.id'))->first();
    $harga->delete();
    if ($request->input('id.publicId') === null) {
      return back()->with('message', 'Hapus Harga Berhasil');
    } else {
      Cloudinary::destroy($request->input('id.publicId'));
      return back()->with('message', 'Hapus Harga Berhasil');
    }
  }
}
