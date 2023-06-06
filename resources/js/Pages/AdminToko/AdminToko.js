import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import Input from "@/Components/Input";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminToko = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["namaToko", "namaPengelola", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  };

  const handleDelete = (data) => {
    // router.delete(`/admin/toko/${data.id}`);
    // console.log(data)
    if (confirm("Yakin mau hapus toko?")) {
      axios
        .delete(`/admin/toko/${data.id}`)
        .then((res) => {
          toast.success(res.data.data, {
            position: toast.POSITION.TOP_CENTER
          })
          setTimeout(() => {
            router.get('/admin/toko')
          }, 2000);
        })
    }
  };

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Head title={props.title} />
      <div className="grid grid-cols-2">
        <h1 className="font-bold text-3xl">{props.title}</h1>
        <div className="text-right">
          <Link
            href={"/admin/toko/create"}
            className="inline-flex text-right text-white bg-blue-600 border border-gray-300 focus:outline-none hover:bg-blue-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
      </div>
      <div className="mt-1 mb-7 mx-auto max-w-xl">
        <div className="flex items-center">
          <label htmlFor="search-toko" className="sr-only">
            Cari Toko
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
              id="search-toko"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Cari Toko"
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6 text-center">
                  #
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
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="text-center">{i + 1}</td>
                      <td>{data.namaToko}</td>
                      <td>{data.namaPengelola}</td>
                      <td>{data.email}</td>
                      <td className="flex">
                        {/* <a href={`/toko/produk/show/${data.slug}`} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</a> */}
                        <Link
                          href={`/admin/toko/${data.id}/edit`}
                          className="bg-yellow-400 text-white rounded-md p-2 mx-1"
                        >
                          Edit
                        </Link>
                        <button as="button"
                          onClick={() => handleDelete(data)}
                          className="bg-red-500 text-white rounded-md p-2 mx-1"
                        >
                          Hapus
                        </button>
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
      </div>

      <div className="block md:hidden">
        <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-2 px-4 text-center">
                #
              </th>
              <th scope="col" className="py-2 px-4">
                Toko
              </th>
              <th scope="col" className="py-2 px-4">
                Kontak
              </th>
              <th scope="col" className="py-2 px-4">
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="text-center">{i + 1}</td>
                    <td className="text-sm">
                      {data.namaToko} <br />
                      {data.namaPengelola}
                    </td>
                    <td className="text-sm">
                      {data.email} <br />
                      {data.noHp}
                    </td>
                    <td className="flex text-sm">
                      {/* <a href={`/toko/produk/show/${data.slug}`} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</a> */}
                      <Link as="button"
                        href={`/admin/toko/${data.id}/edit`}
                        className="bg-yellow-400 text-white rounded-md p-2 mx-1"
                      >
                        <PencilSquareIcon className="w-3 h-3 text-white" />
                      </Link> <br />
                      <button as="button"
                        onClick={() => handleDelete({ id: data.id })}
                        className="bg-red-500 text-white rounded-md p-2 mx-1"
                      >
                        <TrashIcon className="w-3 h-3 text-white" />
                      </button>
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
