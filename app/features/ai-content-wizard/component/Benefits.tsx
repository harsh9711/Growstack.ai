import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles

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
      className="max-w-[400px] h-full flex flex-col gap-y-4 items-center justify-center text-white"
      data-aos="fade-right" // Slide boxes from the right
    >
      <Image
        src={imgsrc1}
        width={50}
        height={50}
        alt="image"
        className="hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <h2 className="sm:text-[24px] text-[18px] font-bold">{firsttext}</h2>
      <p className="text-[14px] sm:text-[16px] font-light text-white text-center">
        {secondtext}
      </p>
    </div>
  );
};

const boxes = [
  {
    heading: "Writing style",
    para: "Choose between Professional or Casual tones.",
  },
  {
    heading: "Creativity",
    para: "Select from Original, Repetitive, Deterministic, Creative, or Imaginative.",
  },
  {
    heading: "Point of view",
    para: "Input a name or role (e.g., Marketing Expert) to adjust the content's tone and perspective.",
  },
  {
    heading: "Article length",
    para: "Options for Short (under 500 words), Medium (500-1500 words), or Long (over 1500 words).",
  },
  {
    heading: "Language",
    para: "Available in English, Spanish, French, Hindi, and more.",
  },
];

const boxessecond = [
  {
    heading: "What",
    para: "Create content in various languages, including English, Spanish, French, Hindi, and more.",
  },
  {
    heading: "How",
    para: "Seamlessly translate and generate content tailored for global audiences.",
  },
  {
    heading: "Why",
    para: "Expand your reach and connect with diverse audiences effortlessly.",
  },
];

const Benefits = () => {
  useEffect(() => {
    AOS.init({
      duration: 500, 
      easing: "ease-in-out",
      offset: 1,
    });
    AOS.refresh(); 
  }, []);

  return (
    <div
      className="sm:px-0 px-6 max-w-[1760px] py-20 flex flex-col items-center gap-y-6 justify-center rounded-[60px] mx-auto w-full sm:max-h-[1994px] h-full bg-[#E2F0CB4D]"
      data-aos="flip-left"
      data-aos-duration="500"
    >
      
      <div
        className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-black bg-[#03473714]"
        data-aos="zoom-in"
      >
        <h2 className="text-center capitalize text-[12px]">CUSTOMIZE</h2>
      </div>
      <div>
        <h1
          className="text-[20px] sm:text-[26px] xl:text-[40px] flex flex-col gap-6 leading-tight items-center justify-center text-center text-black"
          data-aos="fade-up"
        >
          <span className="font-semibold">
            Choose Your AI Model and Customization
          </span>
          <p className="font-light sm:text-[18px] text-[14px] max-w-[1000px] w-full">
            Our AI Content Wizard offers flexibility with a range of powerful
            language models to suit your needs. Select the model that best fits
            your content creation requirements:
          </p>
        </h1>
      </div>
      <div className="flex flex-col gap-y-20 mt-6">
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-10 w-full"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Image
            width={450}
            height={350}
            alt="llm"
            src="/llm.svg"
            className="hover:scale-105 w-full transition-transform duration-300"
          />
          <div className="items-center sm:items-start flex max-w-[700px] flex-col gap-y-8 w-full">
            <h2 className="sm:text-[24px] text-[18px] font-bold">
              Multiple AI models
            </h2>
            <div className="rounded-[20px] flex flex-wrap gap-6 items-start w-full h-full">
              {["i8", "i9", "i10", "i11", "i12"].map((img, index) => (
                <div
                  className="flex flex-col items-center rounded-2xl font-bold hover:cursor-pointer"
                  key={index}
                >
                  <Image
                    src={`/features/images/${img}.svg`}
                    width={200}
                    height={60}
                    alt="image"
                    className="max-w-[300px] w-full flex hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col-reverse sm:flex-row-reverse items-end justify-between gap-10 w-full"
          data-aos="fade-left" data-aos-delay="100"
        >
          <div className="flex flex-col gap-y-6">
            <Image
              width={400}
              height={300}
              alt="llm"
              src="/features/f1.svg"
              className="hover:scale-105 transition-transform duration-300"
            />
            <Image
              width={400}
              height={200}
              alt="llm"
              src="/features/f2.svg"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="items-start flex max-w-[700px] flex-col gap-y-8 w-full">
            <h2 className="sm:text-[24px] text-[18px] font-bold">
              Content personalization
            </h2>
            <div className="flex flex-col gap-6 items-start w-full h-full">
              {boxes.map((item, index) => (
                <div
                  className="flex flex-col w-full items-start bg-white rounded-[20px] p-4 font-bold hover:bg-gray-100 transition-colors duration-300"
                  key={index}
                >
                  <h2>{item.heading}</h2>
                  <p className="sm:text-[16px] text-[14px] font-medium text-[#5B5D60]">
                    {item.para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-10 w-full"
          data-aos="fade-right" data-aos-delay="100"
        >
          <div className="">
            <Image
              width={450}
              height={300}
              alt="llm"
              src="/features/f3.svg"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="items-start flex max-w-[700px] flex-col gap-y-8 w-full">
            <h2 className="sm:text-[24px] text-[18px] font-bold">
              Multilingual support
            </h2>
            <div className="flex flex-row max-h-[200px] gap-6 items-start w-full h-full">
              {boxessecond.map((item, index) => (
                <div
                  className="flex flex-col w-full items-start bg-white rounded-[20px] h-[230px] sm:h-[200px] p-4 gap-y-2 font-bold flex-grow hover:bg-gray-100 transition-colors duration-300"
                  key={index}
                >
                  <h2>{item.heading}</h2>
                  <p className="sm:text-[16px] text-[12px] font-medium text-[#5B5D60]">
                    {item.para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
