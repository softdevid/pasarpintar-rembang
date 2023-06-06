<?php

namespace Database\Factories;

use App\Models\Toko;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProdukFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "namaProduk" => $this->faker->sentence(),
      "slug" => $this->faker->slug(6),
      "idToko" => Toko::pluck('id')->random(),
      "idKategori" => $this->faker->numberBetween(1, 10),
      "idKategoriGlobal" => $this->faker->numberBetween(1, 20),
      "deskripsi" => $this->faker->paragraphs(3, true),
      "totalStokGudang" => $this->faker->numberBetween(10, 10000),
      "totalStokToko" => $this->faker->numberBetween(10, 5000),
      "jenisHarga" => $this->faker->word(),
      "terjual" => $this->faker->randomNumber(4),
      "imgName" => $this->faker->slug(4),
      "imgUrl" => "https://source.unsplash.com/600x600?random",
    ];
  }
}
