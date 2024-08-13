"use client";
import { ArrowBigLeft } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import AOS from 'aos';
import 'aos/dist/aos.css';

const LoadingBar: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number[]>([0, 0, 0, 0]);
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const galleryRef = useRef<HTMLDivElement | null>(null);

    const images: string[] = [
        '/loading/sales/loading1.svg',
        '/loading/sales/loading2.svg',
        '/loading/sales/loading3.svg',
        '/loading/sales/loading4.svg',
    ];
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);

    const contents = [
        <div key="1"  className={`flex flex-row items-center gap-x-10 ${clickedIndex === 0 ? 'text-[#FFEDE6] font-semibold' : ''}`}>
            <Image src="/iconsdiv/icons1.svg" alt="Icon 1" width={50} height={50} />
            <p className='text-white '>Process automation</p>
        </div>,
        <div key="2"  className={`flex flex-row items-center gap-x-10 ${clickedIndex === 1 ? 'text-[#9AEEE7] font-semibold' : ''}`}>
            <Image src="/iconsdiv/icons2.svg" alt="Icon 2" width={50} height={50} />
            <p className='text-white '>Data insights</p>
        </div>,
        <div key="3"  className={`flex flex-row items-center gap-x-10 ${clickedIndex === 2 ? 'text-[#D9CFEE] font-semibold' : ''}`}>
            <Image src="/iconsdiv/icons3.svg" alt="Icon 3" width={50} height={50} />
            <p className='text-white '>Efficient conversion</p>
        </div>,
        <div key="4"  className={`flex flex-row items-center gap-x-10 ${clickedIndex === 3 ? 'text-[#F0FFC3] font-semibold' : ''}`}>
            <Image src="/iconsdiv/icons4.svg" alt="Icon 4" width={50} height={50} />
            <p className='text-white '>Market analysis</p>
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
        <div className='flex flex-col gap-y-10'>
            <div className="">
                <div
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    className="bg-white/10 hover:shadow-md  whitespace-nowrap  text-white py-2 px-4 flex items-center text-center text-[12px] rounded-full tracking-widest font-semibold uppercase w-full max-w-[151px]">
                    Distinction
                </div>
               <h1
                    data-aos="fade-up"
                    data-aos-duration="1100"
                    className="text-center flex flex-row gap-4 text-[42px] leading-normal"
                >
                    <span className="relative text-white font-semibold">
                    Streamline sales 
                    </span>
                    <span className="text-white font-extralight">
                    processes for success                    </span>
                </h1>
            </div>
            <div className="gallery-container " ref={galleryRef}>
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
                                            backgroundColor: progressColors[index]
                                        }}
                                    ></div>
                                )}
                                {(progress[index] > 0 && progress[index] < 100) || clickedIndex === index ? (
                                    <div className="justify-end flex -translate-y-16 -translate-x-6">
                                        <FaArrowRightLong className='text-white text-2xl' />
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
                                width: '600px',
                                height: '600px',
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

export default LoadingBar;
