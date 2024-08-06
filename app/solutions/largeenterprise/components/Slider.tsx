import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GoArrowLeft, GoArrowRight } from 'react-icons/go';
import { testimonialsdata } from '@/types/data';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const TestimonialsSlider = () => {
  return (
    <div className="max-w-[1820px] mx-auto relative mb-32">
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
      > <div className="custom-swiper-button-prev swiper-button-prev">
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
        {testimonialsdata.map((item, index) => (
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
     
      <div className="custom-swiper-button-next swiper-button-next">
        <GoArrowRight />
      </div>

      {/* Custom styles for navigation buttons */}
  
    </div>
  );
};

export default TestimonialsSlider;
