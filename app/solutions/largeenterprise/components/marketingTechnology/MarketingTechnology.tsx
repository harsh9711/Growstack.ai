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
            title: 'Timeliness',
            imageSrc:'/solutions/slideroperations/slider4.svg',
            subtitle: 'Reduce decision-making time by 40% increase efficiency',
            tags: ['Schedule & Quick Posting'],
            description: 'Automates scheduling and communication processes, ensuring timely updates and adherence to compliance deadlines.',
            icon: '/solutions/slideroperations/slider1.svg'
        },
        {
            title: 'Collaboration',
            imageSrc:'/solutions/slideroperations/slider5.svg',
            subtitle: 'Boost productivity Optimize Return Of Invest by 20%',
            tags: ['WA and Tele Automation'],
            description: 'Facilitates real-time communication among team members, ensuring everyone stays informed and aligned.',
            icon: '/solutions/slideroperations/slider2.svg'
        },
        {
            title: 'Efficiency ',
            imageSrc:'/solutions/slideroperations/slider6.svg',
            subtitle: 'Automate routine tasks Save employees time by 50%',
            tags: ['Assistants'],
            description: 'Employ Answer Bot AI to provide instant responses to common operational queries, enhancing communication and information sharing.',
            icon: '/solutions/slideroperations/slider3.svg'
        },
        {
          title: 'Timeliness',
          imageSrc:'/solutions/slideroperations/slider4.svg',
          subtitle: 'Reduce decision-making time by 40% increase efficiency',
          tags: ['Schedule & Quick Posting'],
          description: 'Automates scheduling and communication processes, ensuring timely updates and adherence to compliance deadlines.',
          icon: '/solutions/slideroperations/slider1.svg'
      },
      {
          title: 'Collaboration',
          imageSrc:'/solutions/slideroperations/slider5.svg',
          subtitle: 'Boost productivity Optimize Return Of Invest by 20%',
          tags: ['WA and Tele Automation'],
          description: 'Facilitates real-time communication among team members, ensuring everyone stays informed and aligned.',
          icon: '/solutions/slideroperations/slider2.svg'
      },
      {
          title: 'Efficiency ',
          imageSrc:'/solutions/slideroperations/slider6.svg',
          subtitle: 'Automate routine tasks Save employees time by 50%',
          tags: ['Assistants'],
          description: 'Employ Answer Bot AI to provide instant responses to common operational queries, enhancing communication and information sharing.',
          icon: '/solutions/slideroperations/slider3.svg'
      }
    ]
    const swiperRef = useRef(null);
    return (
        <React.Fragment>
            <div className="marketingTechnology">
                <div className="container">
           
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
          <img src={item.imageSrc} alt={item.title} className=''/>
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
