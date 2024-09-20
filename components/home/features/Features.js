import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Features.scss";
import Link from "next/link";
import featureList from "./FeaturesList.json";

function Features() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='features'>
                <div className='container'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Core Features</span>
                            <h2 className='heading'>
                                <span>Discover our powerful</span> <br /> AI features
                            </h2>
                        </div>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <p className='m-0'>
                                From AI Templates, Assistants to Social Media Analytics, explore how GrowStack's suite can elevate your business to
                                new heights
                            </p>
                        </div>
                    </div>
                </div>
                <div className='block'>
                    {featureList.map((feature, index) => (
                        <div className='writter' key={feature.id} style={{ backgroundColor: feature.bgColor, top: feature.top }}>
                            <div className='container'>
                                <div className='flex flex-col sm:flex-row items-center gap-4'>
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className='w-full sm:w-1/2 '>
                                                <div className='content'>
                                                    <span>{feature.id}</span>
                                                    <h3>{feature.title}</h3>
                                                    <p>{feature.description}</p>
                                                    <ul>
                                                        {feature.points.map((point, index) => (
                                                            <li key={index}>
                                                                <img src='/images_growstack/home/check.svg' alt='check' />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <Link href={feature.link} className='sheen'>
                                                        {feature.linkText} <img src='/images_growstack/home/arrow.svg' alt='arrow' />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div className='w-full sm:w-1/2  mt-md-0 mt-4'>
                                                <div className='writterImg'>
                                                    <img src={feature.imgSrc} alt={feature.title} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className='w-full sm:w-1/2  mb-md-0 mb-4'>
                                                <div className='writterImg'>
                                                    <img src={feature.imgSrc} alt={feature.title} />
                                                </div>
                                            </div>
                                            <div className='w-full sm:w-1/2 '>
                                                <div className='content'>
                                                    <span>{feature.id}</span>
                                                    <h3>{feature.title}</h3>
                                                    <p>{feature.description}</p>
                                                    <ul>
                                                        {feature.points.map((point, index) => (
                                                            <li key={index}>
                                                                <img src='/images_growstack/home/check.svg' alt='check' />
                                                                {point}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    <Link href='/auth/register' className='sheen'>
                                                        {feature.linkText} <img src='/images_growstack/home/arrow.svg' alt='arrow' />
                                                    </Link>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </React.Fragment>
    );
}

export default Features;
