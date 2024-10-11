import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: any;
}

const Box: React.FC<RectangleCardProps> = ({ firsttext, secondtext, imgsrc1 }) => {
  return (
    <div
      className="max-w-[400px] h-full flex flex-col gap-y-4 items-center justify-center text-white"
      data-aos="fade-right" // Slide boxes from the right
    >
      <Image src={imgsrc1} width={50} height={50} alt="image" />
      <h2 className="sm:text-[24px] text-[16px] font-bold">{firsttext}</h2>
      <p className="text-[16px] font-light text-white text-center">{secondtext}</p>
    </div>
  );
};

const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of the animation
      easing: "ease-in-out", // Easing of the animation
      once: true, // Ensure animation happens only once
    });
  }, []);

  return (
    <div
      className="max-w-[1760px] py-20 flex flex-col items-center gap-y-8 justify-center rounded-[60px] mx-auto w-full sm:max-h-[594px] h-full bg-[#13745D]"
      data-aos="flip-left" // Rotate the whole green container first
      data-aos-duration="1500" // Rotation duration
    >
      <div className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-white bg-[#FFFFFF14]">
        <h2 className="text-center capitalize text-[12px]">BENEFITS</h2>
      </div>
      <div>
        <h1 className="text-[26px] xl:text-[40px] flex  flex-col sm:flex-row gap-2 leading-tight sm:!text-left !text-center text-white">
          <span className="font-semibold">Transformative benefits for </span>
          <span className="font-light">smarter prospecting </span>
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-10 mt-6">
        <Box
          firsttext={"Time efficiency"}
          secondtext={
            "Streamline your prospecting by automating data collection, significantly reducing the time spent on manual searches and allowing you to focus on more strategic tasks."
          }
          imgsrc1={"/features/b1.svg"}
          data-aos="fade-right"
          data-aos-delay="1900"
        />
        <Box
          firsttext={"Improved accuracy"}
          secondtext={
            "Leverage precise, up-to-date information pulled directly from Google Maps to ensure your data is reliable and accurate, minimizing errors in your outreach efforts."
          }
          imgsrc1={"/features/b2.svg"}
          data-aos="fade-right" // Slide in from right
          data-aos-delay="1800" // Delay after the first box
        />
        <Box
          firsttext={"Enhanced targeting"}
          secondtext={
            "Utilize detailed business insights to refine your targeting strategy, enabling more focused and effective outreach to high-potential prospects."
          }
          imgsrc1={"/features/b3.svg"}
          data-aos="fade-right" // Slide in from right
          data-aos-delay="2000" // Delay after the second box
        />
      </div>
    </div>
  );
};

export default Benefits;
