import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { testimonials } from '@/types/data';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

const TestimonialsSlider = () => {
  return (
    <div className="max-w-[1820px] mx-auto relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={false}
        className="swiper-container"
      >    
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
          
            <div className="w-[599px] h-[468px] bg-white rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4">
              <div className="flex flex-col justify-between h-full w-full">
                <div className="flex flex-col gap-y-4 pb-6">
                  <h1 className="text-[18px] text-black leading-normal font-light multi-line-ellipsis">
                    {item.id}
                  </h1>
                </div>
                <div className="space-x-4 mt-10 flex flex-row">
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
      </Swiper>     

      <div className="absolute top-80 left-0 transform -translate-y-1/2 -translate-x-10 z-20">
          <div className="swiper-button-prev transition duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-full  text-white hover:bg-[#009a9b]" title="Previous">
          <GoArrowLeft size={25} />
        </div>
      </div>
      <div className="absolute top-80 right-0 transform -translate-y-1/2 translate-x-10 z-10">
        <div className="swiper-button-next transition duration-300 cursor-pointer flex items-center justify-center w-full h-12 rounded-full k text-white hover:bg-[#009a9b]" title="Next">
          <GoArrowRight size={25} />
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSlider;
