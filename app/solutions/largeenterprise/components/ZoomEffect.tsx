import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageGallery = () => {
    const [clickedImage, setClickedImage] = useState<string | null>(null);
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    useEffect(() => {
        if (clickedImage) {
          document.body.style.overflow = 'hidden';
        } else {    
          document.body.style.overflow = 'auto';
        }
    
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [clickedImage]);
    
      const handleClick = (largeSrc: string, index: number) => {
        if (clickedImage === largeSrc) {
          setClickedImage(null);
          setClickedIndex(null);
        } else {
          setClickedImage(largeSrc);
          setClickedIndex(index);
        }
      };
    type ImageType = {
        src: string;
        largeSrc: string;
        className?: string;
      };
      
      interface ImageGalleryProps {
        images: ImageType[];
      }
      const images = [
        {
          src: "/imagezoom/zoom1.svg",
          className: "w-[301px] h-[200px] translate-x-[200px] z-60",
          largeSrc: '/zoomedimages/conversation.svg', 
        },
        {
          src: "/imagezoom/zoom21.svg",
          className: "w-[290.5px] h-[200px] translate-x-[320px] z-60 -translate-y-20",
          largeSrc: '/zoomedimages/workflow.svg', 
        },
        {
          src: "/imagezoom/zoom3.svg",
          className: "w-[301px] h-[200px] translate-x-[350px] z-60 translate-y-32",
          largeSrc: '/zoomedimages/reputation.svg', 
        },
        {
          src: "/imagezoom/zoom4.svg",
          className: "w-[301px] h-[200px] -translate-x-[400px] z-60 translate-y-60",
          largeSrc: '/zoomedimages/scheduler.svg', 
        },
        {
          src: "/imagezoom/zoom5.svg",
          className:
            "w-[301px] h-[200px]  -translate-x-[170px] z-60 -translate-y-40",
            largeSrc: '/zoomedimages/social.svg', 
        },
      ];
   
     
 
  const handleClose = () => {
    setClickedImage(null);
    setClickedIndex(null);
  };
  // const getRemainingImageStyle = (index: number): React.CSSProperties => {
  //   const positions = [
  //     { bottom: '200px', left: '450px' },
  //     { bottom: '200px', right: '850px' },
  //     { bottom: '400px', right: '1090px' },
  //     { top: '200px', right: '800px' },
  //   ];
  
  //   return positions[index % positions.length] || {};
  // };
  return (
    <>
    <motion.div
      className="flex gap-4 mt-52 ml-32 absolute"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: clickedImage ? 1 : 1, scale: clickedImage ? 0.98 : 1 }}
      transition={{ duration: 0.5 }}
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          className={`relative opacity-100  z-40 ${image.className}`}
          // initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: clickedImage && clickedIndex !== index ? 1 : 1, scale: clickedImage && clickedIndex !== index ? 1 : 1 }}
          // transition={{ duration: 0.5, delay: index * 0.1 }}
          onClick={() => handleClick(image.largeSrc, index)}
          layout
          // style={clickedImage && clickedIndex !== index ? getRemainingImageStyle(index) : {}}
        >
          <Image
            src={image.src}
            alt={`Image ${index}`}
            layout="fill"
            objectFit="cover"
            className={`relative transition-transform duration-300 ease-in-out hover:scale-105 opacity-100 ${image.className} ${clickedIndex === index ? 'hidden' : ''}`}
          />
        </motion.div>
      ))}
    </motion.div>
  
    <div
      className={`mx-auto mt-16 z-30 items-center justify-center translate-x-[455px] inset-0 transition-opacity duration-500 ${clickedImage ? 'opacity-0' : 'opacity-30'}`}
    >
      <Image
        src="/dashboard.png"
        width={1000}
        height={227}
        alt="Dashboard Image"
        className="rounded-3xl h-[627px]"
      />
    </div>
  
    {clickedImage && (
      <div
        className="fixed bg-black bg-opacity-40  inset-0 flex items-center justify-center"
        onClick={handleClose}
      >
        <div
          className="relative max-w-full max-h-full p-4 bg-white rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-0 left-0 right-0 bg-gray-800 text-white p-2 flex items-center justify-between rounded-t-lg">
            <span className="text-lg font-semibold opacity-0">Image Preview</span>
            <button
              className="text-white bg-gray-800 p-1 rounded-full"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>
          <Image
            src={clickedImage}
            alt="Zoomed Image"
            width={1000}
            height={1000}
            objectFit="contain"
            className="rounded-lg z-40 mt-8"
          />
        </div>
      </div>
    )}
  </>
  
  );
};

export default ImageGallery;
