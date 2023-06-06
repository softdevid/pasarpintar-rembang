import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Head, router } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import axios from "axios";

const Index = (props) => {

  const [query, setQuery] = useState("");
  const keys = ["namaKategori"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleModalOpen = (data) => {
    setModalData(data);
    setIsModalOpen(true);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setModalData({});
    setIsModalOpen(false);
    setIsOpen(false);
  };

  // const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Head title={props.title} />
      <ToastContainer autoClose={2000} />
      <div className="grid grid-cols-2 gap-4">
        <h1 className="font-bold text-3xl">Kategori</h1>
        <div className="items-end justify-end flex">
          <button onClick={() =>
            handleModalOpen({
              judul: "Tambah",
              errors: props.errors,
            })
          } className="bg-blue-600 text-white p-1 md:p-2 rounded-lg hover:bg-blue-700 flex" type="button">
            <PlusCircleIcon className="w-5 h-5 mt-0.5" />Kategori
          </button>
        </div>
      </div>
      {isOpen ? (
        <>
          <div className="grid grid-cols-2 gap-4">
            {/* <Data props={props} search={search} query={query} handleModalOpen={handleModalOpen} /> */}
            <Add isOpen={isModalOpen}
              closeModal={handleModalClose}
              data={modalData} />
          </div>
        </>
      ) : (
        <>
          <Data props={props} search={search} query={query} handleModalOpen={handleModalOpen} />
        </>
      )
      }


    </>
  );
};

function Data({ props, query, search, handleModalOpen }) {
  function handleDeleteKategori({ id }) {
    const data = { id }
    if (confirm("Yakin mau hapus kategori?")) {
      router.post('/toko/kategori/delete', data);
      toast.success("Berhasil menghapus Kategori", {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }
  return (
    <>
      <Head title={props.title} />
      <div>
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
                        <button as="button" onClick={() =>
                          handleModalOpen({
                            judul: "Edit",
                            id: data.id,
                            namaKategori: data.namaKategori,
                          })
                        } data-modal-target="modalDelete" data-modal-toggle="modalDelete" className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</button>
                        <button as="button" onClick={() => handleDeleteKategori({ id: data.id })} data-modal-target="modalDelete" data-modal-toggle="modalDelete" className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</button>
                      </td>
                    </tr>

                  );
                })
              ) : query !== "" ? (
                <tr>
                  <td colSpan="3" className="text-center">{`Tidak ada data dengan pencarian '${query}'`}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">{`Tidak ada data`}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function Add(props) {

  const { data } = props;
  const [namaKategori, setNamaKategori] = useState("");
  const [namaKategoriEdit, setNamaKategoriEdit] = useState(data.namaKategori);
  const [errors, setErrors] = useState({})

  function handleAddKategori() {
    const data = {
      namaKategori
    }

    axios
      .post("/toko/kategori", data)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          router.get('/toko/kategori')
        }, 2000);
      })
      .catch((err) => setErrors(err.response.data.errors))
  }

  function handleEditKategori(id) {
    const data = {
      namaKategori: namaKategori,
      id: id,
    }

    axios
      .post(`/toko/kategori/update`, data)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          router.get('/toko/kategori')
        }, 2000);
      })
      .catch((err) => setErrors(err.response.data.errors))
  }

  const closeModal = () => {
    props.closeModal();
  };

  return (
    <>
      {data.judul === "Edit" ? (
        <>
          <div className="relative top-0 left-0 overflow-x-auto right-0 w-full h-full max-w-md md:h-auto z-50">
            <div className="relative">
              <div>
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Kategori</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your kategori</label>
                    <input defaultValue={data.namaKategori} onChange={(e) => setNamaKategori(e.target.value)} type="text" name="kategori" id="kategori" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
                    {errors.namaKategori && <p className="text-red-600">{errors.namaKategori}</p>}
                  </div>
                  <div>
                    <button onClick={() => handleEditKategori({ id: data.id })} className="bg-blue-700 text-white p-2 rounded-lg">Simpan</button>
                    <button onClick={() => closeModal()} className="bg-gray-700 text-white p-2 rounded-lg ml-3">Batal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="relative top-0 left-0 overflow-x-auto right-0 w-full h-full lg:max-w-md md:h-auto z-30">
            <div className="relative">
              <div>
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Tambah Kategori</h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your kategori</label>
                    <input value={namaKategori} onChange={(e) => setNamaKategori(e.target.value)} type="kategori" name="kategori" id="kategori" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white sm:w-full" placeholder="Nama Kategori Toko" required />
                    {errors.namaKategori && <p className="text-red-600">{errors.namaKategori}</p>}
                  </div>
                  <div>
                    <button onClick={() => handleAddKategori()} className="bg-blue-700 text-white p-2 rounded-lg">Tambah</button>
                    <button onClick={() => closeModal()} className="bg-gray-700 text-white p-2 rounded-lg ml-3">Batal</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

    </>
  )
}



Index.layout = (page) => <Main children={page} />;

export default Index;
