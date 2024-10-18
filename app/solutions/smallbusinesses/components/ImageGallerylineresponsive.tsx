import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import "../../midmarketenterprise/components/grid.css";
import "../../../../styles/myanimation.css";
const ImageGalleryLineB = () => {
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
      src: "/solution3rdpage/imageshown/imageshown1.svg",
      alt: "Image 1",
      id: 1,
      relatedImages: [
        {
          src: "/solution3rdpage/sideimages/text.svg",
          alt: "Related Image 1-1",
          id: 2,
        },
        {
          src: "/solution3rdpage/sideimages/ai.svg",
          alt: "Related Image 1-2",
          id: 4,
        },
        {
          src: "/solution3rdpage/sideimages/social.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
      ],
    },
    {
      src: "/solution3rdpage/imageshown/imageshown3.svg",
      alt: "Image 2",
      id: 2,
      relatedImages: [
        {
          src: "/solution3rdpage/sideimages/workflow.svg",
          alt: "Related Image 2-1",
          id: 1,
        },
        {
          src: "/solution3rdpage/sideimages/ai.svg",
          alt: "Related Image 1-2",
          id: 4,
        },
        {
          src: "/solution3rdpage/sideimages/social.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
      ],
    },
    {
      src: "/solution3rdpage/imageshown/imageshown4.svg",
      alt: "Image 3",
      id: 3,
      relatedImages: [
        {
          src: "/solution3rdpage/sideimages/text.svg",
          alt: "Related Image 3-2",
          id: 2,
        },
        {
          src: "/solution3rdpage/sideimages/workflow.svg",
          alt: "Related Image 2-1",
          id: 1,
        },
        {
          src: "/solution3rdpage/sideimages/ai.svg",
          alt: "Related Image 1-2",
          id: 4,
        },
      ],
    },
    {
      src: "/solution3rdpage/imageshown/imageshown2.svg",
      alt: "Image 4",
      id: 4,
      relatedImages: [
        {
          src: "/solution3rdpage/sideimages/text.svg",
          alt: "Related Image 3-2",
          id: 2,
        },
        {
          src: "/solution3rdpage/sideimages/workflow.svg",
          alt: "Related Image 2-1",
          id: 1,
        },
        {
          src: "/solution3rdpage/sideimages/social.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
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
            setImagesShownCount(prevCount => prevCount + 1); // Increment the count
            if (imagesShownCount >= 2) {
              // Stop after showing 3 images (initial + 2 more)
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
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "1163px",
        overflow: "hidden",
      }}
      className="overflow-hidden"
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
                  className="w-[1108px] h-[560px] mt-6"
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
            <div className="relative w-full  xl:translate-y-24 2xl:translate-y-24 ">
              <svg
                className="2xl:flex loading-svg hidden"
                width="1479"
                height="600"
                viewBox="0 0 1679 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1402.5 60H1658.5C1669.55 60 1678.5 68.9543 1678.5 80V240C1678.5 251.046 1669.55 260 1658.5 260H1445C1433.95 260 1425 268.954 1425 280V595"
                  stroke="#034737"
                />
                <path
                  d="M233.5 50H820.097C831.143 50 840.097 41.0457 840.097 30V21C840.097 9.9543 849.052 1 860.097 1L1406.5 1V62"
                  stroke="#034737"
                />
                <path
                  d="M207 516.5V324.573C207 313.527 198.046 304.573 187 304.573H21C9.95431 304.573 1 295.618 1 284.573V74C1 62.9543 9.9543 54 21 54H232"
                  stroke="#034737"
                />
                <path
                  d="M1425.5 599H850.515C839.469 599 830.515 590.046 830.515 579V537C830.515 525.954 821.561 517 810.515 517H208.5"
                  stroke="#034737"
                />
              </svg>
              <svg
                className="2xl:hidden loading-svg xl:flex hidden"
                width="1279"
                height="458"
                viewBox="0 0 1279 458"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1067.87 46.2783H1258C1269.05 46.2783 1278 55.2326 1278 66.2783V178.546C1278 189.592 1269.05 198.546 1258 198.546H1105C1093.95 198.546 1085 207.501 1085 218.546V453.596"
                  stroke="#034737"
                />
                <path
                  d="M177.863 38.6651H621.038C631.339 38.6651 639.691 30.3139 639.691 20.0122V20.0122C639.691 9.71054 648.042 1.35938 658.343 1.35938L1070.92 1.35938V47.8012"
                  stroke="#034737"
                />
                <path
                  d="M157.688 393.831V252.482C157.688 241.436 148.733 232.482 137.688 232.482H20.8516C9.8059 232.482 0.851562 223.527 0.851562 212.482V61.7105C0.851562 50.6648 9.80587 41.7104 20.8516 41.7104H176.721"
                  stroke="#034737"
                />
                <path
                  d="M1085.38 456.641H652.395C641.35 456.641 632.395 447.687 632.395 436.641V414.211C632.395 403.166 623.441 394.211 612.395 394.211H158.83"
                  stroke="#034737"
                />
              </svg>

              <div className="items-center justify-center flex flex-col gap-y-2 translate-y-[180px] absolute top-0 left-0 right-0">
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  engagement
                </div>
                <h1 className="text-center text-[42px] leading-normal">
                  <span className="text-black font-bold">
                    Boost customer engagement
                  </span>
                  <br />
                  <span className="text-black font-extralight">
                    with AI-driven strategies
                  </span>
                </h1>
              </div>
              <div className="relative 2xl:-top-[660px] 2xl:left-[100px] xl:-top-[550px] xl:left-[50px] overflow-x-hidden">
                <Image
                  src="/solution3rdpage/wire/wire1.svg"
                  width={970}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-box11"
                  alt="Image 1"
                  onClick={() => handleImageClick(images[0])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[920px] 2xl:left-[1000px] xl:-top-[820px] xl:left-[880px] overflow-x-hidden">
                <Image
                  src="/solution3rdpage/wire/wire2.svg"
                  width={980}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-box21"
                  alt="Image 2"
                  onClick={() => handleImageClick(images[1])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[700px] z-[90] 2xl:left-[1040px] xl:-top-[650px] xl:left-[920px] overflow-x-hidden">
                <Image
                  src="/solution3rdpage/wire/wire3.svg"
                  width={980}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-box41"
                  alt="Image 3"
                  onClick={() => handleImageClick(images[2])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[1030px] z-[60] 2xl:left-[40px] xl:-top-[950px]  xl:left-[10px] overflow-x-hidden ">
                <Image
                  src="/solution3rdpage/wire/wire4.svg"
                  width={970}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-box31"
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

export default ImageGalleryLineB;
