import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './SingleHub.scss'
import Link from 'next/link'
import Accordion from 'react-bootstrap/Accordion';
import { Autoplay, Navigation,Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
function SingleHub() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="singleHub">
                <div className="container">
                    <div className="head">
                        <div className="row">
                            <div className="col-md-7" data-aos="fade-right"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <h2>A single hub for limitless
                                    website innovations</h2>
                            </div>
                            <div className="col-md-5" data-aos="fade-left"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <p>Discover endless possibilities with our one-stop platform, empowering you to create unlimited, tailor-made websites.</p>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="row">
                            <div className="col-md-6" data-aos="fade-right"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <div className="imgBlock">
                                    <div className="company">
                                        <Swiper
                                            slidesPerView={1}
                                            spaceBetween={10}
                                            autoplay={{
                                                delay: 500,
                                                disableOnInteraction: false,
                                            }}
                                            loop={true}
                                            speed={5000}
                                            centeredSlides={true}
                                            navigation={false}
                                            pagination={true}
                                            modules={[Autoplay, Navigation, Pagination]}
                                            className="mySwiper"
                                            breakpoints={{
                                                1400: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                1000: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                600: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                                0: {
                                                    slidesPerView: 1,
                                                    spaceBetween: 10,
                                                },
                                            }}
                                        >
                                            {[...Array(10).keys()].map((index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="imgBlock">
                                                        <img src={`/images/emailBuilder/hub1.svg`} alt={`hub1`} />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>
                                    <div className="btns sbtn">
                                        <Link href="/register" className='sheen'>Explore <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z" fill="black" />
                                        </svg></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" data-aos="fade-left"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <div className="content">
                                    <div className="accordionBlock">
                                        <Accordion>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header>Business & service</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Construction Company</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>AI Company</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4">
                                                <Accordion.Header>E-Commerce</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="5">
                                                <Accordion.Header>Home Good Store</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="6">
                                                <Accordion.Header>Landing pages</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="7">
                                                <Accordion.Header>Media & blogs</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Accordion>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="block">
                        <div className="row">
                            <div className="col-md-6" data-aos="fade-right"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <div className="content">
                                    <h3>Stunning email experiences,
                                        anywhere, anytime</h3>
                                    <p>Craft captivating emails effortlessly with our intuitive drag-and-drop editor, ensuring every message resonates with your audience. Personalise content with dynamic elements tailored to each recipient's preferences and behaviour. Track performance in real-time with comprehensive analytics, optimising engagement with actionable insights.</p>
                                    <div className="description">
                                        <h5>Generate a template email</h5>
                                        <p>Enter a prompt describing your email's purpose. Our intelligent AI will instantly create a tailored email template designed specifically for your needs.</p>
                                    </div>
                                    <div className="description">
                                        <h5>Edit to your requirements</h5>
                                        <p>Customise the generated email to fit your specific requirements. Modify the content, add personal touches, and ensure the message aligns perfectly with your goals.</p>
                                    </div>
                                    <div className="description">
                                        <h5>Save and export</h5>
                                        <p>Once satisfied with your email, save it and export it in your preferred format. Your professional email is now ready to be sent to your audience.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6" data-aos="fade-left"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000">
                                <div className="imgBlock">
                                    <img src="/images/emailBuilder/hub2.svg" alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SingleHub
