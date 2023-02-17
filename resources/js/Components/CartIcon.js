import { AppContext } from "@/context/app-context";
import { ShoppingCartIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import React, { useContext } from "react";

const CartIcon = () => {

  const cartCount = useContext(AppContext).cartCount;

  return (
    <Link href={"/cart"}>
      <div className="relative mr-3">
        <div className="flex items-center justify-center p-2">
          <ShoppingCartIcon className="h-6 w-6" />
        </div>
        <span className="top-[-1px] left-[17px] absolute p-1 text-[10px] leading-none text-center align-middle bg-red-500 rounded-full">
          {cartCount != null ? cartCount : 0}
        </span>
      </div>
    </Link>
  );
};

export default CartIcon;
