import React from "react";
import Main from "@/Components/AdminTemplate/Main";
import Input from "@/Components/Input";

const TambahToko = () => {
  return (
    <>
      <div>
        <h1 className="font-bold text-3xl">Tambah Toko</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          {/* <div>
            <label>ID User</label>
            <Input />
          </div> */}
          <div>
            <label>Nama Toko</label>
            <Input />
          </div>

          <div>
            <label>Email</label>
            <Input />
          </div>
          <div>
            <label>No Hp</label>
            <Input />
          </div>
        </div>
        <div>
          <div>
            <label>Nama Pengelola</label>
            <Input />
          </div>
          <div>
            <label>Password</label>
            <Input />
          </div>
          <div>
            <label>Alamat</label>
            <textarea />
          </div>
        </div>
      </div>
    </>
  );
};

TambahToko.layout = (page) => <Main children={page} />;

export default TambahToko;
