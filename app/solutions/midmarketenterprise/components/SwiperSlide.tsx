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
    <div className="max-w-[1820px] mx-auto relative mb-32 ">
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
       {/* Custom Navigation Buttons */}
       <div className="custom-swiper-button-prev swiper-button-prev" style={{ color: 'black' }}>
        <GoArrowLeft className="text-3xl" />
      </div>
      <div className="custom-swiper-button-next swiper-button-next" style={{ color: 'black' }}>
        <GoArrowRight className="text-3xl" />
      </div>
    </div>
  );
};

export default TestimonialsSlider;
