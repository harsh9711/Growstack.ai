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
    <div style={{ position: 'relative', width: '1821px', height: '1163px' }} className="w-full h-full">
     
      <div className='flex flex-col 2xl:flex-row items-start mt-24 justify-center'>
      <div className="relative flex items-center justify-center">
        {selectedImage ? (
          <div className="flex flex-col items-center">
            <div className="items-center justify-center flex flex-col gap-y-2 mb-4">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
              maintain
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-bold">Maintain data quality</span>
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
       <svg className='2xl:flex hidden' width="1747" height="600" viewBox="0 0 1747 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M207 449V324.573C207 313.527 198.046 304.573 187 304.573H21C9.95431 304.573 1 295.618 1 284.573V74C1 62.9543 9.95431 54 21 54H98.7372" stroke="#034737"/>
<path d="M1647.5 60H1726.5C1737.55 60 1746.5 68.9543 1746.5 80V240C1746.5 251.046 1737.55 260 1726.5 260H1513C1501.95 260 1493 268.954 1493 280V451.5" stroke="#034737"/>
<path d="M440 50H854.683C865.729 50 874.683 41.0457 874.683 30V21C874.683 9.9543 883.638 1 894.683 1H1307" stroke="#034737"/>
<path d="M1233 599H886.723C875.677 599 866.723 590.046 866.723 579V537C866.723 525.954 857.768 517 846.723 517H535" stroke="#034737"/>
</svg>


            <div className="items-center justify-center flex flex-col gap-y-2 2xl:translate-y-[180px] absolute top-0 left-0 right-0">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
              maintain
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-bold">Maintain data quality </span>
                <span className="text-black font-extralight">and management</span>
              </h1>
            </div>
            <div className="relative 2xl:-top-[700px] 2xl:left-[40px]">
              <Image
                src="/salesrevops/wire/wire1.svg"
                width={970}
                height={600} 
              className="w-[420px] h-[315px] hover-boxrevops1"
                alt="Image 1"
                onClick={() => handleImageClick(images[0])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[1050px] 2xl:left-[1290px]">
              <Image
                src="/salesrevops/wire/wire2.svg"
                width={980}
                height={600} 
              className="w-[420px] h-[315px] hover-boxrevops2"
                alt="Image 2"
                onClick={() => handleImageClick(images[1])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[830px] z-[90] 2xl:left-[1200px]">
              <Image
                src="/salesrevops/wire/wire3.svg"
                width={980}
                height={600} 
              className="w-[420px] h-[315px] hover-boxrevops3"
                alt="Image 3"
                onClick={() => handleImageClick(images[2])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[1150px] z-[60] 2xl:left-[140px]">
              <Image
                src="/salesrevops/wire/wire4.svg"
                width={970}
                height={600} 
              className="w-[420px] h-[315px] hover-boxrevops4"
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
