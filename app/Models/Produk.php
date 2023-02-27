<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produk extends Model
{
  use HasFactory;
  use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

  protected $guarded = ['id'];

  public function toko()
  {
    return $this->belongsTo(Toko::class, "idToko");
  }

  public function kategoriToko()
  {
    return $this->belongsTo(Kategori::class, "idKategori");
  }

  public function kategoriGlobal()
  {
    return $this->belongsTo(KategoriGlobal::class, "idKategoriGlobal");
  }

  public function hargas()
  {
    return $this->hasMany(Harga::class, "idProduk", 'id');
  }

  public function hargaTerkecil()
  {
    return $this->hasOne(Harga::class, "idProduk", 'id')->orderBy('hrgJual', 'asc');
  }

  public function keranjangs()
  {
    return $this
      ->belongsToMany(Keranjang::class, 'keranjang_details',  'idProduk', 'idKeranjang')
      ->withPivot('id', 'idHarga', 'idToko', 'qty', 'subtotal')
      ->withTimestamps()
      ->using(KeranjangDetail::class);
  }

  // public function satuan()
  // {
  //   return $this->belongsTo()
  // }
}
