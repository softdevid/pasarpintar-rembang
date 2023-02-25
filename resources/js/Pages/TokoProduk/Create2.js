import Main from "@/Components/TokoTemplate/Main";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Head, Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import * as Yup from 'yup';

// import DOMPurify from 'dompurify';

const Create2 = (props) => {
  const [values, setValues] = useState({
    namaProduk: "",
    idKategori: "",
    idKategoriGlobal: "",
    deskripsi: "",
    jenisHarga: "",
    url: "",
    public_id: ""
  })

  const [forms, setForms] = useState([
    {
      namaHarga: "",
      hrgBeli: "",
      hrgJual: "",
      stokGudang: "",
      stokToko: "",
      jenisHarga: "",
      url: "",
      public_id: "",
    }
  ]);

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [variasiAktif, setVariasiAktif] = useState(false);
  const handleVariasiAktif = () => {
    setVariasiAktif(true);
  }

  const closeVariasiAktif = (publicId) => {
    router.post("/delete-image-variasi-inaktive", { forms });
    setForms([
      {
        namaHarga: "",
        hrgBeli: "",
        hrgJual: "",
        stokGudang: "",
        stokToko: "",
        jenisHarga: "",
        url: "",
        public_id: "",
      }
    ]);
    setVariasiAktif(false);
  }

  const deleteImage = publicId => {
    router.post('/delete-image', publicId);
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <>
      <Head title={props.title} />

      <div className="grid grid-cols-2 gap-8">
        <h1 className="font-bold text-xl md:text-3xl container m-3">{props.title}</h1>
        <div className="text-right m-3">
          <Link href="/toko/produk" className="bg-gray-600 text-white rounded-lg p-1 md:p-2">Batal</Link>
        </div>
      </div>

      <div className="container">
        {currentPage === 1 ? (
          <Page1
            setPage={setCurrentPage}
            values={values}
            setValues={setValues}
            props={props}
            handleChange={handleChange}
            setForms={setForms}
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
            variasiAktif={variasiAktif}
            handleVariasiAktif={handleVariasiAktif}
            closeVariasiAktif={closeVariasiAktif}
            rupiah={rupiah}
          />
        ) : (
          <Page3
            setPage={setCurrentPage}
            values={values}
            setValues={setValues}
            props={props}
            handleChange={handleChange}
            forms={forms}
            setForms={setForms}
            rupiah={rupiah}
          />
        )}

      </div>
    </>
  )
}

function Page1({ setPage, values, props, handleChange, setValues }) {

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
          index: 0
        }
        router.post('/image/session', data);
      }
    }
    )
    myWidget.open();
  }

  const deleteImage = publicId => {
    // setValues()
    router.post('/delete-image', publicId);
  }

  return (
    <div>
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

      <button onClick={() => setPage(2)} className="bg-sky-400 text-white rounded-lg p-2 mt-5">Selanjutnya</button>
    </div>
  );
}

function Page2({ setPage, props, forms, setForms, handleChange, values, variasiAktif, closeVariasiAktif, handleVariasiAktif, rupiah }) {

  const [formError, setFormErrors] = useState("");

  const schema = Yup.object().shape({
    hrgBeli: Yup.number().required('Harga beli harus diisi.'),
    hrgJual: Yup.number().required('Harga jual harus diisi.'),
    stokToko: Yup.number().required('Stok toko harus diisi.'),
    stokGudang: Yup.number().required('Stok gudang harus diisi.'),
  });

  const handleSubmit = () => {
    router.post("/toko/produk", { values, forms })
  }

  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
    // setHargas(newForms);
  };

  const addForm = () => {
    setForms([...forms, { namaHarga: "", hrgBeli: "", hrgJual: "", stokGudang: "", stokToko: "" }]);
  };

  const removeForm = (index, publicId) => {
    router.post('/delete-image', publicId);
    setForms(forms.filter((_, i) => i !== index));
  };

  //gambar lain
  const uploadImages = (event, index) => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 1,
      maxSize: 2, //2mb
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        // console.log('Done! Here is the image info: ', result.info);
        const newOptions = [...forms];
        newOptions[index].url = result.info.url;
        newOptions[index].public_id = result.info.public_id;
        setForms(newOptions);

        const data = {
          url: result.info.url,
          public_id: result.info.public_id,
          index: index
        }
        router.post('/image-lainnya/session', data);
      }
    }
    )
    myWidget.open();
  }

  const deleteImage = (publicId, index) => {
    router.post('/delete-image', publicId);
    const newOptions = [...forms];
    newOptions[index].url = "";
    newOptions[index].public_id = "";
    setForms(newOptions);
  }

  return (
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {forms.map((form, index) => (
            <div key={index}>
              <div className="my-5 mx-2">
                <div>
                  <label>Nama Varian</label><br />
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="namaHarga" className="p-2 rounded-md block w-full pl-10"
                        value={form.namaHarga}
                        onChange={(event) => handleChangeOption(event, index)} />
                      {/* <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required></input> */}
                    </div>
                    {index > 0 &&
                      <button onClick={() => removeForm(index, { publicId: form.public_id })} className="p-2 text-sm font-medium text-white bg-red-500 rounded-lg">
                        Hapus</button>
                    }
                  </div>
                  {/* {errors.forms[0].hrgBeli} */}
                </div>
                <div className="mt-2">
                  <label>Pilih gambar</label><br />
                  {!form.url ? (
                    <PlusIcon name="url" onClick={(event) => uploadImages(event, index)} className="w-10 h-10 cursor-pointer bg-white border-black border rounded-md" />
                  ) : (
                    <>
                      <div className="grid grid-cols-3 md:grid-cols-12 gap-8">
                        <div className="mt-2">
                          <img src={form.url} className="max-w-[128px] max-h-32" />
                          <button onClick={() => deleteImage({ publicId: form.public_id }, index)}>Hapus</button>
                        </div>
                      </div>
                    </>
                  )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.auth.user.name) }} /> */}

      <button onClick={() => setPage(1)} className="bg-gray-500 text-white rounded-lg p-2 mt-5">Sebelumnya</button>
      <button onClick={() => setPage(3)} className="bg-sky-400 text-white rounded-lg p-2 mt-5 ml-3">Selanjutnya</button>
    </>
  );
}

function Page3({ setPage, forms, setForms, values, rupiah, props }) {
  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
  };

  // const [errors, setErrors] = useState([props.errors]);
  // const { errors } = usePage().props;
  // const errors = Object.reduce(props.errors.forms.hrgBeli);
  // console.log(errors);

  const handleSubmit = () => {
    router.post("/toko/produk", { values, forms })
  }

  // const props = props;


  return (
    <>
      {props.errors ? (
        <div class="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {props.errors && Object.keys(props.errors).map((key) => (
              <div key={key}>
                <span class="font-medium">{props.errors[key]}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
          <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Pastikan semua data terisi</span>
          </div>
        </div>
      )}



      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
          {forms.map((form, index) => (
            <div key={index}>
              {/* {Object.keys(props.errors.forms[index]).map((field, i) => (
                <p key={i} className="text-red-500">{props.errors.forms[index][field].split(': ')[1]}</p>
              ))} */}


              <div className="my-5 grid grid-cols-2 md:grid-cols-5 gap-8">
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

      <div className=" mt-5">
        <button onClick={() => setPage(2)} className="bg-gray-500 text-white rounded-lg p-2">Sebelumnya</button>
        <button onClick={() => handleSubmit()} className="bg-blue-600 text-white p-2 ml-3">Simpan</button>
      </div>
    </>
  )

}


Create2.layout = (page) => <Main children={page} />
export default Create2;
