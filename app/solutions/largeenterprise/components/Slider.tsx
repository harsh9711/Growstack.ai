import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { testimonials } from '@/types/data';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

const TestimonialsSlider = () => {
  return (
    <div className="max-w-[1820px] mx-auto relative mb-32">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          nextEl: '.custom-swiper-button-next',
          prevEl: '.custom-swiper-button-prev',
                    disabledClass: "swiper-button-disabled"

        }}
        pagination={false}
        className="swiper-container"
      >
          <div className="absolute inset-y-0 left-6 z-10 flex items-center">
          <button className="bg-[#03473714] -ml-2 lg:-ml-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="chevron-left w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="w-[599px] h-[468px] bg-[] rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4">
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
      
      
      <div className="absolute inset-y-0 right-0 z-10 flex items-center">
          <button className="bg-[#03473714] -mr-2 lg:-mr-4 flex justify-center items-center w-10 h-10 rounded-full shadow focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="chevron-right w-6 h-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
     
    </div>
  );
};

export default TestimonialsSlider;
