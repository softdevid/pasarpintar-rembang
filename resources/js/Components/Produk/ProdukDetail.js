import formatRibuan from "@/config/formatRibuan";
import { FormatRupiah } from "@/config/formatRupiah";
import { AppContext } from "@/context/app-context";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProdukDetail = ({ images, produk, toko, user }) => {
  const [active, setActive] = useState(false);
  const [harga, setHarga] = useState({});
  const [qty, setQty] = useState(1);

  const context = useContext(AppContext);
  console.log(produk);

  const [img, setImg] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    setImg({
      name: images[0].imgName,
      imageUrl: images[0].imgUrl,
    });
  }, []);

  const gantiImg = (name, imageUrl) => {
    setImg({
      name,
      imageUrl,
    });
  };

  useEffect(() => {
    if (active === false) {
      initialHarga();
    }
  }, [active]);

  const initialHarga = () =>
    setHarga({
      idHarga: 0,
      hargaJual: 0,
      diskon: 0,
      stok: produk.hargas.reduce(
        (total, currentValue) => (total = total + currentValue.stokToko),
        0
      ),
    });

  const gantiHarga = (namaHarga) => {
    const filter = produk.hargas.filter((harga) => {
      return harga.namaHarga === namaHarga;
    });
    setQty(1);
    setHarga({
      idHarga: filter[0].id,
      hargaJual: filter[0].hrgJual,
      diskon: filter[0].diskon,
      stok: filter[0].stokToko,
    });
  };

  const decrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const increment = (max) => {
    if (qty < max) {
      setQty(qty + 1);
    }
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

  const tambahKeranjang = (idProduk, idToko, qty, harga) => {
    if (harga.idHarga != 0) {
      const data = {
        idProduk,
        qty,
        idHarga: harga.idHarga,
        idToko,
        subtotal: qty * harga.hargaJual,
      };
      console.log(data);
      axios
        .post("/cart-add", data)
        .then((res) => {
          notify(res.data.data);
          updateJumlahKeranjang();
        })
        .catch((err) => console.log(err.response.data.message));
    }
  };

  const updateJumlahKeranjang = () => {
    axios.get("/cart-count").then((res) => {
      context.setCartCount(res.data.cartCount);
    });
  };
  console.log(harga);
  return (
    <>
      <div className="relative w-full px-4 md:w-[35%]">
        <div className="sticky top-10 z-50">
          <div className="mb-2 lg:mb-4 lg:h-2/4">
            <img
              src={img.imageUrl}
              className="object-cover w-full lg:h-full rounded-md"
              alt={img.name}
            />
          </div>
          <div className="relative max-w-max">
            <ul className="flex overflow-x-scroll space-x-2">
              {images.map((img, i) => (
                <li key={i} className="p-2 w-20 h-20 flex-shrink-0">
                  <div className="block border border-sky-700 rounded">
                    <img
                      src={img.imgUrl}
                      className="object-cover w-full lg:h-full rounded"
                      alt={img.imgName}
                      onClick={() => gantiImg(img.imgName, img.imgUrl)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full px-4 md:w-[65%]">
        <div className="md:pl-2 h-full">
          <div className="mt-3">
            <span className="mb-2 text-slate-800 text-lg lg:text-3xl font-semibold line-clamp-3">
              {produk.namaProduk}
            </span>
            <div className="flex justify-start mb-4">
              <div className="flex items-center justify-center">
                <div className="text-sm text-slate-800 mr-1">
                  {formatRibuan(produk.terjual)}
                </div>
                <div className="text-sm text-slate-600">Terjual</div>
              </div>
            </div>
            <div className="inline-block mb-2 text-2xl lg:text-3xl font-semibold text-slate-800">
              {active === false && produk.hargas.length !== 0 ? (
                <span className="mr-2 flex justify-start items-center">
                  {produk.hargas.length > 1 ? (
                    <>
                      <FormatRupiah value={`${produk.hargas[0].hrgJual}`} />
                      {" ~ "}
                      <FormatRupiah
                        value={`${
                          produk.hargas[produk.hargas.length - 1].hrgJual
                        }`}
                      />
                    </>
                  ) : (
                    <FormatRupiah value={`${produk.hargas[0].hrgJual}`} />
                  )}
                </span>
              ) : (
                <>
                  <FormatRupiah value={`${harga.hargaJual}`} />
                  {harga.diskon && (
                    <span className="text-base font-normal text-slate-600 line-through ml-2">
                      Rp{harga.diskon}
                    </span>
                  )}
                </>
              )}
            </div>
            <div className="flex">
              <div className="flex items-center justify-start mr-3">
                <span className="mb-2 text-slate-800 text-lg">
                  {`${produk.jenisHarga} : `}
                </span>
              </div>
              <div className="pb-3 pt-4">
                <div className="flex flex-wrap">
                  {produk.hargas.map((harga, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`${
                        active === index
                          ? "text-white bg-blue-800"
                          : "text-blue-700"
                      } border border-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2`}
                      onClick={async () => {
                        (await active) === index
                          ? setActive(false)
                          : setActive(index);

                        gantiHarga(harga.namaHarga);
                        gantiImg(harga.imgName, harga.imgUrl);
                      }}
                    >
                      {harga.namaHarga}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {user !== null && toko.level === "premium" ? (
              <>
                <div className="flex items-center mt-4 mb-5">
                  <span className="mr-5 text-lg text-slate-900">Kuantitas</span>
                  <div
                    className="inline-flex rounded-md shadow-sm"
                    role="group"
                  >
                    <button
                      type="button"
                      className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-l-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                      onClick={() => decrement()}
                    >
                      <span className="m-auto text-2xl font-normal">-</span>
                    </button>
                    <input
                      type="text"
                      className="px-2 w-14 text-center align-middle text-slate-900 bg-transparent border-0 border-y-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                      value={qty}
                      max={harga.stok}
                      readOnly
                    />
                    <button
                      type="button"
                      className="px-2 w-9 align-middle text-slate-900 bg-transparent rounded-r-md border-2 border-sky-400 hover:bg-sky-300 hover:text-white focus:z-10 focus:ring-2 focus:ring-sky-700 focus:bg-sky-400 focus:text-white"
                      onClick={() => increment(harga.stok)}
                    >
                      <span className="m-auto text-2xl font-normal">+</span>
                    </button>
                  </div>
                  <div className="ml-2">
                    <span className="text-slate-900">Stok : </span>
                    <span>{harga.stok}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-1/2 lg:w-1/4">
                    <button
                      onClick={() =>
                        tambahKeranjang(
                          produk.idProduk,
                          produk.idToko,
                          qty,
                          harga
                        )
                      }
                      className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-sky-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-slate-900 focus:ring-4 focus:outline-none focus:ring-cyan-200"
                    >
                      <span className="relative w-full px-5 py-2.5 text-base font-semibold transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                        <span className="text-lg font-bold mr-1">+</span>
                        Keranjang
                      </span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <span className="text-slate-900">Stok : </span>
                <span>{harga.stok}</span>
              </>
            )}
            <div className="flex flex-col xs:flex-row items-start md:items-center px-2 my-6 py-4 border-y border-slate-200">
              <div className="flex flex-col pr-3 overflow-hidden">
                <span className="text-lg md:text-xl text-slate-800 mb-2 basis-1/2 truncate">
                  {toko.namaToko}
                </span>
                <div className="p-1">
                  <Link
                    as="button"
                    href={`/${toko.slug}`}
                    className="flex basis-1/2	items-center max-w-max text-slate-700 px-2 py-1 border border-slate-400 rounded-md hover:border-slate-900 hover:text-slate-900 hover:ring-2 hover:ring-slate-700"
                  >
                    <BuildingStorefrontIcon className="w-4 h-5 mr-1" />
                    Kunjungi Toko
                  </Link>
                </div>
              </div>
              <div className="flex pt-2 md:pl-3">
                <div className="flex flex-col text-base">
                  <div className="relative flex mb-2">
                    <label className="mr-1 text-slate-700">Produk : </label>
                    <span className="text-slate-900">{toko.jumlahProduk}</span>
                  </div>
                  <div className="relative flex">
                    <label className="mr-1 text-slate-700">Bergabung : </label>
                    <span className="text-slate-900">{`${toko.lamaBergabung}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="flex border-b border-slate-200">
                  <div className="p-4 pb-2  text-base font-bold border-b-2 border-sky-500">
                    Detail
                  </div>
                </div>
              </div>
              <div className="mt-3 font-normal text-base">
                <div className="overflow-hidden">
                  <div className="text-ellipsis whitespace-pre-wrap">
                    <p className="ml-2">{`${produk.deskripsi}`}</p>
                  </div>
                </div>
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

export default ProdukDetail;
