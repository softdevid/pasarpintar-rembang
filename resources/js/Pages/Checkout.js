import React, { Fragment, useContext, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import Main from "@/Layouts/Main";
import Input from "@/Components/Input";
import { FormatRupiah } from "@/config/formatRupiah";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "@/context/app-context";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const Checkout = ({ title, filteredProduk, user }) => {
  const context = useContext(AppContext);

  const [filtCart, setFiltCart] = useState(Object.entries(filteredProduk));
  const [recipient, setRecipient] = useState({
    nama: user.name,
    email: user.email,
    noHp: user.noHp,
    alamat: user.alamat,
  });

  const [payment, setPayment] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecipient((prevRecip) => ({
      ...prevRecip,
      [name]: value,
    }));
  };

  const subtotal = filtCart
    .flatMap(([_, items]) => items)
    .reduce((subtotal, prod) => subtotal + prod.qty * (prod.harga.hrgJual - prod.harga.diskon), 0);

  const ongkir = filtCart
    .flatMap(([_, items]) => items)
    .reduce((subtotal, prod) => subtotal + prod.qty * 1000, 0)

  const paymentOptions = [
    { value: "", label: "Pilih metode pembayaran" },
    { value: "COD", label: "COD" },
    // { value: "Credit Card", label: "Kartu Kredit" },
    // { value: "Bank Transfer", label: "Transfer Bank" },
  ];

  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const notify = (message) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  console.log(filtCart);
  const order = () => {
    const produks = filtCart
      .map(([, items]) => {
        return items.map(
          ({
            idProduk,
            idHarga,
            idToko,
            qty,
            produk: { namaProduk },
            harga: { hrgJual, diskon },
          }) => {
            return {
              idProduk,
              idHarga,
              idToko,
              qty,
              namaProduk,
              hrgJual,
              hrgDiskon: diskon,
              subtotal: qty * hrgJual + 1000,
            };
          }
        );
      })
      .flat(1);

    if (payment !== "") {
      const data = {
        recipient,
        produks,
        payment,
      };
      console.log(produks);
      axios
        .post("/order", data)
        .then((res) => {
          notify(res.data.data);
          updateJumlahKeranjang();
          setTimeout(() => {
            router.get("/user/orders", {}, { replace: true });
          }, 2000);
        })
        .catch((err) => console.log(err.response.data.message));
    }
  };

  const updateJumlahKeranjang = () => {
    axios.get("/cart-count").then((res) => {
      context.setCartCount(res.data.cartCount);
    });
  };

  return (
    <>
      <Head title={title} />
      <div className="container py-3 md:py-5">
        <div className="relative flex flex-col items-center lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="w-full py-4 lg:py-6 px-3 lg:px-5 bg-white border border-gray-200 rounded-lg shadow">
            <form className="space-y-6">
              <h5 className="text-2xl font-medium text-gray-900 dark:text-white">
                Formulir Checkout
              </h5>
              <div>
                <h5 className="text-xl font-medium text-gray-900 mb-5">
                  Informasi Penerima
                </h5>
                <div className="mb-3">
                  <label
                    htmlFor="namaPenerima"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={recipient.nama}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={recipient.email}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="noHp"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nomor HP
                  </label>
                  <input
                    type="text"
                    name="noHp"
                    value={recipient.noHp}
                    onChange={handleInputChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="alamat"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Alamat
                  </label>
                  <textarea
                    id="alamat"
                    name="alamat"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={recipient.alamat}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div>
                <h5 className="text-xl font-medium text-gray-900 mb-5">
                  Metode Pembayaran
                </h5>
                <div className="mb-3">
                  <label
                    htmlFor="paymentMethod"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pembayaran
                  </label>
                  <select
                    id="paymentMethod"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={handlePayment}
                  >
                    {paymentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="w-full">
            <div className="w-full py-4 lg:py-6 px-3 lg:px-5 bg-white border border-gray-200 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h5 className="text-2xl font-medium leading-none text-gray-900 dark:text-white">
                  Daftar Produk
                </h5>
              </div>
              <div className="flow-root">
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {filtCart.map(([toko, produks], i) => (
                    <Fragment key={toko}>
                      <li
                        className={`${i == 0 ? "pb-3" : "pt-2 pb-3 sm:py-4"}`}
                      >
                        <div className="flex items-start justify-center space-x-4">
                          <Link
                            href={produks[0].produk.slugToko}
                            className="text-lg"
                          >
                            {toko}
                          </Link>
                        </div>
                      </li>
                      {produks.map((krj, i) => (
                        <li key={i} className="py-3 sm:py-4 bg-slate-100">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 ml-2">
                              <img
                                className="h-24 w-24 rounded-md"
                                src={krj.produk.imgUrl}
                                alt={krj.produk.imgName}
                              />
                            </div>
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <Link
                                href={`${krj.produk.slugToko}/${krj.produk.slugProduk}`}
                                className="text-sm font-medium text-gray-900 line-clamp-2 text-ellipsis dark:text-white"
                              >
                                {krj.produk.namaProduk}
                              </Link>
                              <p className="text-sm text-gray-600 truncate dark:text-gray-400">
                                {krj.harga.namaHarga}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                <FormatRupiah
                                  value={`${krj.harga.hrgJual - krj.harga.diskon}`}
                                />
                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                              <div className="mr-2">
                                <FormatRupiah
                                  value={`${krj.qty * (krj.harga.hrgJual - krj.harga.diskon)}`}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </Fragment>
                  ))}
                </ul>
              </div>
            </div>
            <div className="w-full mt-4 py-4 lg:py-6 px-3 lg:px-5 bg-white border border-slate-200 rounded-lg shadow">
              <div className="p-2 bg-red-100 text-red-600 my-2 rounded-lg">
                <p className="inline-flex"><InformationCircleIcon className="w-4 h-4 mt-1" /> Produk yang sudah dipesan tidak bisa dibatalkan, kecuali oleh Penjual!!</p>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span id="subtotal" className="text-lg">
                    <FormatRupiah value={subtotal} />
                  </span>
                </div>
                {/* <div className="flex justify-between items-center">
                  <span>Diskon</span>
                  <span id="diskon" className="text-lg">
                    <FormatRupiah value={`0`} />
                  </span>
                </div> */}
                <div className="flex justify-between items-center">
                  <span>Biaya Admin</span>
                  <span id="ongkir" className="text-lg">
                    <FormatRupiah value={ongkir} />
                  </span>
                </div>
              </div>
              <hr className="border border-slate-400 my-3" />
              <div className="flex flex-col">
                <div className="flex justify-between items-center">
                  <span>Total</span>
                  <span id="total" className="text-lg">
                    <FormatRupiah value={subtotal + ongkir} />
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start mt-5">
                <Link
                  as="button"
                  href="/"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                  Lanjut Belanja
                </Link>
                <button
                  onClick={order}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Pesan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

Checkout.layout = (page) => <Main children={page} />;

export default Checkout;
