import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import Input from "@/Components/Input";
import { Head, Link } from "@inertiajs/react";
import NavTabsPesananToko from "@/Components/NavTabsPesananToko";

const PesananBaru = (props) => {
  const [rinciOrder, setRinciOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  console.log(rinciOrder);

  useEffect(() => {
    axios.get(`/api/data-pesanan-baru?page=${currentPage}`).then((response) => {
      setRinciOrder(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);

  return (
    <>
      <div>
        <h1 className="font-bold text-xl md:text-3xl">Pesanan Baru</h1>
      </div>
      <div>
        <NavTabsPesananToko />
        <Head title={props.title} />

        <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  No. Faktur
                </th>
                <th scope="col" className="py-3 px-6">
                  Nama pemesan
                </th>
                <th scope="col" className="py-3 px-6">
                  Status bayar
                </th>
                <th scope="col" className="py-3 px-6">
                  Status pesan
                </th>
                <th scope="col" className="py-3 px-6">
                  Alamat
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {rinciOrder ? (
                <>
                  {rinciOrder.map((data, i) => {
                    return (
                      <>
                        <tr key={i} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data.noFaktur}
                          </th>
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {data.namaCustomer}
                          </th>
                          <td className="py-4 px-6">
                            {data.metodeBayar}
                          </td>
                          <td className="py-4 px-6">
                            {data.statusOrder}
                          </td>
                          <td className="py-4 px-6">
                            {data.alamatPengiriman}
                          </td>
                          <td className="py-4 px-6">
                            <Link href="#" className="font-medium bg-blue-500 text-white mx-1 p-2 rounded-md">Detail</Link>
                            <Link href="#" className="font-medium bg-green-400 text-white p-2 mx-1 rounded-md">Setuju</Link>
                          </td>
                        </tr>
                      </>
                    )
                  })}
                </>
              ) : (
                <>
                  <th colSpan={6} className="text-center my-2">Tidak ada pesanan baru</th>
                </>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </>
  );
};

PesananBaru.layout = (page) => <Main children={page} />;

export default PesananBaru;
