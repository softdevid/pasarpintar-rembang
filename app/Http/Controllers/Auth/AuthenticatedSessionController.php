<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Toko;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class AuthenticatedSessionController extends Controller
{
  /**
   * Display the login view.
   *
   * @return \Inertia\Response
   */
  public function create()
  {
    return Inertia::render('Auth/Login', [
      'canResetPassword' => Route::has('password.request'),
      'status' => session('status'),
    ]);
  }

  /**
   * Handle an incoming authentication request.
   *
   * @param  \App\Http\Requests\Auth\LoginRequest  $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function store(LoginRequest $request)
  {
    $request->authenticate();

    $request->session()->regenerate();

    //mengecek status toko premium/free
    $toko = Toko::where('idUser', auth()->user()->id)->select('statusToko')->first();

    if (auth()->user()->level === "customer") {
      return redirect()->intended();
    } elseif (auth()->user()->level === "toko" && $toko->statusToko === 'premium') {
      return redirect()->intended(RouteServiceProvider::HOMETOKO);
    } elseif (auth()->user()->level === "toko" && $toko->statusToko === 'free') {
      return redirect()->intended(RouteServiceProvider::HOMETOKOFREE);
    } elseif (auth()->user()->level === "kurir") {
      return redirect()->intended(RouteServiceProvider::HOMEKURIR);
    } elseif (auth()->user()->level === "admin") {
      return redirect()->intended(RouteServiceProvider::HOMEADMIN);
    }

    return redirect()->intended();
  }

  /**
   * Destroy an authenticated session.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\RedirectResponse
   */
  public function destroy(Request $request)
  {
    Auth::guard('web')->logout();

    $request->session()->invalidate();

    $request->session()->regenerateToken();

    return redirect('/');
  }
}
