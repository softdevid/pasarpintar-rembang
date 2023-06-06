<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Rules\PhoneNumber;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SuperAdminSettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $User
     * @return \Illuminate\Http\Response
     */
    public function show(User $User)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $User
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        // $kategoriGlobal = KategoriGlobal::find($id);
        $user = User::find(auth()->user()->id);
        return Inertia::render('SuperAdminSetting/AdminSetting', [
            'title' => 'Admin Ubah Akun',
            'users' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $User
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $user = User::find(auth()->user()->id)->first();
        if ($request->email !== auth()->user()->email) {
            $request->validate(['email' => 'required|unique:users,email']);
        };
        $request->validate([
            'name' => 'required',
            'password' => 'min:8',
            'noHp' => ['required', 'string', new PhoneNumber],
            'alamat' => 'required|min:10',
        ]);
        $user->update([
            'name' => $request->namaPengelola,
            'email' => $request->email,
            'password' => Hash::make($request->password) ?? $user->password,
            'no_hp' => $request->noHp,
            'alamat' => $request->alamat,
        ]);
        return redirect()->to('/admin/setting')->with('message', 'Akun berhasil di ubah');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $User
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
    }
}
