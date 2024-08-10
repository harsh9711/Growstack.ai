import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { testimonialsdatathirdpage } from '@/types/data';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const TestimonialsSlider = () => {
  return (
    <div className="max-w-[1820px] mx-auto relative mb-32" data-aos="fade-right">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: `.custom-swiper-button-next`,
          prevEl: `.custom-swiper-button-prev`,
        }}
        pagination={false}
        className="swiper-container2"
      >
        <div className="custom-swiper-button-prev swiper-button-prev">
          <button className="bg-[#03473714] -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none">
            <GoArrowLeft className="w-6 h-6" />
          </button>
        </div>
        { testimonialsdatathirdpage.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-[581px] h-[557px] bg-white rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-col ">
                <h1 className="text-[18px] text-black leading-normal font-light multi-line-ellipsis">
                    {item.id}
                  </h1> 
                  <Image
                    width={100}
                    height={100}
                    src={`${item.imageUrl}`} 
                    alt={`Image for ${item.id}`}
                    className="w-10 h-10 rounded-full" 
                  />
                
                </div>
                <div className="space-x-4  flex flex-row">
                  <div className="flex flex-col gap-y-2">
                    <h1 className="text-[24px] text-black leading-normal font-medium multi-line-ellipsis">
                      {item.name}
                    </h1>
                    <p className="text-[18px] text-black multi-line-ellipsis">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="custom-swiper-button-next swiper-button-next">
          <button className="bg-[#03473714] -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none">
            <GoArrowRight className="w-6 h-6" />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default TestimonialsSlider;
