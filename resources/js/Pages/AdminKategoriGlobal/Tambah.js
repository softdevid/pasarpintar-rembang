import React, { useState } from "react";
import Main from "@/Components/AdminTemplate/Main";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Tambah = (props) => {
  const [errors, setErrors] = useState({})

  const handleSubmit = () => {
    axios
      .post('/admin/kategori', values)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          router.get('/admin/kategori')
        }, 2000);
      })
      .catch((err) => setErrors(err.response.data.errors))
  };

  const [values, setValues] = useState({
    namaKategoriGlobal: "",
  });

  function handleChange(e) {
    setValues((values) => ({
      ...values,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <>
      <ToastContainer autoClose={2000} />
      <Head title={props.title} />

      <div>
        <h1 className="font-bold text-3xl mb-3">Tambah Kategori Global</h1>
      </div>
      <div className="w-full max-w">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="namaKategoriGlobal"
            >
              Nama Kategori Global
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="namaKategoriGlobal"
              type="text"
              placeholder="Nama Kategori Global"
              onChange={handleChange}
              value={values.namaKategoriGlobal}
            />
            {errors.namaKategoriGlobal && (
              <div className="text-red-600">
                {errors.namaKategoriGlobal}
              </div>
            )}
          </div>
        </div>
        <button
          type="submit"
          onClick={() => handleSubmit()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Tambah
        </button>
        &nbsp;
        <Link
          href={`/admin/kategori`}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Kembali
        </Link>
      </div>
    </>
  );
};

Tambah.layout = (page) => <Main children={page} />;

export default Tambah;
