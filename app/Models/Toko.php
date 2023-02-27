<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Toko extends Model
{
  use HasFactory;
  use \Staudenmeir\EloquentEagerLimit\HasEagerLimit;

  protected $guarded = ['id'];

  protected $hidden = ['password'];

  public function user()
  {
    return $this->belongsTo(User::class, "idUser");
  }

  public function produks()
  {
    return $this->hasMany(Produk::class, "idToko");
  }

  public function keranjangs()
  {
    return $this->hasMany(KeranjangDetail::class, "idToko");
  }
}
