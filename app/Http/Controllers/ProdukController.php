<?php

namespace App\Http\Controllers;

use App\Models\Gambar;
use App\Models\GambarSementara;
use App\Models\Harga;
use App\Models\Kategori;
use App\Models\KategoriGlobal;
use App\Models\Produk;
use App\Models\Toko;
use Carbon\Carbon;
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
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $request->validate([
      'values.namaProduk' => 'required|max:255',
      'values.deskripsi' => 'required|max:255',
      'values.idKategori' => 'required|max:255',
      'values.idKategoriGlobal' => 'required|max:255',
      'values.jenisHarga' => 'required|max:255',
      'forms.*.namaHarga' => 'required|max:255',
      'forms.*.hrgBeli' => 'required|numeric|min:0',
      'forms.*.hrgJual' => 'required|numeric|min:0',
      'forms.*.stokGudang' => 'required|numeric|min:0',
      'forms.*.stokToko' => 'required|numeric|min:0',
    ], [
      'values.namaProduk.required' => 'Nama Produk harus diisi',
      'values.deskripsi.required' => 'Deskripsi produk harus diisi',
      'values.idKategori.required' => 'Kategori harus diisi',
      'values.idKategoriGlobal.required' => 'Kategori global harus diisi',
      'values.jenisHarga.required' => 'Jenis variasi harus diisi',
      'forms.*.namaHarga.required' => 'Nama variasi harus diisi',
      'forms.*.hrgBeli.required' => 'Harga beli harus diisi',
      'forms.*.hrgJual.required' => 'Harga jual harus diisi',
      'forms.*.stokGudang.required' => 'Stok gudang harus diisi',
      'forms.*.stokToko.required' => 'Stok toko harus diisi',
    ]);



    $image = GambarSementara::where(['idUser' => auth()->user()->id, 'kategoriGambar' => 'utama'])->first();
    $produk = Produk::create([
      'namaProduk' => $request->input('values.namaProduk'),
      'slug' => Str::slug($request->input('values.namaProduk')),
      'idKategori' => $request->input('values.idKategori'),
      'idKategoriGlobal' => $request->input('values.idKategoriGlobal'),
      'deskripsi' => $request->input('values.deskripsi'),
      'jenisHarga' => $request->input('values.jenisHarga') ?? '',
      'terjual' => 0,
      'imgName' => $image->public_id ?? '',
      'imgUrl' => $image->url ?? '',
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

    $gambar = GambarSementara::where(['idUser' => auth()->user()->id, 'kategoriGambar' => 'utama'])->delete();

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

    return Inertia::render('TokoProduk/Edit2', [
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
  public function update(Request $request, Produk $produk)
  {
    // dd($request->all());
    $produk = Produk::find($request->input('values.id'));
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();

    if ($request->input('values.jenisHarga') === "") {
      $request->validate([
        'forms.*.hrgBeli' => 'required|numeric|min:0',
        'forms.*.hrgJual' => 'required|numeric|min:0',
        'forms.*.stokGudang' => 'required|numeric|min:0',
        'forms.*.stokToko' => 'required|numeric|min:0',
      ], [
        'forms.*.hrgBeli.required' => 'Harga beli harus diisi',
        'forms.*.hrgJual.required' => 'Harga jual harus diisi',
        'forms.*.stokGudang.required' => 'Stok gudang harus diisi',
        'forms.*.stokToko.required' => 'Stok toko harus diisi',
      ]);
    }
    if ($request->input('values.jenisHarga') !== "") {
      $request->validate([
        'forms.*.namaHarga' => 'required|max:255',
        'forms.*.hrgBeli' => 'required|numeric|min:0',
        'forms.*.hrgJual' => 'required|numeric|min:0',
        'forms.*.stokGudang' => 'required|numeric|min:0',
        'forms.*.stokToko' => 'required|numeric|min:0',
      ], [
        'forms.*.namaHarga.required' => 'Nama variasi harus diisi',
        'forms.*.hrgBeli.required' => 'Harga beli harus diisi',
        'forms.*.hrgJual.required' => 'Harga jual harus diisi',
        'forms.*.stokGudang.required' => 'Stok gudang harus diisi',
        'forms.*.stokToko.required' => 'Stok toko harus diisi',
      ]);
    }

    $produk->update([
      'namaProduk' => $request->input('values.namaProduk'),
      'slug' => Str::slug($request->input('values.namaProduk')),
      'idKategori' => $request->input('values.idKategori'),
      'idKategoriGlobal' => $request->input('values.idKategoriGlobal'),
      'deskripsi' => $request->input('values.deskripsi'),
      'jenisHarga' => $request->input('values.jenisHarga') ?? '',
      'imgName' => $request->input('values.public_id'),
      'imgUrl' => $request->input('values.url'),
      'idToko' => $toko->id,
    ]);

    // $dataHarga = Harga::whereIn('id', $request->input('forms.id'))->get();
    foreach ($request->input('forms') as $value) {
      Harga::where('id', $value['id'])
        ->update([
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

    return redirect()->to('/toko/produk')->with('message', 'Berhasil diubah');
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

  public function deleteImageEdit(Request $request)
  {
    if ($request->publicId) {
      Cloudinary::destroy($request->publicId);
      $harga = Harga::where('id', $request->id)->first();
      $harga->update(['imgName' => null, 'imgUrl' => null]);
      return back()->with('message', 'Berhasil dihapus');
    } else {
      $harga = Harga::where('id', $request->id)->first();
      $harga->update(['imgName' => null, 'imgUrl' => null]);
      return back()->with('message', 'Berhasil dihapus');
    }
  }

  public function deleteImageVarian(Request $request)
  {
    $forms = $request->input('forms');
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

  public function deleteImageVarianEdit(Request $request)
  {
    $forms = $request->input('forms');
    foreach ($forms as $form) {
      $publicId = $form['public_id'];

      if ($publicId) {
        Cloudinary::destroy($publicId);
        GambarSementara::where('public_id', $publicId)->first();
        Harga::where('id', $request->input('forms.id'))->delete();
        return back()->with('message', 'Berhasil dihapus');
      } else {
        Harga::where('id', $request->input('forms.id'))->delete();
        return back()->with('message', 'Berhasil dihapus');
      }
    }
  }

  public function deleteHarga(Request $request)
  {
    // dd($request->all());
    $harga = Harga::where('id', $request->input('id'))->first();
    if ($request->input('publicId') === null) {
      $harga->delete();
      return back()->with('message', 'Hapus Harga Berhasil');
    } else {
      Cloudinary::destroy($request->input('publicId'));
      $harga->delete();
      return back()->with('message', 'Hapus Harga Berhasil');
    }
  }


  public function updateProductDiscountStatus()
  {
    $products = Harga::where('tglAkhirDiskon', '<', Carbon::now())->get();

    foreach ($products as $product) {
      $product->diskon = 0;
      $product->tglAwalDiskon = null;
      $product->tglAkhirDiskon = null;
      $product->save();
    }
  }
}
