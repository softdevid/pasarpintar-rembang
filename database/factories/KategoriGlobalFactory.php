<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class KategoriGlobalFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition()
  {
    return [
      "namaKategoriGlobal" => $this->faker->word(),
      "slug" => $this->faker->slug(1, false),
    ];
  }
}
