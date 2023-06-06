import { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";

function Page1({ setPage, values, props, handleChange, namaKategori, setNamaKategori, AddKategori }) {

  //gambar utama
  const [image, setImage] = useState([]);
  const uploadImageUtama = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      sources: ['local', 'camera'],
      uploadPreset: 'ivedm7py',
      maxFiles: 1,
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info);
        setImage((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
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
    router.post('/delete-image', publicId);
  }

  return (
    <div className="mx-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label>Nama Produk</label>
          <input placeholder="Nama Produk" id="namaProduk" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.namaProduk} />
        </div>

        <div>
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
        </div>
        <div>
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
        </div>
        <div>
          <label>Tambah Kategori Toko</label>
          <div className="flex">
            <input id="namaKategori" placeholder="Nama kategori toko" className="bg-white w-full rounded-l-md p-2 border border-black"
              onChange={(e) => setNamaKategori(e.target.value)} value={namaKategori} />
            <button onClick={AddKategori} className="p-2 bg-blue-600 text-white rounded-r-md">Tambah</button>
          </div>
        </div>
        <div>
          <label>Thumbnail Produk (wajib)</label>
          {props.image < 1 &&
            <button onClick={() => uploadImageUtama()} className="w-full bg-white p-1 border-black border rounded-md">Upload gambar</button>
          }
          <div className="grid grid-cols-4 gap-4">
            {props.image.map((data, i) => {
              return (
                <div key={i}>
                  <img src={data.url} className="max-w-md max-h-32" />
                  <button onClick={() => deleteImage({ publicId: data.public_id })}>Hapus</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-3">
        <label>Deskripsi</label>
        <textarea type="text" className="w-full h-48" id="deskripsi" onChange={handleChange} value={values.deskripsi} />
      </div>

      <button onClick={() => setPage(2)} className="bg-sky-400 text-black rounded-lg p-2 mt-5">Selanjutnya</button>
    </div>
  );
}

export default Page1;
