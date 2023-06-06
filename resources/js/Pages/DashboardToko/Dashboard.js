import React from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Head, Link } from "@inertiajs/react";
import ChartDashboard from "@/Components/ChartDashboard";

const Dashboard = (props) => {
  return (
    <>
      <Head title={props.title} />
      <div>
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="w-full bg-blue-600 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Omset hari ini</div>
            <div>{props.omset}</div>
          </div>
        </div>
        <div className="w-full bg-green-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Pesanan Baru</div>
            <div>{props.totalOrder}</div>
          </div>
        </div>
        <div className="w-full bg-yellow-400 text-black rounded-md">
          <div className="m-3 text-center">
            <div>Produk</div>
            <div>{props.totalProduk}</div>
          </div>
        </div>
        <div className="bg-red-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Kategori</div>
            <div>{props.totalKategori}</div>
          </div>
        </div>
        <div className="bg-purple-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Komisi Admin</div>
            <div>{props.totalKomisi}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-8">
        <div className="overflow-x-auto relative sm:rounded-lg">
          <table className="shadow-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Produk
                </th>
              </tr>
            </thead>
            <tbody>
              {props.produk.data.map((data, i) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th key={i} scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.namaProduk}
                      </th>
                    </tr>
                  </>
                )
              })}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link href={'/toko/produk'} className="text-blue-700 font-bold">Selengkapnya..</Link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto relative sm:rounded-lg">
          <table className="shadow-md w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Kategori
                </th>
              </tr>
            </thead>
            <tbody>
              {props.kategori.data.map((data, i) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th key={i} scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.namaKategori}
                      </th>
                    </tr>
                  </>
                )
              })}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Link href={'/toko/kategori'} className="text-blue-700 font-bold">Selengkapnya..</Link>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-full h-auto">
        <ChartDashboard />
      </div>
    </>
  );
};

Dashboard.layout = (page) => <Main children={page} />;

export default Dashboard;
