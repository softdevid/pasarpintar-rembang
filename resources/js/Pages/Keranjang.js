import { FormatRupiah } from "@/config/formatRupiah";
import { AppContext } from "@/context/app-context";
import Main from "@/Layouts/Main";
import { TrashIcon } from "@heroicons/react/20/solid";
import { Head, Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Keranjang = ({ title, keranjang }) => {
  const context = useContext(AppContext);

  const [cart, setCart] = useState({});
  const [updatedCart, setUpdatedCart] = useState({});
  const [timeoutId, setTimeoutId] = useState(null);
  const [rowId, setRowId] = useState(null);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    axios
      .get("/carts-get")
      .then((res) => {
        console.log(res.data.data);
        setCart(Object.entries(res.data.data));
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);

  const handleQtyChange = (
    operasi,
    idProduk,
    idHarga,
    hargaJual,
    qty,
    stok
  ) => {
    setRowId(idHarga);
    setCart((prev) => {
      return prev.map((data) => {
        return [
          data[0],
          data[1].map((produk) => {
            if (produk.idHarga === idHarga) {
              return {
                ...produk,
                // prettier-ignore
                qty: operasi === "subtract" ? (
                  qty > 1 ? qty - 1 : 1
                ) : (
                  qty < stok ? qty + 1 : stok
                ),
              };
            } else {
              return produk;
            }
          }),
        ];
      });
    });

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      setUpdatedCart({
        idProduk,
        idHarga,
        hargaJual,
        // prettier-ignore
        qty: operasi === "subtract" ? (
          qty > 1 ? qty - 1 : 1
        ) : (
          qty < stok ? qty + 1 : stok
        ),
        // prettier-ignore
        subtotal: hargaJual * (operasi === "subtract" ? (
          qty > 1 ? qty - 1 : 1
        ) : (
          qty < stok ? qty + 1 : stok
        )),

      });
      setRowId(null);
    }, 2000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    if (Object.keys(updatedCart).length != 0) {
      console.log(updatedCart);
      axios
        .patch("/cart-update", updatedCart)
        .then((res) => {
          notify(res.data.data);
          updateJumlahKeranjang();
        })
        .catch((err) => console.log(err.response.data.message));
    }
  }, [updatedCart]);

  const total = () => {
    if (Object.keys(cart).length !== 0) {
      return cart
        .flatMap(([_, items]) => items)
        .filter((item) => isCheck.includes(`${item.id}`))
        .reduce(
          (subtotal, prod) => subtotal + prod.qty * prod.harga.hrgJual,
          0
        );
    } else {
      return 0;
    }
  };

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(
      cart
        .map(([toko, produks]) => produks.map((produk) => `${produk.id}`))
        .flat(1)
    );
    if (isCheckAll) {
      setIsCheck([]);
    }
    setIsClicked(false);
  };

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
    setIsClicked(false);
  };

  const toCheckout = () => {
    setIsClicked(true);
    console.log(isCheck);
    if (isCheck.length != 0) {
      router.get("/checkout", {
        idPivot: isCheck.join(","),
      });
    }
  };

  const hapusKeranjang = (isCheck) => {
    const data = cart
      .flatMap(([_, items]) => items)
      .filter((item) => isCheck.includes(`${item.id}`))
      .map((item, i) => ({
        idProduk: item.idProduk,
        idHarga: item.idHarga,
      }));

    axios
      .delete("/cart-delete", {
        data: data,
      })
      .then((res) => {
        notify(res.data.data);
        setCart((prev) => {
          return prev.map((data) => {
            return [
              data[0],
              data[1].filter((item) => !isCheck.includes(`${item.id}`)),
            ];
          });
        });
        setIsCheck([]);
        updateJumlahKeranjang();
      })
      .catch((err) => console.log(err.response.data.message));
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

  const updateJumlahKeranjang = () => {
    axios.get("/cart-count").then((res) => {
      context.setCartCount(res.data.cartCount);
    });
  };

  return (
    <>
      <Head title={title} />
      <div className="container py-3 md:py-5">
        <div className="flex flex-col">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-3xl">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="p-4">
                    <div className="flex items-center">
                      <input
                        id="selectAll"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onChange={handleSelectAll}
                        checked={isCheckAll}
                      />
                      <label htmlFor="selectAll" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Nama Produk
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(cart).length !== 0 ? (
                  cart.map(([toko, produks], i) => (
                    <Fragment key={i}>
                      {produks.length !== 0 && (
                        <tr>
                          <td colSpan={4}>
                            <div
                              className={`text-center font-medium text-lg ${i == 0 ? "mt-0" : "mt-4"
                                }`}
                            >
                              {toko}
                            </div>
                          </td>
                        </tr>
                      )}
                      {produks.length !== 0 &&
                        produks.map((krj, i) => (
                          <tr
                            key={i}
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                          >
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id={krj.id}
                                  name={krj.produk.namaProduk}
                                  onChange={handleCheck}
                                  checked={isCheck.includes(`${krj.id}`)}
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                />
                                <label
                                  htmlFor="checkbox-table-search-1"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>
                            <th className="flex px-6 py-4">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={krj.produk.imgUrl}
                                  alt={krj.produk.imgName}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <div>
                                  <a
                                    href={`${krj.produk.slugToko}/${krj.produk.slugProduk}`}
                                    className="text-base font-medium text-left text-gray-900 line-clamp-2"
                                  >
                                    {krj.produk.namaProduk}
                                  </a>
                                  <p className="text-sm text-gray-500">
                                    {krj.harga.namaHarga}
                                  </p>
                                  <p className="mt-1 text-sm text-gray-500">
                                    <FormatRupiah
                                      value={krj.harga.hrgJual}
                                    />
                                  </p>
                                </div>
                              </div>
                            </th>
                            <td className="px-6 py-4 text-center">
                              <div
                                className="inline-flex rounded-md shadow-sm"
                                role="group"
                              >
                                <button
                                  type="button"
                                  className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-l-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                                  onClick={() =>
                                    handleQtyChange(
                                      "subtract",
                                      krj.idProduk,
                                      krj.idHarga,
                                      krj.harga.hrgJual,
                                      krj.qty
                                    )
                                  }
                                  disabled={
                                    rowId !== null && rowId !== krj.idHarga
                                  }
                                >
                                  <span className="m-auto text-2xl font-normal">
                                    -
                                  </span>
                                </button>
                                <input
                                  type="text"
                                  className="px-2 w-14 text-center align-middle text-slate-900 bg-transparent border-0 border-y-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                                  value={krj.qty}
                                  max={krj.harga.stokToko}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-r-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                                  onClick={() =>
                                    handleQtyChange(
                                      "add",
                                      krj.idProduk,
                                      krj.idHarga,
                                      krj.harga.hrgJual,
                                      krj.qty,
                                      krj.harga.stokToko
                                    )
                                  }
                                  disabled={
                                    rowId !== null && rowId !== krj.idHarga
                                  }
                                >
                                  <span className="m-auto text-2xl font-normal">
                                    +
                                  </span>
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <FormatRupiah
                                value={krj.qty * krj.harga.hrgJual}
                              />
                            </td>
                          </tr>
                        ))}
                    </Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>
                      <div className="text-center font-medium text-lg ">
                        Kosong
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="xl:fixed xl:top-32 xl:right-10 mt-5 w-full max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-start">
              <h2 className="text-xl text-slate-800 font-medium pb-6">
                {`Total : `}
                <span className="text-3xl">
                  <FormatRupiah value={total()} />
                </span>
              </h2>
              {isCheck.length == 0 && isClicked && (
                <div
                  id="checkOut"
                  className="flex p-4 my-3 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ml-3 text-sm font-medium">
                    Pilih produk terlebih dahulu
                  </div>
                </div>
              )}
              {isCheck.length !== 0 && (
                <button
                  onClick={() => hapusKeranjang(isCheck)}
                  className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                >
                  Hapus
                </button>
              )}
              <div className="flex justify-center items-start mt-3">
                <Link
                  as="button"
                  href="/"
                  className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
                >
                  Lanjut Belanja
                </Link>
                <button
                  onClick={toCheckout}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Checkout
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

Keranjang.layout = (page) => <Main children={page} />;

export default Keranjang;
