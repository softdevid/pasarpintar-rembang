import { Link } from "@inertiajs/inertia-react";
import React from "react";

const LaporanBulanan = (props) => {

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      <div className="m-5 my-4 grid grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold mb-3">Laporan Harian Toko ...</h1>
          <div className="flex">
            <Link href="/toko/laporan" className="bg-gray-600 text-white p-2 hover:bg-gray-700 rounded-lg mx-1">Kembali</Link>
            <Link href="#" className="bg-red-600 text-white p-2 hover:bg-red-700 rounded-lg mx-1">PDF</Link>
            <Link href="#" className="bg-green-600 text-white p-2 hover:bg-green-700 rounded-lg mx-1">Excel</Link>
          </div>
        </div>
        <div className="text-xl text-right">
          <p>Tanggal: {props.date}</p>
          <p className="mb-3">Omset: Rp. {formatter.format(props.omset)}</p>
        </div>
      </div>
      <div className="mx-5">
        <table className="overflow-x-auto relative shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
                Jumlah Jual
              </th>
              <th scope="col" className="py-3 px-6">
                Total
              </th>
              <th scope="col" className="py-3 px-6">
                Tanggal Order
              </th>
            </tr>
          </thead>
          <tbody>
            {props.laporan.map((data, i) => {
              return (
                <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </th>
                  <td>{data.namaProduk}</td>
                  <td>{data.tglOrder}</td>
                  <td>{formatter.format(data.hrgBeli)}</td>
                  <td>{formatter.format(data.hrgJual)}</td>
                  <td>{data.jumlah}</td>
                  <td>{data.tglOrder}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="text-center mr-3">Omset: Rp: {props.omset}</p>
      </div>
    </>
  )

}

export default LaporanBulanan;
