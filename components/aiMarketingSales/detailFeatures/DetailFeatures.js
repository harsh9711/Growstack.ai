import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./DetailFeatures.scss";
import Link from "next/link";
function DetailFeatures() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='detailFeatures'>
                <div className='container'>
                    <div className='row'>
                        <div className='cardsBlock'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <span className='user'>Details of features</span>
                                    <h3 className='heading'>
                                        <span>The content </span> <br />
                                        creation platform
                                    </h3>
                                    <Link href='/auth/register' className='sheen'>
                                       Get started for free <img src='/images_growstack/home/arrow.svg' alt='arrow' />
                                    </Link>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content1.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Article </span>
                                                generator
                                            </h5>
                                            <p className='card-text'>
                                                Transform a title and outline into a polished article within moments, delivering high-quality content
                                                efficiently.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content2.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Content </span>
                                                rewriter
                                            </h5>
                                            <p className='card-text'>
                                                Infuse creativity, captivate, and revitalize content to intrigue and charm readers with fresh,
                                                engaging storytelling.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content3.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Paragraph </span>
                                                generator
                                            </h5>
                                            <p className='card-text'>
                                                Craft lively paragraphs on any subject, incorporating keywords seamlessly and adopting a tone that
                                                resonates with the desired mood or atmosphere.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content4.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Blog </span>
                                                titles
                                            </h5>
                                            <p className='card-text'>
                                                Create attention-grabbing blog titles effortlessly with this tool, ensuring your content stands out
                                                and entices readers with irresistible hooks.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content5.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Blog </span>
                                                section
                                            </h5>
                                            <p className='card-text'>
                                                Craft captivating blog sections under each subheading, offering succinct yet informative insights to
                                                keep readers engaged and eager for more.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content6.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Facebooks </span>
                                                ads
                                            </h5>
                                            <p className='card-text'>
                                                Craft Facebook ads that captivate your audience, sparking interest and driving conversions with
                                                compellingmessaging and irresistible calls to action.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content7.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Video </span>
                                                descriptions
                                            </h5>
                                            <p className='card-text'>
                                                Craft YouTube descriptions that intrigue viewers, enticing them to watch with captivating summaries
                                                and enticing promises of valuable content.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-4 my-2 my-md-3' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                                    <div className='card  bg-white'>
                                        <div className='card-body'>
                                            <div className='icon'>
                                                <img src='/images_growstack/aiMarket/content8.svg' alt='icon' />
                                            </div>
                                            <h5 className='heading'>
                                                <span>Instagram </span>
                                                captions
                                            </h5>
                                            <p className='card-text'>
                                                Craft YouTube descriptions that intrigue viewers, enticing them to watch with captivating summaries
                                                and enticing promises of valuable content.
                                            </p>
                                            <Link href='/auth/register' className='sheen'>
                                                Learn more
                                            </Link>
                                        </div>
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

export default DetailFeatures;
