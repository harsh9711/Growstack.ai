import React, { useRef, useState, useEffect } from "react";
import "./OurProcess.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const HoverVideo = () => {
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleCanPlay = () => {
      setIsVideoLoaded(true);

      // Ensure video plays automatically
      if (videoElement) {
        videoElement.play().catch(error => {
          console.error("Autoplay was prevented:", error);
        });
      }
    };

    if (videoRef.current) {
      videoRef.current.addEventListener("canplaythrough", handleCanPlay);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("canplaythrough", handleCanPlay);
      }
    };
  }, []);

  return (
    <div
      className="sm:flex hidden"
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        width="100%"
        height="100%"
        muted
        autoPlay
        playsInline
        preload="auto"
        className={`rounded-2xl border-none outline-none transition-opacity duration-700 ${
          isVideoLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source
          src="https://growstack-static-content.s3.us-east-1.amazonaws.com/workflowshort.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
};

function OurProcess() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init();

    // Handle video autoplay and looping
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.play().catch(error => {
        console.log("Auto-play was prevented:", error);
      });
    }
  }, []);

  return (
    <React.Fragment>
      <div className="ourProcess">
        <div className="container">
          <div className="content">
            <div className="flex flex-row py-10 lg:py-0 xl:py-0 w-full items-center justify-center">
              <div
                className="max-w-[480px] xl:max-w-[440px] 2xl:max-w-[420px] lg:ml-4 w-full"
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
              <div className="sm:flex hidden w-full h-full">
                <div
                  className="animate"
                  data-aos="fade-up"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <video
                    ref={videoRef}
                    width="720"
                    height="640"
                    preload="metadata"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="2xl:max-w-[720px] xl:max-w-[500px] lg:max-w-[400px] w-full"
                  >
                    <source
                      src="https://growstack-static-content.s3.us-east-1.amazonaws.com/Funnel+(1).mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
            <div>
              <div
                className="process sm:hidden flex"
                data-aos="flip-up"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <img src="/images_growstack/home/process.svg" alt="process" />
              </div>

              <HoverVideo />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OurProcess;
