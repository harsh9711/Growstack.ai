import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './UseIt.scss'
import VideoBanner from '@/components/videoBanner/VideoBanner'
function UseIt() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className="useIt">
                <div className="wrapper">
                <div className="container">
                        <div className="row  items-center justify-center translate-x-40 mb-0 mb-md-4">
                            <div className="col-md-7" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <span className="user items-center justify-center translate-x-40">Uses</span>
                            <h3 className="heading mt-2 mb-2 mb-md-0"><span>Who could </span> get use it</h3>
                            </div>
                            {/* <div className="col-md-5" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <p>Lorem ipsum dolor sit amet consectetur. Imperdiet sodales hac at curabitur.</p>
                            </div> */}
                        </div>
                    <div className="row">
                        <div className="cardsBlock">
                            <div className="row">
                                <div className="col-md-3" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000"> 
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                                <img src="/images_growstack/emailBuilder/use1.svg" alt="icon" />
                                            </div>
                                            <h5 className="card-title">For Marketers</h5>
                                            <p className="card-text">Create custom emails without coding. Customize modules, launch campaigns, and export templates to email marketing software.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000"> 
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                                <img src="/images_growstack/emailBuilder/use2.svg" alt="icon" />
                                            </div>
                                            <h5 className="card-title">For Designers</h5>
                                            <p className="card-text">GrowStack is just like Figma, for building emails: use the same tools and shortcuts you already know. No time to learn new tools.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000"> 
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                                <img src="/images_growstack/emailBuilder/use3.svg" alt="icon" />
                                            </div>
                                            <h5 className="card-title">For Business Owners</h5>
                                            <p className="card-text">Create beautiful communications that engage your audience — so you can build your customer loyalty and boost your conversions, in minutes.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000"> 
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                                <img src="/images_growstack/emailBuilder/use4.svg" alt="icon" />
                                            </div>
                                            <h5 className="card-title">For Everyone!</h5>
                                            <p className="card-text">GrowStack isn’t just for business. Send stunning emails to surprise loved ones, friends, students, charity donors, or community members.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            {/* <VideoBanner /> */}
            </div>
        </React.Fragment>
    )
}

export default UseIt
