import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./AiProduct.scss";
function AiProduct() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='aiProduct'>
                <div className='scalingBanner'>
                    <div className='container'>
                        <div className='scaling'>
                            <div className='card'>
                                <div className='flex flex-col sm:flex-row items-center gap-6'>
                                    <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                        <img src='/images_growstack/textVideo/scaling.svg' className='img-fluid' alt='banner' />
                                    </div>
                                    <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                        <div className='card-body'>
                                            <span className='user'>From idea to video in minutes 🔥</span>
                                            <h5>
                                                Ready to start scaling <span> your videos?</span>
                                            </h5>
                                            <p>
                                                Professional quality videos from your script complete with realistic AI voices, matching footage and
                                                music in just a few clicks.
                                            </p>
                                            <div className='btns vibtn'>
                                                <Link href='/auth/register' className='sheen'>
                                                    Get Started{" "}
                                                    <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                        <path
                                                            d='M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z'
                                                            fill='black'
                                                        />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='wrapper'>
                    <div className='container'>
                        <div className='row align-items-end mb-3 mb-md-5'>
                            <div data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                <span className='user'>From idea to video in minutes 🔥</span>
                                <h3 className='heading mt-2 mb-2 mb-md-0'>
                                    <span>AI background generator </span>
                                </h3>
                            </div>
                            {/* <div data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <p>Lorem ipsum dolor sit amet consectetur. Egestas sed faucibus odio eget nam nisl libero id a. Aliquam dui quam justo proin dignissim.</p>
                            </div> */}
                        </div>
                        <div className='row'></div>
                        <div className='block'>
                            <div className='flex flex-col sm:flex-row py-3 items-center gap-12 sm:gap-24'>
                                <div className='w-full sm:w-5/12 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='imgBlock'>
                                        <img src='/images_growstack/textVideo/ai1.svg' alt='img' />
                                    </div>
                                </div>
                                <div className='w-full sm:w-7/12 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='content'>
                                        <h3>Explore diverse styles for your product</h3>
                                        <p>
                                            AI background generator presents a spectrum of styles to craft compelling product photos. Our AI-generated
                                            backgrounds are incredibly lifelike, offering hundreds of choices instantly. With dozens of styles at your
                                            fingertips, effortlessly find one that enhances your brand's aesthetic. Craft stunning Product AI Photos
                                            that resonate with your brand using our intuitive AI image generator, available for free!
                                        </p>
                                        <div className='btns'>
                                            <Link href='/auth/register' className='sheen'>
                                                Create AI product backgrounds{" "}
                                                <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z'
                                                        fill='black'
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='block'>
                            <div className='flex flex-col sm:flex-row py-3 items-center gap-12 sm:gap-24'>
                                <div className='w-full sm:w-7/12' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='content'>
                                        <h3>Instant results, professional appearance</h3>
                                        <p>
                                            How fast is AI Product Photos? Lightning fast! What once required days and weeks in a photo studio can now
                                            be accomplished in seconds. Bid farewell to traditional product photoshoots and greet Product AI's instant
                                            AI background generator. Just upload a photo of your product, and our AI photo generator will breathe life
                                            into your brand with AI Product Photos.
                                        </p>
                                        <div className='btns'>
                                            <Link href='/auth/register' className='sheen'>
                                                Create AI backgrounds{" "}
                                                <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                    <path
                                                        d='M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z'
                                                        fill='black'
                                                    />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full sm:w-5/12' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='imgBlock'>
                                        <img src='/images_growstack/textVideo/ai2.svg' alt='img' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AiProduct;
