import formatRibuan from "@/config/formatRibuan";
import { FormatRupiah } from "@/config/formatRupiah";
import { Link } from "@inertiajs/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ProdukAcak = () => {
  const [item, setItem] = useState({
    products: [],
    next_page: "/produk-acak",
    hasMore: true,
  });

  const getMoreProduct = () => {
    axios
      .get(item.next_page)
      .then((res) => {
        const paginator = res.data,
          products = paginator.data;

        if (!paginator.next_page_url) {
          setItem({ ...item, hasMore: false });
          return;
        }

        if (products.length) {
          setItem({
            products: [...item.products, ...products],
            next_page: paginator.next_page_url,
            hasMore: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="bg-white border-2 border-sky-900 rounded-lg overflow-hidden">
        <div className="flex flex-wrap border-b-2 border-slate-600 -mb-px px-4 text-sm font-medium text-center text-slate-700">
          <div className="inline-flex p-3 rounded-t-lg">
            <h2 className="text-slate-700 font-medium text-lg">Produk Acak</h2>
          </div>
        </div>
        <div className="relative p-2">
          <InfiniteScroll
            dataLength={item.products.length}
            endMessage={
              <p style={{ textAlign: "center", marginTop: "8px" }}>
                <b>Tidak ada lagi produk</b>
              </p>
            }
            next={getMoreProduct}
            hasMore={item.hasMore}
            loader={
              <p style={{ textAlign: "center", marginTop: "8px" }}>
                <b>Loading...</b>
              </p>
            }
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 justify-items-center overflow-y-auto scrollbar-hide">
              {item.products.map((data, index) => (
                <div
                  key={index}
                  className="w-full bg-white border-2 border-slate-600 rounded-md overflow-hidden"
                >
                  <Link href={`${data.toko.slugToko}/${data.slugProduk}`}>
                    <img
                      className="bg-cover bg-center w-full p-2"
                      src={`https://source.unsplash.com/400x400?book`}
                      alt={data.namaProduk}
                    />
                    <div className="px-2 py-2.5">
                      <h5 className="text-sm font-semibold tracking-tight text-slate-700 line-clamp-3">
                        {data.namaProduk}
                      </h5>
                      <span className="text-lg font-bold">
                        <FormatRupiah value={data.hrgJual} />
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 pt-1">
                          {`${formatRibuan(data.terjual)} terjual`}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default ProdukAcak;
