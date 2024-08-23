import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperComponent } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
const ImageGalleryLineResponsive = () => {
  type ImageData = {
    src: string;
    alt: string;
    id: number;
  };

  const images: ImageData[] = [
    {
      src: "/solutions/imageshown/imageshown1.svg",
      alt: "Image 1",
      id: 1,
    },
    {
      src: "/solutions/imageshown/imageshown2.svg",
      alt: "Image 2",
      id: 2,
    },
    {
      src: "/solutions/imageshown/imageshown3.svg",
      alt: "Image 3",
      id: 3,
    },
    {
      src: "/solutions/imageshown/imageshown4.svg",
      alt: "Image 4",
      id: 4,
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
    <div
      className="w-full h-full "
    >
        <div className="items-center justify-center flex flex-col gap-y-2 py-10 ">
                  <div className="bg-[#03473714] py-1 2xl:py-2 px-3.5 flex items-center gap-3 rounded-full text-[10px] 2xl:text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  Operations

                  </div>
                  <h1 className="text-center flex gap-0.5 text-[22px] 2xl:text-[42px] leading-normal">
                    <span className="text-black font-bold">
                    Seamlessly,
                    </span>
                    <br />
                    <span className="text-black font-extralight">
                    scale operations
                    </span>
                  </h1>
                </div>
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
          </SwiperComponent>
        </div>
      ) : (
     
          
              <div className="relative flex flex-col gap-y-6  items-center justify-center">
              
                <div className="flex flex-col items-center justify-center gap-y-6 p-4">
                  {images.map((img) => (
                    <div className="relative" key={img.id}>
                      <Image
                        src={`/solutions/wire/wire${img.id}.svg`}
                        width={970}
                        height={600}
                        className="w-full h-full"
                        alt={img.alt}
                        onClick={() => handleImageClick(img)}
                        style={{ cursor: "pointer" }}
                        data-aos="zoom-in"
                      />
                    </div>
                  ))}
                </div>
              </div>
    
         
        )}
    </div>
  );
};

export default ImageGalleryLineResponsive;
