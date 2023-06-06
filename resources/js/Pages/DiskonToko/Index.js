import Main from "@/Components/TokoTemplate/Main";
import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";


const Index = (props) => {
  console.log(props);

  const [showAktif, setShowAktif] = useState(false);
  const [dataShow, setDataShow] = useState({});

  const handleShow = (data) => {
    setDataShow(data);
    setShowAktif(true);
  }

  const handleCloseShow = () => {
    setDataShow({});
    setShowAktif(false);
  }

  return (
    <>
      <Head title={props.title} />

      {!showAktif ? (
        <>
          <Head title={props.title} />
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-bold text-3xl">{props.title}</h1>
            <div className="text-right">
              <Link href={'/toko/produk/create'} className="ml-3 rounded-md bg-blue-600 text-white p-2 hover:bg-blue-700">Tambah Produk</Link>
            </div>
          </div>

          <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
              <table className="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      #
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Nama Produk
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Harga Asli
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Harga Diskon
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tanggal Awal Diskon
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tanggal Akhir Diskon
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.diskon.data.length > 0 ? (
                    props.diskon.data.map((data, i) => {
                      return (

                        <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i + 1}
                          </th>
                          <td>{data.namaProduk}</td>
                          <td>{data.hrgJual}</td>
                          <td>{data.diskon}</td>
                          <td>{data.tglAwalDiskon}</td>
                          <td>{data.tglAkhirDiskon}</td>
                          <td className="flex">
                            <button onClick={() => handleShow({ data, katetori: "detail" })} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</button>
                            <button onClick={() => handleDelete({ id: data.id })} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</button>
                          </td>
                        </tr>

                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">{`Tidak ada data`}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* {produk.length > 0 &&
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              } */}

            </div>
          </div>
        </>
      ) : (
        <>
          <Show dataShow={dataShow} props={props} handleCloseShow={handleCloseShow} />
        </>
      )}
    </>
  )
}

function Show({ dataShow, props, handleCloseShow }) {
  console.log(dataShow);

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const [diskon, setDiskon] = useState(dataShow.data.diskon);
  const [tglAwalDiskon, setTglAwalDiskon] = useState(dataShow.data.tglAwalDiskon);
  const [tglAkhirDiskon, setTglAkhirDiskon] = useState(dataShow.data.tglAkhirDiskon);

  const handleUpdate = () => {
    const data = { diskon, tglAwalDiskon, tglAkhirDiskon, id: dataShow.data.id }
    router.post('/toko/diskon/update', data);
  }

  return (
    <>
      {dataShow.kategori === 'detail' ? (
        <>
          <Head title={dataShow.data.namaProduk} />
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-bold text-2xl">{dataShow.data.namaProduk}</h1>
            <div className="text-right">
              <button onClick={handleCloseShow} className="bg-gray-600 text-white p-2 rounded-lg">Kembali</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
            <div className="justify-center mx-auto">
              {dataShow.data.imgUrl ? (
                <img src={dataShow.data.imgUrl} className="w-80 h-80" />
              ) : (
                <img src={dataShow.data.imgUtama} className="w-80 h-80" />
              )}
            </div>
            <div className="grid grid-cols-1">
              <div className="text-lg ">Nama Produk: {dataShow.data.namaProduk}</div>
              <div className="text-lg ">Terjual: {dataShow.data.terjual}</div>
              <div className="text-lg ">{dataShow.data.jenisHarga}: {dataShow.data.terjual}</div>
              <div className="text-lg ">Stok toko: {dataShow.data.stokToko}</div>
              <div className="text-lg ">Stok gudang: {dataShow.data.stokGudang}</div>
              <div>Diskon: {rupiah(dataShow.data.diskon)}</div>
              <div>Awal diskon: {dataShow.data.tglAwalDiskon}</div>
              <div>Akhir diskon: {dataShow.data.tglAkhirDiskon}</div>

            </div>
          </div>
          <hr className="font-bold"></hr>
          <h1 className="text-xl font-bold text-center">Edit harga diskon</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="my-2">
              <label>Harga diskon</label>
              <input type="number" className="w-full rounded-lg" value={diskon} onChange={(e) => setDiskon(e.target.value)} />
              {props.errors.diskon && <p className="text-red-600">{props.errors.diskon}</p>}
            </div>
            <div className="my-2">
              <label>Awal diskon</label>
              <input type="date" className="w-full rounded-lg" value={tglAwalDiskon} onChange={(e) => setTglAwalDiskon(e.target.value)} />
              {props.errors.tglAwalDiskon && <p className="text-red-600">{props.errors.tglAwalDiskon}</p>}
            </div>
            <div className="my-2">
              <label>Akhir diskon</label>
              <input type="date" className="w-full rounded-lg" value={tglAkhirDiskon} onChange={(e) => setTglAkhirDiskon(e.target.value)} />
              {props.errors.tglAkhirDiskon && <p className="text-red-600">{props.errors.tglAkhirDiskon}</p>}
            </div>
          </div>
          <button onClick={handleUpdate} className="text-white bg-blue-600 rounded-lg p-2 text-center mt-2">Simpan</button>
        </>
      ) : (
        <>

        </>
      )}
    </>
  )
}

Index.layout = (page) => <Main children={page} />;

export default Index;
