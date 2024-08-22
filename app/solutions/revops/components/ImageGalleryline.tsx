import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import 'aos/dist/aos.css';
import Aos from 'aos';
import "../../midmarketenterprise/components/grid.css"
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
      src: '/solutions/salesrevops2/imageshown/imageshown1.svg',
      alt: 'Image 1',
      id: 1,
      relatedImages: [
        { src: '/solutions/salesrevops2/sideimages/ai.svg', alt: 'Related Image 1-1', id: 2 },
        { src: '/solutions/salesrevops2/sideimages/lead.svg', alt: 'Related Image 1-2', id: 4 },
        { src: '/solutions/salesrevops2/sideimages/scheduler.svg', alt: 'Related Image 1-3', id: 3 },
      ],
    },
    {
      src: '/solutions/salesrevops2/imageshown/imageshown2.svg',
      alt: 'Image 2',
      id: 2,
      relatedImages: [
        { src: '/solutions/salesrevops2/sideimages/ai.svg', alt: 'Related Image 1-1', id: 2 },
        { src: '/solutions/salesrevops2/sideimages/contacts.svg', alt: 'Related Image 1-2', id: 1 },
        { src: '/solutions/salesrevops2/sideimages/scheduler.svg', alt: 'Related Image 1-3', id: 3 },
      ],
    },
    {
      src: '/solutions/salesrevops2/imageshown/imageshown3.svg',
      alt: 'Image 3',
      id: 3,
      relatedImages: [
        { src: '/solutions/salesrevops2/sideimages/lead.svg', alt: 'Related Image 1-1', id: 4 },
        { src: '/solutions/salesrevops2/sideimages/contacts.svg', alt: 'Related Image 1-2', id: 1 },
        { src: '/solutions/salesrevops2/sideimages/scheduler.svg', alt: 'Related Image 1-3', id: 3 },
      ],
    },
    {
      src: '/solutions/salesrevops2/imageshown/imageshown4.svg',
      alt: 'Image 4',
      id: 4,
      relatedImages: [
        { src: '/solutions/salesrevops2/sideimages/ai.svg', alt: 'Related Image 1-1', id: 2 },
        { src: '/solutions/salesrevops2/sideimages/contacts.svg', alt: 'Related Image 1-2', id: 1 },
        { src: '/solutions/salesrevops2/sideimages/lead.svg', alt: 'Related Image 1-3', id: 4 },
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
    <div style={{ position: 'relative', width: '1821px', height: '1163px',overflow: 'hidden' }} className="w-full h-full overflow-x-hidden">
     
      <div className='flex flex-col 2xl:flex-row items-start mt-24 justify-center'>
      <div className="relative flex items-center justify-center">
        {selectedImage ? (
          <div className="flex flex-col items-center">
            <div className="items-center justify-center flex flex-col gap-y-2 mb-4">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
              maintain
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-extrabold">Maintain data quality</span>
                <span className="text-black font-extralight">  and management</span>
              </h1>
            </div>
            <div>
              <Image
                className="2xl:w-[1108px] w-full h-full 2xl:h-[560px] mt-6"
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
          <div className="relative 2xl:translate-y-24 ">
          <svg className='2xl:flex hidden' width="1401" height="544" viewBox="0 0 1601 544" fill="none" xmlns="http://www.w3.org/2000/svg">
   <path d="M1509.01 58H1580C1591.05 58 1600 66.9543 1600 78V237.745C1600 248.79 1591.05 257.745 1580 257.745H1387C1375.95 257.745 1367 266.699 1367 277.745V449" stroke="#034737"/>
   <path d="M206.5 401.5V297C206.5 285.954 197.546 277 186.5 277H21C9.9543 277 1 268.046 1 257V81C1 69.9543 9.95431 61 21 61H98.5" stroke="#034737"/>
   <path d="M438 50H784.999C796.045 50 804.999 41.0457 804.999 30V21C804.999 9.9543 813.953 1 824.999 1H1170" stroke="#034737"/>
   <path d="M1230 543H816.03C804.984 543 796.03 534.046 796.03 523V481C796.03 469.954 787.075 461 776.03 461H403" stroke="#034737"/>
   </svg>
   
               <div className="items-center justify-center flex flex-col gap-y-2 2xl:translate-y-[180px] absolute top-0 left-0 right-0">
                 <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                 maintain
                 </div>
                 <h1 className="text-center text-[42px] leading-normal">
                   <span className="text-black font-extrabold headings">Maintain data quality </span><br/>
                   <span className="text-black font-extralight">and management</span>
                 </h1>
               </div>
               <div className="relative 2xl:-top-[580px] 2xl:left-[50px]">
                 <Image
                   src="/salesrevops/wire/wire1.svg"
                   width={970}
                   height={600} 
                 className="w-[350px] h-[262.5px] hover-boxrevops1"
                   alt="Image 1"
                   onClick={() => handleImageClick(images[0])}
                   style={{ cursor: 'pointer' }}
                   data-aos="zoom-in"
                 />
               </div>
               <div className="relative 2xl:-top-[890px] 2xl:left-[1010px]">
                 <Image
                   src="/salesrevops/wire/wire2.svg"
                   width={980}
                   height={600} 
                   className="w-[350px] h-[262.5px] hover-boxrevops2"
                   alt="Image 2"
                   onClick={() => handleImageClick(images[1])}
                   style={{ cursor: 'pointer' }}
                   data-aos="zoom-in"
                 />
               </div>
               <div className="relative 2xl:-top-[700px] z-[90] 2xl:left-[980px]">
                 <Image
                   src="/salesrevops/wire/wire3.svg"
                   width={980}
                   height={600} 
                   className="w-[350px] h-[262.5px] hover-boxrevops3"
                   alt="Image 3"
                   onClick={() => handleImageClick(images[2])}
                   style={{ cursor: 'pointer' }}
                   data-aos="zoom-in"
                 />
               </div>
               <div className="relative 2xl:-top-[1000px] z-[60] 2xl:left-[8px]">
                 <Image
                   src="/salesrevops/wire/wire4.svg"
                   width={970}
                   height={600} 
                   className="w-[350px] h-[262.5px] hover-boxrevops4"
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
