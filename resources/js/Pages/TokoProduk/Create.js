import Input from "@/Components/Input";
import Main from "@/Components/TokoTemplate/Main";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";



const TokoProdukCreate = (props) => {
  console.log(props);

  const [namaProduk, setNamaProduk] = useState("");
  const [idKategori, setIdKategori] = useState("");
  const [idKategoriGlobal, setIdKategoriGlobal] = useState("");
  const [satuan, setSatuan] = useState("");
  const [stokToko, setStokToko] = useState("");
  const [stokGudang, setStokGudang] = useState("");
  const [hrgJual, setHrgJual] = useState("");
  const [hrgBeli, setHrgBeli] = useState("");
  const [diskon, setDiskon] = useState("");
  const [tglAwalDiskon, setTglAwalDiskon] = useState("");
  const [tglAkhirDiskon, setTglAkhirDiskon] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      namaProduk, idKategori, idKategoriGlobal, satuan, stokToko, stokGudang, hrgJual, hrgBeli, diskon, tglAwalDiskon, tglAkhirDiskon
    }

    console.log(data);
    Inertia.post("/toko-list/store", data);
  }

  return (
    <>

      <form onSubmit={handleSubmit}>
        <div>
          <h1 className="font-bold text-3xl">Toko Admin List</h1>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div>
            <label>Nama Produk</label>
            <input placeholder="Nama Produk" id="namaProduk" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setNamaProduk(e.target.value)} />
            {props.errors.namaProduk && <div className="text-red-600">{props.errors.namaProduk}</div>}
          </div>
          <div>
            <label>Kategori Toko</label>
            <select id="idKategori" className="bg-white w-full rounded-md p-2 border border-black">
              <option>Pilih Kategori</option>
            </select>
            {props.errors.idKategori && <div className="text-red-600">{props.errors.idKategori}</div>}
          </div>
          <div>
            <label>Kategori Global</label>
            <select id="idKategoriGlobal" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setIdKategoriGlobal(e.target.value)} >
              <option>Pilih Kategori Global</option>
            </select>
            {props.errors.idKategoriGlobal && <div className="text-red-600">{props.errors.idKategoriGlobal}</div>}
          </div>
          <div>
            <label>Satuan Jual</label>
            <input placeholder="Satuan Jual" id="satuan" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setSatuan(e.target.value)} />
            {props.errors.idSatuan && <div className="text-red-600">{props.errors.idSatuan}</div>}
          </div>
          <div>
            <label>Harga Jual</label>
            <input placeholder="Harga Jual" id="hrgJual" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setHrgJual(e.target.value)} />
            {props.errors.hrgJual && <div className="text-red-600">{props.errors.hrgJual}</div>}
          </div>
          <div>
            <label>Harga Beli</label>
            <input placeholder="Harga Beli" id="hrgBeli" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setHrgBeli(e.target.value)} />
            {props.errors.hrgBeli && <div className="text-red-600">{props.errors.hrgBeli}</div>}
          </div>
          <div>
            <label>Harga Diskon</label>
            <input placeholder="Harga Diskon" id="diskon" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setDiskon(e.target.value)} />
            {props.errors.diskon && <div className="text-red-600">{props.errors.diskon}</div>}
          </div>
          <div>
            <label>Tanggal Awal Diskon</label>
            <input type="date" id="tglAwalDiskon" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setTglAwalDiskon(e.target.value)} />
            {props.errors.tglAwalDiskon && <div className="text-red-600">{props.errors.tglAwalDiskon}</div>}
          </div>
          <div>
            <label>Tanggal Akhir Diskon</label>
            <input type="date" id="tglAkhirDiskon" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setTglAkhirDiskon(e.target.value)} />
            {props.errors.tglAkhirDiskon && <div className="text-red-600">{props.errors.tglAkhirDiskon}</div>}
          </div>
          <div>
            <label>Stok Toko</label>
            <input type="text" id="stokToko" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setStokToko(e.target.value)} />
            {props.errors.stokToko && <div className="text-red-600">{props.errors.stokToko}</div>}
          </div>
          <div>
            <label>Stok Toko</label>
            <input type="text" id="stokGudang" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={(e) => setStokGudang(e.target.value)} />
            {props.errors.stokGudang && <div className="text-red-600">{props.errors.stokGudang}</div>}
          </div>
        </div>

        {/* gambar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Gambar Utama</label>
            <input type="file" className="w-full bg-white p-1 border-black border rounded-md" />
          </div>
          <div>
            <label>Gambar Lain</label>
            <input type="file" className="w-full bg-white p-1 border-black border rounded-md" />
          </div>
        </div>

        <div className="mt-2">
          <a href="/toko-list" className="bg-gray-700 text-white hover:bg-gray-800 p-2 rounded-md">Kembali</a>
          <button className="rounded-md bg-blue-500 text-white hover:bg-blue-600 p-2 ml-3">Tambah</button>
        </div>
      </form>
    </>
  );
}

TokoProdukCreate.layout = (page) => <Main children={page} />;

export default TokoProdukCreate;
