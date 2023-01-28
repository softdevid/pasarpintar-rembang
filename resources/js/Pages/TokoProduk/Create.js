
import Main from "@/Components/TokoTemplate/Main";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import axios from "axios";
import React, { useState } from "react";



const Create = (props) => {
  console.log(props);

  const handleSubmit = () => {
    Inertia.post("/toko/produk", { values, images, image });
  }

  const [values, setValues] = useState({
    namaProduk: "",
    idKategori: "",
    idKategoriGlobal: "",
    satuan: "",
    stokToko: "",
    stokGudang: "",
    hrgJual: "",
    hrgBeli: "",
    diskon: "",
    tglAwalDiskon: "",
    tglAkhirDiskon: "",
    deskripsi: "",
  })

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  //gambar utama
  const [image, setImage] = useState([]);
  const uploadImageUtama = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 3,
      maxSize: 2, //2mb
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info);
        setImage((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
        // console.log(images);
      }
    }
    )
    myWidget.open();
  }

  const [images, setImages] = useState([]);
  //gambar lain
  const uploadImages = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 1,
      maxSize: 2, //2mb
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info);
        setImages((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
        // console.log(images);
      }
    }
    )
    myWidget.open();
  }

  const [imagesToRemove, setImagesToRemove] = useState(null);

  const deleteImage = (publicId) => {
    setImagesToRemove(publicId);
    Inertia.post('/delete-image', publicId)
    // then(() => {
    setImagesToRemove(null);
    setImages((prev) => prev.filter((img) => img.public_id !== publicId));
    setImage((prev) => prev.filter((img) => img.public_id !== publicId));
    // })
    //   .catch((e) => console.log(e))
  }


  return (
    <>

      <div>
        <h1 className="font-bold text-3xl">Toko Admin List</h1>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div>
          <label>Nama Produk</label>
          <input placeholder="Nama Produk" id="namaProduk" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.namaProduk} />
          {props.errors.namaProduk && <div className="text-red-600">{props.errors.namaProduk}</div>}
        </div>
        <div>
          <label>Kategori Toko</label>
          <select id="idKategori" onChange={handleChange} value={values.idKategori} className="bg-white w-full rounded-md p-2 border border-black">
            <option>Pilih Kategori</option>
            <option value="1">Lainnya</option>
          </select>
          {props.errors.idKategori && <div className="text-red-600">{props.errors.idKategori}</div>}
        </div>
        <div>
          <label>Kategori Global</label>
          <select id="idKategoriGlobal" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.idKategoriGlobal} >
            <option>Pilih Kategori Global</option>
            <option value="1">Lainnya</option>
          </select>
          {props.errors.idKategoriGlobal && <div className="text-red-600">{props.errors.idKategoriGlobal}</div>}
        </div>
        <div>
          <label>Satuan Jual</label>
          <input type="text" placeholder="Satuan Jual" id="satuan" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.satuan} />
          {props.errors.satuan && <div className="text-red-600">{props.errors.satuan}</div>}
        </div>
        <div>
          <label>Harga Jual</label>
          <input placeholder="Harga Jual" id="hrgJual" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.hrgJual} />
          {props.errors.hrgJual && <div className="text-red-600">{props.errors.hrgJual}</div>}
        </div>
        <div>
          <label>Harga Beli</label>
          <input placeholder="Harga Beli" id="hrgBeli" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.hrgBeli} />
          {props.errors.hrgBeli && <div className="text-red-600">{props.errors.hrgBeli}</div>}
        </div>
        <div>
          <label>Harga Diskon</label>
          <input placeholder="Harga Diskon" id="diskon" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.diskon} />
          {props.errors.diskon && <div className="text-red-600">{props.errors.diskon}</div>}
        </div>
        <div>
          <label>Tanggal Awal Diskon</label>
          <input type="date" id="tglAwalDiskon" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.tglAwalDiskon} />
          {props.errors.tglAwalDiskon && <div className="text-red-600">{props.errors.tglAwalDiskon}</div>}
        </div>
        <div>
          <label>Tanggal Akhir Diskon</label>
          <input type="date" id="tglAkhirDiskon" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.tglAkhirDiskon} />
          {props.errors.tglAkhirDiskon && <div className="text-red-600">{props.errors.tglAkhirDiskon}</div>}
        </div>
        <div>
          <label>Stok Toko</label>
          <input type="number" min="0" placeholder="isi stok toko" id="stokToko" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.stokToko} />
          {props.errors.stokToko && <div className="text-red-600">{props.errors.stokToko}</div>}
        </div>
        <div>
          <label>Stok Gudang</label>
          <input type="number" min="0" placeholder="isi stok gudang" id="stokGudang" className="bg-white w-full rounded-md p-2 border border-black"
            onChange={handleChange} value={values.stokGudang} />
          {props.errors.stokGudang && <div className="text-red-600">{props.errors.stokGudang}</div>}
        </div>
      </div>

      {/* gambar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Gambar Utama</label>
          <button onClick={() => uploadImageUtama()} className="w-full bg-white p-1 border-black border rounded-md">Upload gambar</button>
          <div className="grid grid-cols-3 gap-4">
            {image.map((image, i) => {
              return (
                <div key={i}>
                  <img src={image.url} className="w-30 h-30" />
                  <button onClick={() => deleteImage({ publicId: image.public_id })}>Hapus</button>
                </div>
              )
            })}
          </div>
        </div>
        <div>
          <label>Gambar Lain</label>
          <button onClick={() => uploadImages()} className="w-full bg-white p-1 border-black border rounded-md">Upload gambar</button>
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, i) => {
              return (
                <div key={i}>
                  <img src={image.url} className="w-30 h-30" />
                  <button onClick={() => deleteImage({ publicId: image.public_id })}>Hapus</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <Link href="/toko/produk" className="bg-gray-700 text-white hover:bg-gray-800 p-2 rounded-md">Kembali</Link>
        <button onClick={() => handleSubmit()} className="rounded-md bg-blue-500 text-white hover:bg-blue-600 p-2 ml-3">Tambah</button>
      </div>
    </>
  );
}

Create.layout = (page) => <Main children={page} />;

export default Create;
