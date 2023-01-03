import React from "react";
import Main from "@/Components/TokoTemplate/Main";

const TokoAdminKategori = () => {
  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Toko Kategori</h1>
        <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" data-modal-toggle="tambahKategori">
          Tambah Kategori
        </button>
      </div>

      <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                #
              </th>
              <th scope="col" className="py-3 px-6">
                Kategori
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                1
              </th>
              <td>Elektronik</td>
              <td>
                <a href={'/toko-kategori/1/edit'} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</a>
                <a href={'/hapus'} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <div id="tambahKategori" tabindex="-1" class="border-2 border-black fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="relative w-full h-full max-w-md md:h-auto border-2 border-black">
          <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="tambahKategori">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6">
              <h1 className="text-lg font-bold text-center">Tambah Kategori</h1>
              <label className="mt-5 mb-2">Kategori</label>
              <input className="bg-white border shadow-md p-2 w-full" />
              <div className="mt-3">
                <button type="submit" class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Batal</button>
                <button data-modal-toggle="tambahKategori" type="button" class="mx-2 px-5 py-2.5 bg-gray-700 hover:bg-gray-800 text-white rounded-lg">Batal</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

TokoAdminKategori.layout = (page) => <Main children={page} />;

export default TokoAdminKategori;
