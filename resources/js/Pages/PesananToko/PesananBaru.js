import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Head, Link, router } from "@inertiajs/react";
import NavTabsPesananToko from "@/Components/NavTabsPesananToko";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const PesananBaru = (props) => {

  const [rinciOrder, setRinciOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    axios.get(`/api/data-pesanan-baru?page=${currentPage}`).then((response) => {
      setRinciOrder(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);


  //detail
  const [dataShow, setDataShow] = useState({});

  const handleShow = (data) => {
    setDataShow(data);
    setShowAktif(true);
  }

  const handleCloseShow = () => {
    setDataShow({});
    setShowAktif(false);
  }

  const [showAktif, setShowAktif] = useState(false);

  return (
    <>
      {!showAktif ? (
        <>
          <div>
            <h1 className="font-bold text-3xl">Pesanan</h1>
          </div>
          <div>
            <NavTabsPesananToko />
            <Head title={props.title} />

            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-2 px-4">
                      #
                    </th>
                    <th scope="col" className="py-2 px-4">
                      NO. Faktur
                    </th>
                    <th scope="col" className="py-2 px-4">
                      Nama Produk
                    </th>
                    <th scope="col" className="py-2 px-4">
                      Nama pemesan
                    </th>
                    <th scope="col" className="py-2 px-4">
                      Metode bayar
                    </th>
                    <th scope="col" className="py-2 px-4">
                      Status pesan
                    </th>
                    <th scope="col" className="py-2 px-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rinciOrder ? (
                    <>
                      {rinciOrder.map((data, i) => {
                        return (
                          <>
                            <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                              <th scope="row" className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {i + 1}
                              </th>
                              <th scope="row" className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.noFaktur}
                              </th>
                              <th scope="row" className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.namaProduk} <br />
                                Variasi: <span>{data.namaHarga}</span>
                              </th>
                              <th scope="row" className="py-2 px-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {data.namaCustomer}
                              </th>
                              <td className="py-2 px-4">
                                {data.metodeBayar}
                              </td>
                              <td className="py-2 px-4">
                                {data.statusOrder}
                              </td>
                              <td className="py-2 px-4">
                                <button onClick={() => handleShow(data)} className="font-medium bg-blue-500 text-white mx-1 p-2 rounded-md">Detail</button>
                              </td>
                            </tr>
                          </>
                        )
                      })}
                    </>
                  ) : (
                    <>
                      <th colSpan={6} className="text-center">Tidak ada barang sampai</th>
                    </>
                  )}
                </tbody>
              </table>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </>
      ) : (
        <Show dataShow={dataShow} props={props} handleCloseShow={handleCloseShow} setRinciOrder={setRinciOrder} setTotalPages={setTotalPages} currentPage={currentPage} />
      )}
    </>
  );
};

function Show({ dataShow, props, handleCloseShow, setRinciOrder, setTotalPages, currentPage }) {

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const [alasanPembatalan, setAlasanPembatalan] = useState("");

  const handleUbahStatus = (statusOrder, statusBayar, idOrder, idRinciOrder) => {
    const data = { statusOrder, statusBayar, idOrder, idRinciOrder };

    // router.post("/ubah-status-dikirim", data.statusOrder);
    axios
      .post("/ubah-status-dikirim", data.statusOrder)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        router.get('/toko/pesanan')
      })
      .catch((err) => setErrors(err.response.data.errors))
  }

  const [errors, setErrors] = useState({})
  const handleUbahStatusBatal = (statusOrder, idRinciOrder) => {
    const data = { statusOrder, idRinciOrder, alasanPembatalan };

    axios
      .post("/ubah-status-dibatalkan", data)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        router.get('/toko/pesanan')
      })
      .catch((err) => setErrors(err.response.data.errors))

  }

  useEffect(() => {
    axios.get(`/api/data-pesanan-baru?page=${currentPage}`).then((response) => {
      setRinciOrder(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);

  const [phoneNumber, setPhoneNumber] = useState("62882008868990");

  const sendWa = (dataShow) => {
    const phone = dataShow.noHp.replace(/\D/g, ''); // menghapus karakter non-numeric dari nomor telepon
    const message = encodeURIComponent('Permisi..'); // mengenkripsi pesan menggunakan encodeURIComponent
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(url, '_blank'); // membuka tautan WhatsApp di tab baru
  }

  return (
    <>
      <Head title={dataShow.namaProduk} />
      <ToastContainer autoClose={2000} />
      <div className="bg-gray-100">
        {/* <!-- Header --> */}
        <header className="container mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Detail Pesanan</h1>
          <button onClick={handleCloseShow} className="bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Kembali
          </button>
        </header>

        {/* <!-- Main --> */}
        <main className="container grid-cols-1 grid gap-8">
          <div className="flex flex-wrap -mx-4">
            {/* <!-- Order Summary --> */}
            <div className="w-full md:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Pesanan</h2>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="col-span-1 text-gray-600">Nama Produk</div>
                  <div className="col-span-1 text-gray-800">{dataShow.namaProduk}</div>
                  <div className="col-span-1 text-gray-600">Varian</div>
                  <div className="col-span-1 text-gray-800">{dataShow.namaHarga}</div>
                  <div className="col-span-1 text-gray-600">Harga</div>
                  <div className="col-span-1 text-gray-800">{rupiah(dataShow.hrgJual + dataShow.hrgDiskon)}</div>
                  <div className="col-span-1 text-gray-600">Jumlah</div>
                  <div className="col-span-1 text-gray-800">{dataShow.qty}</div>
                  <div className="col-span-1 text-gray-600">Biaya Admin</div>
                  <div className="col-span-1 text-gray-800">{rupiah(dataShow.biayaAdmin)}</div>
                  <div className="col-span-1 text-gray-600 font-bold">Total</div>
                  <div className="col-span-1 text-gray-800 font-bold">{rupiah((dataShow.hrgJual + dataShow.hrgDiskon + dataShow.biayaAdmin) * dataShow.qty)}</div>
                </dl>
              </div>
            </div>

            {/* <!-- Order Details --> */}
            <div className="w-full md:w-1/2 px-4 mt-6 md:mt-0 overflow-x-auto">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Detail Pesanan</h2>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="col-span-1 text-gray-600">Nama Pemesan</div>
                  <div className="col-span-1 text-gray-800">{dataShow.namaCustomer}</div>
                  <div className="col-span-1 text-gray-600">Alamat</div>
                  <div className="col-span-1 text-gray-800">{dataShow.alamatPengiriman}</div>
                  <div class="col-span-1 text-gray-600">Chat Whatsapp (klik nomor)</div>
                  <div class="col-span-1 text-gray-800" as="button"><button onClick={() => sendWa(dataShow)}>{dataShow.noHp}</button></div>
                  <div className="col-span-1 text-gray-600">Metode Pembayaran</div>
                  <div className="col-span-1 text-gray-800 overflow-x-auto">{dataShow.metodeBayar} / Bayar ditempat</div>
                </dl>
              </div>
              <div className="mt-1">
                <label>Pembatalan Pesanan</label>
                <textarea placeholder="Harap isi jika ingin dibatalkan supaya status berubah" onChange={(e) => setAlasanPembatalan(e.target.value)} name="alasanPembatalan" id="alasanPembatalan" type="text" className="w-full h-16" />
                {errors.alasanPembatalan && <p className="text-red-600">{errors.alasanPembatalan}</p>}
              </div>
            </div>
          </div>
        </main>
        <div className="mt-2">
          <button onClick={() => handleUbahStatus({ statusOrder: "dikirim", statusBayar: "belum bayar", idOrder: dataShow.idOrder, idRinciOrder: dataShow.idRinciOrder })} className="bg-green-500 text-white p-2 rounded-lg">Setuju</button>
          <button onClick={() => handleUbahStatusBatal({ statusOrder: "dibatalkan", idRinciOrder: dataShow.idRinciOrder })} className="bg-red-500 text-white p-2 rounded-lg ml-3">Batalkan</button>
        </div>
      </div>

    </>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center bg-white border-2">
      {pageNumbers.map((pageNumber) => (
        <button className="p-2"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber === currentPage ? (
            <>
              <b className="text-blue-600">{pageNumber}</b>
            </>
          ) : (
            <>
              <b className="text-black">{pageNumber}</b>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

PesananBaru.layout = (page) => <Main children={page} />;

export default PesananBaru;
