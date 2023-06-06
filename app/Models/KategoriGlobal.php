<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriGlobal extends Model
{
  use HasFactory;
  protected $guarded = ['id'];

  public function produks()
  {
    return $this->hasMany(Produk::class, 'idKategoriGlobal', 'id');
  }
}
