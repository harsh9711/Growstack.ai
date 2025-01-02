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
      className="max-w-[400px] h-full flex flex-col gap-y-4 items-center justify-center text-white"
      data-aos="fade-right"
    >
      <Image
        src={imgsrc1}
        width={50}
        height={50}
        alt="image"
        className="hover:scale-105 transition-transform duration-300 ease-in-out"
      />
      <h2 className="text-lg md:text-2xl font-bold">{firsttext}</h2>
      <p className="text-sm md:text-base font-light text-white text-center">
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
    para: "Available in English, Spanish, French, Hindi and more.",
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
      className="px-4 md:px-0 max-w-[1760px] py-12 md:py-20 flex flex-col items-center gap-y-6 justify-center rounded-[60px] mx-auto w-full sm:max-h-[1994px] h-full bg-[#E2F0CB4D]"
      data-aos="flip-left"
      data-aos-duration="500"
    >
      <div
        className="max-w-[104px] rounded-2xl item-center justify-center w-full py-2 text-black bg-[#03473714]"
        data-aos="zoom-in"
      >
        <h2 className="text-center capitalize text-xs">CUSTOMIZE</h2>
      </div>

      <div className="text-center">
        <h1
          className="text-xl md:text-2xl lg:text-4xl flex flex-col gap-4 md:gap-6 leading-tight items-center justify-center text-black"
          data-aos="fade-up"
        >
          <span className="font-semibold">
            Choose Your AI Model and Customization
          </span>
          <p className="font-light text-sm md:text-lg max-w-[1000px] w-full">
            Our AI Content Wizard offers flexibility with a range of powerful
            language models to suit your needs. Select the model that best fits
            your content creation requirements:
          </p>
        </h1>
      </div>

      <div className="flex flex-col gap-y-12 md:gap-y-20 mt-6">
        {/* First Section - AI Models */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 w-full"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <Image
            width={450}
            height={350}
            alt="llm"
            src="/llm.svg"
            className="hover:scale-105 w-full md:w-auto transition-transform duration-300"
          />
          <div className="items-center md:items-start flex max-w-[700px] flex-col gap-y-6 md:gap-y-8 w-full">
            <h2 className="text-lg md:text-2xl font-bold">
              Multiple AI models
            </h2>
            <div className="rounded-[20px] flex flex-wrap gap-4 md:gap-6 items-start justify-center md:justify-start w-full">
              {["i8", "i9", "i10", "i11", "i12"].map((img, index) => (
                <div
                  className="flex flex-col items-center rounded-2xl font-bold hover:cursor-pointer w-[calc(50%-8px)] md:w-auto"
                  key={index}
                >
                  <Image
                    src={`/features/images/${img}.svg`}
                    width={200}
                    height={60}
                    alt="image"
                    className="w-full md:max-w-[200px] hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Section - Content Personalization */}
        <div
          className="flex flex-col-reverse md:flex-row-reverse items-end justify-between gap-6 md:gap-10 w-full"
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <div className="flex flex-col gap-y-4 md:gap-y-6 w-full md:w-auto">
            <Image
              width={400}
              height={300}
              alt="llm"
              src="/features/f1.svg"
              className="hover:scale-105 transition-transform duration-300 w-full md:w-auto"
            />
            <Image
              width={400}
              height={200}
              alt="llm"
              src="/features/f2.svg"
              className="hover:scale-105 transition-transform duration-300 w-full md:w-auto"
            />
          </div>
          <div className="items-start flex max-w-[700px] flex-col gap-y-6 md:gap-y-8 w-full">
            <h2 className="text-lg md:text-2xl font-bold">
              Content personalization
            </h2>
            <div className="flex flex-col gap-4 md:gap-6 items-start w-full">
              {boxes.map((item, index) => (
                <div
                  className="flex flex-col w-full items-start bg-white rounded-[20px] p-4 font-bold hover:bg-gray-100 transition-colors duration-300"
                  key={index}
                >
                  <h2>{item.heading}</h2>
                  <p className="text-sm md:text-base font-medium text-[#5B5D60]">
                    {item.para}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Section - Multilingual Support */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 w-full"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <div className="w-full md:w-auto">
            <Image
              width={450}
              height={300}
              alt="llm"
              src="/features/f3.svg"
              className="hover:scale-105 transition-transform duration-300 w-full md:w-auto"
            />
          </div>
          <div className="items-start flex max-w-[700px] flex-col gap-y-6 md:gap-y-8 w-full">
            <h2 className="text-lg md:text-2xl font-bold">
              Multilingual support
            </h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch w-full">
              {boxessecond.map((item, index) => (
                <div
                  className="flex flex-col w-full items-start bg-white rounded-[20px] p-4 gap-y-2 font-bold hover:bg-gray-100 transition-colors duration-300"
                  key={index}
                >
                  <h2>{item.heading}</h2>
                  <p className="text-xs md:text-base font-medium text-[#5B5D60]">
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
