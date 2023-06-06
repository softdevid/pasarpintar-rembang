import {
  ArrowLeftOnRectangleIcon,
  ArrowRightCircleIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  CurrencyDollarIcon,
  ListBulletIcon,
} from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import React, { useState } from "react";

const Main = (props) => {
  const [open, setOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    router.post("/logout");
  };

  return (
    <>
      <div className="hidden md:block">
        <div className="flex">
          <div
            className={` ${open ? "w-72" : "w-20 "
              } bg-dark-purple p-5 pt-8 relative duration-300`}
          >
            <img
              src="/img/control.png"
              className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
              onClick={() => setOpen(!open)}
            />
            <div className="flex gap-x-4 items-center">
              <img
                src="/img/logo.png"
                className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                  }`}
              />
              <h1
                className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                  }`}
              >
                Admin PasarPintar
              </h1>
            </div>
            <ul className="pt-6">
              <Link href="/admin/dashboard">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <ComputerDesktopIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Dashboard
                  </span>
                </li>
              </Link>
              <Link href="/admin/toko">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <BuildingStorefrontIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Toko
                  </span>
                </li>
              </Link>
              <Link href="/admin/komisi">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <CurrencyDollarIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Komisi Toko
                  </span>
                </li>
              </Link>
              <Link href="/admin/kategori">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <ListBulletIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Kategori
                  </span>
                </li>
              </Link>
              <Link href="/admin/laporan">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <ClipboardDocumentListIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Laporan
                  </span>
                </li>
              </Link>
              <Link href="/admin/setting">
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <Cog6ToothIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Setting
                  </span>
                </li>
              </Link>
              <button onClick={() => handleLogout()}>
                <li
                  className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                >
                  <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Keluar
                  </span>
                </li>
              </button>
            </ul>
          </div>
          <div className="h-screen overflow-y-auto overflow-x-auto flex-1 p-7">{props.children}</div>
        </div>
      </div>

      <div className="block md:hidden">
        <div className="flex bg-dark-purple text-white overflow-auto w-full">
          <div className="flex items-center justify-between p-3 text-white">
            <div className="flex items-center justify-start">
              <button
                type="button"
                className="-m-2.5 inline-flex md:hidden items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(true)}
              >
                <span className="sr-only">open/close main menu</span>
                <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
              <Link href="#" as="button" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white focus:outline-none">
                  Admin Pasar PIntar
                </span>
              </Link>
              <button
                type="button"
                className="inline-flex md:hidden items-end justify-end rounded-md p-2 ml-5 text-white bg-red-500"
                onClick={handleLogout}
              >
                <ArrowRightCircleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 md:ml-64">{props.children}</div>

        {mobileMenuOpen && (
          <>
            <div className="fixed top-0 left-0 z-40 w-[70%] h-full p-4 overflow-y-auto bg-gradient-to-t bg-dark-purple">
              <h5 id="drawer-navigation-label" className="text-base font-semibold text-white uppercase dark:text-gray-400">Menu - Admin Pasar Pintar</h5>
              <button onClick={() => setMobileMenuOpen(false)} type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Close menu</span>
              </button>
              <div className="py-4 overflow-y-auto">
                <ul className="pt-6">
                  <Link href="/admin/dashboard">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <ComputerDesktopIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Dashboard
                      </span>
                    </li>
                  </Link>
                  <Link href="/admin/toko">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <BuildingStorefrontIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Toko
                      </span>
                    </li>
                  </Link>
                  <Link href="/admin/komisi">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <CurrencyDollarIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Komisi Toko
                      </span>
                    </li>
                  </Link>
                  <Link href="/admin/kategori">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <ListBulletIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Kategori
                      </span>
                    </li>
                  </Link>
                  <Link href="/admin/laporan">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <ClipboardDocumentListIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Laporan
                      </span>
                    </li>
                  </Link>
                  <Link href="/admin/setting">
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <Cog6ToothIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Setting
                      </span>
                    </li>
                  </Link>
                  <button onClick={() => handleLogout()}>
                    <li
                      className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4`}
                    >
                      <ArrowLeftOnRectangleIcon className="h-6 w-6" />
                      <span className={`${!open && "hidden"} origin-left duration-200`}>
                        Keluar
                      </span>
                    </li>
                  </button>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Main;
