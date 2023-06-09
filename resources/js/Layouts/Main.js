import React, { useEffect, useState } from "react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { usePage } from "@inertiajs/react";
import { AppContext } from "@/context/app-context";
import MenuMobile from "../Components/HomePage/MenuMobile";
import SplashScreen from "@/Components/HomePage/SplashScreen";

export default function Main({ children }) {
  const { props, url } = usePage();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(props.auth.cartCount);
  }, []);

  const appContextValue = {
    props,
    url,
    cartCount,
    setCartCount,
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Menggunakan setTimeout untuk menunjukkan splash screen selama 2 detik
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {loading ? (
        <SplashScreen />
      ) : (
        <AppContext.Provider value={appContextValue}>
          <header>
            <NavBar />
          </header>
          <div className="grow">
            {children}
          </div>
          <footer>
            <Footer />
          </footer>
          <div className="block md:hidden">
            <MenuMobile />
          </div>
        </AppContext.Provider>
      )}
    </div>
  );
}
