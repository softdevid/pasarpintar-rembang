import formatRibuan from "@/config/formatRibuan";
import { FormatRupiah } from "@/config/formatRupiah";
import { Link } from "@inertiajs/react";
import React from "react";

const ProdukLaris = ({ produk }) => {
  console.log(produk)
  return (
    <div className="container">
      <div className="bg-sky-900 border-2 border-sky-900 rounded-lg overflow-hidden">
        <div className="relative flex justify-start align-baseline px-4 bg-sky-400">
          <h2 className="mt-3 pt-2 px-4 rounded-t-md bg-sky-900 text-lg text-white">
            Produk Terlaris
          </h2>
        </div>
        <div className="relative p-2 overflow-auto">
          <div className="relative w-full pb-2 flex gap-3 snap-x snap-mandatory overflow-x-auto scrollbar">
            {produk.map((data, i) => {
              return (
                <div key={i} className="snap-start snap-always shrink-0">
                  <Link href={`${data.toko.slugToko}/${data.slugProduk}`}>
                    <div className="relative flex flex-col overflow-visible w-full h-full max-w-[8rem] sm:w-max-[9rem] md:max-w-[10rem] lg:max-w-[11rem] max-h-max bg-white rounded-md">
                      <img
                        className="shrink-0 bg-cover bg-center w-full p-2 max-h-44"
                        // src={data.produkImg}
                        src={data.imgUrl}
                        alt={data.namaProduk}
                      />
                      <div className="flex flex-col flex-[1_0_auto] px-2 py-2.5 overflow-hidden">
                        <div className="flex flex-col flex-[1_0_auto]">
                          <h5 className="text-sm font-semibold tracking-tight text-slate-700 line-clamp-2">
                            {data.namaProduk}
                          </h5>
                        </div>
                        <div>
                          <span className="text-lg font-bold">
                            <FormatRupiah
                              value={
                                (data.harga_terkecil !== null
                                  ? data.harga_terkecil.hrgJual
                                  : 0)
                              }
                            />
                            {/* <FormatRupiah
                              value={
                                (data.harga_terkecil !== null
                                  ? data.harga_terkecil.hrgJual
                                  : 0) * 1000
                              }
                            /> */}
                          </span>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 pt-1">
                              {`${formatRibuan(data.terjual)} terjual`}
                            </span>
                          </div>
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
    </div>
  );
};

export default ProdukLaris;
