<?php

namespace Database\Factories;

use App\Models\Produk;
use Illuminate\Database\Eloquent\Factories\Factory;

class HargaFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    // static $hrg = 0;
    // $hrg++;
    return [
      "idProduk" => Produk::pluck('id')->random(),
      "jenisHarga" => $this->faker->word(),
      "namaHarga" => $this->faker->word(),
      "hrgJual" => $this->faker->numberBetween(1, 100),
      "hrgBeli" => $this->faker->numberBetween(1, 90),
      "stokToko" => $this->faker->numberBetween(1, 100),
      "stokGudang" => $this->faker->numberBetween(1, 100),
      // "diskon",
      // "tglAwalDiskon",
      // "tglAkhirDiskon",
      "terjual" => $this->faker->randomNumber(4),
      "imgName" => $this->faker->slug(4),
      "imgUrl" => "https://source.unsplash.com/600x600?random",
    ];
  }
}
