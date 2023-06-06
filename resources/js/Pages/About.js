import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/react";

const About = ({ title }) => {
  return (
    <>
      <Head title={title} />
      <h1 className="text-center text-md md:text-2xl font-bold my-3">{title}</h1>
      <img src="https://res.cloudinary.com/dbsgoesdj/image/upload/v1685780726/SAVE_20230603_101357_csrq3s.jpg" className="w-[80%] h-auto md:w-[495px] mx-auto rounded-lg" />
      <div className="md:mx-[100px] mx-2 mt-3">
        <b>Pasar Pintar Indonesia - Online Shop</b>
        <p className="mt-1">Pasar Pintar adalah aplikasi web yang menyediakan dan memudahkan dalam proses transaksi jual beli di kabupaten Purbalingga. Pasar Pintar hadir dengan segala kecanggihan dan kemudahannya dalam melayani penjual dan pembeli.</p>
        <div className="mt-2">
          <b className="md:text-2xl">Jual beli online hanya di Pasar Pintar</b>
          <p className="mt-1">Temukan apapun kebutuhanmu dengan harga terbaik cuma di Pasar Pintar. Pasar Pintar adalah pusat perbelanjaan online di mana kamu bisa mendapatkan update terkini dari penjual yang kamu ikuti, sekaligus dari pengguna favorit kamu. Berbelanja dan berjualan menjadi lebih menyenangkan dengan fitur bagikan ke media sosial, di mana kamu bisa menyebarkan produk yang kamu jual atau pun barang favorit kamu hanya dengan satu klik saja
            Belanja semua kebutuhanmu di Pasar Pintar dengan hati yang tenang! Cek rating dan review toko-toko yang ada dan temukan penjual yang terpercaya dengan mudah. Kami selalu mengutamakan keamanan transaksi untuk para pembeli kami! </p>
        </div>
        <div className="mt-2">
          <b className="md:text-2xl">Tujuan Kami</b>
          <p className="mt-1">Kami hadir dengan inovasi baru berupa aplikasi digital yang memudahkan proses jual beli dengan memanfaatkan teknologi yang ada. Kita harus maju bersama untuk menjadikan teknologi ini sebagai jembatan kita untuk membuat ekonomi maju dan juga memanfaatkan teknologi dengan baik.</p>
        </div>
        <div className="mt-2">
          <b className="md:text-2xl">Service Area</b>
          <p className="mt-1">Kami hadir untuk seluruh warga yang ada di Purbalingga dengan menyediakan berbagai barang dan makanan di Pasar Pintar ini secara lengkap</p>
        </div>
        <div className="mt-2">
          <b className="md:text-2xl">Kontak Kami</b>
          <div className="flex">
            <a href="https://wa.me/62882008868990">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-7 h-7" />
            </a>
            <a href="https://www.instagram.com/softdev.id">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" className="w-7 h-7 ml-2" />
            </a>
            <a href="mailto:softdevcom22@gmail.com">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" className="w-7 h-7 ml-2" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

About.layout = (page) => <Main children={page} />
export default About;
