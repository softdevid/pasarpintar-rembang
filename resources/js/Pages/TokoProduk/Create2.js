import Main from "@/Components/TokoTemplate/Main";
import { Head } from "@inertiajs/react";
import axios from "axios";
import { useState } from "react";
// import { Route, Router } from "react-router-dom";
// import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";


const Create2 = (props) => {
  const [values, setValues] = useState({
    namaProduk: "",
    // idKategori: "",
    // idKategoriGlobal: "",
    // satuan: "",
    // stokToko: "",
    // stokGudang: "",
    // hrgJual: "",
    // hrgBeli: "",
    // diskon: "",
    // tglAwalDiskon: "",
    // tglAkhirDiskon: "",
    // deskripsi: "",
    // jenisHarga: "",
    // namaHarga: "",
  })

  function handleChange(e) {
    setValues(values => ({
      ...values,
      [e.target.id]: e.target.value,
    }))
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({});

  return (
    <>
      <Head title={props.title} />

      <div>
        {/* <div className="grid gap-8 grid-cols-2">
          <div className="">
            <p>Nama</p>
            <p>Harga</p>
            <p>foto</p>
          </div>
          <div>
            coba
          </div>
        </div> */}

        {page === 1 ? (
          <Page1 setPage={setPage} formData={formData} setFormData={setFormData} />
        ) : (
          <Page2 setPage={setPage} formData={formData} setFormData={setFormData} />
        )}

      </div>
    </>
  )
}

function Page1({ setPage, formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/validate-step-1", formData);

      if (res.data.success) {
        setPage(2);
      } else {
        setError(res.data.message);
      }
    } catch (e) {
      setError("Terjadi kesalahan pada server.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Halaman 1</h1>
      <input
        type="text"
        name="field1"
        placeholder="Isikan Field 1"
        onChange={handleChange}
      />
      <input
        type="text"
        name="field2"
        placeholder="Isikan Field 2"
        onChange={handleChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button disabled={loading} onClick={handleSubmit}>
        Ke Halaman Berikutnya
      </button>
    </div>
  );
}

function Page2({ setPage, formData, setFormData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/validate-step-2", formData);

      if (res.data.success) {
        // Tambahkan kode untuk submit form disini
      } else {
        setError(res.data.message);
      }
    } catch (e) {
      setError("Terjadi kesalahan pada server.");
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>Halaman 2</h1>
      <input
        type="text"
        name="field3"
        placeholder="Isikan Field 3"
        onChange={handleChange}
      />
      <input
        type="text"
        name="field4"
        placeholder="Isikan Field 4"
        onChange={handleChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button disabled={loading} onClick={handleSubmit}>
        Submit Form
      </button>
      <button onClick={() => setPage(1)}>Kembali ke Halaman Sebelumnya</button>
    </div>
  );
}


Create2.layout = (page) => <Main children={page} />
export default Create2;
