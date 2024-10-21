import React, { useRef, useState, useEffect } from "react";
import "./OurProcess.scss";
import AOS from "aos";
import "aos/dist/aos.css";
import HoverVideoPlayer from "react-hover-video-player";
const HoverVideo = () => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoverDisabled, setHoverDisabled] = useState(false);

  const stopAndFreezeVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
      setHoverDisabled(true);
    }
  };

  const playVideo = () => {
    if (hoverDisabled || isPlaying) return;

    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);


      setTimeout(() => {
        stopAndFreezeVideo();
      }, 12000);
    }
  };

  return (
    <div
    className="sm:flex hidden"
      onMouseEnter={playVideo}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        cursor: hoverDisabled ? "not-allowed" : "pointer",
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        muted
        loop={false}
        preload="metadata"
        className=" rounded-2xl border-none outline-none"
      >
        <source src="/workflow_fast.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

function OurProcess() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="ourProcess">
        <div className="container">
          <div className="content">
            <div className="flex flex-row py-10 lg:py-0 xl:py-0   w-full items-center justify-center">
              <div
                className=" max-w-[480px] xl:max-w-[440px] 2xl:max-w-[420px] lg:ml-4 w-full"
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <span className="user">Our process</span>
                <h2 className="heading">
                  <span>Effortlessly create</span> AI magicflow!
                </h2>
                <p>
                  Build AI-driven workflows with ease. Automate tasks and
                  collaborate seamlessly with our fun no-code tool.
                </p>
              </div>
              <div className="lg:flex hidden w-full h-full">
                <div
                  className="animate"
                  data-aos="fade-up"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  {/* <img src="/images_growstack/home/animate.svg" alt="process" /> */}
                  <video
                    width="720"
                    height="640"
                    preload="none"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="2xl:max-w-[720px] xl:max-w-[500px] lg:max-w-[400px] w-full"
                  >
                    <source src="/landingpage/Funnel.mp4" type="video/mp4" />
                    <track
                      src="/path/to/captions.vtt"
                      kind="subtitles"
                      srcLang="en"
                      label="English"
                    />
                  </video>
                </div>
              </div>
            </div>
            <div>
              <div className="process sm:hidden flex" data-aos="flip-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <img src="/images_growstack/home/process.svg" alt="process" />
            </div>
              {/* <HoverVideoPlayer
                className="absolute  left-0 w-full h-full rounded-2xl border-none outline-none"
                loop={false}
                videoSrc="/workflowshort.mp4"
                // pausedOverlay={
                //   <img
                //     src="/images_growstack/home/process.svg"
                //     alt=""
                //     className="rounded-2xl flex"
                //     style={{
                //       width: "100%",
                //       height: "100%",
                //       objectFit: "fill", // Ensures the image fits well
                //     }}
                //   />
                // }
               
                videoClassName="rounded-2xl" // Add this to make the video corners rounded
                style={{
                  objectFit: "cover", // Ensures the video fits without distortion
                }}
              /> */}
              <HoverVideo />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OurProcess;
