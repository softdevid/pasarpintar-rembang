import {
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import React from "react";

const UserLayout = ({ children }) => {
  return (
    <div className="container flex my-5 px-3">
      <div className="w-44 flex-shrink-0 divide-y hidden lg:block">
        <div className="flex py-3">
          <UserIcon className="h-12 w-12 text-slate-400" />
          <div className="flex flex-col justify-center ml-3">
            <div className="mb-1">Me</div>
            <div>Hai</div>
          </div>
        </div>
        <div className="pt-4 space-y-3">
          <div className="relative">
            <div className="flex items-center">
              <UserIcon className="h-5 w-5 mr-2 text-slate-400" />
              <span className="text-xs">Profil</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center">
              <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-slate-400" />
              <span className="text-xs">Pesanan</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex items-center">
              <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2 text-slate-400" />
              <span className="text-xs">LogOut</span>
            </div>
          </div>
        </div>
      </div>
      <div className="relative grow w-full lg:ml-5 max-w-5xl">
        {children}
      </div>
    </div>
  );
};

export default UserLayout;
