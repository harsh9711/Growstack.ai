import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; 

interface RectangleCardProps {
  firsttext: string;
  secondtext: string;
  imgsrc1: any;
}

const Box: React.FC<RectangleCardProps> = ({
  firsttext,
  secondtext,
  imgsrc1,
}) => {
  return (
    <div
      className="flex-grow max-w-[400px] p-4 sm:p-6 max-h-[300px] bg-[#FFFFFF] border-[#E3E3E3] rounded-[20px] hover:bg-[#A9FF9B] flex flex-col sm:gap-y-4 items-start justify-center text-black h-full" // Added flex-grow and h-full
      data-aos="fade-right" 
    >
      <Image
        src={imgsrc1}
        width={50}
        height={50}
        alt="image"
        className="max-w-[30px] sm:max-w-[60px] w-full"
      />
      <h2 className="sm:text-[24px] text-[16px] font-bold">{firsttext}</h2>
      <p className="text-[12px] sm:text-[16px] font-light text-black text-start">
        {secondtext}
      </p>
    </div>
  );
};

const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      className="max-w-[1760px] py-20 flex flex-col items-start gap-y-8 justify-center rounded-[60px] mx-auto w-full sm:max-h-[594px] h-full bg-[#14171B]"
      data-aos="flip-left" 
      data-aos-duration="1500" 
    >
      <div className="w-full max-w-[1240px] flex flex-col gap-y-10  mx-auto sm:items-start items-center justify-center sm:item-start">
        <div className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-[#A9FF9B] bg-[#A9FF9B14]">
          <h2 className="text-center capitalize text-[12px]">Features</h2>
        </div>
        <div className="sm:px-0 px-6 flex flex-col sm:flex-row sm:text-start text-center sm:items-start items-center gap-y-4 w-full justify-between">
          <h1 className="text-[26px] xl:text-[40px] flex gap-2 leading-tight sm:text-left text-center text-white">
            <span className="font-semibold">How it works ? </span>
          </h1>
          <p className="text-white max-w-[715px]">
            Growstack's AI LLM Comparison tool lets you compare up to 3 models
            at once, empowering you to pick the one that best aligns with your
            goals—whether it's speed, accuracy, or cost efficiency.
          </p>
        </div>
      </div>
      <div
        data-aos="fade-right"
        data-aos-delay="300"
        className="flex flex-col sm:flex-row px-6 sm:px-0 gap-10 mt-6 mx-auto"
      >
        <Box
          firsttext={"Model customization"}
          secondtext={
            "Fine-tune models like GPT 4 or Claude 3 to meet specific industry needs."
          }
          imgsrc1={"/features/b4.svg"}
          data-aos="fade-right"
          data-aos-delay="1900"
        />
        <Box
          firsttext={"Performance  metrics"}
          secondtext={
            "Compare models based on speed, contextual accuracy, and efficiency."
          }
          imgsrc1={"/features/b5.svg"}
          data-aos="fade-right"
          data-aos-delay="1800" 
        />
        <Box
          firsttext={"Side-by-side comparison"}
          secondtext={
            "Analyze 3 models simultaneously to make an informed decision based on your needs."
          }
          imgsrc1={"/features/b6.svg"}
          data-aos="fade-right" 
          data-aos-delay="2000" 
        />
      </div>
    </div>
  );
};

export default Benefits;
