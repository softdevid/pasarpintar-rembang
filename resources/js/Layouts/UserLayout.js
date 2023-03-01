import {
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const UserLayout = ({ children }) => {
  const props = usePage().props;
  const [isNavClick, setIsNavClick] = useState(false);

  return (
    <div className="container flex my-5 px-3">
      <div className="w-44 flex-shrink-0 divide-y hidden lg:block">
        <div className="flex py-3">
          <UserIcon className="h-12 w-12 text-slate-400" />
          <div className="flex flex-col justify-center ml-3">
            <div className="mb-1 text-ellipsis">{props.auth.user.name}</div>
          </div>
        </div>
        <div className="pt-4 space-y-4">
          <div className="relative">
            <Link
              as="button"
              href="/user/profile"
              className="flex items-center"
            >
              <UserIcon className="h-7 w-7 mr-2 text-slate-400" />
              <span className="text-base">Profil</span>
            </Link>
          </div>
          <div className="relative">
            <Link as="button" href="/user/orders" className="flex items-center">
              <ClipboardDocumentListIcon className="h-7 w-7 mr-2 text-slate-400" />
              <span className="text-base">Pesanan</span>
            </Link>
          </div>
          <div className="relative">
            <Link
              as="button"
              href="/logout"
              method="post"
              className="flex items-center"
            >
              <ArrowLeftOnRectangleIcon className="h-7 w-7 mr-2 text-slate-400" />
              <span className="text-base">LogOut</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <div className="flex">
          <button
            type="button"
            className="flex justify-center items-start p-2 mr-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={(e) => setIsNavClick(!isNavClick)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <nav
            className={`${
              isNavClick ? "" : "hidden"
            } absolute z-20 bg-white shadow-lg rounded-lg max-w-[250px] w-full left-4 top-44`}
          >
            <div className="p-5 space-y-4">
              <div className="relative">
                <Link
                  as="button"
                  href="/user/profile"
                  className="flex items-center"
                >
                  <UserIcon className="h-7 w-7 mr-2 text-slate-400" />
                  <span className="text-base">Profil</span>
                </Link>
              </div>
              <div className="relative">
                <Link
                  as="button"
                  href="/user/orders"
                  className="flex items-center"
                >
                  <ClipboardDocumentListIcon className="h-7 w-7 mr-2 text-slate-400" />
                  <span className="text-base">Pesanan</span>
                </Link>
              </div>
              <div className="relative">
                <Link
                  as="button"
                  href="/logout"
                  method="post"
                  className="flex items-center"
                >
                  <ArrowLeftOnRectangleIcon className="h-7 w-7 mr-2 text-slate-400" />
                  <span className="text-base">LogOut</span>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div className="relative grow w-full lg:ml-5 max-w-5xl">{children}</div>
    </div>
  );
};

export default UserLayout;
