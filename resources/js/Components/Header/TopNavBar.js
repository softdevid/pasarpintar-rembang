import { Menu, Transition } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import { Fragment, useContext, useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AppContext } from "@/context/app-context";

const TopNavBar = () => {
  const user = useContext(AppContext).props.auth.user;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/data-toko')
      .then(res => res.json())
      .then(json => setData(json))
  }, []);

  return (
    <nav className="px-3.5 py-2 bg-white">
      <div className="container text-md">
        <div className="flex justify-end items-center">
          {user !== null ? (
            <Menu as="div" className="relative inline-block">
              <Menu.Button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-transparent py-1 text-sm font-medium text-white hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
              >
                <ChevronDownIcon
                  className="mr-2 -ml-1 h-5 w-5 text-black hover:text-gray-700"
                  aria-hidden="true"
                />
                <span className="font-medium text-slate-700 truncate">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 origin-top-right z-50 text-base list-none bg-white divide-y divide-slate-300 rounded shadow">
                  <div className="px-4 py-3">
                    <Menu.Item>
                      <span className="block text-sm text-slate-900 truncate">
                        {user.name}
                      </span>
                    </Menu.Item>
                    <Menu.Item>
                      <span className="block text-sm text-slate-900 truncate">
                        {user.email}
                      </span>
                    </Menu.Item>
                  </div>
                  <div className="py-1">
                    {data.statusToko === 'premium' && user.level === 'toko' ? (
                      <Menu.Item>
                        <Link
                          href="/toko/dashboard"
                          className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                          as="button"
                        >
                          Dashboard Admin
                        </Link>
                      </Menu.Item>
                    ) : data.statusToko === 'free' && user.level === 'toko' ? (
                      <Menu.Item>
                        <Link
                          href="/toko/produk"
                          className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                          as="button"
                        >
                          Dashboard Admin
                        </Link>
                      </Menu.Item>
                    ) : (
                      <></>
                    )}
                    <Menu.Item>
                      <Link
                        href="/user/profile"
                        className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                        as="button"
                      >
                        Profil
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href="/user/orders"
                        className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                        as="button"
                      >
                        Pesanan
                      </Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link
                        href={route("logout")}
                        method="post"
                        className="block w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-slate-100"
                        as="button"
                      >
                        Logout
                      </Link>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div className="flex justify-end items-center">
              <Link
                href={route("register")}
                className="text-slate-800"
                as="button"
              >
                Daftar
              </Link>
              <div className="px-1">|</div>
              <Link
                href={route("login")}
                className="text-slate-800"
                as="button"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
