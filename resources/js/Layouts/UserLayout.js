import {
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/react";
import React from "react";

const UserLayout = ({ children}) => {
  const props = usePage().props;
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
            <Link as="button" href="/logout" method="post" className="flex items-center">
              <ArrowLeftOnRectangleIcon className="h-7 w-7 mr-2 text-slate-400" />
              <span className="text-base">LogOut</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative grow w-full lg:ml-5 max-w-5xl">{children}</div>
    </div>
  );
};

export default UserLayout;
