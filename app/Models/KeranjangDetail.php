<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class KeranjangDetail extends Pivot
{
  protected $table = 'keranjang_details';
  protected $guarded = ['id'];
  public $incrementing = true;

  public function keranjang()
  {
    return $this->belongsTo(Keranjang::class, 'idKeranjang');
  }

  public function produk()
  {
    return $this->belongsTo(Produk::class, 'idProduk');
  }

  public function harga()
  {
    return $this->belongsTo(Harga::class, 'idHarga', 'id');
  }

  public function toko()
  {
    return $this->belongsTo(Toko::class, 'idToko', 'id');
  }
}
