import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import HoverVideoPlayer from "react-hover-video-player";

const Box = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="sm:px-20">
      <div
        data-aos="fade-up"
        className="relative text-black bg-white hover:bg-[#F4F4F4] group rounded-[20px] shadow-lg hover:shadow-2xl text-center sm:text-start items-center sm:items-start transition-transform duration-500 ease-in-out max-w-fit w-full h-full flex flex-col gap-y-4 justify-center"
      >
        <HoverVideoPlayer
          className="w-full h-full max-w-fit  rounded-sm sm:rounded-2xl border-none outline-none"
          videoSrc={`/video.mp4`}
          pausedOverlay={
            <img
              src="/staticvideo.svg"
              alt=""
              className="rounded-2xl  w-full h-full object-cover"
            />
          }
          loadingOverlay={
            <div className="loading-overlay">
              <div className="loading-spinner" />
            </div>
          }
          videoClassName="rounded-2xl object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

const SixCardVideo = () => {
  return (
    <div className="sm:p-0 p-6">
      <div className="max-w-fit flex flex-col items-center gap-y-6 sm:gap-y-8 w-full mx-auto sm:pb-40">
        <div
          className="flex flex-col text-center gap-6 w-full justify-between items-center"
          data-aos="fade-right"
        >
          <div
            className="max-w-fit rounded-2xl flex items-center justify-center w-full px-4 py-2 text-primary-lightgreen bg-[#2DA77114]"
            data-aos="fade-in"
          >
            <h2 className="text-center leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
              GROWSTACK FACTS
            </h2>
          </div>
          <h1 className="text-[16px] sm:text-[28px] xl:text-[40px] w-full leading-tight font-semibold text-black">
            Hit play and unlock 10x your growth{" "}
            <span className="font-light">in just 1/10th the time!</span>
          </h1>
        </div>
        <Box />
      </div>
    </div>
  );
};

export default SixCardVideo;
