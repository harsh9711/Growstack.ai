import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ImageGalleryResponsive = () => {
  type ImageData = {
    src: string;
    alt: string;
    id: number;
    source: string;
    buttonText: string;
  };

  const images: ImageData[] = [
    {
      src: "/images_growstackcustomer/solutions/aichat.svg",
      alt: "Image 1",
      id: 1,
      source: "data1",
      buttonText: "Swift resolution",
    },
    {
      src: "/images_growstackcustomer/solutions/aiapps.svg",
      alt: "Image 2",
      id: 2,
      source: "data3",
      buttonText: "Operational streamlining",
    },
    {
      src: "/images_growstackcustomer/solutions/sociail2.svg",
      alt: "Image 3",
      id: 3,
      source: "data4",
      buttonText: "Timely Management",
    },
    {
      src: "/images_growstackcustomer/solutions/wat.svg",
      alt: "Image 4",
      id: 4,
      source: "data2",
      buttonText: "Workload efficiency",
    },
  ];

  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [showSwiper, setShowSwiper] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setShowSwiper(true);
  };

  return (
    <div className="w-full h-full">
      <div className="items-center justify-center flex flex-col gap-y-2"></div>
      {showSwiper ? (
        <div className="swiper-container p-4">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
            loop={true}
            speed={500}
            pagination={{ clickable: true }}
            data-aos="fade-up"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <Image
                  src={img.src}
                  width={1108}
                  height={560}
                  alt={img.alt}
                  className="w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="relative flex flex-col gap-y-6 items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-16 p-4">
            {images.map((img) => (
              <div
                className="relative flex flex-col items-center justify-center"
                key={img.id}
              >
                <Image
                  src={`/images_growstackcustomer/solutions/${img.source}.svg`}
                  width={970}
                  height={600}
                  className="w-full h-full"
                  alt={img.alt}
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
                <button className="absolute -bottom-10 text-center bg-white hover:text-[#034737] max-w-[250px] w-full py-2 rounded-2xl shadow-md">
                  {img.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGalleryResponsive;
