import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import "./grid.css";
import "../../../../styles/myanimation.css";
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
      src: "/solutions/imageshown/imageshown1.svg",
      alt: "Image 1",
      id: 1,
      relatedImages: [
        { src: "/sideimages/text.svg", alt: "Related Image 1-1", id: 2 },
        { src: "/sideimages/webscraping.svg", alt: "Related Image 1-2", id: 3 },
        {
          src: "/sideimages/websitebuilder.svg",
          alt: "Related Image 1-3",
          id: 4,
        },
      ],
    },
    {
      src: "/solutions/imageshown/imageshown3.svg",
      alt: "Image 2",
      id: 2,
      relatedImages: [
        { src: "/sideimages/workflow.svg", alt: "Related Image 2-1", id: 1 },
        { src: "/sideimages/webscraping.svg", alt: "Related Image 2-2", id: 3 },
        {
          src: "/sideimages/websitebuilder.svg",
          alt: "Related Image 2-3",
          id: 4,
        },
      ],
    },
    {
      src: "/solutions/imageshown/imageshown4.svg",
      alt: "Image 3",
      id: 3,
      relatedImages: [
        { src: "/sideimages/workflow.svg", alt: "Related Image 3-1", id: 1 },
        { src: "/sideimages/text.svg", alt: "Related Image 3-2", id: 2 },
        {
          src: "/sideimages/websitebuilder.svg",
          alt: "Related Image 3-3",
          id: 4,
        },
      ],
    },
    {
      src: "/solutions/imageshown/imageshown2.svg",
      alt: "Image 4",
      id: 4,
      relatedImages: [
        { src: "/sideimages/workflow.svg", alt: "Related Image 4-1", id: 1 },
        { src: "/sideimages/webscraping.svg", alt: "Related Image 4-2", id: 3 },
        { src: "/sideimages/text.svg", alt: "Related Image 4-3", id: 2 },
      ],
    },
  ];

  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [relatedImages, setRelatedImages] = useState<
    ImageData["relatedImages"]
  >(images[0].relatedImages);
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
          const nextIndex =
            (prevIndex + 1) % selectedImage.relatedImages.length;
          if (nextIndex === 0) {
            setImagesShownCount(prevCount => prevCount + 1);
            if (imagesShownCount >= 2) {
              setTimerActive(false);
              return prevIndex;
            }
          }
          handleRelatedImageClick(selectedImage.relatedImages[nextIndex].id);
          return nextIndex;
        });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentRelatedIndex, timerActive, selectedImage, imagesShownCount]);

  return (
    <div
      style={{
        position: "relative",
        width: "1920px",
        height: "973px",
        overflow: "hidden",
      }}
      className=""
    >
      <div className="flex flex-row items-start mt-24 justify-center">
        <div className="relative flex items-center justify-center">
          {selectedImage ? (
            <div className="flex flex-col items-center">
              <div className="items-center justify-center flex flex-col gap-y-2 mb-4">
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  Operations
                </div>
                <h1 className="text-center text-[42px] leading-normal">
                  <span className="text-black font-bold">Seamlessly,</span>
                  <span className="text-black font-extralight">
                    {" "}
                    scale operations
                  </span>
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
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ) : (
            <div className="relative translate-y-36 2xl:translate-y-20 ">
              <svg
                className="2xl:flex hidden loading-svg"
                width="1429"
                height="597"
                viewBox="0 0 1429 597"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="loading-path"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1333.5 6H1405.5C1414.89 6 1422.5 13.6112 1422.5 23V228.5C1422.5 237.889 1414.89 245.5 1405.5 245.5H1192C1179.3 245.5 1169 255.797 1169 268.5V591H707.252C697.864 591 690.252 583.389 690.252 574V532C690.252 519.297 679.955 509 667.252 509H396H394.5H228.5C219.111 509 211.5 501.389 211.5 492V392.5V288C211.5 275.297 201.203 265 188.5 265H23C13.6112 265 6 257.389 6 248V72C6 62.6112 13.6112 55 23 55H440.5H694.245C706.948 55 717.245 44.7025 717.245 32V23C717.245 13.6112 724.856 6 734.245 6H1326.5H1333.5ZM394.5 515H228.5C215.797 515 205.5 504.703 205.5 492V392.5V288C205.5 278.611 197.889 271 188.5 271H23C10.2975 271 0 260.703 0 248V72C0 59.2975 10.2975 49 23 49H440.5H694.245C703.634 49 711.245 41.3888 711.245 32V23C711.245 10.2974 721.543 0 734.245 0H1326.5H1333.5H1405.5C1418.2 0 1428.5 10.2975 1428.5 23V228.5C1428.5 241.202 1418.2 251.5 1405.5 251.5H1192C1182.61 251.5 1175 259.111 1175 268.5V591V596.5V597H707.252C694.55 597 684.252 586.703 684.252 574V532C684.252 522.611 676.641 515 667.252 515H396H394.5Z"
                  fill="url(#paint0_linear_7480_7912)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_7480_7912"
                    x1="563.713"
                    y1="0"
                    x2="563.713"
                    y2="597"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F7DFF8" />
                    <stop offset="1" stop-color="#D1D0FC" />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                className="2xl:hidden xl:flex hidden loading-svg"
                width="1277"
                height="456"
                viewBox="0 0 1277 456"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="loading-path"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M656.676 5.98129C648.041 5.98129 641.04 12.9814 641.04 21.6164C641.04 33.5548 631.362 43.2328 619.424 43.2328H393.628V37.2515H619.424C628.059 37.2515 635.059 30.2514 635.059 21.6164C635.059 9.67799 644.737 0 656.676 0H1190.97V0.000488281H1253.18C1265.84 0.000488281 1276.11 10.2658 1276.11 22.9288V169.691C1276.11 182.354 1265.84 192.619 1253.18 192.619H1066.71C1057.35 192.619 1049.76 200.207 1049.76 209.566V454.19H1049.45V455.28H633.886C621.223 455.28 610.958 445.015 610.958 432.352V409.888C610.958 400.529 603.37 392.941 594.011 392.941H352.555V392.941H206.416C193.753 392.941 183.487 382.675 183.487 370.012V299.102V224.39C183.487 215.031 175.9 207.443 166.54 207.443H22.9283C10.2653 207.443 0 197.178 0 184.515V60.1797C0 47.5168 10.2653 37.2515 22.9283 37.2515H393.627V43.2327H22.9283C13.5687 43.2327 5.98129 50.8201 5.98129 60.1797V184.515C5.98129 193.875 13.5687 201.462 22.9283 201.462H166.54C179.203 201.462 189.469 211.728 189.469 224.39V299.102V370.012C189.469 379.372 197.056 386.959 206.416 386.959H353.893V386.96H594.011C606.674 386.96 616.939 397.225 616.939 409.888V432.352C616.939 441.712 624.527 449.299 633.886 449.299H1043.78V209.566C1043.78 196.903 1054.05 186.638 1066.71 186.638H1253.18C1262.54 186.638 1270.13 179.051 1270.13 169.691V22.9288C1270.13 13.5692 1262.54 5.98178 1253.18 5.98178H1184.72V5.98129H656.676Z"
                  fill="url(#paint0_linear_7480_7913)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_7480_7913"
                    x1="503.576"
                    y1="0"
                    x2="503.576"
                    y2="455.28"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#F7DFF8" />
                    <stop offset="1" stop-color="#D1D0FC" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="items-center justify-center flex flex-col gap-y-2 translate-y-[180px] 2xl:translate-y-[220px] absolute top-0 left-0 right-0">
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  Operations
                </div>
                <h1 className="text-center xl:text-[32px] 2xl:text-[42px] leading-normal">
                  <span className="text-black font-bold">Seamlessly,</span>
                  <span className="text-black font-extralight">
                    {" "}
                    scale operations
                  </span>
                </h1>
              </div>
              <div className="relative -top-[200px] 2xl:-top-[700px] left-[60px] 2xl:left-[100px] cursor-pointer ">
                <Image
                  src="/solutions/wire/wire1.svg"
                  width={970}
                  height={600}
                  className="2xl:w-[420px] w-[320px] h-[215px] 2xl:h-[315px] hover-box10 "
                  alt="Image 1"
                  onClick={() => handleImageClick(images[0])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative -top-[300px] 2xl:-top-[1050px] left-[850px] 2xl:left-[920px]">
                <Image
                  src="/solutions/wire/wire2.svg"
                  width={980}
                  height={600}
                  className="2xl:w-[420px] w-[320px] h-[215px] 2xl:h-[315px] hover-box20"
                  alt="Image 2"
                  onClick={() => handleImageClick(images[1])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative -top-[1000px] 2xl:-top-[800px] z-[90] xl:left-[850px] 2xl:left-[920px]">
                <Image
                  src="/solutions/wire/wire3.svg"
                  width={980}
                  height={600}
                  className="2xl:w-[420px] w-[320px] h-[215px] 2xl:h-[315px] hover-box40"
                  alt="Image 3"
                  onClick={() => handleImageClick(images[2])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative -top-[1150px] 2xl:-top-[1200px] z-[60] left-[30px]">
                <Image
                  src="/solutions/wire/wire4.svg"
                  width={970}
                  height={600}
                  className="2xl:w-[420px] w-[320px] h-[215px] 2xl:h-[315px] hover-box30"
                  alt="Image 4"
                  onClick={() => handleImageClick(images[3])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
            </div>
          )}
        </div>
        {selectedImage && (
          <div className=" p-4 flex flex-col gap-y-16 translate-y-28">
            {relatedImages.map(image => (
              <div
                key={image.id}
                className="cursor-pointer"
                onClick={() => handleRelatedImageClick(image.id)}
              >
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
        )}
      </div>
    </div>
  );
};

export default ImageGalleryLine;
