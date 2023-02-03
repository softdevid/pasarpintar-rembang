import Main from "@/Components/TokoTemplate/Main";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const Index = (props) => {

  const [date, setDate] = useState("");
  const handleCekHarian = () => {
    const data = { date };
    console.log(data);
    Inertia.get('/toko/laporan/today', data);
  }

  const [month, setMonth] = useState("");
  const handleCekBulanan = () => {
    const data = { month };
    Inertia.get('/toko/laporan/month', data);
  }

  const [year, setYear] = useState(2023);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i);

  const handleCekTahunan = () => {
    const data = { year };
    Inertia.get('/toko/laporan/month', data);
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div>
            <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
            <input onChange={(e) => setDate(e.target.value)} type="date" name="date" id="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
            {props.errors.date && <p className="text-red-600">{props.errors.date}</p>}
          </div>
          <div>
            <button onClick={() => handleCekHarian()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="month" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bulan</label>
            <input onChange={(e) => setMonth(e.target.value)} type="month" name="month" id="month" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nama Kategori Toko" required />
            {props.errors.month && <p className="text-red-600">{props.errors.month}</p>}
          </div>
          <div>
            <button onClick={() => handleCekBulanan()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label htmlFor="year" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bulan</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {props.errors.month && <p className="text-red-600">{props.errors.month}</p>}
          </div>
          <div>
            <button onClick={() => handleCekTahunan()} type="button" className="bg-blue-700 text-white p-2 rounded-lg">Cek Laporan</button>
          </div>
        </div>
      </div>
    </>
  )
}

Index.layout = (page) => <Main children={page} />;

export default Index;
