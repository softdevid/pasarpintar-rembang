import React, { useEffect, useState } from "react";
import Footer from "@/Components/Footer";
import NavBar from "@/Components/NavBar";
import { usePage } from "@inertiajs/react";
import { AppContext } from "@/context/app-context";

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

  return (
    <div className="flex flex-col h-screen">
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
      </AppContext.Provider>
    </div>
  );
}
