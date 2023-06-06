import { Head, Link } from "@inertiajs/react";
import React, { useState } from "react";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LaporanHarian = (props) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

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
      {props.laporan.length > 0 ? (
        <>
          <div className="m-5 my-4 grid grid-cols-2">
            <div>
              <h1 className="text-2xl font-bold mb-3">Laporan Harian Toko {props.laporan[0].namaToko}</h1>
              <div className="flex">
                <Link
                  href={`/admin/laporan/${props.laporan[0].idToko}`}
                  className="bg-gray-600 text-white p-2 hover:bg-gray-700 rounded-lg mx-1"
                >
                  Kembali
                </Link>
                <button
                  onClick={handleOpen}
                  className="bg-blue-600 text-white p-2 hover:bg-blue-700 rounded-lg mx-1"
                >
                  Grafik
                </button>
                {/* <Link
              href="#"
              className="bg-red-600 text-white p-2 hover:bg-red-700 rounded-lg mx-1"
            >
              PDF
            </Link>
            <Link
              href="#"
              className="bg-green-600 text-white p-2 hover:bg-green-700 rounded-lg mx-1"
            >
              Excel
            </Link> */}
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
                    Jumlah Terjual
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
                      <td>{data.namaProduk}</td>
                      <td>{formatter.format(data.hrgBeli)}</td>
                      <td>{formatter.format(data.hrgJual)}</td>
                      <td>{data.qty}</td>
                      <td>{formatter.format(data.total)}</td>
                      <td>{data.tglOrder}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <p className="text-center mr-3">
              Omset: {formatter.format(props.omset)}
            </p>
          </div>


          {open && (
            <div class="fixed z-10 inset-0 overflow-y-auto">
              <div class="flex items-end justify-center min-h-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                  <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Grafik Tanggal {props.date}
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
      ) : (
        <>
          <h1 className="text-center text-2xl mt-4">Tidak ada Laporan penjualan</h1>
          <div className="flex items-center justify-center">
            <Link href={`/admin/laporan/${props.toko.id}`}
              className="bg-gray-600 text-white p-2 hover:bg-gray-700 rounded-lg mx-auto"
            >
              Kembali
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default LaporanHarian;
