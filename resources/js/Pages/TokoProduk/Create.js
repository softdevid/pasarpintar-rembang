import Main from "@/Components/TokoTemplate/Main";
import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Head, Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
import Page1 from "./AddPage/Page1";
import Page2 from "./AddPage/Page2";
import Page3 from "./AddPage/Page3";

const Create = (props) => {

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

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <>
      <Head title={props.title} />

      <div className="flex items-center justify-center border-t-4 border-sky-500">
        <h1 className="font-bold text-xl md:text-3xl container m-3">{props.title}</h1>
        <div className="flex items-end justify-end text-right m-3">
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
            setNamaKategori={setNamaKategori}
            AddKategori={AddKategori}
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

// Create.layout = (page) => <Main children={page} />
export default Create;
