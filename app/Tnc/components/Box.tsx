"use client"
import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface ContentBoxProps {
  title: string;
  introduction: string;
  content: string;
  linksSection?: {
    heading: string;
    content: string;
  };
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
  linksSection,
  collectionOfInformation,
  howYourInformationMayBeUsed
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
      {linksSection && (
        <div 
          className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">{linksSection.heading}</h3>
          <p className='text-[8px] xl:text-[14px]'>{linksSection.content}</p>
        </div>
      )}
      {collectionOfInformation && (
        <div 
          className="bg-[#FBFBFB] p-6 m-4 border border-gray-200 rounded-lg shadow-md" 
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <h3 className="text-[10px] xl:text-[28px] font-semibold mb-2">{collectionOfInformation.heading}</h3>
          <p className='text-[8px] xl:text-[14px] mb-4'>{collectionOfInformation.content}</p>
          <ul className="list-disc list-inside ml-4">
            {collectionOfInformation.points.map((point, index) => (
              <li key={index} className="mb-2">{point}</li>
            ))}
          </ul>
        </div>
      )}
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
    </div>
  );
};

export default ContentBox;
