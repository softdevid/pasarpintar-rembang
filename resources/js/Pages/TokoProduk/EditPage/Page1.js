import { router } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Page1({ setPage, values, setValues, props, handleChange, namaKategori, setNamaKategori, AddKategori }) {
  console.log(values)
  //gambar utama
  const [image, setImage] = useState([]);
  const uploadImageUtama = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 1,
      sources: ['local', 'camera'],
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // setImage((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
        setValues(values => ({
          ...values,
          url: result.info.url,
          public_id: result.info.public_id
        }))
        const data = {
          url: result.info.url,
          public_id: result.info.public_id,
          index: 0
        }
        router.post('/image/session', data);
      }
    }
    )
    myWidget.open();
  }

  const deleteImage = publicId => {
    // router.post('/delete-image', publicId);
    axios.post(`/delete-image`, publicId)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setValues(values => ({
          ...values,
          url: "",
          public_id: ""
        }))
      })
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="mx-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div className="md:mb-3">
            <label>Nama Produk</label>
            <input placeholder="Nama Produk" id="namaProduk" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={handleChange} value={values.namaProduk} />
            {props.errors.namaProduk && <div className="text-red-600">{props.errors.namaProduk}</div>}
          </div>
          <div className="md:mb-3">
            <label>Kategori Global</label>
            <select id="idKategoriGlobal" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={handleChange} value={values.idKategoriGlobal} >
              <option>Pilih Kategori Global</option>
              {props.kategoriGlobal.map((k, i) => {
                return (
                  <>
                    <option key={i} value={k.id}>{k.namaKategoriGlobal}</option>
                  </>
                )
              })}
            </select>
            {props.errors.idKategoriGlobal && <div className="text-red-600">{props.errors.idKategoriGlobal}</div>}
          </div>
          <div className="md:mb-3">
            <label>Kategori Toko</label>
            <select id="idKategori" onChange={handleChange} value={values.idKategori} className="bg-white w-full rounded-md p-2 border border-black">
              <option>Pilih Kategori</option>
              {props.kategori.map((k, i) => {
                return (
                  <>
                    <option key={i} value={k.id}>{k.namaKategori}</option>
                  </>
                )
              })}
            </select>
            {props.errors.idKategori && <div className="text-red-600">{props.errors.idKategori}</div>}
          </div>
          <div className="md:mb-3">
            <label>Tambah Kategori Toko</label>
            <div className="flex">
              <input id="namaKategori" placeholder="Nama kategori toko" className="bg-white w-full rounded-l-md p-2 border border-black"
                onChange={(e) => setNamaKategori(e.target.value)} value={namaKategori} />
              <button onClick={AddKategori} className="p-2 bg-blue-600 text-white rounded-r-md">Tambah</button>
            </div>
            {props.errors.namaKategori && <div className="text-red-600">{props.errors.namaKategori}</div>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <div>
            <label>Thumbnail Produk (wajib)</label>
            {values.url === "" ? (
              <button onClick={() => uploadImageUtama()} className="w-full bg-white p-1 border-black border rounded-md">Upload gambar</button>
            ) : (
              <>
                <div>
                  <img src={values.url} className="max-w-md max-h-32" /> <br />
                  <button onClick={() => deleteImage({ publicId: values.public_id })}>Hapus</button>
                </div>
              </>
            )
            }
          </div>
        </div>

        <div className="mt-3">
          <label>Deskripsi</label>
          <textarea type="text" className="w-full h-48" id="deskripsi" onChange={handleChange} value={values.deskripsi} />
        </div>

        <button onClick={() => setPage(2)} className="bg-sky-400 text-white rounded-lg p-2 mt-5">Selanjutnya</button>
      </div>
    </>
  );
}

export default Page1;
