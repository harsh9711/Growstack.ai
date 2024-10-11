import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./VideoSolution.scss";
import "../../../app/layout.scss";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function VideoSolution() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div
        className="embedSlider"
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
      >
        {/* <div className="container">
                    <p><b>Embed your video into favorite tools:</b></p>
                    <Swiper
                        slidesPerView={9}
                        spaceBetween={10}
                        autoplay={{
                            delay: 500,
                            disableOnInteraction: false,
                        }}
                        loop={true}
                        speed={5000}
                        navigation={false}
                        modules={[Autoplay, Navigation]}
                        className="mySwiper"
                        breakpoints={{
                            1400: {
                                slidesPerView: 9,
                                spaceBetween: 10,
                            },
                            1000: {
                                slidesPerView: 8,
                                spaceBetween: 10,
                            },
                            600: {
                                slidesPerView: 7,
                                spaceBetween: 10,
                            },
                            0: {
                                slidesPerView: 3,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {[...Array(20).keys()].map((index) => (
                            <SwiperSlide key={index}>
                                <div className="imgBlock">
                                    <img src={`/images_growstack/textVideo/embed${(index % 9) + 1}.svg`} alt={`embed-${index}`} />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div> */}
      </div>
      <div className="VideoSolution">
        <div className="container">
          <div
            className="text-center mb-4 mb-md-5"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">From idea to video in minutes 🔥 </span>
            <h2 class="heading">
              <span>Your all in one AI</span> video solution
            </h2>
          </div>
        </div>
        <div className="container ">
          <div className="video-frames-wrap">
            <div
              className="flex flex-col sm:flex-row justify-center mx-auto pt-6"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="max-w-[700px] ">
                <div className="frames-wrap">
                  <div className="frames-wrap-inner">
                    <h3>Create a video from just text</h3>
                    <p>
                      Transform your written content into dynamic, engaging
                      videos effortlessly with our AI-powered tool. Simply input
                      your text, customize the style, and watch as your words
                      come to life with high-quality visuals and audio.{" "}
                    </p>
                    <p className="pb-2 2xl:pb-12">
                      Perfect for marketers, educators, and content creators
                      looking to captivate their audience quickly and easily.
                    </p>
                    <Link href="/auth/register" className="sheen">
                      Generate a video
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" d-flex align-items-center banner-div">
                <div className="form-wrap-img">
                  <img
                    src="/images_growstack/textVideo/group-1.svg"
                    className="h-100 w-100"
                  />
                </div>
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row-reverse justify-center mx-auto pt-6"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="max-w-[700px] ">
                <div className="frames-wrap frames-wrap2">
                  <div className="frames-wrap-inner">
                    <h3>AI - powered voice over</h3>
                    <p>
                      Effortlessly transform your videos with our AI-powered
                      voiceover tool, allowing you to change the voiceover from
                      one language to another.{" "}
                    </p>
                    <p className="pb-2 2xl:pb-12">
                      Enhance your global reach by converting your original
                      audio into high-quality, natural-sounding voiceovers in
                      multiple languages, perfect for engaging a diverse
                      audience and expanding your content's impact.
                    </p>
                    <Link href="/auth/register" className="sheen">
                      Generate a video
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" d-flex align-items-center">
                <div className="form-wrap-img frame-2">
                  <img
                    src="/images_growstack/textVideo/group-2.svg"
                    className="h-100 w-100"
                  />
                </div>
              </div>
            </div>
            <div
              className="flex flex-col sm:flex-row items-center  justify-center mx-auto pt-6"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="max-w-[700px] w-full ">
                <div className="frames-wrap">
                  <div className="frames-wrap-inner">
                    <h3>
                      Create videos as diverse <br />
                      as your audience
                    </h3>
                    <p className="list-p">
                      <img src="/images_growstack/textVideo/mark-svg.svg" />
                      <span>Engage your viewers with over 160 AI avatars</span>
                    </p>
                    <p className="list-p">
                      <img src="/images_growstack/textVideo/mark-svg.svg" />
                      <span>Make your videos more inclusive and diverse</span>
                    </p>
                    <p className="list-p sm:pb-4">
                      <img src="/images_growstack/textVideo/mark-svg.svg" />
                      <span>Create your own AI avatar (your digital twin)</span>
                    </p>
                    <Link href="/auth/register" className="sheen">
                      Generate a video
                      <svg
                        width="21"
                        height="16"
                        viewBox="0 0 21 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                          fill="#fff"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className=" d-flex align-items-center">
                <div className="form-wrap-img frame-3">
                  <img
                    src="/images_growstack/textVideo/group-3.svg"
                    className="h-100 w-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default VideoSolution;
