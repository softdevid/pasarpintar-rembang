import Main from "@/Components/TokoTemplate/Main";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";



const Edit = (props) => {

  const [values, setValues] = useState({
    namaProduk: props.produk.namaProduk,
    idKategori: props.produk.idKategori,
    idKategoriGlobal: props.produk.idKategoriGlobal,
    deskripsi: props.produk.deskripsi,
    jenisHarga: props.produk.jenisHarga,
    url: props.produk.imgUrl,
    public_id: props.produk.imgName,
  })

  const [forms, setForms] = useState(props.produk.hargas.map((form) => {
    return {
      id: form.id,
      namaHarga: form.namaHarga,
      hrgBeli: form.hrgBeli,
      hrgJual: form.hrgJual,
      stokGudang: form.stokGudang,
      stokToko: form.stokToko,
      jenisHarga: form.jenisHarga,
      url: form.imgUrl,
      public_id: form.imgName,
    };
  }));


  console.log(forms, values, props);
  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.id] = event.target.value;
    setForms(newForms);
  };

  const handleDeleteHarga = (id, index, publicId) => {
    const data = { id, index, publicId };
    router.post('/delete-harga', data);
    // setForms(forms.filter((_, i) => i !== index));
    const updatedForms = [...forms]; // Copy array forms ke updatedForms agar tidak merubah state asli
    updatedForms.splice(index, 1); // Menghapus elemen pada index yang diinginkan (1 element yang dihapus)
    setForms(updatedForms); // Set state forms dengan updatedForms yang telah dihapus
  }


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
      <Head title={props.title} />
      <div className="container">
        <div className="flex">
          <h1 className="font-bold text-3xl">Edit Produk</h1>
        </div>

        <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
          <div>
            <label>Nama Produk</label>
            <input type="text" placeholder="Nama Produk" id="namaProduk" onChange={handleChange} value={values.namaProduk} className="rounded-lg w-full" />
          </div>
          <div>
            <label>Kategori Toko</label>
            <select id="idKategori" onChange={handleChange} value={values.idKategori} className="rounded-lg w-full">
              <option value="">Pilih Kategori Global</option>
              <option value="1">lainnya</option>
            </select>
          </div>
          <div>
            <label>Kategori Global</label>
            <select id="idKategori" onChange={handleChange} value={values.idKategoriGlobal} className="rounded-lg w-full">
              <option value="">Pilih Kategori Global</option>
              <option value="1">lainnya</option>
            </select>
          </div>
          <div>
            <label>Thumbnail/ Gambar utama</label>
            {values.url ? (
              <img src={values.url} className="max-w-[128px] max-h-[128px]" />
            ) : (
              <>
                <button></button>
              </>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-bold mt-3">Harga dan Varian</h1>

        {values.jenisHarga ? (
          <>
            <div>
              <label>Jenis Varian</label>
              <input type="text" placeholder="Jenis Variasi" id="jenisHarga" onChange={(event) => handleChange(event, index)} value={values.jenisHarga} className="rounded-lg ml-2" />
            </div>

            {forms.map((form, index) => {
              return (
                <>
                  <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-8 my-3">
                    <div>
                      <label>Option Variasi</label>
                      <input type="text" placeholder="Option variasi" id="namaHarga" onChange={(event) => handleChangeOption(event, index)} value={form.namaHarga} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <label>Harga Beli</label>
                      <input type="number" placeholder="Harga Beli" id="hrgBeli" onChange={(event) => handleChangeOption(event, index)} value={form.hrgBeli} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <label>Harga Jual</label>
                      <input type="number" placeholder="Harga Jual" id="hrgJual" onChange={(event) => handleChangeOption(event, index)} value={form.hrgJual} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <label>Stok Gudang</label>
                      <input type="number" placeholder="Stok Gudang" id="stokGudang" onChange={(event) => handleChangeOption(event, index)} value={form.stokGudang} className="rounded-lg w-full" />
                    </div>
                    <div>
                      <label>Stok Toko</label>
                      <div className="flex">
                        <input type="number" placeholder="Stok Toko" id="stokToko" onChange={(event) => handleChangeOption(event, index)} value={form.stokToko} className="rounded-lg w-full" />
                        {index > 0 &&
                          <button onClick={() => handleDeleteHarga({ publicId: form.public_id, id: form.id, index })} className="p-2 text-sm font-medium text-white bg-red-500 rounded-lg ml-2">
                            Hapus</button>
                        }
                      </div>
                    </div>
                  </div>

                  <div>
                    <label>Gambar</label>
                    <p>{form.namaHarga}</p>
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
                    )}
                  </div>
                </>
              )
            })}
          </>
        ) : (
          <>
            {forms.map((form, index) => {
              return (
                <div key={index} className="grid grid-cols-2 md:grid-cols-6 gap-8 my-3">
                  <div>
                    <label>Harga Beli</label>
                    <input type="number" placeholder="Harga Beli" id="hrgBeli" onChange={(event) => handleChangeOption(event, index)} value={form.hrgBeli} className="rounded-lg w-full" />
                  </div>
                  <div>
                    <label>Harga Jual</label>
                    <input type="number" placeholder="Harga Jual" id="hrgJual" onChange={(event) => handleChangeOption(event, index)} value={form.hrgJual} className="rounded-lg w-full" />
                  </div>
                  <div>
                    <label>Stok Gudang</label>
                    <input type="number" placeholder="Stok Gudang" id="stokGudang" onChange={(event) => handleChangeOption(event, index)} value={form.stokGudang} className="rounded-lg w-full" />
                  </div>
                  <div>
                    <label>Stok Toko</label>
                    <input type="number" placeholder="Stok Toko" id="stokToko" onChange={(event) => handleChangeOption(event, index)} value={form.stokToko} className="rounded-lg w-full" />
                  </div>
                  <div>
                    <label>Gambar</label>
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
                    )}
                  </div>
                </div>
              )
            })}
          </>
        )}

        {values.jenisHarga === '' &&
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 my-3">
            {forms.map((form, index) => {
              return (
                <>
                  <div>
                    <div key={index}>
                      <div>
                        <label>Gambar</label>
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
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        }

        <div className="mt-2">
          <Link href="/toko/produk" className="bg-gray-700 text-white hover:bg-gray-800 p-2 rounded-md">Kembali</Link>
          <button className="rounded-md bg-blue-500 text-white hover:bg-blue-600 p-2 ml-3">Tambah</button>
        </div>
      </div>
    </>
  );
}

// Edit.layout = (page) => <Main children={page} />;

export default Edit;
