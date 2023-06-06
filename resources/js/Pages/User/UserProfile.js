import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Head, router, useForm } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";

const UserProfile = ({ title, user }) => {
  const [errors, setErrors] = useState({})

  const [data, setData] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: "",
    showPassword: false,
    noHp: user.no_hp,
    alamat: user.alamat,
  })
  // console.log(data);

  const submit = () => {
    axios
      .patch(`/user/profile/${data.id}`, data)
      .then((res) => {
        // console.log(res.data);
        toast.success("Berhasil mengubah profil", {
          position: toast.POSITION.TOP_CENTER
        })
        router.get('/user/profile')
      })
      .catch((err) => setErrors(err.response.data.errors));
  };

  function handleChange(e) {
    const key = e.target.id
    const value = e.target.value
    setData(data => ({
      ...data,
      [key]: value
    }))
  }
  function handleShow() {
    setData(data => ({
      ...data,
      showPassword: !data.showPassword
    }))
  }

  const notify = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Head title={title} />
      <div className="w-full max-w-lg mx-auto flex flex-col items-start bg-white p-5 rounded-md shadow-md">
        <div className="flex justify-start items-center w-full border-b border-slate-400">
          <span className="text-xl text-slate-600 font-semibold mb-4 px-2">
            Profil Saya
          </span>
        </div>
        <div className="p-5 w-full">
          <div className="">
            {/* <form onSubmit={submit}> */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.name}
                onChange={handleChange}
              />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-red-500">{errors.email}</span>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <div className="relative">
                <input
                  type={data.showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={data.password}
                  onChange={handleChange}
                />
                <div
                  className="absolute right-2 top-2.5" id="showPassword"
                  onClick={handleShow}
                >
                  {data.showPassword ? (
                    <EyeIcon className="h-6 w-6 text-slate-500" />
                  ) : (
                    <EyeSlashIcon className="h-6 w-6 text-slate-500" />
                  )}
                </div>
                {errors.password && <span className="text-red-500">{errors.password}</span>}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="noHp"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Nomor Telepon
              </label>
              <input
                type="noHp"
                id="noHp"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.noHp}
                onChange={handleChange}
                required
              />
              {errors.noHp && <span className="text-red-500">{errors.noHp}</span>}
            </div>
            <div className="mb-6">
              <label
                htmlFor="alamat"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Alamat
              </label>
              <textarea
                id="alamat"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.alamat}
                onChange={handleChange}
              />
              {errors.alamat && <span className="text-red-500">{errors.alamat}</span>}
            </div>
            <button
              type="submit" onClick={submit}
              // disabled={processing}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ganti
            </button>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

UserProfile.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserProfile;
