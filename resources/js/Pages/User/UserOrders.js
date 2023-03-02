import { FormatRupiah } from "@/config/formatRupiah";
import Main from "@/Layouts/Main";
import UserLayout from "@/Layouts/UserLayout";
import { Dialog, Tab, Transition } from "@headlessui/react";
import { BuildingStorefrontIcon } from "@heroicons/react/20/solid";
import { Head, router } from "@inertiajs/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";

const UserOrders = ({ title }) => {
  const [orderan, setOrderan] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [rinciId, setRinciId] = useState([]);

  useEffect(() => {
    axios
      .get("/user/get-orders")
      .then((res) => {
        setOrderan({
          semua: Object.entries(res.data)
            .map(([status, toko]) => Object.entries(toko))
            .flat(),
          diproses: res.data.hasOwnProperty("diproses")
            ? Object.entries(res.data.diproses)
            : [],
          dikirim: res.data.hasOwnProperty("dikirim")
            ? Object.entries(res.data.dikirim)
            : [],
          diterima: res.data.hasOwnProperty("diterima")
            ? Object.entries(res.data.diterima)
            : [],
          dibatalkan: res.data.hasOwnProperty("dibatalkan")
            ? Object.entries(res.data.dibatalkan)
            : [],
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const toDetailOrder = (param) => {
    router.get("/user/orders/detail", {
      rinciId: param.data.rinciId.join(","),
    });
  };

  const openDialog = (param) => {
    setRinciId(param.data.rinciId);
    setIsOpen(true);
  };

  const konfirmasiDiterima = () => {
    axios
      .patch("/user/orders", {
        rinciId: rinciId.join(","),
      })
      .then((res) => {
        setOrderan({
          semua: Object.entries(res.data)
            .map(([status, toko]) => Object.entries(toko))
            .flat(),
          diproses: res.data.hasOwnProperty("diproses")
            ? Object.entries(res.data.diproses)
            : [],
          dikirim: res.data.hasOwnProperty("dikirim")
            ? Object.entries(res.data.dikirim)
            : [],
          diterima: res.data.hasOwnProperty("diterima")
            ? Object.entries(res.data.diterima)
            : [],
          dibatalkan: res.data.hasOwnProperty("dibatalkan")
            ? Object.entries(res.data.dibatalkan)
            : [],
        });
      })
      .catch((err) => console.log(err.message));
    setIsOpen(false);
  };
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
                      <div
                        className="mr-3 text-sm cursor-pointer"
                        onClick={() =>
                          toDetailOrder(
                            produks.reduce((acc, curr) => {
                              const { rinciId = [] } = acc["data"] || {
                                rinciId: [],
                              };
                              rinciId.push(curr.id);
                              return {
                                ...acc,
                                data: { rinciId },
                              };
                            }, {})
                          )
                        }
                      >
                        Lihat detail >>>
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
                          {produk.harga.hrgDiskon ? (
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
                      <div className="flex space-x-8 mt-2">
                        <div className="">Total</div>
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
                      {produks.some(
                        (produk) => produk.statusOrder === "dikirim"
                      ) && (
                        <div className="flex mt-4">
                          <button
                            type="button"
                            className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                            onClick={() =>
                              openDialog(
                                produks.reduce((acc, curr) => {
                                  const { rinciId = [] } = acc["data"] || {
                                    rinciId: [],
                                  };
                                  rinciId.push(curr.id);
                                  return {
                                    ...acc,
                                    data: { rinciId },
                                  };
                                }, {})
                              )
                            }
                          >
                            Diterima
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Konfimasi Pesanan
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Apakah produk sudah diterima?
                    </p>
                  </div>

                  <div className="flex mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mr-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => konfirmasiDiterima()}
                    >
                      Iya
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 mr-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Tidak
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

UserOrders.layout = (page) => (
  <Main>
    <UserLayout children={page} />
  </Main>
);

export default UserOrders;
