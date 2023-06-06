import TokoMainBar from "@/Components/Toko/TokoMainBar";
import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/react";
import React from "react";
import ProdukLaris from "@/Components/HomePage/ProdukLaris";
import ProdukAcak from "@/Components/HomePage/ProdukAcak";
import TokoProdukLaris from "@/Components/Toko/TokoProdukLaris";
import TokoProdukSemua from "@/Components/Toko/TokoProdukSemua";

const Toko = ({ toko, produks }) => {
  // console.log(toko);
  return (
    <>
      <Head title={toko.namaToko} />
      <section className="overflow-hidden bg-white py-4 my-8">
        <div className="container space-y-3">
          <TokoMainBar toko={toko} />
          {/* <TokoProdukPromo /> */}
          <TokoProdukLaris tokoProduk={produks.produkLaris} />
          <TokoProdukSemua slug={toko.slug} />
        </div>
      </section>
    </>
  );
};

Toko.layout = (page) => <Main children={page} />;

export default Toko;
