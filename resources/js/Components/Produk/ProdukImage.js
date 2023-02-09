import React from "react";

const ProdukImage = ({ images }) => {

  return (
    <div className="w-full px-4 md:w-[35%]">
      <div className="sticky top-0 z-50 overflow-hidden">
        <div className="relative mb-2 lg:mb-4 lg:h-2/4">
          <img
            src={images[0].imgUrl}
            className="object-cover w-full lg:h-full rounded-md"
            alt={`Main`}
          />
        </div>
        <div className="flex ">
          {images.map((img, i) => (
            <div key={i} className="w-1/2 p-2 sm:w-1/4">
              <div className="block border border-sky-700 rounded">
                <img
                  src={img.imgUrl}
                  className="object-cover w-full lg:h-full rounded"
                  alt={i + 1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProdukImage;
