import React, { useEffect, useState } from "react";
import Main from "@/Components/TokoTemplate/Main";
import { Head, router } from "@inertiajs/react";
import { Link } from "@inertiajs/react";
import axios from "axios";
import { CurrencyDollarIcon, EyeIcon, PencilIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Index = (props) => {
  const [query, setQuery] = useState("");
  const keys = ["namaProduk"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toString().toLowerCase().includes(query))
    );
  }

  const [produk, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  // const [search, setSearch] = useState();
  // console.log(produk);

  useEffect(() => {
    axios.get(`/api/data-produk?page=${currentPage}/search?${search}`).then((response) => {
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const [errors, setErrors] = useState({})

  const handleDelete = (data) => {
    if (confirm("Yakin hapus?")) {
      axios
        .delete(`/toko/produk/${data.id}`)
        .then((res) => {
          toast.success(res.data.data, {
            position: toast.POSITION.TOP_CENTER
          })

          axios.get(`/api/data-produk?page=${currentPage}`).then((response) => {
            setProducts(response.data.data);
            setTotalPages(response.data.last_page);
          });
        })
        .catch((err) => setErrors(err))
    }
  }

  const [dataShow, setDataShow] = useState({});

  const handleShow = (data) => {
    setDataShow(data);
    setShowAktif(true);
  }

  const handleCloseShow = () => {
    setDataShow({});
    setShowAktif(false);
  }

  const [showAktif, setShowAktif] = useState(false);

  return (
    <>
      <ToastContainer autoClose={2000} />
      {!showAktif ? (
        <>
          <Head title={props.title} />
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-bold text-md md:text-3xl">{props.title}</h1>
            <div className="flex items-end justify-end">
              <Link href={'/toko/produk/create'} className="rounded-md bg-blue-600 text-white p-1 md:p-2 hover:bg-blue-700 flex"><PlusCircleIcon className="w-5 h-5" /> Produk</Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-3">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-center text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      #
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Nama Produk
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Harga Beli
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Harga Jual
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {search(produk).length > 0 ? (
                    search(produk).map((data, i) => {
                      return (

                        <tr key={i} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {i + 1}
                          </th>
                          <td>{data.namaProduk}</td>
                          <td>{data.hargas.length} item</td>
                          <td>{data.hargas.length} item</td>
                          <td className="flex">
                            <button onClick={() => handleShow({ data, kategori: "detail" })} className="bg-sky-400 text-white rounded-md p-2 mx-1">Detail</button>
                            <button onClick={() => handleShow({ data, kategori: "diskon" })} className="bg-purple-600 text-white rounded-md p-2 mx-1">Diskon</button>
                            <Link href={`/toko/produk/${data.id}/edit`} className="bg-yellow-400 text-white rounded-md p-2 mx-1">Edit</Link>
                            <button onClick={() => handleDelete(data)} className="bg-red-500 text-white rounded-md p-2 mx-1">Hapus</button>
                          </td>
                        </tr>

                      );
                    })
                  ) : query !== "" ? (
                    <tr>
                      <td colSpan="7" className="text-center">{`Tidak ada data dengan pencarian '${query}'`}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">{`Tidak ada data`}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {produk.length > 0 &&
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              }

            </div>
          </div>

          <div className="block md:hidden">
            <div className="grid grid-cols-2">
              {search(produk).length > 0 ? (
                search(produk).map((data, i) => {
                  return (
                    <div key={i} className="bg-white rounded-lg shadow-md m-2">
                      <img src={data.imgUrl} alt="Product 1" className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h2 className="text-sm font-medium text-gray-900">{data.namaProduk}</h2>
                      </div>
                      <div className="grid-cols-2">
                        <button onClick={() => handleShow({ data, kategori: "detail" })} title="Detail Produk" className="bg-sky-400 text-white rounded-md p-1 mx-1"><EyeIcon className="w-5 h-5 text-white" /></button>
                        <button onClick={() => handleShow({ data, kategori: "diskon" })} title="Diskon Produk" className="bg-purple-600 text-white rounded-md p-1 mx-1"><CurrencyDollarIcon className="w-5 h-5 text-white" /></button>
                        <Link as="button" href={`/toko/produk/${data.id}/edit`} title="Edit Produk" className="bg-yellow-400 text-white rounded-md p-1 mx-1"><PencilIcon className="w-5 h-5 text-black" /></Link>
                        <button onClick={() => handleDelete(data)} title="Hapus Produk" className="bg-red-500 text-white rounded-md p-1 mx-1"><TrashIcon className="w-5 h-5 text-white" /></button>
                      </div>
                    </div>
                  );
                })
              ) : query !== "" ? (
                <tr>
                  <td colSpan="7" className="text-center">{`Tidak ada data dengan pencarian '${query}'`}</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">{`Tidak ada data`}</td>
                </tr>
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : (
        <>
          <Show dataShow={dataShow} props={props} handleCloseShow={handleCloseShow} currentPage={currentPage} setProducts={setProducts} setTotalPages={setTotalPages} />
        </>
      )}

    </>
  );
};

function Show({ dataShow, props, handleCloseShow, currentPage, setProducts, setTotalPages }) {

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  const [hargas, setHargas] = useState(dataShow.data.hargas.map((harga) => {
    return {
      idHarga: harga.idHarga,
      hrgJual: harga.hrgJual,
      hrgBeli: harga.hrgBeli,
      namaHarga: harga.namaHarga,
      jenisHarga: harga.jenisHarga,
      diskon: harga.diskon,
      tglAwalDiskon: harga.tglAwalDiskon,
      tglAkhirDiskon: harga.tglAkhirDiskon,
    }
  }));

  const handleChange = (e, i) => {
    const newForms = [...hargas];
    newForms[i][e.target.name] = e.target.value;
    setHargas(newForms);
  };


  const [errors, setErrors] = useState({})
  console.log(errors)
  const handleUpdate = (harga) => {
    axios.post(`/toko/diskon/update`, harga)
      .then((res) => {
        toast.success(res.data.data, {
          position: toast.POSITION.TOP_CENTER
        })
        setTimeout(() => {
          router.get('/toko/produk')
        }, 2000);

      })
      .catch((err) => {
        toast.error("Ada yang error, cek di halaman paling atas!", {
          position: toast.POSITION.TOP_CENTER
        })
        setErrors(err.response.data.errors)
      })

  }

  useEffect(() => {
    axios.get(`/api/data-produk?page=${currentPage}`).then((response) => {
      setProducts(response.data.data);
      setTotalPages(response.data.last_page);
    });
  }, [currentPage]);

  return (
    <>
      {dataShow.kategori === 'detail' ? (
        <>

          <Head title={dataShow.data.namaProduk} />
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-bold text-md md:text-3xl">Detail {dataShow.data.namaProduk}</h1>
            <div className="text-right">
              <button onClick={handleCloseShow} className="bg-gray-600 text-white p-2 rounded-lg">Kembali</button>
            </div>
          </div>

          <div className="bg-white border rounded-lg">
            <div className="md:flex justify-center items-center overflow-auto">
              <img src={dataShow.data.imgUrl} className="max-w-80 max-h-80 mr-10 m-3" />
              <div className="mt-2 m-3">
                <b className="block">Nama produk: {dataShow.data.namaProduk}</b>
                <b className="block">Terjual: {dataShow.data.terjual}</b>
                <b className="block">Toko: {dataShow.data.toko.namaToko}</b>
                <div className="block">
                  <b className="block">Harga Jual</b>
                  <div className="ml-5">
                    {dataShow.data.hargas.map((harga, i) => {
                      return (
                        <div key={i}>
                          <li>{harga.namaHarga}: {rupiah(harga.hrgJual)}</li>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="block">
                  <b className="block">Harga Beli</b>
                  <div className="ml-5">
                    {dataShow.data.hargas.map((harga, i) => {
                      return (
                        <div key={i}>
                          <li>{harga.namaHarga}: {rupiah(harga.hrgBeli)}</li>
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="block">
                  <b className="block">Stok Toko</b>
                  <div className="ml-5">
                    {dataShow.data.hargas.map((harga, i) => {
                      return (
                        <div key={i}>
                          <li>{harga.namaHarga}: {harga.stokToko}</li>
                        </div>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>

            <p className="whitespace-pre-wrap m-3 lg:flex lg:items-center lg:justify-center">{dataShow.data.deskripsi}</p>

          </div>

        </>
      ) : (
        <>
          <Head title={dataShow.data.namaProduk} />
          <div className="grid grid-cols-2 gap-4">
            <h1 className="font-bold text-md md:text-3xl">Detail {dataShow.data.namaProduk}</h1>
            <div className="text-right">
              <button onClick={handleCloseShow} className="bg-gray-600 text-white p-1 md:p-2 rounded-lg">Kembali</button>
            </div>
          </div>

          {errors.diskon && (
            <div className="bg-red-50 py-2 w-full block">
              <span className="text-red-700 text-center m-1">{errors.diskon[0]}</span>
            </div>
          )}
          {errors.tglAwalDiskon && (
            <div className="bg-red-50 py-2 w-full block">
              <span className="text-red-700 text-center m-1">{errors.tglAwalDiskon[0]}</span>
            </div>
          )}
          {errors.tglAkhirDiskon && (
            <div className="bg-red-50 py-2 w-full block">
              <span className="text-red-700 text-center m-1">{errors.tglAkhirDiskon[0]}</span>
            </div>
          )}

          <h1 className="text-xl">Harga Diskon:</h1>

          <div className="md:flex justify-center items-center overflow-auto">
            <img src={dataShow.data.imgUrl} className="max-w-80 max-h-80 mr-10 m-3" />
            <div className="mt-2 m-3">
              <b className="block">Nama produk: {dataShow.data.namaProduk}</b>
              <b className="block">Terjual: {dataShow.data.terjual}</b>
              <b className="block">Toko: {dataShow.data.toko.namaToko}</b>
              <div className="block">
                <b className="block">Harga Jual</b>
                <div className="ml-5">
                  {dataShow.data.hargas.map((harga, i) => {
                    return (
                      <div key={i}>
                        <li>{harga.namaHarga}: {rupiah(harga.hrgJual)}</li>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="block">
                <b className="block">Harga Beli</b>
                <div className="ml-5">
                  {dataShow.data.hargas.map((harga, i) => {
                    return (
                      <div key={i}>
                        <li>{harga.namaHarga}: {rupiah(harga.hrgBeli)}</li>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="block">
                <b className="block">Stok Toko</b>
                <div className="ml-5">
                  {dataShow.data.hargas.map((harga, i) => {
                    return (
                      <div key={i}>
                        <li>{harga.namaHarga}: {harga.stokToko}</li>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {hargas.map((harga, i) => {
              return (
                <>
                  <div key={i}>
                    <div className="mb-3">
                      <label>Diskon</label><br />
                      <input type="number" min={0} name="diskon" value={harga.diskon} onChange={(e) => handleChange(e, i)} className="rounded-lg" />
                    </div>
                    <div className="mb-3">
                      <label>Tanggal awal diskon</label><br />
                      <input type="date" name="tglAwalDiskon" value={harga.tglAwalDiskon} onChange={(e) => handleChange(e, i)} className="rounded-lg" />
                    </div>
                    <div className="mb-3">
                      <label>Tanggal Akhir diskon</label><br />
                      <input type="date" name="tglAkhirDiskon" value={harga.tglAkhirDiskon} onChange={(e) => handleChange(e, i)} className="rounded-lg" />
                    </div>
                    <button onClick={() => handleUpdate(harga)} className="bg-blue-600 text-white p-2 rounded-lg">Update</button>
                  </div>
                </>
              )
            })}
          </div>
        </>
      )}
    </>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="text-center">
      {pageNumbers.map((pageNumber) => (
        <button className="p-2"
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          disabled={pageNumber === currentPage}
        >
          {pageNumber === currentPage ? (
            <>
              <b className="text-blue-600">{pageNumber}</b>
            </>
          ) : (
            <>
              <b className="text-black">{pageNumber}</b>
            </>
          )}
        </button>
      ))}
    </div>
  );
}

Index.layout = (page) => <Main children={page} />;

export default Index;
