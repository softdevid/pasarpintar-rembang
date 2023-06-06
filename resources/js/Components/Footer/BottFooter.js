import { AppContext } from "@/context/app-context";
import React, { useContext } from "react";

const BottFooter = () => {
  const appName = useContext(AppContext).props.app.name;

  return (
    <div className="bg-white">
      <div className="container px-3.5 py-4 flex items-center justify-center border-t-2 border-slate-500">
        <span className="text-sm text-slate-700 sm:text-center">
          {appName} &copy; 2023{" "}
          <a href="https://softdev.akriliklasercutting.com"
            className="hover:underline hover:cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            SoftDev
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default BottFooter;
