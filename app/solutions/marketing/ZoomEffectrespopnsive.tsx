import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperComponent } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
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
      src: "/images_growstack/solutions/aiArticle.svg",
      alt: "Image 1",
      id: 1,
      source: "eswiper1",
      buttonText: "Fast content",
    },
    {
      src: "/images_growstack/solutions/textVideo.svg",
      alt: "Image 2",
      id: 2,
      source: "eswiper2",
      buttonText: "Visual appeal",
    },
    {
      src: "/images_growstack/solutions/aiEmail.svg",
      alt: "Image 3",
      id: 3,
      source: "imageshown2",
      buttonText: "Design optimization",
    },
    {
      src: "/images_growstack/solutions/aiWebsite.svg",
      alt: "Image 4",
      id: 4,
      source: "scheduler",
      buttonText: "Align communications",
    },
    {
      src: "/images_growstack/solutions/aiProduct.svg",
      alt: "Image 5",
      id: 5,
      source: "eswiper5",
      buttonText: "Product visuals",
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
    <div className="w-full h-full ">
      <div className="items-center justify-center flex flex-col gap-y-2 "></div>
      {showSwiper ? (
        <div className="swiper-container p-4">
          <SwiperComponent
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
            loop
            speed={500}
            pagination={{ clickable: true }}
            data-aos="fade-up"
          >
            {images.map(img => (
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
          </SwiperComponent>
        </div>
      ) : (
        <div className="relative flex flex-col gap-y-6  items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-y-16 p-4">
            {images.map(img => (
              <div
                className="relative flex flex-col items-center justify-center"
                key={img.id}
              >
                <Image
                  src={`/images_growstack/solutions/${img.source}.svg`}
                  width={970}
                  height={600}
                  className="w-full h-full"
                  alt={img.alt}
                  onClick={() => handleImageClick(img)}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
                <button className="absolute -bottom-10 text-center   text-white text-2xl  w-full py-2 rounded-2xl ">
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
