"use client"
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { testimonials } from "./constants/google";

interface Testimonial {
  author: {
    image_url?: string; // Make sure image_url is optional
    image_urlcover?: string; // Make sure image_urlcover is optional
    names: string;
  };
  testimonial: string;
}

export default function Slider() {
  const initializeColumns = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1024) {
        return 3;
      } else if (window.innerWidth > 640 && window.innerWidth < 1024) {
        return 2;
      } else {
        return 1;
      }
    }
    return 3; // Default value for server-side rendering
  };

  const [columns, setColumns] = useState(initializeColumns() || 3);
  const [viewAll, setViewAll] = useState(false);
  const visibleTestimonials = viewAll ? testimonials : testimonials.slice(0, 12);

  useEffect(() => {
    const resizeListener = () => {
      if (typeof window !== "undefined") {
        if (window.innerWidth > 1024) {
          setColumns(3);
        } else if (window.innerWidth > 640 && window.innerWidth < 1024) {
          setColumns(2);
        } else {
          setColumns(1);
        }
      }
    };

    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  return (
    <div className="w-full space-y-10 mt-10 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-8 2xl:mt-16 max-w-[1000px]">
        {visibleTestimonials.map((testimonial: Testimonial, index: number) => (
          <div key={index} className="flex flex-col justify-between min-h-[200px] relative hover:bg-[#363E44] bg-[#F6F6F6] group px-12 py-10 rounded-2xl space-y-5">
            <div className="flex flex-col gap-5 justify-between group flex-1 items-start">
              <div className="flex justify-between items-center relative">
                {testimonial.author.image_url && (
                  <Image
                    src={testimonial.author.image_url}
                    alt="Author Image"
                    width={120}
                    height={90}
                    layout="fixed"
                    className="w-[120px] h-[90px] rounded-full -left-8"
                    draggable={false}
                  />
                )}
                {testimonial.author.image_urlcover && (
                  <Image
                    src={testimonial.author.image_urlcover}
                    alt="Author Image Cover"
                    width={120}
                    height={90}
                    layout="fixed"
                    className="w-[120px] h-[90px] rounded-full opacity-10 -right-8"
                    draggable={false}
                  />
                )}
              </div>
            </div>
            <h1 className="font-bold text-[20px] 2xl:text-[24px] leading-[36px] group-hover:text-black text-white">{testimonial.author.names}</h1>
            <p className="leading-6 text-[14px] 2xl:text-[16px] text-[#FFFFFF]/50 group-hover:text-black">{testimonial.testimonial}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
