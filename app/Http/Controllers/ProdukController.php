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
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    // $produk = Produk::with(['toko' => function ($q) {
    //   $q->select('id', 'slug as slugToko', 'namaToko');
    // }, 'hargas' => function ($q) {
    //   $q->select('idProduk', 'id as idHarga', 'hrgJual', 'hrgBeli', 'stokGudang', 'stokToko', 'namaHarga', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon')->orderBy('hrgJual', 'asc');
    // }])->select(
    //   'produks.*',
    // )->orderBy('terjual', 'desc')->limit(100)
    //   ->where('idToko', $toko->id)
    //   ->paginate(5);

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
      $q->select('idProduk', 'id as idHarga', 'hrgJual', 'hrgBeli', 'stokGudang', 'stokToko', 'namaHarga', 'diskon', 'tglAwalDiskon', 'tglAkhirDiskon')->orderBy('hrgJual', 'asc');
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
    $kategori = Kategori::where('idToko', $toko->id)->select('id', 'namaKategori')->get();
    $kategoriGlobal = KategoriGlobal::select('id', 'namaKategoriGlobal')->get();
    $images = GambarSementara::where('idUser', auth()->user()->id)->where('kategoriGambar', 'lainnya')->get();
    $image = GambarSementara::where('idUser', auth()->user()->id)->where('kategoriGambar', 'utama')->get();

    return Inertia::render('TokoProduk/Create', [
      'title' => 'Tambah Produk',
      'kategori' => $kategori,
      'kategoriGlobal' => $kategoriGlobal,
      'images' => $images,
      'image' => $image
    ]);
  }

  public function storeKategori(Request $request)
  {
    $request->validate(['namaKategori' => 'required|max:255']);

    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    Kategori::create([
      'namaKategori' => $request->namaKategori,
      'slug' => Str::slug($request->namaKategori),
      'idToko' => $toko->id,
    ]);

    return back()->with('message', 'Berhasil di tambah');
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

    GambarSementara::where(['idUser' => auth()->user()->id, 'kategoriGambar' => 'utama'])->delete();

    // return redirect()->to('/toko/produk')->with('message', 'Berhasil ditambah');
    return response()->json(['data' => 'Berhasil menambah produk']);
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
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    $kategori = Kategori::where('idToko', $toko->id)->select('id', 'namaKategori')->get();
    $kategoriGlobal = KategoriGlobal::select('id', 'namaKategoriGlobal')->get();
    // $produk = Produk::find($id);

    $produk = Produk::with(['toko' => function ($q) {
      $q->select('id', 'slug as slugToko', 'namaToko');
    }, 'hargas' => function ($q) {
      $q->select('hargas.*')->orderBy('hrgJual', 'asc');
    }])->select(
      'produks.*',
    )->where('id', $produk->id)
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
  public function update(Request $request, Produk $produk)
  {
    $produk = Produk::find($produk->id);
    $toko = Toko::where('idUser', auth()->user()->id)->select('id')->first();
    // dd($request->all());
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

    foreach ($request->input('forms') as $value) {
      $id = isset($value['id']) ? $value['id'] : null;

      Harga::updateOrCreate(
        ['id' => $id],
        [
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
        ]
      );
    }



    return response()->json(['data' => 'Berhasil mengubah produk']);
    // return redirect()->to('/toko/produk')->with('message', 'Berhasil diubah');
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Models\Produk  $produk
   * @return \Illuminate\Http\Response
   */
  public function destroy(Produk $produk, Request $request)
  {
    // dd($request->all());
    $produk = Produk::where('id', $produk->id)->first();

    Cloudinary::destroy($produk->imgName);
    $hargas = Harga::where('idProduk', $produk->id)->get();
    // dd($produk, $hargas);
    foreach ($hargas as $h) {
      if ($h['imgName'] !== null) {
        Cloudinary::destroy($h['imgName']);
      }
    }

    foreach ($hargas as $h) {
      $h->delete();
    }
    $produk->delete();


    // return redirect()->to('/toko/produk')->with('message', 'Produk berhasil dihapus');
    return response()->json(['data' => 'Berhasil menghapus']);
  }

  public function deleteImage(Request $request)
  {
    // dd($request->publicId);
    if ($request->publicId) {
      Cloudinary::destroy($request->publicId);
      GambarSementara::where('public_id', $request->publicId)->delete();
      // return response()->json(['data' => 'Berhasil menghapus gambar']);
      return back();
    } else {
      return back();
      // return response()->json(['data' => 'Berhasil menghapus gambar']);
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
