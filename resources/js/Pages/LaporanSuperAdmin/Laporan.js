import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";

const Laporan = (props) => {
  console.log(props);
  const [query, setQuery] = useState("");
  const keys = ["namaToko", "namaPengelola", "email"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  };

  const handleRincian = (data) => {
    router.get(`/admin/laporan/${data.id}`);
  };

  return (
    <>
      <Head title={props.title} />
      <div className="grid grid-cols-2">
        <h1 className="font-bold text-3xl">{props.title}</h1>
        <div className="text-right">
          {/* <button
            onClick={() => handleRincian({id:})}
            className="inline-flex text-right text-white bg-green-600 border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
              />
            </svg>
            &nbsp; Rincial Laporan
          </button> */}
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
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                    <td className="py-3 px-6 text-center">{i + 1}</td>
                    <td className="py-3 px-6">{data.namaToko}</td>
                    <td className="py-3 px-6">{data.namaPengelola}</td>
                    <td className="py-3 px-6">{data.email}</td>
                    <td className="py-3 px-6">
                      <button
                        onClick={() => handleRincian(data)}
                        className="inline-flex text-right text-white bg-green-600 border border-gray-300 focus:outline-none hover:bg-green-700 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                          />
                        </svg>
                        &nbsp; Rincian
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

Laporan.layout = (page) => <Main children={page} />;

export default Laporan;
