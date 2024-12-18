"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";
import "../../styles/animate.css";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { landingpage } from "@/types/data";
import HoverVideoPlayer from "react-hover-video-player";

const Animation = () => {
  const [scrollProgress, setScrollProgress] = useState({
    hide: false,
    secondPath: false,
    thirdPath: false,
    isSolid: false,
  });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const handleScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    const path = pathRef.current;

    if (!scrollContainer || !path) return;

    // Calculate scroll progress with easing
    const scrollTop = scrollContainer.scrollTop;
    const maxScroll =
      scrollContainer.scrollHeight - scrollContainer.clientHeight;

    // Smooth easing function (cubic-bezier like)
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const scrollFraction = easeInOutQuad(
      Math.min(Math.max(scrollTop / maxScroll, 0), 1)
    );

    // Get path length
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;

    // Smooth dash offset calculation
    const dashOffset = pathLength * (1 - scrollFraction);
    path.style.strokeDashoffset = `${dashOffset}`;

    // Update scroll state with smoother transitions
    setScrollProgress(prev => ({
      ...prev,
      hide: dashOffset <= 3600,
      secondPath: dashOffset <= 2881,
      thirdPath: dashOffset <= 2281,
    }));
  }, []);

  const handleWindowScroll = useCallback(() => {
    const scrollPosition = window.scrollY;

    // Use requestAnimationFrame for smoother performance
    window.requestAnimationFrame(() => {
      setScrollProgress(prev => ({
        ...prev,
        isSolid: scrollPosition > 200,
      }));
    });
  }, []);

  // Optimize scroll event listener
  useEffect(() => {
    // Smooth AOS initialization
    AOS.init({
      duration: 1200,
      once: false,
      debounce: 50,
      easing: "ease-in-out",
    });

    // Add scroll listeners
    const scrollContainer = document.getElementById("scroll-container");
    if (scrollContainer) {
      scrollContainerRef.current = scrollContainer;
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
    }

    // Window scroll listener
    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    // Path reference
    const path = document.getElementById("path2") as SVGPathElement;
    if (path) pathRef.current = path;

    // Cleanup
    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [handleScroll, handleWindowScroll]);

  const LandingPageItems = useMemo(() => {
    const renderDesktopItems = () =>
      landingpage.map((item, index) => (
        <div
          key={`desktop-${index}`}
          className="z-20 sm:mb-20 sm:flex hidden transform transition-all duration-700 ease-in-out hover:scale-110 w-full relative items-center justify-center mx-auto flex-col"
        >
          <div
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
            className="relative mt-32 flex w-full justify-between gap-28 flex-row max-w-[300px] sm:max-w-[800px] h-[74.48px] sm:h-[198.62px] p-4 rounded-[5px] sm:rounded-[20px] border transition-all duration-500 hover:shadow-2xl"
            style={{
              backgroundColor: item.background,
              border: `1px solid ${item.border}`,
            }}
          >
            <div className="relative max-w-[95.78px] sm:flex hidden max-h-[53.45px]  sm:max-w-[250px] w-full sm:max-h-[150px] h-full border-none">
              <Image
                src={`/landingpage/l${item.id}.svg`}
                width={650}
                height={600}
                alt="image"
                className="relative z-10  w-full h-full"
              />
            </div>

            <div
              className="absolute h-[110.45px] sm:flex hidden sm:h-[275.86px] sm:hover:translate-x-[300px] transition-transform duration-1000 ease-in-out  translate-x-[100px] sm:translate-x-[260px] shadow-lg hover:border-t-8 -translate-y-[60px] p-3.5 w-full max-w-[169.66px] sm:max-w-[452.41px]  flex-col gap-y-2 bg-white rounded-[5px] sm:rounded-[20px] border-animate"
              style={{
                borderColor: item.border,
              }}
            >
              <h2 className="text-[8px] sm:text-[14px] font-semibold">
                {item.name}
              </h2>
              <HoverVideoPlayer
                className="w-full h-full rounded-md sm:rounded-2xl border-none outline-none"
                videoSrc={item.videos}
                pausedOverlay={
                  <img
                    src={`/landingpage/img${item.id}.svg`}
                    alt=""
                    className="rounded-2xl flex"
                  />
                }
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
                videoClassName="rounded-2xl"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      ));

    const renderMobileItems = () =>
      landingpage.map((item, index) => (
        <div
          key={`mobile-${index}`}
          className="z-20 mb-20 sm:mb-20 sm:hidden flex transform transition-all duration-700 ease-in-out hover:scale-105 w-full relative items-center justify-center mx-auto flex-col"
        >
          <div
            data-aos="fade-left"
            data-aos-easing="ease-in-out"
            className="relative mt-20 flex w-full justify-center gap-28 flex-row max-w-[300px] sm:max-w-[800px] h-[74.48px] sm:h-[198.62px] p-4 rounded-[5px] sm:rounded-[20px] transition-all duration-500"
          >
            <div
              className="absolute h-[195.28px] flex sm:h-[275.86px] sm:hover:translate-x-[300px] transition-transform duration-1000 ease-in-out   shadow-lg hover:border-t-8 -translate-y-[60px] p-3.5 w-full max-w-[300px] sm:max-w-[452.41px]  flex-col gap-y-2 bg-white rounded-[5px] sm:rounded-[20px] border-animate"
              style={{
                borderColor: item.border,
              }}
            >
              <h2 className="text-[10px] sm:text-[14px] font-semibold">
                {item.name}
              </h2>
              <HoverVideoPlayer
                className=" w-full h-full rounded-sm sm:rounded-2xl border-none outline-none"
                videoSrc={`/landingpage/Box ${item.id}.mp4`}
                pausedOverlay={
                  <img
                    src={`/landingpage/img${item.id}.svg`}
                    alt=""
                    className="rounded-2xl flex"
                  />
                }
                loadingOverlay={
                  <div className="loading-overlay">
                    <div className="loading-spinner" />
                  </div>
                }
                videoClassName="sm:rounded-2xl"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      ));

    return {
      desktop: renderDesktopItems(),
      mobile: renderMobileItems(),
    };
  }, []);

  return (
    <div className="items-center justify-center mx-auto flex flex-col mb-20 ">
      <div className="w-full gap-y-4 flex flex-col items-center justify-center mx-auto">
        <div className=" mt-10 bg-[#0347371A] text-[#034737] whitespace-nowrap py-2 px-4 flex items-center text-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[143px] ">
          Core Features
        </div>

        <div className=" sm:px-0 px-6 items-center flex flex-col gap-y-4 justify-center  mx-auto ">
          <h1
            className="text-[16px] sm:text-[24px] xl:text-[56px]  leading-12 flex  gap-3.5
           items-center justify-center "
          >
            <span className="font-semibold text-center">
              Discover our powerful{" "}
            </span>
            <span className="font-light text-center">AI features</span>
          </h1>

          <p className="text-[12px] sm:text-[18px]  items-center justify-center font-medium text-center max-w-[819px] leading-loose">
            From AI Templates, Assistants to Social Media Analytics, explore how
            GrowStack's suite of tools can elevate your business to new heights
          </p>
        </div>
      </div>

      {/* Desktop Items */}
      {LandingPageItems.desktop}

      {/* Mobile Items */}
      {LandingPageItems.mobile}
    </div>
  );
};

export default Animation;
