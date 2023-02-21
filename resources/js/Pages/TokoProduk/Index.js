import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";

import axios from "axios";

const Index = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["namaProduk"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  }

  const [produk, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log(produk);

  useEffect(() => {
    axios.get(`/api/data-produk?page=${currentPage}`).then((response) => {
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = (id) => {
    router.post("/toko/produk/delete", id);
  }

  const [dataShow, setDataShow] = useState({});

  const handleShow = (data) => {
    setDataShow(data);
    setShowAktif(true);
    // console.log(dataShow);
  }

  const handleCloseShow = () => {
    setDataShow({});
    setShowAktif(false);
  }

  const [showAktif, setShowAktif] = useState(false);

  return (
    <>
      {!showAktif ? (
        <>
          <Head title={props.title} />
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
                  {/* <th scope="col" className="py-3 px-6">
                Stok Gudang
              </th>
              <th scope="col" className="py-3 px-6">
                Stok Toko
              </th> */}
                  <th scope="col" className="py-3 px-6">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {search(produk).length > 0 ? (
                  search(produk).map((data, i) => {
                    return (

                      <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {i + 1}
                        </th>
                        <td>{data.namaProduk}</td>
                        <td>{data.hargas.length} item</td>
                        <td>{data.hargas.length} item</td>
                        <td className="flex">
                          <button onClick={() => handleShow(data)} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</button>
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
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <Show dataShow={dataShow} props={props} handleCloseShow={handleCloseShow} />
        </>
      )}

    </>
  );
};

function Show({ dataShow, props, handleCloseShow }) {
  console.log(dataShow);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <>
      <Head title={dataShow.namaProduk} />
      <div className="grid grid-cols-2 gap-4">
        <h1 className="font-bold text-3xl">Detail {dataShow.namaProduk}</h1>
        <div className="text-right">
          <button onClick={handleCloseShow} className="bg-gray-600 text-white p-2 rounded-lg">Kembali</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 my-3">
        <div>
          <img src={dataShow.imgUrl} className="w-80 h-80" />
        </div>
        <div>
          <p>Nama Produk: {dataShow.namaProduk}</p>
          <p>Terjual: {dataShow.terjual}</p>
          <p>Toko: {dataShow.toko.namaToko}</p>
          <div className="mt-3">
            <h1>Harga Jual:</h1>
            {dataShow.hargas.map((harga, i) => {
              return (
                <div key={i}>
                  <b>{harga.namaHarga} = {rupiah(harga.hrgJual)}</b>
                </div>
              )
            })}
          </div>
          <div className="mt-3">
            <h1>Harga Beli:</h1>
            {dataShow.hargas.map((harga, i) => {
              return (
                <div key={i}>
                  <b>{harga.namaHarga} : {rupiah(harga.hrgBeli)}</b>
                </div>
              )
            })}
          </div>
          <div className="mt-3">
            <h1>Stok:</h1>
            {dataShow.hargas.map((harga, i) => {
              return (
                <div key={i}>
                  <b>Stok Gudang: {harga.namaHarga} = {harga.stokGudang}</b>
                  <b>Stok Toko: {harga.namaHarga} = {harga.stokToko}</b>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div>
        <p>{dataShow.deskripsi}</p>
      </div>
    </>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center bg-white border-2">
      {pageNumbers.map((pageNumber) => (
        <button className="p-2"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber === currentPage ? (
            <>
              <b className="text-blue-600">{pageNumber}</b>
            </>
          ) : (
            <>
              <b className="text-black">{pageNumber}</b>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

Index.layout = (page) => <Main children={page} />;

export default Index;
