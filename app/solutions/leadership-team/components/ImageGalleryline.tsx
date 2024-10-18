import React, { useState, useEffect } from "react";
import Image from "next/image";
import "aos/dist/aos.css";
import Aos from "aos";
import "../../midmarketenterprise/components/grid.css";
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
      src: "/leadership/imageshown/imageshown1.svg",
      alt: "Image 1",
      id: 1,
      relatedImages: [
        {
          src: "/leadership/sideimages/ai.svg",
          alt: "Related Image 1-1",
          id: 2,
        },
        {
          src: "/leadership/sideimages/lead.svg",
          alt: "Related Image 1-2",
          id: 4,
        },
        {
          src: "/leadership/sideimages/scheduler.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
      ],
    },
    {
      src: "/leadership/imageshown/imageshown2.svg",
      alt: "Image 2",
      id: 2,
      relatedImages: [
        {
          src: "/leadership/sideimages/ai.svg",
          alt: "Related Image 1-1",
          id: 2,
        },
        {
          src: "/leadership/sideimages/contacts.svg",
          alt: "Related Image 1-2",
          id: 1,
        },
        {
          src: "/leadership/sideimages/scheduler.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
      ],
    },
    {
      src: "/leadership/imageshown/imageshown3.svg",
      alt: "Image 3",
      id: 3,
      relatedImages: [
        {
          src: "/leadership/sideimages/lead.svg",
          alt: "Related Image 1-1",
          id: 4,
        },
        {
          src: "/leadership/sideimages/contacts.svg",
          alt: "Related Image 1-2",
          id: 1,
        },
        {
          src: "/leadership/sideimages/scheduler.svg",
          alt: "Related Image 1-3",
          id: 3,
        },
      ],
    },
    {
      src: "/leadership/imageshown/imageshown4.svg",
      alt: "Image 4",
      id: 4,
      relatedImages: [
        {
          src: "/leadership/sideimages/ai.svg",
          alt: "Related Image 1-1",
          id: 2,
        },
        {
          src: "/leadership/sideimages/contacts.svg",
          alt: "Related Image 1-2",
          id: 1,
        },
        {
          src: "/leadership/sideimages/lead.svg",
          alt: "Related Image 1-3",
          id: 4,
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
        width: "1821px",
        height: "1163px",
        overflow: "hidden",
      }}
      className="w-full h-full overflow-x-hidden"
    >
      <div className="flex flex-col 2xl:flex-row items-start mt-24 justify-center">
        <div className="relative flex items-center justify-center">
          {selectedImage ? (
            <div className="flex flex-col items-center">
              <div className="items-center justify-center flex flex-col gap-y-2 mb-4">
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  maintain
                </div>
                <h1 className="text-center text-[42px] leading-normal">
                  <span className="text-black font-extrabold">
                    Unify communication across
                  </span>
                  <span className="text-black font-extralight">
                    {" "}
                    multiple channels
                  </span>
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
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ) : (
            <div className="relative w-full  translate-y-32  2xl:translate-y-24 ">
              <svg
                className="2xl:flex hidden loading-svg "
                width="1424"
                height="595"
                viewBox="0 0 1424 595"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M1331.5 1.5H1403.5C1414.27 1.5 1423 10.2304 1423 21V226.5C1423 237.269 1414.27 246 1403.5 246H1190C1178.68 246 1169.5 255.178 1169.5 266.5V591.5H705.252C694.483 591.5 685.752 582.77 685.752 572V530C685.752 518.678 676.574 509.5 665.252 509.5H394H392.5H226.5C215.73 509.5 207 500.77 207 490V390.5V286C207 274.678 197.822 265.5 186.5 265.5H21C10.2304 265.5 1.5 256.77 1.5 246V70C1.5 59.2304 10.2304 50.5 21 50.5H438.5H692.245C703.567 50.5 712.745 41.3218 712.745 30V21C712.745 10.2304 721.476 1.5 732.245 1.5H1324.5H1331.5ZM392.5 510.5H226.5C215.178 510.5 206 501.322 206 490V390.5V286C206 275.23 197.27 266.5 186.5 266.5H21C9.67816 266.5 0.5 257.322 0.5 246V70C0.5 58.6782 9.67816 49.5 21 49.5H438.5H692.245C703.015 49.5 711.745 40.7696 711.745 30V21C711.745 9.67816 720.923 0.5 732.245 0.5H1324.5H1331.5H1403.5C1414.82 0.5 1424 9.67816 1424 21V226.5C1424 237.822 1414.82 247 1403.5 247H1190C1179.23 247 1170.5 255.73 1170.5 266.5V591.5H1173V592.5H1170.5V594.5H1169.5V592.5H705.252C693.931 592.5 684.752 583.322 684.752 572V530C684.752 519.23 676.022 510.5 665.252 510.5H394H392.5Z"
                  fill="#A9FF9B"
                />
              </svg>

              <svg
                className="2xl:hidden loading-svg xl:flex hidden left-72 relative"
                width="1272"
                height="453"
                viewBox="0 0 1272 453"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M654.676 1.49064C644.665 1.49064 636.55 9.60582 636.55 19.6164C636.55 30.1793 627.987 38.7421 617.424 38.7421H391.628V37.7421H617.424C627.435 37.7421 635.55 29.627 635.55 19.6164C635.55 9.05353 644.113 0.490644 654.676 0.490644H1188.97V0.491132H1251.18C1262.47 0.491132 1271.62 9.64137 1271.62 20.9288V167.691C1271.62 178.978 1262.47 188.129 1251.18 188.129H1064.71C1053.97 188.129 1045.27 196.831 1045.27 207.566V449.79H1047.45V450.79H1045.27V452.19H1044.27V450.79H631.886C620.599 450.79 611.449 441.64 611.449 430.352V407.888C611.449 397.153 602.746 388.451 592.011 388.451H350.555V388.45H204.416C193.128 388.45 183.978 379.3 183.978 368.012V297.102V222.39C183.978 211.655 175.275 202.953 164.54 202.953H20.9283C9.64087 202.953 0.490644 193.803 0.490644 182.515V58.1797C0.490644 46.8923 9.64088 37.7421 20.9283 37.7421H391.627V38.7421H20.9283C10.1932 38.7421 1.49064 47.4446 1.49064 58.1797V182.515C1.49064 193.25 10.1932 201.953 20.9283 201.953H164.54C175.828 201.953 184.978 211.103 184.978 222.39V297.102V368.012C184.978 378.748 193.68 387.45 204.416 387.45H351.893V387.451H592.011C603.298 387.451 612.449 396.601 612.449 407.888V430.352C612.449 441.087 621.151 449.79 631.886 449.79H1044.27V207.566C1044.27 196.279 1053.42 187.129 1064.71 187.129H1251.18C1261.91 187.129 1270.62 178.426 1270.62 167.691V20.9288C1270.62 10.1937 1261.91 1.49113 1251.18 1.49113H1182.72V1.49064H654.676Z"
                  fill="#A9FF9B"
                />
              </svg>

              <div className="items-center justify-center flex flex-col gap-y-2 xl:translate-y-[120px] xl:translate-x-60 2xl:translate-x-0 2xl:translate-y-[180px] absolute top-0 left-0 right-0">
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit mx-auto">
                  maintain
                </div>
                <h1 className="text-center text-[42px] leading-normal">
                  <span className="text-black font-extrabold headings">
                    Unify communication across
                  </span>
                  <br />
                  <span className="text-black font-extralight">
                    {" "}
                    multiple channels{" "}
                  </span>
                </h1>
              </div>
              <div className="relative 2xl:-top-[660px] 2xl:left-[100px] xl:-top-[550px] xl:left-[350px] overflow-x-hidden">
                <Image
                  src="/leadership/wire/wire1.svg"
                  width={970}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-boxleadership11"
                  alt="Image 1"
                  onClick={() => handleImageClick(images[0])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[920px] 2xl:left-[1000px] xl:-top-[850px] xl:left-[1150px] overflow-x-hidden">
                <Image
                  src="/leadership/wire/wire2.svg"
                  width={980}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-boxleadership21"
                  alt="Image 2"
                  onClick={() => handleImageClick(images[1])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[700px] z-[90] 2xl:left-[1040px] xl:-top-[650px] xl:left-[1120px] overflow-x-hidden">
                <Image
                  src="/leadership/wire/wire3.svg"
                  width={980}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-boxleadership31"
                  alt="Image 3"
                  onClick={() => handleImageClick(images[2])}
                  style={{ cursor: "pointer" }}
                  data-aos="zoom-in"
                />
              </div>
              <div className="relative 2xl:-top-[1030px] z-[60] 2xl:left-[40px] xl:-top-[950px]  xl:left-[270px] overflow-x-hidden ">
                <Image
                  src="/leadership/wire/wire4.svg"
                  width={970}
                  height={600}
                  className="w-[350px] h-[262.5px] hover-boxleadership41"
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
