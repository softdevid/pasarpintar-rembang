import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useForm } from "@inertiajs/react";
import React from "react";

const UserProfile = () => {
  const { data, setData, post, processing } = useForm({
    nama: "",
    email: "",
    password: "",
    showPassword: false,
    noHp: "",
    alamat: "",
  });

  const submit = (e) => {
    e.preventDefault();
    // post();
  };

  return (
    <div className="w-full flex flex-col items-start bg-white p-5 rounded-md shadow-md">
      <div className="flex justify-start items-center w-full border-b border-slate-400">
        <span className="text-xl text-slate-600 font-semibold mb-4 px-2">
          Profil Saya
        </span>
      </div>
      <div className="p-5 w-full lg:w-3/5">
        <div className="">
          <form onSubmit={submit}>
            <div className="mb-6">
              <label
                htmlFor="nama"
                className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                id="nama"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={data.nama}
                onChange={(e) => setData("nama", e.target.value)}
                required
              />
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
                onChange={(e) => setData("email", e.target.value)}
                required
              />
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
                  onChange={(e) => setData("password", e.target.value)}
                  required
                />
                <div
                  className="absolute right-2 top-2.5"
                  onClick={(e) => setData("showPassword", !data.showPassword)}
                >
                  {data.showPassword ? (
                    <EyeIcon className="h-6 w-6 text-slate-500" />
                  ) : (
                    <EyeSlashIcon className="h-6 w-6 text-slate-500" />
                  )}
                </div>
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
                onChange={(e) => setData("noHp", e.target.value)}
                required
              />
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
                onChange={(e) => setData("alamat", e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={processing}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Ganti
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

UserProfile.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserProfile;
