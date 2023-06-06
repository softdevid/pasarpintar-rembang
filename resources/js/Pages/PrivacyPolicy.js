import Main from "@/Layouts/Main";
import { Head } from "@inertiajs/react";

const PrivacyPolicy = ({ title }) => {
  return (
    <>
      <Head title={title} />
      <div className="mx-2 md:mx-[100px]">
        <h1 className="text-md md:text-2xl font-bold text-center my-3">{title}</h1>
        <div>
          <h1 className="text-lg font-bold">Kebijakan Privasi untuk Iklan Pasar Pintar</h1>
          <p>Pasar Pintar dapat diakses dari <a>https://pasarpintar.biz</a>, salah satu prioritas utama kami adalah privasi pengunjung kami. Dokumen Kebijakan Privasi ini berisi jenis informasi yang dikumpulkan dan dicatat oleh Pasar Pintar dan bagaimana kami menggunakannya.</p>
        </div>
        <div className="mt-2">
          <h1 className="text-lg font-bold">File Log</h1>
          <p>Pasar Pintar mengikuti prosedur standar menggunakan file log. File-file ini mencatat pengunjung ketika mereka mengunjungi situs web. Semua perusahaan hosting melakukan ini dan merupakan bagian dari analisis layanan hosting. Informasi yang dikumpulkan oleh file log termasuk alamat protokol internet (IP), jenis browser, Penyedia Layanan Internet (ISP), cap tanggal dan waktu, halaman rujukan/keluar, dan mungkin jumlah klik. Ini tidak terkait dengan informasi apa pun yang dapat diidentifikasi secara pribadi. Tujuan dari informasi ini adalah untuk menganalisis tren, mengelola situs, melacak pergerakan pengguna di situs web, dan mengumpulkan informasi demografis.</p>
        </div>
        <div className="mt-2">
          <h1 className="text-lg font-bold">Kebijakan Privasi</h1>
          <p>Anda dapat berkonsultasi dengan daftar ini untuk menemukan Kebijakan Privasi masing-masing mitra periklanan CustomKreatif Indonesia. Kebijakan Privasi kami dibuat dengan bantuan Generator Kebijakan Privasi GDPR dan Generator Kebijakan Privasi dari TermsFeed plus Template Syarat dan Ketentuan.</p>
          <p>Server iklan atau jaringan iklan pihak ketiga menggunakan teknologi seperti cookie, JavaScript, atau Web Beacon yang digunakan dalam iklan masing-masing dan tautan yang muncul di Pasar Pintar, yang dikirim langsung ke browser pengguna. Mereka secara otomatis menerima alamat IP Anda ketika ini terjadi. Teknologi ini digunakan untuk mengukur efektivitas kampanye iklan mereka dan/atau untuk mempersonalisasi konten iklan yang Anda lihat di situs web yang Anda kunjungi.</p>
          <p>Perhatikan bahwa Pasar Pintar tidak memiliki akses atau kontrol terhadap cookie ini yang digunakan oleh pengiklan pihak ketiga.</p>
        </div>
        <div className="mt-2">
          <h1 className="text-lg font-bold">Hanya Kebijakan Privasi Online</h1>
          <p>Kebijakan Privasi ini hanya berlaku untuk aktivitas online kami dan berlaku untuk pengunjung situs web kami sehubungan dengan informasi yang mereka bagikan dan/atau kumpulkan di Pasar Pintar. Kebijakan ini tidak berlaku untuk informasi apa pun yang dikumpulkan secara offline atau melalui saluran selain situs web ini.</p>
        </div>
        <div className="mt-2">
          <h1 className="text-lg font-bold">Izin</h1>
          <p>Dengan menggunakan situs web kami, Anda dengan ini menyetujui Kebijakan Privasi kami dan menyetujui Syarat dan Ketentuannya.</p>
        </div>
      </div>
    </>
  )
}

PrivacyPolicy.layout = (page) => <Main children={page} />
export default PrivacyPolicy;
