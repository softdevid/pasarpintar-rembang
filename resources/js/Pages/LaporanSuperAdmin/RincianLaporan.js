import Main from "@/Components/AdminTemplate/Main";
import { router } from "@inertiajs/react";
import { useState } from "react";

const RincianLaporan = (props) => {
  console.log(props);

  const [date, setDate] = useState("");
  const handleCekHarian = () => {
    const data = { date };
    console.log(data);
    router.get("/admin/laporan/today", data);
  };

  const [month, setMonth] = useState("");
  const handleCekBulanan = () => {
    const data = { month };
    router.get("/admin/laporan/month", data);
  };

  const [year, setYear] = useState(2023);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  const handleCekTahunan = () => {
    const data = { year };
    router.get("/admin/laporan/year", data);
  };

  //format rupiah
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-7">Rincian Data Toko</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg -scroll-mt-3">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Nama Toko
              </th>
              <th scope="col" className="px-6 py-3">
                Pengelola
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Nomor Hp
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat
              </th>
              <th scope="col" className="px-6 py-3">
                Status Toko
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">{props.rincianToko.namaToko}</td>
              <td className="px-6 py-4">{props.rincianToko.namaPengelola}</td>
              <td className="px-6 py-4">{props.rincianToko.email}</td>
              <td className="px-6 py-4">{props.rincianToko.noHp}</td>
              <td className="px-6 py-4">{props.rincianToko.alamat}</td>
              <td className="px-6 py-4">{props.rincianToko.statusToko}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4 mb-4">
        <div className="space-y-6">
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tanggal
            </label>
            <input
              onChange={(e) => setDate(e.target.value)}
              type="date"
              name="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Nama Kategori Toko"
              required
            />
            {props.errors.date && (
              <p className="text-red-600">{props.errors.date}</p>
            )}
          </div>
          <div>
            <button
              onClick={() => handleCekHarian()}
              type="button"
              className="bg-blue-700 text-white p-2 rounded-lg"
            >
              Cek Laporan
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="month"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Bulan
            </label>
            <input
              onChange={(e) => setMonth(e.target.value)}
              type="month"
              name="month"
              id="month"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Nama Kategori Toko"
              required
            />
            {props.errors.month && (
              <p className="text-red-600">{props.errors.month}</p>
            )}
          </div>
          <div>
            <button
              onClick={() => handleCekBulanan()}
              type="button"
              className="bg-blue-700 text-white p-2 rounded-lg"
            >
              Cek Laporan
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="year"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tahun
            </label>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {props.errors.year && (
              <p className="text-red-600">{props.errors.year}</p>
            )}
          </div>
          <div>
            <button
              onClick={() => handleCekTahunan()}
              type="button"
              className="bg-blue-700 text-white p-2 rounded-lg"
            >
              Cek Laporan
            </button>
          </div>
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg -scroll-mt-3">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                No Faktur
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Customer
              </th>
              <th scope="col" className="px-6 py-3">
                Alamat Pengiriman
              </th>
              <th scope="col" className="px-6 py-3">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Total Item
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rincianOrders.data.map((data, i) => {
              return (
                <tr
                  key={i}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{data.noFaktur}</td>
                  <td className="px-6 py-4">{data.namaCustomer}</td>
                  <td className="px-6 py-4">{data.alamatPengiriman}</td>
                  <td className="px-6 py-4">{formatter.format(data.total)}</td>
                  <td className="px-6 py-4">{data.totalItem}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

RincianLaporan.layout = (page) => <Main children={page} />;

export default RincianLaporan;
