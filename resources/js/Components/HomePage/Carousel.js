import React from "react";

const Carousel = () => {
  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-6 lg:grid-rows-6 gap-1 max-w-screen-xl mx-auto">
        <div
          id="animation-carousel"
          className="relative col-span-1 lg:col-span-4 lg:row-span-6"
          data-carousel="static"
        >
          <div className="relative aspect-video w-full h-56 overflow-hidden lg:h-full">
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10 hidden"
              data-carousel-item=""
            >
              <img
                src="https://res.cloudinary.com/dbsgoesdj/image/upload/v1683694814/Ungu_Kuning_Modern_Diskon_Produk_Baru_Headphone_Instagram_Post_1080_608_piksel_dtpau4.png"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10 hidden"
              data-carousel-item=""
            >
              <img
                src="https://res.cloudinary.com/dbsgoesdj/image/upload/v1685933281/WhatsApp_Image_2023-06-03_at_18.09.47_w03p6z.jpg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            <div
              className="duration-200 ease-linear absolute inset-0 transition-all transform -translate-x-full z-10"
              data-carousel-item=""
            >
              <img
                src="https://res.cloudinary.com/dbsgoesdj/image/upload/v1683694814/Putih_Modern_Koleksi_Sepatu_Postingan_Instagram_1080_608_piksel_sac6vh.png"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev=""
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next=""
          >
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full sm:w-10 sm:h-10 bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-white sm:w-6 sm:h-6 dark:text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
        <div className="hidden lg:block lg:col-span-2 lg:row-span-3">
          <div
            className="md:h-full bg-center aspect-video"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dbsgoesdj/image/upload/v1683694814/Biru_Hitam_Korporat_Modern_Neon_Diskon_Spesial_Produk_Laptop_Instagram_Post_1080_608_piksel_mkfxqc.png)",
            }}
          />
        </div>
        <div className="hidden lg:block lg:col-span-2 lg:row-span-3">
          <div
            className="md:h-full bg-center aspect-video"
            style={{
              backgroundImage:
                "url(https://res.cloudinary.com/dbsgoesdj/image/upload/v1683695408/New_Product_Watch_Sale_Promo_Facebook_Post_1080_608_piksel_wx2eza.png)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
