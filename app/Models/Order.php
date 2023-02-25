<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
  use HasFactory;
  protected $guarded = ['id'];

  public function toko()
  {
    return $this->belongsTo(Toko::class, 'idToko', 'id');
  }

  public function rinciOrder()
  {
    return $this->hasMany(RinciOrder::class, 'idOrder', 'id');
  }
}
