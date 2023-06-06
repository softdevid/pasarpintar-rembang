import {
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import React from "react";

const TokoMainBar = ({ toko }) => {
  function ubahNomorTelepon(nomorTelepon) {
    return nomorTelepon.replace(/^(?:\+62|0)(\d+)$/, "62$1");
  }
  return (
    <div className="block md:flex flex-row items-center p-4 my-4 border border-sky-300 rounded-md">
      <div className="flex items-center flex-nowrap">
        <BuildingStorefrontIcon className="w-20 h-20 text-cyan-500" />
        <div className="pl-3 flex flex-col">
          <span className="text-xl font-bold mb-2 inline-flex">{toko.namaToko}
            {toko.statusToko === "premium" && <CheckCircleIcon className="w-5 h-5 mt-1 text-blue-500" title="Verified Premium Store" />}
          </span>
          <Link
            // as="button"
            href={`https://wa.me/${ubahNomorTelepon(toko.noHp)}`}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg"
          >
            <img src="/icon/WhatsAppButtonGreenSmall.svg" className="" />
          </Link>
        </div>
      </div>
      <div className="flex items-center md:ml-14">
        <div className="flex flex-col">
          <span className="">{`Nama Pengelola : ${toko.namaPengelola}`}</span>
          <span className="">{`Alamat : ${toko.alamat}`}</span>
        </div>
      </div>
    </div>
  );
};

export default TokoMainBar;
