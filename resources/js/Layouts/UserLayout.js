import {
  ArrowLeftOnRectangleIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  EnvelopeIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Link, usePage } from "@inertiajs/react";
import React, { useState } from "react";

const UserLayout = ({ children }) => {
  const props = usePage().props;
  const [isNavClick, setIsNavClick] = useState(false);

  return (
    <div className="container flex my-5 px-3">
      <div className="relative grow w-full">{children}</div>
    </div>
  );
};

export default UserLayout;
