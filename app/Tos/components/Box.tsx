"use client";
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface ContentBoxProps {
  title: string;
  introduction: string;
  content: string;
  linksSections?: {
    heading: string;
    content: string;
  }[];
  linksSections2?: {
    heading: string;
    content: string;
  }[];
  collectionOfInformation?: {
    heading: string;
    content: string;
    points: string[];
  };
  howYourInformationMayBeUsed?: {
    heading: string;
    content: string;
    points: string[];
    single_text: string;
  };
}

const ContentBox: React.FC<ContentBoxProps> = ({
  title,
  introduction,
  content,
  linksSections, 
  linksSections2, 
  howYourInformationMayBeUsed,
}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className='mb-40'>
      <div 
        className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
        data-aos="fade-up"
      >
        <h1 className="text-[16px] xl:text-[28px] font-bold mb-4">{title}</h1>
        <h3 className="text-[10px] xl:text-[16px] font-semibold mb-2">{introduction}</h3>
        <p className="mb-4 text-[8px] xl:text-[14px]">{content}</p>
      </div>

      {linksSections && linksSections.map((section, index) => (
        <div 
          key={index}
          className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
          data-aos="fade-up"
          data-aos-delay={`${100 * (index + 1)}`}
        >
          <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">{section.heading}</h3>
          <p className='text-[8px] xl:text-[14px]'>{section.content}</p>
        </div>
      ))}

      {howYourInformationMayBeUsed && (
        <div 
          className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">{howYourInformationMayBeUsed.heading}</h3>
          <p className="mb-4 text-[8px] xl:text-[14px]">{howYourInformationMayBeUsed.content}</p>
          <ul className="list-disc list-inside ml-4">
            {howYourInformationMayBeUsed.points.map((point, index) => (
              <li key={index} className="mb-2">{point}</li>
            ))}
          </ul>
          <p className="mt-4 text-[8px] xl:text-[14px]">{howYourInformationMayBeUsed.single_text}</p>
        </div>
      )}
    {linksSections2 && linksSections2.length > 0 && linksSections2.map((section, index) => (
  <div 
    key={index}
    className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
    data-aos="fade-up"
    data-aos-delay={`${100 * (index + 1)}`}
  >
    <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">{section.heading}</h3>
    <p className='text-[8px] xl:text-[14px]'>{section.content}</p>
  </div>
))}

    </div>
  );
};

export default ContentBox;
