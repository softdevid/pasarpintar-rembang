import React, { useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const TokoAdminSetting = (props) => {
  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    axios
      .patch(`/admin/toko/${values.id}`, values)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          router.get('/toko/setting')
        }, 2000);
      })
      .catch((err) => setErrors(err.response.data.errors))
  };

  const [values, setValues] = useState({
    namaToko: props.toko.namaToko,
    email: props.toko.email,
    password: props.toko.password,
    namaPengelola: props.toko.namaPengelola,
    noHp: props.toko.noHp,
    alamat: props.toko.alamat,
    statusToko: props.toko.statusToko,
    id: props.toko.id,
  });

  function handleChange(e) {
    setValues((values) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <>
      <Head title={props.title} />
      <ToastContainer autoClose={2000} />
      <div>
        <h1 className="font-bold text-3xl mb-3">Ubah Toko</h1>
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
            {errors.namaToko && (
              <div className="text-red-600">{errors.namaToko}</div>
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
            {errors.email && (
              <div className="text-red-600">{errors.email}</div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="password"
            >
              Sandi Baru
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="Masukkan Password"
              onChange={handleChange}
              value={values.password}
            />
            {errors.password && (
              <div className="text-red-600">{errors.password}</div>
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
            {errors.namaPengelola && (
              <div className="text-red-600">{errors.namaPengelola}</div>
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
            {errors.noHp && (
              <div className="text-red-600">{errors.noHp}</div>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/2">
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
          {errors.alamat && (
            <div className="text-red-600">{errors.alamat}</div>
          )}
        </div>
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Ubah Data
        </button>
      </div>
    </>
  );
};

TokoAdminSetting.layout = (page) => <Main children={page} />;

export default TokoAdminSetting;
