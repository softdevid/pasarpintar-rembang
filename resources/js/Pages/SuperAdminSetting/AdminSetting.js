import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import { Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const AdminSetting = (props) => {
  console.log(props);

  const handleSubmit = () => {
    // e.preventDefault();
    router.patch("/admin/setting", values);
    console.log(values);
  };

  const [values, setValues] = useState({
    name: props.users.name,
    email: props.users.email,
    password: props.users.password,
    no_hp: props.users.no_hp,
    alamat: props.users.alamat,
    id: props.users.id,
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
        <h1 className="font-bold text-3xl mb-3">Ubah Akun</h1>
      </div>
      <div className="w-full max-w">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Nama Akun
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="name"
              type="text"
              placeholder="Nama Akun Anda"
              onChange={handleChange}
              value={values.name}
            />
            {props.errors.name && (
              <div className="text-red-600">{props.errors.name}</div>
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
              placeholder="Email Anda"
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
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="password"
              type="password"
              placeholder="Sandi Anda"
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
              htmlFor="no_hp"
            >
              Nomor HP Anda
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="no_hp"
              type="text"
              placeholder="Nomor HP Anda"
              onChange={handleChange}
              value={values.no_hp}
            />
            {props.errors.no_hp && (
              <div className="text-red-600">{props.errors.no_hp}</div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mt-6">
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
          Ubah Data
        </button>
      </div>
    </>
  );
};

AdminSetting.layout = (page) => <Main children={page} />;

export default AdminSetting;
