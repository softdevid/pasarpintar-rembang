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
      {/* <div className="container py-2">
        <div className="relative px-4 overflow-auto">
          <div className="grid grid-rows-5 grid-flow-col-dense gap-4 overflow-x-auto scrollbar">
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
      </div> */}
      <div className="container py-2">
        <div className="relative p-2 overflow-auto">
          <div className="relative w-full pb-2 grid grid-rows-2 grid-flow-col-dense gap-3 snap-x snap-mandatory overflow-x-auto scrollbar">
            {kategori.map((data, i) => {
              return (
                <div key={i} className="snap-start snap-always shrink-0">
                  <Link href={`/kategori/${data.slug}`}>
                    <div className="relative flex flex-col overflow-visible w-auto h-full max-w-[10rem] sm:w-max-[10rem] md:max-w-[10rem] lg:max-w-[11rem] max-h-max bg-white rounded-md">
                      <div className="flex flex-col flex-[1_0_auto] px-2 py-2.5 overflow-hidden">
                        <div className="flex flex-col flex-[1_0_auto]">
                          <h5 className="text-sm text-center font-semibold tracking-tight text-slate-700 line-clamp-2 whitespace-nowrap">
                            {data.namaKategoriGlobal}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Kategori;
