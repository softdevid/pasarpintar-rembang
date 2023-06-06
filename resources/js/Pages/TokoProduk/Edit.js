import Main from "@/Components/TokoTemplate/Main";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import Page1 from "./EditPage/Page1";
import Page2 from "./EditPage/Page2";
import Page3 from "./EditPage/Page3";

const Edit = (props) => {
  const [values, setValues] = useState({
    id: props.produk.id,
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

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  const [namaKategori, setNamaKategori] = useState("");
  const AddKategori = () => {
    const data = { namaKategori }
    router.post('/toko/produk/storeKategori', data);
    setNamaKategori("");
  }

  const [currentPage, setCurrentPage] = useState(1);

  const [variasiAktif, setVariasiAktif] = useState(false);
  const handleVariasiAktif = () => {
    setVariasiAktif(true);
  }

  const closeVariasiAktif = (publicId) => {
    router.post("/delete-image-variasi-inaktive-edit", { forms });
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
            namaKategori={namaKategori}
            AddKategori={AddKategori}
            setNamaKategori={setNamaKategori}
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

export default Edit;
