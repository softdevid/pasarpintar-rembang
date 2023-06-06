import { Link, usePage } from "@inertiajs/react";
import TopNavBar from "./Header/TopNavBar";
import MidNavBar from "./Header/MidNavBar";
import BottNavBar from "./Header/BottNavBar";

const NavBar = () => {
  return (
    <>
      <TopNavBar/>
      <MidNavBar/>
    </>
  );
};

export default NavBar;
