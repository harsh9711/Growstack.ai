import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'aos/dist/aos.css';
import Aos from 'aos';

const ImageGalleryLine = () => {
  type ImageData = {
    src: string;
    alt: string;
    id: number;
    relatedImages: {
      src: string;
      alt: string;
      id: number;
    }[];
  };

  const images: ImageData[] = [
    {
      src: '/solutions/imageshown/imageshown1.svg',
      alt: 'Image 1',
      id: 1,
      relatedImages: [
        { src: '/sideimages/text.svg', alt: 'Related Image 1-1', id: 2 },
        { src: '/sideimages/webscraping.svg', alt: 'Related Image 1-2', id: 3 },
        { src: '/sideimages/websitebuilder.svg', alt: 'Related Image 1-3', id: 4 },
      ],
    },
    {
      src: '/solutions/imageshown/imageshown3.svg',
      alt: 'Image 2',
      id: 2,
      relatedImages: [
        { src: '/sideimages/workflow.svg', alt: 'Related Image 2-1', id: 1 },
        { src: '/sideimages/webscraping.svg', alt: 'Related Image 2-2', id: 3 },
        { src: '/sideimages/websitebuilder.svg', alt: 'Related Image 2-3', id: 4 },
      ],
    },
    {
      src: '/solutions/imageshown/imageshown4.svg',
      alt: 'Image 3',
      id: 3,
      relatedImages: [
        { src: '/sideimages/workflow.svg', alt: 'Related Image 3-1', id: 1 },
        { src: '/sideimages/text.svg', alt: 'Related Image 3-2', id: 2 },
        { src: '/sideimages/websitebuilder.svg', alt: 'Related Image 3-3', id: 4 },
      ],
    },
    {
      src: '/solutions/imageshown/imageshown2.svg',
      alt: 'Image 4',
      id: 4,
      relatedImages: [
        { src: '/sideimages/workflow.svg', alt: 'Related Image 4-1', id: 1 },
        { src: '/sideimages/webscraping.svg', alt: 'Related Image 4-2', id: 3 },
        { src: '/sideimages/text.svg', alt: 'Related Image 4-3', id: 2 },
      ],
    },
  ];

  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [relatedImages, setRelatedImages] = useState<ImageData['relatedImages']>(images[0].relatedImages);
  const [currentRelatedIndex, setCurrentRelatedIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [imagesShownCount, setImagesShownCount] = useState(0);

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image);
    setRelatedImages(image.relatedImages);
    // setImagesShownCount(0);
        setTimerActive(true);
  };

  const handleRelatedImageClick = (relatedImageId: number) => {
    const newImage = images.find(img => img.id === relatedImageId);
    if (newImage) {
      setSelectedImage(newImage);
      setRelatedImages(newImage.relatedImages);
      // setImagesShownCount(0); 
      setTimerActive(true);
    }
  };

  useEffect(() => {
    if (timerActive && selectedImage) {
      const timer = setTimeout(() => {
        setCurrentRelatedIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % selectedImage.relatedImages.length;
          if (nextIndex === 0) {
            setImagesShownCount(prevCount => prevCount + 1); // Increment the count
            if (imagesShownCount >= 2) { // Stop after showing 3 images (initial + 2 more)
              setTimerActive(false); 
              return prevIndex; // Don't update index
            }
          }
          handleRelatedImageClick(selectedImage.relatedImages[nextIndex].id);
          return nextIndex;
        });
      }, 4000); // Time between transitions
      return () => clearTimeout(timer);
    }
  }, [currentRelatedIndex, timerActive, selectedImage, imagesShownCount]);

  return (
    <div style={{ position: 'relative', width: '1920px', height: '973px' }} className="">
     
      <div className='flex flex-row items-start mt-24 justify-center'>
      <div className="relative flex items-center justify-center">
        {selectedImage ? (
          <div className="flex flex-col items-center">
            <div className="items-center justify-center flex flex-col gap-y-2 mb-4">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
            Operations 
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-bold">Seamlessly,</span>
                <span className="text-black font-extralight"> scale operations</span>
              </h1>
            </div>
            <div>
              <Image
                className="w-full"
                src={selectedImage.src}
                width={1108}
                height={560}
                alt={selectedImage.alt}
                // onClick={() => setAutoSlide(true)}
                data-aos="zoom-in"
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
        ) : (
          <div className="relative -translate-y-24 ">
            <svg
              width="1920"
              height="973"
              viewBox="0 0 1920 973"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="1921" height="973" fill="" />
              <path
                d="M1582 253.5H1661C1672.05 253.5 1681 262.454 1681 273.5V433.5C1681 444.546 1672.05 453.5 1661 453.5H1447.5C1436.45 453.5 1427.5 462.454 1427.5 473.5V645"
                stroke="url(#paint0_linear_5288_652)"
                strokeWidth="6"
              />
              <path
                d="M464 597.5V493C464 481.954 455.046 473 444 473H278.5C267.454 473 258.5 464.046 258.5 453V277C258.5 265.954 267.454 257 278.5 257H356"
                stroke="url(#paint1_linear_5288_652)"
                strokeWidth="6"
              />
              <path
                d="M696 246H949.745C960.791 246 969.745 237.046 969.745 226V217C969.745 205.954 978.7 197 989.745 197H1242"
                stroke="url(#paint2_linear_5288_652)"
                strokeWidth="6"
              />
              <path
                d="M1266 799H962.753C951.707 799 942.752 790.046 942.752 779V737C942.752 725.954 933.798 717 922.752 717H650"
                stroke="url(#paint3_linear_5288_652)"
                strokeWidth="6"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_5288_652"
                  x1="1554.25"
                  y1="253.5"
                  x2="1554.25"
                  y2="643.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7DFF8" />
                  <stop offset="1" stopColor="#D1D0FC" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_5288_652"
                  x1="361.25"
                  y1="257"
                  x2="361.25"
                  y2="597.5"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7DFF8" />
                  <stop offset="1" stopColor="#D1D0FC" />
                </linearGradient>
                <linearGradient
                  id="paint2_linear_5288_652"
                  x1="969"
                  y1="197"
                  x2="969"
                  y2="246"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7DFF8" />
                  <stop offset="1" stopColor="#D1D0FC" />
                </linearGradient>
                <linearGradient
                  id="paint3_linear_5288_652"
                  x1="958"
                  y1="717"
                  x2="958"
                  y2="799"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F7DFF8" />
                  <stop offset="1" stopColor="#D1D0FC" />
                </linearGradient>
              </defs>
            </svg>
            <div className="items-center justify-center flex flex-col gap-y-2 translate-y-[420px] absolute top-0 left-0 right-0">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
            Operations 
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-bold">Seamlessly,</span>
                <span className="text-black font-extralight"> scale operations</span>
              </h1>
            </div>
            <div className="relative -top-[900px] left-[300px]">
              <Image
                src="/solutions/wire/wire1.svg"
                width={970}
                height={600} 
              className="w-[420px] h-[315px]"
                alt="Image 1"
                onClick={() => handleImageClick(images[0])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative -top-[1200px] left-[1220px]">
              <Image
                src="/solutions/wire/wire2.svg"
                width={980}
                height={600} 
              className="w-[420px] h-[315px]"
                alt="Image 2"
                onClick={() => handleImageClick(images[1])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative -top-[1000px] z-[90] left-[1120px]">
              <Image
                src="/solutions/wire/wire3.svg"
                width={980}
                height={600} 
              className="w-[420px] h-[315px]"
                alt="Image 3"
                onClick={() => handleImageClick(images[2])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative -top-[1350px] z-[60] left-[260px]">
              <Image
                src="/solutions/wire/wire4.svg"
                width={970}
                height={600} 
              className="w-[420px] h-[315px]"
                alt="Image 4"
                onClick={() => handleImageClick(images[3])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
          </div>
        )}
      </div>
       {selectedImage && (
        <div className=" p-4 flex flex-col gap-y-16 translate-y-28">
                   {relatedImages.map((image) => (

              <div key={image.id} className="cursor-pointer" 
              onClick={() => handleRelatedImageClick(image.id)}>
                <Image
                  src={image.src}
                  width={239}
                  height={187}
                  alt={image.alt}
                  data-aos="fade-right"
                />
              </div>
            ))}
        </div>
      )}</div>
    </div>
  );
};

export default ImageGalleryLine;
