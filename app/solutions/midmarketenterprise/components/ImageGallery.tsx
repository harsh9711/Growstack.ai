"use client";
import { ArrowBigLeft } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";

const ImageGallery: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const galleryRef = useRef<HTMLDivElement | null>(null);

    const images: string[] = [
        '/loading/loading1.svg',
        '/loading/loading2.svg',
        '/loading/loading3.svg',
        '/loading/loading4.svg',
        '/loading/loading5.svg',
        '/loading/loading6.svg',
    ];
    const contents = [
        <div key="1" className='flex flex-row items-center gap-x-10'>
            <Image src="/iconsdiv/icons1.svg" alt="Icon 1" width={50} height={50} />
            <p>Instant engagement</p>
        </div>,
        <div key="2" className='flex flex-row items-center gap-x-10'>
            <Image src="/iconsdiv/icons2.svg" alt="Icon 2" width={50} height={50} />
            <p>Brand amplification</p>
        </div>,
        <div key="3" className='flex flex-row items-center gap-x-10'>
            <Image src="/iconsdiv/icons3.svg" alt="Icon 3" width={50} height={50} />
            <p>Brand monitoring</p>
        </div>,
        <div key="4" className='flex flex-row items-center gap-x-10'>
            <Image src="/iconsdiv/icons4.svg" alt="Icon 4" width={50} height={50} />
            <p>Email optimization</p>
        </div>,
    ];

    const progressColors = ['#FFEDE6', '#9AEEE7', '#D9CFEE', '#FEE4F1'];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (loading && selectedIndex === null) {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = [...prevProgress];
                    if (newProgress[currentIndex] < 100) {
                        newProgress[currentIndex] += 10;
                    } else {
                        clearInterval(interval);
                        setIsComplete(true);
                        setLoading(false); 
                    }
                    return newProgress;
                });
            }, 200);
        }
        return () => clearInterval(interval);
    }, [loading, currentIndex, selectedIndex]);

    useEffect(() => {
        if (isComplete && selectedIndex === null) {
            const nextIndex = currentIndex + 1;
            if (nextIndex < contents.length) {
                setCurrentIndex(nextIndex);
                setProgress((prevProgress) => {
                    const newProgress = [...prevProgress];
                    newProgress[currentIndex] = 100; 
                    return newProgress;
                });
                setIsComplete(false);
                setLoading(true);
            }
        }
    }, [isComplete, currentIndex, contents.length, selectedIndex]);

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
        setSelectedIndex(index);
        setLoading(false); 
        setProgress((prevProgress) => {
            const newProgress = Array(contents.length).fill(0);
            newProgress[index] = 100; 
            return newProgress;
        });
    };
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const handleClick = (index: number) => {
        setClickedIndex(index);
        handleThumbnailClick(index);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoading(true); 
                } else {
                    setLoading(false); 
                }
            },
            { threshold: 0.1 } 
        );

        if (galleryRef.current) {
            observer.observe(galleryRef.current);
        }

        return () => {
            if (galleryRef.current) {
                observer.unobserve(galleryRef.current);
            }
        };
    }, []);

    return (
        <div className='flex flex-col gap-y-16'> 
            <div className="">  
                <div className="bg-[#03473714] py-2 px-3.5 flex items-center gap-3 rounded-full text-[12px] font-semibold uppercase max-w-fit">
                    {" "}
                    Distinction
                </div>  
                <h1 className="text-center flex flex-row gap-4 text-[42px] leading-normal">
                    <span className="relative text-black font-semibold">
                        Stand out in a
                    </span>
                    <span className="text-black font-extralight">
                        {" "}
                        competitive market
                    </span>
                </h1>
            </div>
            <div className="gallery-container" ref={galleryRef}>
                <div className="selected-content">
                    {contents.map((content, index) => (
                        <div
                            key={index}
                            onClick={() => handleClick(index)}
                            className={`content-item ${clickedIndex === index ? 'clicked' : ''}`}
                        >
                            {content}
                            <div className="progress-container">
                                <div className="progress-bar-background"></div>
                                {progress[index] > 0 && (
                                    <div
                                        className="progress-bar"
                                        style={{ 
                                            width: `${progress[index]}%`, 
                                            backgroundColor: progressColors[index] // Apply color
                                        }}
                                    ></div>
                                )}
                                {(progress[index] > 0 && progress[index] < 100) || clickedIndex === index ? (
                                    <div className="justify-end flex -translate-y-16 -translate-x-6">
                                        <FaArrowRightLong className='text-[#034737] text-2xl'/>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="image-thumbnails translate-y-6">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                            style={{
                                display: index === currentIndex ? 'block' : 'none',
                                width: '500px',  
                                height: '500px',
                                overflow: 'hidden',
                            }}
                        >
                            <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="thumbnail-img"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
