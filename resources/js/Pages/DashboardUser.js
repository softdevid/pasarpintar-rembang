import React from "react";
import Authenticated from "@/Layouts/Authenticated";
import { Head } from "@inertiajs/react";
import Main from "@/Layouts/Main";

const DashboardUser = (props) => {
  return (
    <>
      <Head title="Dashboard" />
      <div className="container"></div>
    </>
  );
};
DashboardUser.layout = (page) => <Main children={page} />;

export default DashboardUser;
