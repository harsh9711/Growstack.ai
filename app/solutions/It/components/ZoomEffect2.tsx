import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const ImageGallerySecond = () => {
  const [clickedImage, setClickedImage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = clickedImage ? "hidden" : "auto";

    if (clickedImage) {
      const imageElement =
        document.querySelector<HTMLImageElement>(".zoomed-image");
      if (imageElement) {
        const rect = imageElement.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollUpOffset = 290;

        const offsetTop =
          rect.top + window.pageYOffset - viewportHeight / 2 + rect.height / 2;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [clickedImage]);

  const handleClick = (largeSrc: string) => {
    setClickedImage(prev => (prev === largeSrc ? null : largeSrc));
  };

  const handleClose = () => {
    setClickedImage(null);
  };

  type ImageType = {
    src: string;
    largeSrc: string;
    className?: string;
    buttonText: string;
  };

  const images: ImageType[] = [
    {
      src: "/images_growstack/solutions/scheduler.svg",
      className: "w-[301px] h-[200px] -translate-y-52 -translate-x-72 z-60",
      largeSrc: "/images_growstackcustomer/solutions/data12.svg",
      buttonText: "Coordination",
    },
    {
      src: "/images_growstack/solutions/opt.svg",
      className:
        "w-[290.5px] h-[200px] translate-x-[480px] z-60 -translate-y-52",
      largeSrc: "/images_growstackcustomer/solutions/data13.svg",
      buttonText: "Optimization",
    },
    {
      src: "/images_growstack/solutions/social2.svg",
      className: "w-[301px] h-[200px] -translate-x-[400px] z-60 translate-y-60",
      largeSrc: "/images_growstackcustomer/solutions/data14.svg",
      buttonText: "Insights",
    },
  ];
  return (
    <>
      <div className="w-full">
        <motion.div
          className="flex gap-4 mt-52 ml-32 absolute"
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
              className={`relative opacity-100 flex flex-col transition-transform duration-300 ease-in-out hover:scale-105 items-center justify-center z-40 ${image.className}`}
              onClick={() => handleClick(image.largeSrc)}
              layout
            >
              <Image
                src={image.src}
                alt={`Image ${index}`}
                width={100}
                height={100}
                className={`relative w-[1260px] h-[360px] ${
                  clickedImage === image.largeSrc ? "opacity-50" : ""
                }`}
              />
              <button className="absolute -bottom-6 text-left right-4 text-white hover:text-[#14171B] text-[20px] font-semibold max-w-[250px] w-full py-2 rounded-2xl">
                {image.buttonText}
              </button>
            </motion.div>
          ))}
          <div className="items-center justify-center flex flex-col gap-y-2 w-full  absolute -top-4 -left-14 right-[6700px]">
            <div className="bg-[#FFFFFF]/10 text-white py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
              Efficiency
            </div>
            <h1 className="text-center text-[42px] leading-normal ">
              <span className="text-white font-bold">
                Enhance reliability and
              </span>
              <br />
              <span className="text-white font-extralight">
                {" "}
                minimize downtime
              </span>
            </h1>
          </div>
        </motion.div>

        <div
          className={`mx-auto z-30 items-center justify-center inset-0 transition-opacity duration-500 ${
            clickedImage ? "opacity-0" : "opacity-60"
          }`}
        >
          <Image
            src="/home.svg"
            width={1000}
            height={227}
            alt="Dashboard Image"
            className="rounded-3xl w-[1000px] h-[600px] "
          />
        </div>

        {clickedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClose}
          >
            <div
              className="relative max-w-full max-h-full p-4 rounded-lg"
              onClick={e => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0  text-white p-8 flex items-center justify-between rounded-t-lg">
                <span className="text-lg font-semibold opacity-0">
                  Image Preview
                </span>
              </div>
              <Image
                src={clickedImage}
                alt="Zoomed Image"
                width={700}
                height={700}
                className="zoomed-image w-[500px] xl:w-[900px] 2xl:w-[800px] h-full rounded-lg items-center relative  justify-center mx-auto mt-8"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ImageGallerySecond;
