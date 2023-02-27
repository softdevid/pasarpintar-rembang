import { FormatRupiah } from "@/config/formatRupiah";
import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import { Tab } from "@headlessui/react";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Head } from "@inertiajs/react";
import React, { Fragment, useEffect, useState } from "react";

const UserOrders = ({ title, orders }) => {
  // console.log(orders);
  const [orderan, setOrderan] = useState({});

  useEffect(() => {
    setOrderan({
      semua: Object.entries(orders)
        .map(([status, toko]) => Object.entries(toko))
        .flat(),
      diproses: Object.entries(orders.diproses),
      dikirim: orders.hasOwnProperty("dikirim")
        ? Object.entries(orders.dikirim)
        : [],
      selesai: orders.hasOwnProperty("selesai")
        ? Object.entries(orders.selesai)
        : [],
      dibatalkan: orders.hasOwnProperty("dibatalkan")
        ? Object.entries(orders.dibatalkan)
        : [],
    });
  }, []);

  console.log(orderan);

  return (
    <>
      <Head title={title} />
      <Tab.Group>
        <Tab.List className="flex w-full overflow-hidden sticky top-0 z-10 mb-3">
          {Object.keys(orderan).map((status) => (
            <Tab
              key={status}
              className={({ selected }) =>
                `flex flex-1 items-center justify-center overflow-hidden cursor-pointer py-4 bg-white text-base text-center border-b-2 focus:outline-none  ${
                  selected ? "text-sky-500 border-sky-500" : "text-slate-800"
                }`
              }
            >
              <span className="overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                {status}
              </span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-3">
          {Object.values(orderan).map((ord, i) => (
            <Tab.Panel key={i} className="space-y-4">
              {ord.map(([ordId, ordData]) =>
                Object.entries(ordData).map(([toko, produks], i) => (
                  <div className="bg-white pt-6 p-3" key={i}>
                    <div className="flex justify-start items-center pb-3 border-b border-slate-200">
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
                              <div className="mb-1">
                                {produk.harga.namaHarga}
                              </div>
                              <div>{`${produk.qty} x`}</div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right flex">
                          {produk.harga.hrgDiskon >= 0 ? (
                            <>
                              <span className="align-middle text-sm line-through mr-3">
                                <FormatRupiah
                                  value={produk.harga.hrgJual * 1000}
                                />
                              </span>
                              <span className="align-middle text-sm">
                                <FormatRupiah
                                  value={
                                    (produk.harga.hrgJual -
                                      produk.harga.hrgDiskon) *
                                    1000
                                  }
                                />
                              </span>
                            </>
                          ) : (
                            <span className="align-middle text-sm">
                              <FormatRupiah
                                value={produk.harga.hrgJual * 1000}
                              />
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div className="flex flex-col items-end justify-center mt-3 pt-3 border-t border-slate-200">
                      <div className="flex space-x-8">
                        <div className="">Subtotal</div>
                        <div className="">
                          <FormatRupiah
                            value={
                              produks.reduce(
                                (subtotal, prod) =>
                                  subtotal +
                                  prod.qty *
                                    (prod.harga.hrgJual - prod.harga.hrgDiskon),
                                0
                              ) * 1000
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

UserOrders.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserOrders;
