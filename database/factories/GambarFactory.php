<?php

namespace Database\Factories;

use App\Models\Produk;
use Illuminate\Database\Eloquent\Factories\Factory;

class GambarFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "idProduk" => Produk::pluck('id')->random(),
      "imgName" => $this->faker->slug(4),
      "imgUrl" => "https://source.unsplash.com/600x600?random",
    ];
  }
}
