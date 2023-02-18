import React, { Fragment, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import { FormatRupiah } from "@/config/formatRupiah";

const Checkout = ({ title, filteredProduk }) => {
  const [filtCart, setFiltCart] = useState(Object.entries(filteredProduk));
  console.log(filtCart);

  return (
    <div className="container py-3 md:py-5">
      <div className="flex flex-col items-center md:flex-row-reverse md:justify-between md:items-start space-y-4 md:space-y-0">
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-2xl font-medium leading-none text-gray-900 dark:text-white">
              Daftar Produk
            </h5>
          </div>
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {filtCart.map(([toko, produks], i) => (
                <Fragment key={toko}>
                  <li className={`${i == 0 ? "pb-3" : "pt-2 pb-3 sm:py-4"}`}>
                    <div className="flex items-start justify-center space-x-4">
                      <Link
                        href={produks[0].produk.slugToko}
                        className="text-lg"
                      >
                        {toko}
                      </Link>
                    </div>
                  </li>
                  {produks.map((krj, i) => (
                    <li key={i} className="py-3 sm:py-4 bg-slate-100">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-24 w-24 rounded-md"
                            src={krj.produk.imgUrl}
                            alt={krj.produk.imgName}
                          />
                        </div>
                        <div className="flex-1 min-w-0 overflow-hidden">
                          <Link
                            href={`${krj.produk.slugToko}/${krj.produk.slugProduk}`}
                            className="text-sm font-medium text-gray-900 line-clamp-2 text-ellipsis dark:text-white"
                          >
                            {krj.produk.namaProduk}
                          </Link>
                          <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                            {krj.harga.namaHarga}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            <FormatRupiah value={`${krj.harga.hrgJual}000`} />
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                          <div className="mr-2">
                            <FormatRupiah
                              value={`${krj.qty * krj.harga.hrgJual}000`}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </Fragment>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" action="#">
            <h5 className="text-2xl font-medium text-gray-900 dark:text-white">
              Formulir Checkout
            </h5>
            <div>
              <h5 className="text-xl font-medium text-gray-900 mb-5">
                Informasi Penerima
              </h5>
              <div className="mb-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="noHp"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nomor HP
                </label>
                <input
                  type="text"
                  id="noHp"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="namaPenerima"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="namaPenerima"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="mb-3">
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
                  placeholder="Leave a comment..."
                ></textarea>
              </div>
            </div>
            <div>
              <h5 className="text-xl font-medium text-gray-900 mb-5">
                Metode Pembayaran
              </h5>
              <div className="mb-3">
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select your country
                </label>
                <select
                  id="countries"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Germany</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Checkout.layout = (page) => <Main children={page} />;

export default Checkout;
