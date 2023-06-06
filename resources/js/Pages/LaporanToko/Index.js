import Main from "@/Components/TokoTemplate/Main";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";

const Index = (props) => {
  console.log(props);

  const [date, setDate] = useState("");
  const handleCekHarian = () => {
    const data = { date };
    console.log(data);
    router.get('/toko/laporan/today', data);
  }

  const [month, setMonth] = useState("");
  const handleCekBulanan = () => {
    const data = { month };
    router.get('/toko/laporan/month', data);
  }

  const [year, setYear] = useState(2023);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  const handleCekTahunan = () => {
    const data = { year };
    router.get('/toko/laporan/year', data);
  }

  //format rupiah
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });

  return (
    <>
      <Head title={props.title} />
      <div>
        <h1 className="font-bold text-2xl">{props.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
            <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
            {props.errors.date && <p className="text-red-600">{props.errors.date}</p>}
          </div>
          <div className="mt-2">
            <button onClick={() => handleCekHarian()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bulan</label>
            <input onChange={(e) => setMonth(e.target.value)} type="month" name="month" id="month" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
            {props.errors.month && <p className="text-red-600">{props.errors.month}</p>}
          </div>
          <div className="mt-2">
            <button onClick={() => handleCekBulanan()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tahun</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {props.errors.year && <p className="text-red-600">{props.errors.year}</p>}
          </div>
          <div className="mt-2">
            <button onClick={() => handleCekTahunan()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
      </div>


      <h1 className="text-center text-2xl font-bold mt-7">History Order</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg -scroll-mt-3">
        <table className="table-auto w-full text-sm text-center text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                No Faktur
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Produk
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Jual
              </th>
              <th scope="col" className="px-6 py-3">
                Harga Diskon
              </th>
              <th scope="col" className="px-6 py-3">
                Biaya admin
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Total Harga
              </th>
              <th scope="col" className="px-6 py-3">
                Tanggal Order
              </th>
            </tr>
          </thead>
          <tbody>
            {props.rinciOrder.data.map((data, i) => {
              return (
                <tr key={i} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">
                    {data.noFaktur}
                  </td>
                  <td className="px-6 py-4">
                    {data.namaProduk}
                  </td>
                  <td className="px-6 py-4">
                    {formatter.format(data.hrgJual)}
                  </td>
                  <td className="px-6 py-4">
                    {formatter.format(data.hrgDiskon)}
                  </td>
                  <td className="px-6 py-4">
                    {formatter.format(data.biayaAdmin)}
                  </td>
                  <td className="px-6 py-4">
                    {data.qty}
                  </td>
                  <td className="px-6 py-4">
                    {formatter.format(data.total)}
                  </td>
                  <td className="px-6 py-4">
                    {data.tglOrder}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

    </>
  )
}

Index.layout = (page) => <Main children={page} />;

export default Index;
