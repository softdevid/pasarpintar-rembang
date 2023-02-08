import formatRibuan from "@/config/formatRibuan";
import { FormatRupiah } from "@/config/formatRupiah";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import QtyButton from "../QtyButton";

const ProdukDetail = ({ produk, toko }) => {
  // console.log(produk, toko);

  const [active, setActive] = useState(false);
  const [harga, setHarga] = useState({});

  useEffect(() => {
    if (active === false) {
      initialHarga();
    }
  }, [active]);

  const initialHarga = () =>
    setHarga({
      hargaJual: 0,
      stok: produk.hargas.reduce(
        (total, currentValue) => (total = total + currentValue.stokToko),
        0
      ),
    });

  const gantiHarga = (namaHarga) => {
    console.log(namaHarga);

    const filter = produk.hargas.filter((harga) => {
      return harga.namaHarga === namaHarga;
    });
    setHarga({
      hargaJual: filter[0].hrgJual,
      stok: filter[0].stokToko,
    });
  };

  return (
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
            {active === false ? (
              <span className="mr-2 flex justify-start items-center">
                <FormatRupiah value={`${produk.hargas[0].hrgJual}000`} />
                {" ~ "}
                <FormatRupiah
                  value={`${
                    produk.hargas[produk.hargas.length - 1].hrgJual
                  }000`}
                />
              </span>
            ) : (
              <FormatRupiah value={`${harga.hargaJual}000`} />
            )}
            {/* {produk.diskon && (
              <span className="text-base font-normal text-slate-600 line-through">
                Rp{produk.diskon}
              </span>
            )} */}
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
                  }}
                >
                  {harga.namaHarga}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center mt-4 mb-5">
            <span className="mr-5 text-lg text-slate-900">Kuantitas</span>
            <QtyButton max={harga.stok} />
            <div className="ml-2">
              <span className="text-slate-900">Stok : </span>
              <span>{harga.stok}</span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-1/2 lg:w-1/4">
              <button className="relative w-full inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-teal-300 to-sky-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-slate-900 focus:ring-4 focus:outline-none focus:ring-cyan-200">
                <span className="relative w-full px-5 py-2.5 text-base font-semibold transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  <span className="text-lg font-bold mr-1">+</span>Keranjang
                </span>
              </button>
            </div>
          </div>
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
  );
};

export default ProdukDetail;
