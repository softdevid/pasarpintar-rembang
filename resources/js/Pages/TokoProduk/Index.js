import React, { useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

const Index = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["namaProduk", "hrgBeli", "hrgJual"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  }

  const handleDelete = (id) => {
    Inertia.post("/toko/produk/delete", id);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <h1 className="font-bold text-3xl">{props.title}</h1>
        <div className="text-right">
          <Link href={'/toko/produk/create'} className="ml-3 rounded-md bg-blue-600 text-white p-2 hover:bg-blue-700">Tambah Produk</Link>
        </div>
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

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Nama Produk
              </th>
              <th scope="col" className="py-3 px-6">
                Harga Beli
              </th>
              <th scope="col" className="py-3 px-6">
                Harga Jual
              </th>
              <th scope="col" className="py-3 px-6">
                Stok Gudang
              </th>
              <th scope="col" className="py-3 px-6">
                Stok Toko
              </th>
              <th scope="col" className="py-3 px-6">
                Satuan
              </th>
              <th scope="col" className="py-3 px-6">
                Diskon
              </th>
              <th scope="col" className="py-3 px-6">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {search(props.produk.data).length > 0 ? (
              search(props.produk.data).map((data, i) => {
                return (

                  <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {i + 1}
                    </th>
                    <td>{data.namaProduk}</td>
                    <td>{data.hrgBeli}</td>
                    <td>{data.hrgJual}</td>
                    <td>{data.stokGudang}</td>
                    <td>{data.stokToko}</td>
                    <td>{data.satuan}</td>
                    <td>Rp. {data.diskon}</td>
                    <td className="flex">
                      {/* <a href={`/toko/produk/show/${data.slug}`} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</a> */}
                      <Link href={`/toko/produk/${data.slug}/edit`} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</Link>
                      <Link onClick={() => handleDelete({ id: data.id })} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</Link>
                    </td>
                  </tr>

                );
              })
            ) : query !== "" ? (
              <tr>
                <td colSpan="7" className="text-center">{`Tidak ada data dengan pencarian '${query}'`}</td>
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

Index.layout = (page) => <Main children={page} />;

export default Index;
