import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageGallery = () => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  useEffect(() => {
    // Lock/unlock scrolling based on image zoom
    document.body.style.overflow = clickedImage ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [clickedImage]);

  const handleClick = (largeSrc: string) => {
    setClickedImage((prev) => (prev === largeSrc ? null : largeSrc));
  };

  const handleClose = () => {
    setClickedImage(null);
  };

  type ImageType = {
    src: string;
    largeSrc: string;
    className?: string;
    buttonText: string; // Added buttonText property
  };

  const images: ImageType[] = [
    {
      src: "/images_growstack/solutions/aichat.svg",
      className: "w-[301px] h-[200px]  -translate-y-48 translate-x-40   z-60",
      largeSrc: "/solutions/sales2/boxes/solution3rdpage/imagshown/imageshown1.svg",
      buttonText: "Competitive edge", 
    },
    {
      src: "/images_growstack/solutions/aiapps.svg",
      className:
        "w-[290.5px] h-[200px] translate-x-[420px] z-60  -translate-y-52",
        largeSrc: "/solutions/sales2/boxes/solution3rdpage/imagshown/imageshown3.svg",
        buttonText: "Tech variety", 
    },
    {
      src: "/images_growstack/solutions/sociail2.svg",
      className: "w-[301px] h-[200px] -translate-x-[700px] z-60 translate-y-24",
      largeSrc: "/solutions/sales2/boxes/solution3rdpage/imagshown/imageshown4.svg",
      buttonText: "Brand amplification", 
    },
    {
      src: "/images_growstack/solutions/wat.svg",
      className: "w-[301px] h-[200px] z-60 translate-y-32  -translate-x-[500px]",
      largeSrc: "/solutions/sales2/boxes/solution3rdpage/imagshown/imageshown2.svg",
      buttonText: "Automated communication", 
    },
  ];

  return (
    <>
      <div className="">
        <motion.div
          className="flex gap-4 mt-52 ml-32 absolute "
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: clickedImage ? 1 : 1,
            scale: clickedImage ? 0.98 : 1,
          }}
          transition={{ duration: 0.5 }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`relative opacity-100 flex flex-col  transition-transform duration-300 ease-in-out hover:scale-105 items-center justify-center z-40 ${image.className}`}
              onClick={() => handleClick(image.largeSrc)}
              layout
            >
              <Image
                src={image.src}
                alt={`Image ${index}`}
            width={100}
            height={100}
                className={`relative w-[1260px] h-[360px]  ${
                  clickedImage === image.largeSrc ? "opacity-50" : ""
                }`}
              />
              <button className="absolute -bottom-10 text-center  bg-white hover:text-[#034737] max-w-[250px] w-full py-2 rounded-2xl shadow-md ">
                {image.buttonText}
              </button>
            </motion.div>
          ))}
        </motion.div>

        <div
          className={`mx-auto z-30 items-center justify-center inset-0 transition-opacity duration-500 ${
            clickedImage ? "opacity-0" : "opacity-60"
          }`}
        >
          <Image
            src="/images_growstack/solutions/efficiency.svg"
            width={1000}
            height={227}
            alt="Dashboard Image"
            className="rounded-3xl w-[1240px] h-[627px]"
          />
        </div>

        {clickedImage && (
          <div
            className="fixed bg-black bg-opacity-40 inset-0 flex items-center justify-center"
            onClick={handleClose}
          >
            <div
              className="relative max-w-full max-h-full p-4 bg-white rounded-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 bg-white text-white p-2 flex items-center justify-between rounded-t-lg">
                <span className="text-lg font-semibold opacity-0">
                  Image Preview
                </span>
                <button
                  className="text-black p-1 rounded-full"
                  onClick={handleClose}
                >
                  &times;
                </button>
              </div>
              <Image
                src={clickedImage}
                alt="Zoomed Image"
                width={1000}
                height={1000}
                objectFit="contain"
                className="rounded-lg mt-8"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallery;
