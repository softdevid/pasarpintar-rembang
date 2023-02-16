import Main from "@/Components/TokoTemplate/Main";
import { Head, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import { Route, Router } from "react-router-dom";
// import DOMPurify from 'dompurify';

const Create2 = (props) => {

  const [values, setValues] = useState({
    namaProduk: "",
    idKategori: "",
    idKategoriGlobal: "",
    stokToko: "",
    stokGudang: "",
    // hrgJual: [],
    // hrgBeli: [],
    diskon: "",
    tglAwalDiskon: "",
    tglAkhirDiskon: "",
    deskripsi: "",
    jenisHarga: "warna",
    namaHarga: "",
  })

  const [forms, setForms] = useState([
    {
      namaHarga: "blue",
      hrgBeli: "",
      hrgJual: "",
      stokGudang: "",
      stokToko: "",
      jenisHarga: "warna",
    }
  ]);

  // function handleChange(e) {
  //   setHargas(values => ({
  //     ...values,
  //     [e.target.id]: e.target.value,
  //   }))
  // }

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <Head title={props.title} />

      <div>
        <h1 className="font-bold text-3xl">{props.title}</h1>
      </div>

      <div>
        {currentPage === 1 ? (
          <Page1
            setPage={setCurrentPage}
            values={values}
            setValues={setValues}
            props={props}
            handleChange={handleChange}
          />
        ) : currentPage === 2 ? (
          <Page2
            setPage={setCurrentPage}
            values={values}
            setValues={setValues}
            props={props}
            forms={forms}
            setForms={setForms}
            handleChange={handleChange}
          />
        ) : (
          <Page3
            setPage={setCurrentPage}
            values={values}
            setValues={setValues}
            props={props}
            handleChange={handleChange}
          />
        )}

      </div>
    </>
  )
}

function Page1({ setPage, values, props, handleChange }) {

  //gambar utama
  const [image, setImage] = useState([]);
  const uploadImageUtama = () => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 3,
      // maxSize: 2, //2mb
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info);
        setImage((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
        const data = {
          url: result.info.url,
          public_id: result.info.public_id,
        }
        router.post('/image/session', data);
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
        // const uploadedImage = result.info.files[0];
        setImages((prev) => [...prev, ({ url: result.info.url, public_id: result.info.public_id })]);
        const data = {
          url: result.info.url,
          public_id: result.info.public_id,
        }
        router.post('/image-lainnya/session', data);
      }
    }
    )
    myWidget.open();
  }


  const deleteImage = publicId => {
    router.post('/delete-image', publicId);
  }

  return (
    <div>
      <h1 className="text-xl font-bold my-4">Halaman 1</h1>


      <div className="mb-3">
        <label>Nama Produk</label>
        <input placeholder="Nama Produk" id="namaProduk" className="bg-white w-full rounded-md p-2 border border-black"
          onChange={handleChange} value={values.namaProduk} />
        {props.errors.namaProduk && <div className="text-red-600">{props.errors.namaProduk}</div>}
      </div>
      <div className="mb-3">
        <label>Kategori Toko</label>
        <select id="idKategori" onChange={handleChange} value={values.idKategori} className="bg-white w-full rounded-md p-2 border border-black">
          <option>Pilih Kategori</option>
          <option value="1">Lainnya</option>
        </select>
        {props.errors.idKategori && <div className="text-red-600">{props.errors.idKategori}</div>}
      </div>
      <div className="mb-3">
        <label>Kategori Global</label>
        <select id="idKategoriGlobal" className="bg-white w-full rounded-md p-2 border border-black"
          onChange={handleChange} value={values.idKategoriGlobal} >
          <option>Pilih Kategori Global</option>
          <option value="1">Lainnya</option>
        </select>
        {props.errors.idKategoriGlobal && <div className="text-red-600">{props.errors.idKategoriGlobal}</div>}
      </div>



      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label>Gambar Utama</label>
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
        <div>
          <label>Gambar Lain</label>
          {props.images.length <= 2 ? (
            <button onClick={() => uploadImages()} className="w-full bg-white p-1 border-black border rounded-md">Upload gambar</button>
          ) : (
            <>
              <p className="text-red-600 my-3">Gambar penuh</p>
            </>
          )
          }
          <div className="grid grid-cols-3 gap-4">
            {props.images.map((image, i) => {
              return (
                <div key={i} className="mt-2">
                  <img src={image.url} className="max-w-md max-h-32" />
                  <button onClick={() => deleteImage({ publicId: image.public_id })}>Hapus</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <button onClick={() => setPage(2)} className="bg-sky-400 text-white rounded-lg p-2 mt-5">Selanjutnya</button>
    </div>
  );
}

function Page2({ setPage, props, forms, setForms, handleChange, values }) {

  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
    // setHargas(newForms);
  };

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const addForm = () => {
    setForms([...forms, { namaHarga: "", hrgBeli: "", hrgJual: "", stokGudang: "", stokToko: "" }]);
  };

  const removeForm = (index) => {
    setForms(forms.filter((_, i) => i !== index));
  };

  const [variasiAktif, setVariasiAktif] = useState(false);
  const handleVariasiAktif = () => {
    setVariasiAktif(true);
  }

  const closeVariasiAktif = () => {
    setVariasiAktif(false);
    setForms([
      {
        namaHarga: "blue",
        hrgBeli: "",
        hrgJual: "",
        stokGudang: "",
        stokToko: "",
        jenisHarga: "warna",
      }
    ]);
  }

  return (
    <>
      {variasiAktif ? (
        <button onClick={closeVariasiAktif} className="bg-red-600 text-white hover:bg-red-700 p-2 rounded-lg">Nonaktif variasi</button>
      ) : (
        <button onClick={handleVariasiAktif} className="bg-green-500 text-white p-2 rounded-lg">Aktifkan variasi</button>
      )}

      {variasiAktif ? (
        <>
          <div>
            <div className="flex my-3">
              <div className="">
                <label>Jenis Varian</label>
                <input placeholder="Jenis Varian. misal warna" id="jenisHarga" className="bg-white w-full rounded-md p-2 border border-black"
                  onChange={handleChange} value={values.jenisHarga} />
                {props.errors.jenisHarga && <div className="text-red-600">{props.errors.jenisHarga}</div>}
                <button className="bg-sky-600 text-white p-2 rounded-lg my-3" onClick={addForm}>Add option</button>
              </div>
            </div>
            {forms.map((form, index) => (
              <div key={index}>
                <div className="grid gap-8 grid-cols-2 md:grid-cols-5 my-5">
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
                    {index > 0 &&
                      <button onClick={() => removeForm(index)} className="bg-red-600 text-white rounded-lg p-1 mt-2">Hapus Option</button>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {forms.map((form, index) => (
            <div key={index}>
              <div className="grid gap-8 grid-cols-2 md:grid-cols-5 my-5">
                <div className="hidden md:hidden">
                  <label>Nama Varian</label>
                  <input
                    type="text"
                    name="namaHarga" className="w-full rounded-md"
                    value="utama"
                    onChange={(event) => handleChangeOption(event, index)} disabled />
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
        </>
      )}

      {/* <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.auth.user.name) }} /> */}

      <button onClick={() => setPage(1)} className="bg-gray-500 text-white rounded-lg p-2 mt-5">Sebelumnya</button>
      <button onClick={() => setPage(3)} className="bg-sky-400 text-white rounded-lg p-2 mt-5 ml-3">Selanjutnya</button>
    </>
  );
}

function Page3({ setPage, values }) {
  return (
    <>
      <textarea type="text" className="w-full rounded-md">{values.deskripsi}</textarea>
      <button onClick={() => setPage(2)} className="bg-gray-500 text-white rounded-lg p-2 mt-5">Sebelumnya</button>
    </>
  )

}


Create2.layout = (page) => <Main children={page} />
export default Create2;
