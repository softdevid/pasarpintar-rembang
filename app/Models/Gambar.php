<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gambar extends Model
{
  use HasFactory;

  public function produk()
  {
    return $this->belongsTo(Produk::class, "idProduk", 'id');
  }
}
