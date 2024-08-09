import React, { useState, useRef, useEffect } from 'react';
import AOS from "aos";
import "aos/dist/aos.css";
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MarketingEfficiency.scss';

const MarketingEfficiency: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const swiperRef = useRef<any>(null);

    const images = [
        { src: "/images_growstack/solutions/aiArticle.svg", description: "Fast content" },
        { src: "/images_growstack/solutions/textVideo.svg", description: "Visual appeal" },
        { src: "/images_growstack/solutions/aiEmail.svg", description: "Effective messaging" },
        { src: "/images_growstack/solutions/aiWebsite.svg", description: "Design optimization" },
        { src: "/images_growstack/solutions/aiProduct.svg", description: "Product visuals" },
    ];
    const swiperImages = [
        { src: "/images_growstack/solutions/eswiper1.svg", description: "Fast content" },
        { src: "/images_growstack/solutions/eswiper2.svg", description: "Visual appeal" },
        { src: "/images_growstack/solutions/eswiper3.svg", description: "Effective messaging" },
        { src: "/images_growstack/solutions/eswiper4.svg", description: "Design optimization" },
        { src: "/images_growstack/solutions/eswiper5.svg", description: "Product visuals" },
    ];

    const handleClick = (index: number) => {
        setActiveIndex(index);
        setShowModal(true);
    };

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <div className="marketingEfficiency">
                <div className="container">
                    <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <span className="user">Efficiency</span>
                        <h2 className="heading mt-3"><span>Produce high quality </span>content efficiently</h2>
                    </div>
                    <div className="efficiencyImages">
                        <div className="row justify-content-center">
                            {images.map((image, index) => (
                                <div className="col-md-4" data-aos="fade-up"
                                data-aos-easing="ease-in-sine"
                                data-aos-duration="1000" key={index}>
                                    <div className="imgBlock" onClick={() => handleClick(index)}>
                                        <img src={image.src} alt={image.description} />
                                        <p>{image.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bootstrap Modal */}
            {showModal && (
                <div className="modal show fade"  style={{ display: 'block', background:"#000000b0" }}>
                    <div className="modal-dialog modal-xl modal-dialog-centered">
                        <div className="modal-content" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                           
                            <div className="modal-body">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    loop={true}
                                    speed={5000}
                                    pagination={{
                                        clickable: true,
                                      }}
                                    centeredSlides={true}
                                    modules={[Autoplay, Pagination]}
                                    className="mySwiper"
                                    initialSlide={activeIndex}
                                    onSwiper={(swiper) => {
                                        swiperRef.current = swiper;
                                    }}
                                >
                                    {swiperImages.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <img src={image.src} alt={image.description} className="img-fluid" />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default MarketingEfficiency;
