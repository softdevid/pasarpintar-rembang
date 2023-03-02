import { Head, Link } from "@inertiajs/react";
import React from "react";

const LaporanBulanan = (props) => {

  console.log(props);
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      <Head title={props.title} />
      <div className="h-2 bg-sky-600 top-0 w-full"></div>
      <div className="container">
        <div className="my-3">
          <div>
            <h1 className="text-2xl font-bold mb-3">{props.title} toko {props.namaToko}</h1>
            <p>Bulan: {props.date}</p>
            <p className="mb-3">Omset: {formatter.format(props.omset)}</p>

            <div className="flex">
              <Link href="/toko/laporan" className="bg-gray-600 text-white p-1 md:p-2 hover:bg-gray-700 rounded-lg mx-1">Kembali</Link>
              <Link href="#" className="bg-red-600 text-white p-1 md:p-2 hover:bg-red-700 rounded-lg mx-1">PDF</Link>
              <Link href="#" className="bg-green-600 text-white p-1 md:p-2 hover:bg-green-700 rounded-lg mx-1">Excel</Link>
            </div>
          </div>
        </div>
        <div>
          <table className="table-auto overflow-x-auto relative shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2 md:p-3">
                  #
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Nama Produk
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Harga Jual
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Harga Diskon
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Jumlah Jual
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Biaya admin
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
                  Total
                </th>
                <th scope="col" className="px-4 py-2 md:p-3">
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
                    <td>{formatter.format(data.hrgJual)}</td>
                    <td>{formatter.format(data.hrgDiskon)}</td>
                    <td>{data.qty}</td>
                    <td>{formatter.format(data.biayaAdmin)}</td>
                    <td>{formatter.format((data.hrgJual + data.hrgDiskon + data.biayaAdmin) * data.qty)}</td>
                    <td>{data.tglOrder}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-center">Omset: {formatter.format(props.omset)}</p>
        </div>
      </div>
    </>
  )

}

export default LaporanBulanan;
