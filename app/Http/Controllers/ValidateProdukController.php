<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ValidateProdukController extends Controller
{
  function validate1(Request $request)
  {
    $request->validate([
      'namaProduk' => 'required',
    ]);
    return back();
  }
}
