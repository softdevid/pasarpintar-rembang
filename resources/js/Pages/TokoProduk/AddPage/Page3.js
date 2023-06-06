import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page3({ setPage, forms, setForms, values, rupiah, props }) {
  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
  };

  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    axios
      .post(`/toko/produk`, { values, forms })
      .then((res) => {
        toast.success("Berhasil menambah", {
          position: toast.POSITION.TOP_CENTER
        })

        setTimeout(() => {
          router.get(`/toko/produk`)
        }, 2000);

      })
      .catch((err) => setErrors(err.response.data.errors))
  }

  function deleteErrors() {
    setErrors({})
  }
  return (
    <>
      <ToastContainer autoClose={2000} />
      {errors.length > 0 ? (
        <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg aria-hidden="false" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {errors && Object.keys(errors).map((key) => (
              <div key={key}>
                <span className="font-medium">{errors[key]}</span>
              </div>
            ))}
          </div>
          <button onClick={deleteErrors}>Hapus error</button>
        </div>
      ) : (
        <div className="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Pastikan semua data terisi</span>
          </div>
        </div>
      )}


      <div className="container mx-2">
        <div className="grid grid-cols-1 gap-8">
          {forms.map((form, index) => (
            <div key={index}>
              <b>Option</b> {index + 1}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-8">
                <div>
                  <label>Nama Varian</label>
                  <input
                    type="text"
                    name="namaHarga" className="w-full rounded-md"
                    value={form.namaHarga}
                    onChange={(event) => handleChangeOption(event, index)} />
                </div>
                <div>
                  <label>Harga Beli</label>
                  <input
                    type="number"
                    name="hrgBeli"
                    min={0}
                    value={form.hrgBeli} className="w-full rounded-md" placeholder="contoh: 125000"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                  {rupiah(form.hrgBeli)}

                </div>
                <div>
                  <label>Harga Jual</label>
                  <input
                    type="number"
                    name="hrgJual"
                    min={0}
                    value={form.hrgJual} className="w-full rounded-md" placeholder="contoh: 125000"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                  {rupiah(form.hrgJual)}
                </div>
                <div>
                  <label>Stok Gudang</label>
                  <input
                    type="number"
                    min={0}
                    name="stokGudang"
                    placeholder="stok yang tidak ditampilkan olshop"
                    value={form.stokGudang} className="w-full rounded-md"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                </div>
                <div>
                  <label>Stok Toko</label>
                  <input
                    type="number"
                    min={0}
                    name="stokToko"
                    placeholder="stok yang akan ditampilkan olshop"
                    value={form.stokToko} className="w-full rounded-md"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-3 mt-5">
        <button onClick={() => setPage(2)} className="bg-gray-500 text-white rounded-lg p-2">Sebelumnya</button>
        <button onClick={() => handleSubmit()} className="bg-blue-600 text-white p-2 ml-3 rounded-lg">Simpan</button>
      </div>
    </>
  )
}

export default Page3;
