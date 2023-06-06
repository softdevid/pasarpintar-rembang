import React from "react";
import { Head } from "@inertiajs/react";
import Main from "@/Layouts/Main";
import Carousel from "@/Components/HomePage/Carousel";
import Kategori from "@/Components/HomePage/Kategori";
import ProdukLaris from "@/Components/HomePage/ProdukLaris";
import ProdukPromo from "@/Components/HomePage/ProdukPromo";
import ProdukAcak from "@/Components/HomePage/ProdukAcak";
import Profil from "@/Components/HomePage/Profil";

const HomePage = ({ title, kategori, produks }) => {
  return (
    <div className="space-y-3">
      <Head title={title} />
      <Carousel />
      <Kategori kategori={kategori} />
      <ProdukLaris produk={produks.produkTerlaris} />
      {/* <ProdukPromo /> */}
      <ProdukAcak />
      <Profil />
    </div>
  );
};

HomePage.layout = (page) => <Main children={page} />;

export default HomePage;
