import { PlusCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { router } from "@inertiajs/react";
import axios from "axios";

function Page2({ setPage, props, forms, setForms, handleChange, values }) {

  const handleChangeOption = (event, index) => {
    const newForms = [...forms];
    newForms[index][event.target.name] = event.target.value;
    setForms(newForms);
  };

  const addForm = () => {
    setForms([...forms, { namaHarga: "", hrgBeli: "", hrgJual: "", stokGudang: "", stokToko: "" }]);
  };

  console.log(forms)
  const removeForm = ({ index, form }) => {
    if (confirm("Yakin hapus? jika dihapus maka gambar akan terhapus permanen walau dibatalkan!")) {
      if (form.id) {
        router.post('/delete-harga', form);
      }
      setForms(forms.filter((_, i) => i !== index));
    }
  };

  //gambar lain
  const uploadImages = (event, index) => {
    var myWidget = window.cloudinary.createUploadWidget({
      cloudName: 'dbsgoesdj',
      uploadPreset: 'ivedm7py',
      maxFiles: 1,
      sources: ['local', 'camera'],
      folder: 'produk'
    }, (error, result) => {
      if (!error && result && result.event === "success") {
        const newOptions = [...forms];
        newOptions[index].url = result.info.url;
        newOptions[index].public_id = result.info.public_id;
        setForms(newOptions);

        // const data = {
        //   url: result.info.url,
        //   public_id: result.info.public_id,
        //   index: index
        // }
        // router.post('/image-lainnya/session', data);
      }
    }
    )
    myWidget.open();
  }

  const deleteImage = ({ publicId, index, id }) => {
    router.post('/delete-image-edit', { publicId, id });
    const newOptions = [...forms];
    newOptions[index].url = "";
    newOptions[index].public_id = "";
    setForms(newOptions);
  }

  return (
    <>
      <div className="mx-2">
        <div className="flex mx-2 my-3">
          <div className="">
            <label>Jenis Varian</label>
            <input placeholder="Jenis Varian. misal warna" id="jenisHarga" className="bg-white w-full rounded-md p-2 border border-black"
              onChange={handleChange} value={values.jenisHarga} />
            {props.errors.jenisHarga && <div className="text-red-600">{props.errors.jenisHarga}</div>}
            <button className="bg-sky-600 text-white p-2 rounded-lg my-3" onClick={addForm}>Add option</button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {forms.map((form, index) => (
            <div key={index}>
              <div className="my-5 mx-2">
                <div>
                  <label>Nama Varian</label><br />
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="namaHarga" className="p-2 rounded-md block w-full"
                        value={form.namaHarga}
                        onChange={(event) => handleChangeOption(event, index)} />
                    </div>
                    {index > 0 &&
                      <button onClick={() => removeForm({ index, form })} className="p-2 text-sm font-medium text-white bg-red-500 rounded-lg">
                        Hapus</button>
                    }
                  </div>
                </div>
                <div className="mt-2">
                  <label>Pilih gambar</label><br />
                  {!form.url ? (
                    <PlusIcon name="url" onClick={(event) => uploadImages(event, index)} className="w-10 h-10 cursor-pointer bg-white border-black border rounded-md" />
                  ) : (
                    <>
                      <div className="grid grid-cols-3 md:grid-cols-12 gap-8">
                        <div className="mt-2">
                          <img src={form.url} className="max-w-[128px] max-h-32" />
                          <button onClick={() => deleteImage({ publicId: form.public_id, id: form.id, index })}>Hapus</button>
                        </div>
                      </div>
                    </>
                  )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-2">
        <button onClick={() => setPage(1)} className="bg-gray-500 text-white rounded-lg p-2 mt-5">Sebelumnya</button>
        <button onClick={() => setPage(3)} className="bg-sky-400 text-white rounded-lg p-2 mt-5 ml-3">Selanjutnya</button>
      </div>
    </>
  );
}

export default Page2;
