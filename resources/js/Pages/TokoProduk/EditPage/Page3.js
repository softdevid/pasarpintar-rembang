import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page3({ setPage, forms, setForms, values, rupiah, props }) {
  const [errors, setErrors] = useState({})
  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
  };

  const handleSubmit = () => {
    // router.patch(`/toko/produk/${props.produk.id}`, { values, forms })
    axios
      .patch(`/toko/produk/${props.produk.id}`, { values, forms })
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })

        setTimeout(() => {
          router.get(`/toko/produk`)
        }, 2000);
      })
      .catch((err) => setErrors(err.response.data.errors))
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="grid grid-cols-2 md:grid-cols-5 bg-red-600 text-white">
        {errors && Object.keys(errors).map((key) => (
          <div key={key}>
            <span>{errors[key]}</span>
          </div>
        ))}
      </div>

      <div className="container mx-2">
        <div className="grid grid-cols-1 gap-8">
          {forms.map((form, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-8">
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
                    value={form.hrgBeli} className="w-full rounded-md"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                  {rupiah(form.hrgBeli)}

                </div>
                <div>
                  <label>Harga Jual</label>
                  <input
                    type="number"
                    name="hrgJual"
                    value={form.hrgJual} className="w-full rounded-md"
                    onChange={(event) => handleChangeOption(event, index)}
                  />
                  {rupiah(form.hrgJual)}
                </div>
                <div>
                  <label>Stok Gudang</label>
                  <input
                    type="number"
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

      <div className="mx-2 mt-5">
        <button onClick={() => setPage(2)} className="bg-gray-500 text-white rounded-lg p-2">Sebelumnya</button>
        <button onClick={() => handleSubmit()} className="bg-blue-600 text-white p-2 ml-3 rounded-lg">Simpan</button>
      </div>
    </>
  )
}

export default Page3;
