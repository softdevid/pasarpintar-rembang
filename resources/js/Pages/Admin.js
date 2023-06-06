import React from "react";
import Main from "@/Components/AdminTemplate/Main";
import { Head } from "@inertiajs/react";

const Admin = (props) => {
  console.log(props);
  return (
    <>
      <Head title={props.title} />
      <div>
        <h1 className="font-bold text-3xl">Dashboard Admin</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="w-full bg-blue-600 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Toko</div>
            <div>{props.toko}</div>
          </div>
        </div>
        <div className="w-full bg-green-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Customer</div>
            <div>{props.customer}</div>
          </div>
        </div>
        <div className="w-full bg-yellow-400 text-black rounded-md">
          <div className="m-3 text-center">
            <div>Produk</div>
            <div>{props.produk}</div>
          </div>
        </div>
        <div className="bg-red-500 text-white rounded-md">
          <div className="m-3 text-center">
            <div>Kategori Global</div>
            <div>{props.kategoriGlobal}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-8">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Toko
                </th>
              </tr>
            </thead>
            <tbody>
              {props.tokos.data.map((data) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.namaToko}
                      </th>
                    </tr>
                  </>
                )
              })}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={'/admin/toko'} className="text-blue-700 font-bold">Selengkapnya..</a>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Kategori Global
                </th>
              </tr>
            </thead>
            <tbody>
              {props.kategoriGlobals.data.map((data) => {
                return (
                  <>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {data.namaKategoriGlobal}
                      </th>
                    </tr>
                  </>
                )
              })}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a href={'/admin/kategori'} className="text-blue-700 font-bold">Selengkapnya..</a>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

Admin.layout = (page) => <Main children={page} />;

export default Admin;
