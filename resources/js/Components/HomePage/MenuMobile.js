import { ClipboardDocumentListIcon, HomeIcon, ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import { AppContext } from "@/context/app-context";
import { useContext } from "react";

const MenuMobile = () => {
  const cartCount = useContext(AppContext).cartCount;

  window.addEventListener('resize', function () {
    const mobileMenu = document.getElementById('#mobile-menu');
    if (window.innerHeight < document.documentElement.clientHeight) {
      mobileMenu.style.display = 'none';
    } else {
      mobileMenu.style.display = 'block';
    }
  });


  return (
    <>

      <footer id="mobile-menu" className="fixed bottom-0 left-0 z-30 w-full h-auto bg-white border-t border-gray-200 shadow">
        <ul className="grid grid-cols-4 gap-7 mt-1 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <Link href="/" className="p-2">
            <HomeIcon className="w-6 h-6 mx-auto" />
            <span className="block mt-2 text-center">Home</span>
          </Link>
          <Link href="/user/orders" className="p-2">
            <ClipboardDocumentListIcon className="w-6 h-6 mx-auto" />
            <span className="block mt-2 text-center">Pesanan</span>
          </Link>
          <Link href="/cart">
            <div className="relative">
              <div className="mx-auto p-2">
                <ShoppingCartIcon className="h-6 w-6" />
              </div>
              <span className="top-[-1px] left-[17px] absolute p-1 text-[10px] leading-none text-center align-middle bg-red-500 rounded-full">
                {cartCount != null ? cartCount : 0}
              </span>
            </div>
            <span className="text-center">Keranjang</span>
          </Link>
          <Link href="/user/profile" className="p-2">
            <UserCircleIcon className="w-6 h-6 mx-auto" />
            <span className="block mt-2 text-center">Profil</span>
          </Link>
        </ul>
      </footer>

    </>
  )
}

export default MenuMobile;
