<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keranjang extends Model
{
  use HasFactory;

  protected $guarded = ['id'];

  public function produks()
  {
    return $this
      ->belongsToMany(Produk::class, 'keranjang_details', 'idKeranjang', 'idProduk')
      ->withPivot('id', 'idHarga', 'idToko', 'qty', 'subtotal')
      ->withTimestamps()
      ->using(KeranjangDetail::class);
  }
}
