import {
  CreditCardIcon,
  HandThumbUpIcon,
  ShieldCheckIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import React from "react";

const Kategori = ({ kategori }) => {
  return (
    <>
      <div className="container">
        <div className="hidden sm:grid sm:grid-cols-3 sm:gap-2 sm:mx-auto sm:max-w-2xl">
          <div className="bg-white p-2 border-2 border-slate-900 rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <CreditCardIcon className="h5 w-5 text-slate-800" />
              <p>Pembayaran Mudah</p>
            </div>
          </div>
          <div className="bg-white p-2 border-2 border-slate-900 rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <ShieldCheckIcon className="h-5 w-5 text-slate-800" />
              <p>Aman Terpercaya</p>
            </div>
          </div>
          <div className="bg-white p-2 border-2 border-slate-900 rounded-lg">
            <div className="flex flex-col justify-center items-center">
              <HandThumbUpIcon className="h5 w-5 text-slate-800" />
              <p>Bisa COD</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-2">
        <div className="relative px-4 overflow-auto">
          <div className="grid grid-rows-2 grid-flow-col-dense gap-4 overflow-x-auto scrollbar">
            {kategori.map((ktgr, i) => (
              <Link
                key={i}
                as="button"
                href={`/kategori/${ktgr.slug}`}
                className="px-1 pt-1 text-sm font-semibold whitespace-nowrap text-center line-clamp-2"
              >
                <div className="flex flex-col items-center justify-start p-4 border border-slate-500 bg-white rounded-lg">
                  {ktgr.namaKategoriGlobal}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kategori;
