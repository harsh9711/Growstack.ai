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
      src: '/sales/solution3rdpage/imageshown/imageshown1.svg',
      alt: 'Image 1',
      id: 1,
      relatedImages: [
        { src: '/sales/solution3rdpage/sideimages/rep.svg', alt: 'Related Image 1-1', id: 2 },
        { src: '/sales/solution3rdpage/sideimages/ai.svg', alt: 'Related Image 1-2', id: 4 },
        { src: '/sales/solution3rdpage/sideimages/lead.svg', alt: 'Related Image 1-3', id: 3 },
      ],
    },
    {
      src: '/sales/solution3rdpage/imageshown/imageshown3.svg',
      alt: 'Image 2',
      id: 2,
      relatedImages: [
        { src: '/sales/solution3rdpage/sideimages/lead.svg', alt: 'Related Image 2-1', id: 3 },
        { src: '/sales/solution3rdpage/sideimages/ai.svg', alt: 'Related Image 1-2', id: 4 },
        { src: '/sales/solution3rdpage/sideimages/social.svg', alt: 'Related Image 1-3', id: 1 },
      ],
    },
    {
      src: '/sales/solution3rdpage/imageshown/imageshown4.svg',
      alt: 'Image 3',
      id: 3,
      relatedImages: [
        { src: '/sales/solution3rdpage/sideimages/rep.svg', alt: 'Related Image 3-2', id: 2 },
        { src: '/sales/solution3rdpage/sideimages/social.svg', alt: 'Related Image 2-1', id: 1 },
        { src: '/sales/solution3rdpage/sideimages/ai.svg', alt: 'Related Image 1-2', id: 4 },
      ],
    },
    {
      src: '/sales/solution3rdpage/imageshown/imageshown2.svg',
      alt: 'Image 4',
      id: 4,
      relatedImages: [
        { src: '/sales/solution3rdpage/sideimages/rep.svg', alt: 'Related Image 3-2', id: 2 },
        { src: '/sales/solution3rdpage/sideimages/lead.svg', alt: 'Related Image 2-1', id: 3 },
        { src: '/sales/solution3rdpage/sideimages/social.svg', alt: 'Related Image 1-3', id: 1 },
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
    <div style={{ position: 'relative', width: '1700px', height: '1163px' ,overflow: 'hidden' }} className="w-full h-full overflow-x-hidden ">
     
      <div className='flex flex-col 2xl:flex-row xl:flex-row items-start mt-24 justify-center'>
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
                className="2xl:w-[1108px] xl:w-[1108px] w-full h-full 2xl:h-[560px] xl:h-[560px] mt-6"
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
          <div className="relative w-full  xl:translate-y-24 2xl:translate-y-24 ">
   <svg width="1479" height="600" viewBox="0 0 1679 600" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1402.5 60H1658.5C1669.55 60 1678.5 68.9543 1678.5 80V240C1678.5 251.046 1669.55 260 1658.5 260H1445C1433.95 260 1425 268.954 1425 280V595" stroke="#034737"/>
<path d="M233.5 50H820.097C831.143 50 840.097 41.0457 840.097 30V21C840.097 9.9543 849.052 1 860.097 1L1406.5 1V62" stroke="#034737"/>
<path d="M207 516.5V324.573C207 313.527 198.046 304.573 187 304.573H21C9.95431 304.573 1 295.618 1 284.573V74C1 62.9543 9.9543 54 21 54H232" stroke="#034737"/>
<path d="M1425.5 599H850.515C839.469 599 830.515 590.046 830.515 579V537C830.515 525.954 821.561 517 810.515 517H208.5" stroke="#034737"/>
</svg>


            <div className="items-center justify-center flex flex-col gap-y-2 2xl:translate-y-[180px] xl:translate-y-[180px] absolute top-0 left-0 right-0">
              <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
              engagement
              </div>
              <h1 className="text-center text-[42px] leading-normal">
                <span className="text-black font-bold">Boost customer engagement</span><br/>
                <span className="text-black font-extralight">with AI-driven strategies</span>
              </h1>
            </div>
            <div className="relative 2xl:-top-[660px] 2xl:left-[100px] xl:-top-[660px] xl:left-[100px] overflow-x-hidden">
              <Image
                src="/sales/solution3rdpage/wire/wire1.svg"
                width={970}
                height={600} 
              className="w-[350px] h-[262.5px] hover-box101 overflow-x-hidden"
                alt="Image 1"
                onClick={() => handleImageClick(images[0])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[980px] 2xl:left-[1000px] xl:-top-[980px] xl:left-[1000px] overflow-x-hidden">
              <Image
                src="/sales/solution3rdpage/wire/wire2.svg"
                width={980}
                height={600} 
              className=" w-[430px] h-[322.5px] hover-box202 overflow-x-hidden"
                alt="Image 2"
                onClick={() => handleImageClick(images[1])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[750px] z-[90] 2xl:left-[1040px] xl:-top-[800px] xl:left-[920px] overflow-x-hidden">
              <Image
                src="/sales/solution3rdpage/wire/wire3.svg"
                width={980}
                height={600} 
              className="w-[350px] h-[262.5px] hover-box404 overflow-x-hidden"
                alt="Image 3"
                onClick={() => handleImageClick(images[2])}
                style={{ cursor: 'pointer' }}
                data-aos="zoom-in"
              />
            </div>
            <div className="relative 2xl:-top-[1080px] z-[60] 2xl:left-[40px] xl:-top-[1150px]  xl:left-[10px] overflow-x-hidden " >
              <Image
                src="/sales/solution3rdpage/wire/wire4.svg"
                width={970}
                height={600} 
              className="w-[350px] h-[262.5px] hover-box303 overflow-x-hidden"
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
