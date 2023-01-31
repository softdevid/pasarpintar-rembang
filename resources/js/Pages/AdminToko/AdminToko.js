import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import Input from "@/Components/Input";
import { Link } from "@inertiajs/inertia-react";

const AdminToko = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["namaToko", "namaPengelola", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  };

  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Admin Toko</h1>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center pb-4">
          <div className="md:mt-3 md:ml-3">
            <Link
              href={"/admin/toko/create"}
              className="inline-flex items-center text-white bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              Tambah Toko
            </Link>
          </div>
          <div className="mt-1 mb-7 mx-auto max-w-xl">
            <div className="flex items-center">
              <label htmlFor="search-kategori" className="sr-only">
                Cari...
              </label>
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="search-kategori"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Cari..."
                  onChange={(e) => setQuery(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <Input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="py-3 px-6">
                Nama Toko
              </th>
              <th scope="col" className="py-3 px-6">
                Pengelola
              </th>
              <th scope="col" className="py-3 px-6">
                Kontak
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {search(props.tokos).length > 0 ? (
              search(props.tokos).map((data, i) => {
                return (
                  <tr
                    key={i}
                    className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {i + 1}
                    </th>
                    <td>{data.namaToko}</td>
                    <td>{data.namaPengelola}</td>
                    <td>{data.email}</td>
                    <td className="flex">
                      {/* <a href={`/toko/produk/show/${data.slug}`} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</a> */}
                      <Link
                        href={`/admin/toko/${data.slug}/edit`}
                        className="bg-yellow-400 text-white rounded-md p-2 mx-1"
                      >
                        Edit
                      </Link>
                      <Link
                        onClick={() => handleDelete({ id: data.id })}
                        className="bg-red-500 text-white rounded-md p-2 mx-1"
                      >
                        Hapus
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : query !== "" ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center"
                >{`Tidak ada data dengan pencarian '${query}'`}</td>
              </tr>
            ) : (
              <tr>
                <td colSpan="7" className="text-center">{`Tidak ada data`}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

AdminToko.layout = (page) => <Main children={page} />;

export default AdminToko;
