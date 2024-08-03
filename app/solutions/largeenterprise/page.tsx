"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'swiper/css'
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SwiperSlider from "./components/SwiperSlider";
import ImageGallery from "./components/ZoomEffect";
import Navbar from "@/app/(landing)/components/Navbar";

const testimonials = [
  {
    id: 0,
    img1: "/carousel/c1.png",
    name: "Ideation and planning",
    role: "Generate and refine data-driven ideas using AI Chat and Apps, effortlessly brainstorming and creating initial drafts",
    description:
      "I've tried several website builders, but Webbuddy takes the cake. The templates are modern and customizable, and the drag-and-drop interface makes it a breeze to create a stunning website. Love it!",
    companyImage: "It's just incredible!",
  },
  {
    id: 1,
    img1: "/carousel/c1.png",
    name: "Natasha Romanoff",
    role: "Black Widow",
    description:
      "Never thought that with Spend.In managing my business expenses is so easy! Been using this platform for 3 months and still counting!",
    companyImage: "Satisfied User Here!",
  },
  {
    id: 2,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 3,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 4,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
  {
    id: 5,
    img1: "/carousel/c1.png",
    name: "Moritika Kazuki",
    role: "Finance Manager at Mangan",
    description:
      "“The best”! That’s what I want to say to this platform, didn’t know that there’s a platform to help you manage your business expenses like this! Very recommended to you who have a big business!",
    companyImage: "No doubt, Spend.In is the best!",
  },
];

const Home = () => {
//   const [ref2, inView2] = useInView({
//     triggerOnce: true,
//     threshold: 0.1,
//   });
 
  type ImageType = {
    src: string;
    largeSrc: string;
    className?: string;
  };
  
  interface ImageGalleryProps {
    images: ImageType[];
  }
      const [clickedImage, setClickedImage] = useState<string | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  
    const handleClick = (largeSrc: string, index: number) => {
      setClickedImage(largeSrc);
      setClickedIndex(index);
    };
  
    const handleClose = () => {
      setClickedImage(null);
      setClickedIndex(null);
    };
  
    const getRemainingImageStyle = (index: number): React.CSSProperties =>{
    const positions = [
      { bottom: '200px', left: '10px' },
      { bottom: '200px', right: '100px' },
      { top: '300px', left: '300px' },
      { top: '200px', right: '600px' },
    ];

    return positions[index % positions.length];
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 5;
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  type SliderRef = Slider | null;

  //   const sliderRef = useRef<SliderRef>(null);

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState<number[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  type SlickBeforeChange = (current: number, next: number) => void;
  const settings2 = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
      afterChange: (index: number) => {
        setActiveIndex(index);
      },
  };
  
  const isSlideVisible = (index: number, activeIndex: number): boolean => {
    if (index === activeIndex + 1) {
      return true;
    } else if (index === 0 && activeIndex === 2) {
      return true;
    }
    
    return false;
  };
  const handleBeforeChange2: SlickBeforeChange = (current, next) => {
    setActiveIndex(next);
  };
  const handleBeforeChange = (oldIndex: number, newIndex: number) => {
    setCurrentSlide(newIndex);
  };
  const previous = () => {
    if (sliderRef.current) {
      (sliderRef.current as Slider).slickPrev();
    }
  };

  const next = () => {
    if (sliderRef.current) {
      (sliderRef.current as Slider).slickNext();
    }
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <main className="bg-white">
      <section className="">
        <div className="relative flex items-center w-full h-full  rounded-b-[40px]  pt-40 bg-[#F3F7F6] ">
          <div className="w-full h-full mx-auto flex flex-col  justify-between max-h-[870px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[303px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex flex-col  items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                    <span className="font-semibold text-center">
                      Streamline complex
                    </span>
                    <span className="font-light text-center">
                      operation's with advance AI solutions
                    </span>
                  </h1>

                  <p className="text-[18px]  items-center justify-center text-center max-w-[819px] leading-loose">
                    Growstack's advanced Al tools and scalable solutions address
                    the unique challenges of large enterprises by ensuring
                    global alignment, consistent marketing and sales, effective
                    personalization, and seamless data integration.{" "}
                  </p>
                  <div className="flex flex-col gap-24 mt-4 items-center justify-center ">
                    <div className="flex flex-row gap-8 ">
                      <button className="bg-[#034737] text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                        Free free trial <ArrowRight />
                      </button>
                      <button className="border border-[#D9D9D9] flex items-center gap-2 text-black hover:font-bold font-medium py-4 px-7 rounded-xl shadow-md shadow-[#00000025]">
                        See demo <ArrowRight className="text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative translate-y-16 flex -translate-x-60 ">
              <Image
                src="/solutions/dlk.svg"
                width={1951}
                height={448}
                alt="img"
              />
            </div>
          </div>
        </div>
      </section>

      <section className=" mt-10">
        <div
          className=" w-full max-w-[1920px] h-[602px] gap-y-4 flex flex-col items-center justify-center mx-auto"
          style={{
            backgroundImage: "url(/solutions/background.svg)",
            maxWidth: "2000px",
          }}
        >
          <div className="relative flex flex-col gap-y-4 justify-center items-center mx-auto bg-cover py-20 bg-center bg-no-repeat">
            <h1 className="text-[56px] leading-12 flex flex-col items-center justify-center bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent relative z-10">
              <span className="font-semibold text-center">
                Comprehensive solution for
              </span>
              <span className="font-light text-center">
                enterprise level success
              </span>
            </h1>

            <p className="text-[18px] text-center max-w-[819px] leading-loose relative z-10">
              Discover how GrowStacks advanced AI solutions streamline processes
            </p>
          </div>
        </div>
      </section>
      <section className="px-4">
        <div className="relative flex items-center w-full h-full  rounded-[40px]  pb-40 bg-gradient-to-b from-[#FFFFFF]/30 to-[#E2F0CB]/30 ">
          <div className="w-full  mx-auto flex flex-col  justify-between  h-full max-h-[800px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[139px] ">
                  Consistency
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[42px]  leading-12 flex  gap-4  items-center justify-center text-black">
                    <span className="font-semibold text-center">
                      Global alignment
                    </span>
                    <span className="font-light text-center">
                      and consistency
                    </span>
                  </h1>
                </div>
              </div>
            </div>
      
    
  <SwiperSlider/>
          </div>
        </div>
      </section>
      <section className="">
        <div className="relative flex items-center w-full h-full py-40 bg-white overflow-hidden">
          <div className="w-full h-full mx-auto flex flex-col justify-between max-h-[950px] max-w-[1920px] items-center">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className="w-full gap-y-4  flex flex-col items-center justify-center mx-auto">
                <div className="bg-[#0347371A] hover:shadow-md text-[#034737] py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[166px]">
                  stay connected
                </div>

                <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
                  <h1 className="text-[42px] leading-12 flex gap-4 items-center justify-center text-black">
                    <span className="font-semibold text-center">
                      Breaking down data silos
                    </span>
                  </h1>
                  <p className="text-center items-center justify-center w-full max-w-[1026px]">
                    In large enterprises, various teams collaborate to manage
                    operations, develop strategies, and handle day-to-day
                    functions. By using Growstack, you can ensure that your
                    teams stay connected and seamlessly share information,
                    effectively preventing data silos and fostering
                    collaboration across your organization.
                  </p>
                  <button className="bg-[#034737] mt-4 text-white font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]">
                    Free trial <ArrowRight />
                  </button>
                </div>
              </div>
              <div
                ref={ref}
                className="mt-20 relative w-full h-[580px] max-w-[1028px] flex items-center justify-center overflow-hidden bg-white brightness-105"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={
                    inView ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 0 }
                  }
                  transition={{ duration: 1.5 }}
                >
                  <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/dashline.mp4" type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                  </video>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-green flex flex-col items-center justify-center py-20">
        <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto ">
          <div className="bg-white/10 hover:shadow-md text-white py-2 px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[151px]">
            Globalization
          </div>

          <div className="items-center flex flex-col gap-y-4 justify-center mx-auto">
            <h1 className="text-[42px] leading-12 flex gap-4 items-center justify-center text-white">
              <span className="font-semibold text-center">
                Managing complex,
              </span>
              <span className="font-light text-center">global operations</span>
            </h1>
            <p className="text-center text-white/30 tracking-normal items-center justify-center w-full max-w-[1026px]">
              In <span className="text-[#A9FF9B]">large enterprises,</span>{" "}
              various teams collaborate to manage operations, develop
              strategies, and handle day-to-day functions.
            </p>
          </div>
        </div>

    
      <div className="item-cen w-full">
      <ImageGallery/>
      </div>
      </section>

      <section className="   ">
        <div className="items-center justify-center flex flex-col gap-y-4 mt-24 overflow-hidden ">
          <Image
            src="/desing.png"
            width={1200}
            height={1000}
            className="w-full absolute  transform scale-y-[-1]  translate-x-10  z-[20] translate-y-80 h-full"
            alt="image"
          />

          <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
            {" "}
            Streamline
          </div>
          <h1 className="text-center flex flex-col  text-[42px] leading-normal">
            <span className="relative text-black font-semibold">
              Streamline your entire marketing process
            </span>
            <span className="text-black font-extralight  ">
              {" "}
              from to execution and beyond{" "}
            </span>
          </h1>
        </div>
        <div className="max-w-[1720px] mx-auto mt-10">
          <div className="z-[80] relative">
            <Slider
              ref={sliderRef}
              {...settings}
              beforeChange={handleBeforeChange}
              className=""
            >
              {testimonials.map((item, index) => (
                <div
                  key={index}
                  className="w-[682px] h-[468px] bg-white rounded-[17px] border border-[#e9e7e7] flex flex-col p-6 mx-4"
                >
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
              ))}
            </Slider>
          </div>

          <div className="mt-16 hidden lg:block">
  <div className="flex w-full max-w-[1720px] justify-between -translate-y-80 z-[90] relative items-center gap-6">
    {currentSlide > 0 && (
      <div className="relative translate-x-10 flex items-center justify-center">
        <button
          className="transition z-20 duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-[#034737]"
          title="Previous"
          onClick={previous}
        >
          <ArrowLeft size={25} />
        </button>
      </div>
    )}

    <div className="flex items-center justify-center ml-auto">
      <button
        className="relative z-20 transition duration-300 cursor-pointer flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-[#034737]"
        title="Next"
        onClick={next}
      >
        <ArrowRight size={25} />
      </button>
    </div>
  </div>
</div>

        </div>
      </section>
    </main>
  );
};

export default Home;
