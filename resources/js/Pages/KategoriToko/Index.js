import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { router } from "@inertiajs/react";
// import { Modal } from 'flowbite-modal';

const Index = (props) => {
  console.log(props);

  const [query, setQuery] = useState("");
  const keys = ["namaKategori"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  }

  const [namaKategori, setNamaKategori] = useState("");

  function handleChange(e) {
    setNamaKategori(namaKategori => ({
      ...namaKategori,
      [e.target.id]: e.target.value,
    }))
  }

  function handleAddKategori() {
    const data = {
      namaKategori
    }
    router.post("/toko/kategori", data);
    setNamaKategori("");
  }

  function handleDeleteKategori({ id }) {
    const data = { id }
    routerpost('/toko/kategori/delete', data);
  }

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dataKategori, setDataKategori] = useState("");

  const handleOpenAdd = (data) => {
    setIsOpen(true);
    setDataKategori({ data });
  }

  return (
    <>
      <div className="flex">
        <h1 className="font-bold text-3xl">Kategori</h1>
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
        <div>
          <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700" type="button">
            Tambah Kategori
          </button>
          {/* <MyButton />
          <MyModal isOpen={isModalOpen} /> */}
        </div>
      </div>

      <div>
        <label>Tambah Kategori</label>
        <input onChange={handleAddKategori} />
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-3">
          <table className="overflow-x-auto relative shadow-md sm:rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
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
              {search(props.kategori.data).length > 0 ? (
                search(props.kategori.data).map((data, i) => {
                  return (

                    <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        {i + 1}
                      </th>
                      <td>{data.namaKategori}</td>
                      <td>
                        {/* <a href={`/toko-kategori/${data.slug}/edit`} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</a> */}
                        <button as="button" onClick={() => handleDeleteKategori({ id: data.id })} data-modal-target="modalDelete" data-modal-toggle="modalDelete" className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</button>
                      </td>
                    </tr>

                  );
                })
              ) : query !== "" ? (
                <tr>
                  <td colSpan="7">{`Tidak ada data dengan pencarian '${query}'`}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7">{`Tidak ada data`}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Add data={data} />
      </div>

    </>
  );
};

function Add(data) {
  return (
    <>
      <div className="relative top-0 left-0 overflow-x-auto right-0 w-full h-full max-w-md md:h-auto z-50">
        <div className="relative">
          <button onClick={() => setIsOpen(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Tambah Kategori</h3>
            <div className="space-y-6">
              <div>
                <label htmlFor="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your kategori</label>
                <input value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} type="kategori" name="kategori" id="kategori" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
                {props.errors.namaKategori && <p className="text-red-600">{props.errors.namaKategori}</p>}
              </div>
              <div>
                <button onClick={() => handleAddKategori()} className="bg-blue-700 text-white p-2 rounded-lg">Tambah</button>
                <button onClick={() => setIsOpen(false)} className="bg-gray-700 text-white p-2 rounded-lg ml-3">Batal</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



Index.layout = (page) => <Main children={page} />;

export default Index;
