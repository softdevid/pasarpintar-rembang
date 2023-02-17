<?php

namespace App\Http\Controllers;

use App\Models\GambarSementara;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Client;

class GambarSementaraController extends Controller
{
  public function insertgbrutama(Request $request)
  {
    GambarSementara::create([
      'idUser' => auth()->user()->id,
      'public_id' => $request->public_id,
      'url' => $request->url,
      'kategoriGambar' => 'utama',
    ]);
    return back()->with('message', 'Berhasil menambah gambar utama');
  }

  public function gbrlain(Request $request)
  {
    GambarSementara::create([
      'idUser' => auth()->user()->id,
      'public_id' => $request->public_id,
      'url' => $request->url,
      'kategoriGambar' => 'lainnya',
      'index' => $request->index
    ]);
    return back()->with('message', 'Berhasil menambah gambar utama');
  }

  public function checkPublicIds(Request $request)
  {
    $publicIds = $request->input('publicIds');
    $existingPublicIds = GambarSementara::whereIn('public_id', $publicIds)->pluck('public_id')->toArray();
    return response()->json($existingPublicIds);
  }
}
