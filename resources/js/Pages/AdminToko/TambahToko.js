import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const TambahToko = (props) => {
  console.log(props);

  const handleSubmit = () => {
    // e.preventDefault();
    router.post("/admin/toko", values);
    console.log(values);
  };

  const [values, setValues] = useState({
    namaToko: "",
    email: "",
    password: "",
    namaPengelola: "",
    noHp: "",
    alamat: "",
  });

  function handleChange(e) {
    setValues((values) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl mb-3">Tambah Toko</h1>
      </div>
      <div className="w-full max-w">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="namaToko"
            >
              Nama Toko
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="namaToko"
              type="text"
              placeholder="Nama Toko"
              onChange={handleChange}
              value={values.namaToko}
            />
            {props.errors.namaToko && (
              <div className="text-red-600">{props.errors.namaToko}</div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="email"
              type="text"
              placeholder="Masukkan Email"
              onChange={handleChange}
              value={values.email}
            />
            {props.errors.email && (
              <div className="text-red-600">{props.errors.email}</div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Sandi
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="Masukkan Password"
              onChange={handleChange}
              value={values.password}
            />
            {props.errors.password && (
              <div className="text-red-600">{props.errors.password}</div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="namaPengelola"
            >
              Nama Pengelola
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="namaPengelola"
              type="text"
              placeholder="Masukkan Nama Anda"
              onChange={handleChange}
              value={values.namaPengelola}
            />
            {props.errors.namaPengelola && (
              <div className="text-red-600">{props.errors.namaPengelola}</div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="noHp"
            >
              Nomor Hp
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="noHp"
              type="text"
              placeholder="Masukkan Nomor Hp"
              onChange={handleChange}
              value={values.noHp}
            />
            {props.errors.noHp && (
              <div className="text-red-600">{props.errors.noHp}</div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="alamat"
            >
              Alamat
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="alamat"
              type="text"
              placeholder="Masukkan Alamat Anda"
              onChange={handleChange}
              value={values.alamat}
            />
            {props.errors.alamat && (
              <div className="text-red-600">{props.errors.alamat}</div>
            )}
          </div>
        </div>
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Tambah
        </button>
        &nbsp;
        <Link
          href={`/admin/toko`}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Kembali
        </Link>
      </div>
    </>
  );
};

TambahToko.layout = (page) => <Main children={page} />;

export default TambahToko;
