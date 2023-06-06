import { Head, router } from "@inertiajs/react";
import Main from "@/Components/AdminTemplate/Main";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KomisiIndex = ({ title, komisi }) => {
  const [statusKomisi, setStatusKomisi] = useState("tunda")

  function handleUpdate(data) {
    const values = { data, statusKomisi }

    axios
      .post(`/admin/komisi/update`, values)
      .then((res) => {
        toast.success("Berhasil Mengubah status jadi sudah bayar", {
          position: toast.POSITION.TOP_CENTER
        })

        setTimeout(() => {
          router.get(`/admin/komisi`)
        }, 2000);

      })
  }
  const formatRupiah = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

  return (
    <>
      <Head title={title} />
      <ToastContainer autoClose={2000} />
      <div>
        <h1 className="text-md md:text-2xl">{title}</h1>
      </div>
      <div className="overflow-auto bg-white">
        <table className="w-full">
          <thead>
            <tr className="text-center">
              <th className="px-4 py-2">Nama Toko</th>
              <th className="px-4 py-2">Total Komisi</th>
              <th className="px-4 py-2">Status Komisi</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {komisi.map((data, i) => {
              return (
                <>
                  <tr key={i} className="text-center">
                    <td className="px-4 py-2">{data.namaToko}</td>
                    <td className="px-4 py-2">{formatRupiah(data.totalKomisi)}</td>
                    <td className="px-4 py-2">
                      <select value={statusKomisi} onChange={(e) => setStatusKomisi(e.target.value)}>
                        <option value="tunda">Belum bayar</option>
                        <option value="selesai">Sudah bayar</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleUpdate({ id: data.id })} className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg">Lunas</button>
                    </td>
                  </tr>
                </>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

KomisiIndex.layout = (page) => <Main children={page} />
export default KomisiIndex;
