import React from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import './AiSlider.scss';
import Link from 'next/link';

function AiSlider() {
    return (
        <React.Fragment>
            <div className="aiSlider">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={5000}
                    centeredSlides={true}
                    navigation={false}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        1400: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {[...Array(20).keys()].map((index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBlock">
                                <img src={`/images_growstack/salesMarketing/ai-${(index % 10) + 1}.png`} alt="ai" />
                                <div className="block">
                                    <p>
                                        <b>Samantha wells</b>
                                        <span>On-page SEO specialist</span>
                                    </p>
                                    <Link href="/register">Chat Now</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Swiper
                    slidesPerView={5}
                    spaceBetween={20}
                    autoplay={{
                        delay: 500,
                        disableOnInteraction: false,
                        reverseDirection: true,
                    }}
                    loop={true}
                    speed={5000}
                    centeredSlides={true}
                    navigation={false}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper opposite"
                    breakpoints={{
                        1400: {
                            slidesPerView: 5,
                            spaceBetween: 10,
                        },
                        1000: {
                            slidesPerView: 4,
                            spaceBetween: 10,
                        },
                        600: {
                            slidesPerView: 2,
                            spaceBetween: 10,
                        },
                        0: {
                            slidesPerView: 1.5,
                            spaceBetween: 10,
                        },
                    }}
                >
                    {[...Array(20).keys()].map((index) => (
                        <SwiperSlide key={index}>
                            <div className="imgBlock">
                                <img src={`/images_growstack/salesMarketing/ai-${(index % 10) + 1}.png`} alt="ai" />
                                <div className="block">
                                    <p>
                                        <b>Samantha wells</b>
                                        <span>On-page SEO specialist</span>
                                    </p>
                                    <Link href="/register">Chat Now</Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </React.Fragment>
    );
}

export default AiSlider;
