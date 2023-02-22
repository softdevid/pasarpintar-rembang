import React, { useEffect, useState } from "react";

const ProdukImage = ({ images }) => {
  const [img, setImg] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    setImg({
      name: images[0].imgName,
      imageUrl: images[0].imgUrl,
    });
  }, []);

  const gantiImg = (name, imageUrl) => {
    setImg({
      name,
      imageUrl,
    });
  };

  return (
    <div className="relative w-full px-4 md:w-[35%]">
      <div className="sticky top-10 z-50">
        <div className="mb-2 lg:mb-4 lg:h-2/4">
          <img
            src={img.imageUrl}
            className="object-cover w-full lg:h-full rounded-md"
            alt={img.name}
          />
        </div>
        <div className="relative max-w-max">
          <ul className="flex overflow-x-scroll space-x-2">
            {images.map((img, i) => (
              <li key={i} className="p-2 w-20 h-20 flex-shrink-0">
                <div className="block border border-sky-700 rounded">
                  <img
                    src={img.imgUrl}
                    className="object-cover w-full lg:h-full rounded"
                    alt={img.imgName}
                    onClick={() => gantiImg(img.imgName, img.imgUrl)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProdukImage;
