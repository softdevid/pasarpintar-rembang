<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Harga extends Model
{
  use HasFactory;
  use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

  protected $guarded = ['id'];

  public function produk()
  {
    return $this->belongsTo(Produk::class, "idProduk", 'id');
  }

  public function keranjang()
  {
    return $this->hasOne(KeranjangDetail::class, 'idHarga', 'id');
  }
}
