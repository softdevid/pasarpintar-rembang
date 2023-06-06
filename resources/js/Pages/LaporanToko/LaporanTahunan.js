import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import numeral from 'numeral';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

const LaporanTahunan = (props) => {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  // const [data, setData] = useState([props.sales]);
  // Fungsi untuk mengubah format angka menjadi format mata uang rupiah
  const formatRupiah = (value) => `Rp ${numeral(value).format('0,0')}`;

  const data = {
    labels: props.laporan.map((data) => data.tglOrder),
    datasets: [
      {
        label: 'Sales',
        data: props.laporan.map((data) => data.total),
        fill: false,
        borderColor: '#4caf50',
        tension: 0.1,
        responsive: true,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        labels: data.labels,
      },
    },
  };

  const [open, setOpen] = useState(false);
  function handleOpen() {
    setOpen(true)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <>
      <Head title={props.title} />
      {/* <div className="h-2 bg-sky-600 top-0 w-full"></div> */}
      <div className="container mx-2">
        <div className="my-3 grid grid-cols-2 md:grid-cols-2">
          <div>
            <h1 className="text-md md:text-2xl font-bold mb-3">{props.title} toko {props.namaToko}</h1>
            <p>Tahun: {props.date}</p>
            <p className="mb-3">Omset: {formatter.format(props.omset)}</p>
          </div>
          <div className="text-right">
            {/* <Link href="#" className="bg-red-600 text-white p-1 md:p-2 hover:bg-red-700 rounded-lg mx-1">PDF</Link>
            <Link href="#" className="bg-green-600 text-white p-1 md:p-2 hover:bg-green-700 rounded-lg mx-1">Excel</Link> */}
            <Link href="/toko/laporan" className="bg-gray-600 text-white p-1 md:p-2 hover:bg-gray-700 rounded-lg mx-1">Kembali</Link>
          </div>
        </div>

        <button onClick={handleOpen} class="block w-full md:w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
          Grafik
        </button>
        <div className="overflow-auto">
          <table className="relative shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  #
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Nama Produk
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Harga Jual
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Harga Diskon
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Jumlah Jual
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Biaya admin
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
                  Total
                </th>
                <th scope="col" className="px-4 py-2 md:px-6 md:py-3">
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
                    <td>{formatter.format((data.hrgJual - data.hrgDiskon + data.biayaAdmin) * data.qty)}</td>
                    <td>{data.tglOrder}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="text-center">Omset: {formatter.format(props.omset)}</p>
        </div>
      </div>


      {open && (
        <div class="fixed z-10 inset-0 overflow-y-auto">
          <div class="flex items-end justify-center min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Grafik Tahun {props.date}
                </h3>
                <button onClick={handleClose} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="large-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-6 space-y-6">
                <Line data={data} options={options} />
              </div>

              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={handleClose} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )

}

export default LaporanTahunan;
