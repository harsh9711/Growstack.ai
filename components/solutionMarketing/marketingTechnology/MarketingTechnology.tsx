import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import AOS from "aos";
import "aos/dist/aos.css";
import './MarketingTechnology.scss';

const MarketingTechnology: React.FC = () => {
    useEffect(() => {
        AOS.init();
    }, []);
    const slideData = [
        {
            title: 'Tech Exploration',
            imageSrc: '/sliderimages/slider1.svg',
            tags: ['AI playground'],
            description: 'AI Playground Provides a platform for comparing and exploring the latest AI models and technologies, helping you stay ahead of trends and find the best solutions for your needs.',
            icon: '/images_growstack/solutions/contacts.svg'
        },
        {
            title: 'Automated Messages',
            imageSrc: '/sliderimages/slider2.svg',
            tags: ['WA and TELE Automation'],
            description: 'WhatsApp and Telegram Automation Automates messaging on WhatsApp and Telegram to streamline communication and maintain consistent interactions across popular platforms.',
            icon: '/images_growstack/solutions/aiPlay.svg'
        },
        {
            title: 'Custom Solutions',
            imageSrc: '/sliderimages/slider3.svg',
            tags: ['AI Custom GPT'],
            description: 'AI Custom GPT Offers tailored AI applications for specific marketing needs, delivering customized solutions for content creation, campaign management, and customer engagement. ',
            icon: '/images_growstack/solutions/aiaWizard.svg'
        },
        {
            title: 'Tech Exploration',
            imageSrc: '/sliderimages/slider1.svg',
            tags: ['AI playground'],
            description: 'AI Playground Provides a platform for comparing and exploring the latest AI models and technologies, helping you stay ahead of trends and find the best solutions for your needs.',
            icon: '/images_growstack/solutions/contacts.svg'
        },
        {
            title: 'Automated Messages',
            imageSrc: '/sliderimages/slider2.svg',
            tags: ['WA and TELE Automation'],
            description: 'WhatsApp and Telegram Automation Automates messaging on WhatsApp and Telegram to streamline communication and maintain consistent interactions across popular platforms.',
            icon: '/images_growstack/solutions/aiPlay.svg'
        },
        {
            title: 'Custom Solutions',
            imageSrc: '/sliderimages/slider3.svg',
            tags: ['AI Custom GPT'],
            description: 'AI Custom GPT Offers tailored AI applications for specific marketing needs, delivering customized solutions for content creation, campaign management, and customer engagement. ',
            icon: '/images_growstack/solutions/aiaWizard.svg'
        },
    ]
    const swiperRef = useRef(null);
    return (
        <React.Fragment>
            <div className="marketingTechnology">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1000">
                        <span className="user">Lorem Ipsum 🔥</span>
                        <h2 className='heading mt-2'><span>Adopt and integrate </span>new technologies</h2>
                    </div>
                    <div data-aos="flip-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <Swiper
  ref={swiperRef}
  effect={'coverflow'}  
  grabCursor={true}
  centeredSlides={true}
  loop={true}
  slidesPerView={2.81}
  spaceBetween={-150}
  watchOverflow={true}
  coverflowEffect={{
    rotate: 0,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  pagination={{ el: '.swiper-pagination', clickable: true }}
  navigation={{
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }}
  speed={500} 
  modules={[EffectCoverflow, Pagination, Navigation]}
  className="swiper_container"
  breakpoints={{
    1400: {
      slidesPerView: 2.74,
      spaceBetween: 10,
    },
    1000: {
      slidesPerView: 2.74,
      spaceBetween: 10,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    0: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  }}
>
  {slideData.map((item, index) => (
    <SwiperSlide key={index} className="swiper-slide">
      <div className="slide-content">
        <h2 className="slide-title">{item.title}</h2>
        <div className="image-wrapper">
          <img src={item.imageSrc} alt={item.title} />
        </div>
        <div className="tags-wrapper">
          {item.tags.map((tag, tagIndex) => (
            <span key={tagIndex} className="tag">
              <h2>{tag}</h2>
            </span>
          ))}
          {/* <span >{item.icon}</span> */}
          <img className="icon" src={String(item.icon)} alt="icon" />
        </div>
        <p className="slide-description">{item.description}</p>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MarketingTechnology;
