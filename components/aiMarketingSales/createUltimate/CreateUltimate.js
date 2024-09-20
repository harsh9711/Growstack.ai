import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CreateUltimate.scss";

function CreateUltimate() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='createUltimate'>
                <div className='container'>
                    <div className='block'>
                        <div className='flex flex-col sm:flex-row items-end'>
                            <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                <div className='content'>
                                    <h3 className='heading'>
                                        <span>The ultimate </span> power of AI
                                    </h3>
                                    <p>
                                        AI writing tools excel at generating diverse content, from concise social media posts and product descriptions
                                        to comprehensive articles, reports, and even ebooks. Their versatility ensures consistent, high-quality
                                        content across all platforms, making them indispensable for businesses and individuals aiming to maintain a
                                        robust and engaging presence.
                                    </p>
                                    <div className='btns'>
                                        <Link href='/auth/register' className='sheen'>
                                            Get started{" "}
                                            <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z'
                                                    fill='white'
                                                />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                <div className='imgBlock'>
                                    <Image src='/images_growstack/aiMarket/blank.svg' alt='createUltimate' width={100} height={100} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='block'>
                        <div className='flex flex-col sm:flex-row items-center'>
                            <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                <div className='imgBlock'>
                                    <Image src='/images_growstack/aiMarket/quality.svg' alt='createUltimate' width={100} height={100} />
                                </div>
                            </div>
                            <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                <div className='content'>
                                    <h3 className='heading'>
                                        <span>Create quality content </span> with 80+ AI templates
                                    </h3>
                                    <p>
                                        Create high-converting content with 80+ AI templates. From business bios and Facebook ads to emails and
                                        YouTube descriptions, our AI content generator delivers compelling copy tailored to your needs, ensuring you
                                        reach a global audience effortlessly.
                                    </p>
                                    <div className='btns'>
                                        <Link href='/auth/register' className='sheen'>
                                            Get started{" "}
                                            <svg width='21' height='16' viewBox='0 0 21 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                <path
                                                    d='M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z'
                                                    fill='white'
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
        </React.Fragment>
    );
}

export default CreateUltimate;
