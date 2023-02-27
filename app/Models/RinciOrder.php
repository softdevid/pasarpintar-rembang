<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RinciOrder extends Model
{
  use HasFactory;
  protected $guarded = ['id'];

  public function toko()
  {
    return $this->belongsTo(Toko::class, 'idToko', 'id');
  }

  public function produk()
  {
    return $this->belongsTo(Produk::class, 'idProduk', 'id');
  }

  public function harga()
  {
    return $this->belongsTo(Harga::class, 'idHarga', 'id');
  }

  public function order()
  {
    return $this->belongsTo(Order::class, 'idOrder', 'id');
  }
}
