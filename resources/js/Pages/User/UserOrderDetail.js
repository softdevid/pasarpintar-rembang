import { FormatRupiah } from "@/config/formatRupiah";
import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import React from "react";

const UserOrderDetail = ({ title, order, rinciOrder }) => {
  console.log(order);
  console.log(rinciOrder);

  return (
    <>
      <Head title={title} />
      <div className="bg-white w-full p-5">
        <div className="flex flex-row justify-between items-center mb-5">
          <span className="text-3xl text-slate-900 font-medium">
            Rincian Pesanan
          </span>
          <span className="text-xs text-slate-900 font-medium">
            {order.noFaktur}
          </span>
        </div>
        <div className="flex flex-col divide-y">
          <div className="flex items-center p-3">
            <div className="text-base">Nama Penerima</div>
            <div className="ml-3 text-sm">{order.namaCustomer}</div>
          </div>
          <div className="flex items-center p-3">
            <div className="text-base">Nomor Telepon</div>
            <div className="ml-3 text-sm">{order.noHp}</div>
          </div>
          <div className="flex items-center p-3">
            <div className="text-base">Alamat Pengiriman</div>
            <div className="ml-3 text-sm">{order.alamatPengiriman}</div>
          </div>
        </div>
      </div>
      <div>
        {Object.entries(rinciOrder).map(([toko, produks], i) => (
          <div className="bg-white p-6" key={i}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div className="flex items-center whitespace-nowrap">
                <div className="text-slate-600 text-sm font-semibold overflow-hidden text-ellipsis">
                  {toko}
                </div>
                <div className="ml-2">
                  <button className="px-2 py-1 flex items-center justify-start text-slate-700">
                    <BuildingStorefrontIcon className="h-4 w-4 mr-2" />
                    <span className="text-xs">Kunjungi Toko</span>
                  </button>
                </div>
              </div>
            </div>
            {produks.map((produk, i) => (
              <div
                key={produk.id}
                className="flex flex-nowrap items-center pt-3"
              >
                <div className="flex flex-1 flex-nowrap items-start pr-2">
                  <div className="h-20 md:h-24 w-20 md:w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={produk.harga.imgUrl}
                      alt={produk.harga.imgName}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-col flex-1 items-start pl-2 break-words">
                    <div className="overflow-hidden text-sm md:text-base text-ellipsis line-clamp-2 mb-1">
                      {produk.produk.namaProduk}
                    </div>
                    <div>
                      <div className="mb-1">{produk.harga.namaHarga}</div>
                      <div>{`${produk.qty} x`}</div>
                    </div>
                  </div>
                </div>
                <div className="text-right flex">
                  {produk.harga.hrgDiskon ? (
                    <>
                      <span className="align-middle text-sm line-through mr-3">
                        <FormatRupiah value={produk.harga.hrgJual} />
                      </span>
                      <span className="align-middle text-sm">
                        <FormatRupiah
                          value={
                            (produk.harga.hrgJual - produk.harga.hrgDiskon)
                          }
                        />
                      </span>
                    </>
                  ) : (
                    <span className="align-middle text-sm">
                      <FormatRupiah value={produk.harga.hrgJual} />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div className="border-t border-slate-200 mt-3 pt-3">
              <div className="flex justify-end items-center pb-3">
                <div className="pr-4">Subtotal</div>
                <div className="">
                  <FormatRupiah
                    value={
                      produks.reduce(
                        (subtotal, prod) =>
                          subtotal +
                          prod.qty *
                          (prod.harga.hrgJual - prod.harga.hrgDiskon + 1000),
                        0
                      )
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end items-center pb-3">
                <div className="pr-4">Ongkir</div>
                <div className="">
                  <FormatRupiah value={
                    produks.reduce(
                      (subtotal, prod) =>
                        subtotal +
                        prod.qty * (1000),
                      0
                    )
                  } />
                </div>
              </div>
              <div className="flex justify-end items-center text-xl py-5">
                <div className="pr-4">Total</div>
                <div className="">
                  <FormatRupiah
                    value={
                      produks.reduce(
                        (subtotal, prod) =>
                          subtotal +
                          prod.qty *
                          (prod.harga.hrgJual - prod.harga.hrgDiskon + 1000),
                        0
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

UserOrderDetail.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserOrderDetail;
