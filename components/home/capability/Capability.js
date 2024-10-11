import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Capability.scss";
function Capability() {
    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <React.Fragment>
            <div className='capability'>
                <div className='container'>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <span className='user'>Other Features</span>
                            <h3 className='heading'>
                                <span>Expand your capabilities </span> <br /> with seamless integrations
                            </h3>
                        </div>
                        <div className='w-full sm:w-1/2 ' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <p>
                                Unlock the full potential of your business with integrated AI solutions for reputation management and automated
                                communication.
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col sm:flex-row items-center mt-8 gap-8'>
                        <div className='' data-aos='fade-right' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='card-capability reputation'>
                                <div className='card-body'>
                                    <h5 className='card-title'>Reputation management</h5>
                                    <p className='card-text'>
                                        Monitor and improve your ratings across multiple review platforms, ensuring your brand shines.
                                    </p>
                                    <div className='cardsBlock grid grid-cols-1 sm:grid-cols-2 '>
                                        <div className='col-md-6 p-1'>
                                            <div className='block'>
                                                <img src='/images_growstack/home/trust.svg' alt='Trustpilot Logo' />
                                                <div className='content'>
                                                    <img src='/images_growstack/home/tstar.svg' alt='star' />
                                                    <p>
                                                        <b>4.9/5 | 9010</b> reviews
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 p-1'>
                                            <div className='block'>
                                                <img src='/images_growstack/home/Google.svg' alt='Google Logo' />
                                                <div className='content'>
                                                    <img src='/images_growstack/home/gstar.svg' alt='star' />
                                                    <p>
                                                        <b>4.4/5 | 4443</b> reviews
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 p-1'>
                                            <div className='block'>
                                                <img src='/images_growstack/home/Hostadvice.svg' alt='Hostadvice Logo' />
                                                <div className='content'>
                                                    <img src='/images_growstack/home/gstar.svg' alt='star' />
                                                    <p>
                                                        <b>4.6/5 | 1562</b> reviews
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-6 p-1'>
                                            <div className='block'>
                                                <img src='/images_growstack/home/Serchen.svg' alt='Serchen Logo' />
                                                <div className='content'>
                                                    <img src='/images_growstack/home/sstar.svg' alt='star' />
                                                    <p>
                                                        <b>4.6/5 | 621</b> reviews
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='card-capability contact'>
                                <div className='card-body'>
                                    <img src='/images_growstack/home/cm.svg' alt='cm' />
                                    <h5 className='card-title'>Contact management</h5>
                                    <p className='card-text'>Keep your contact information organized and protected.</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-6' data-aos='fade-left' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='card-capability whatsapp'>
                                <div className='card-body'>
                                    <div>
                                        <h5 className='card-title'>
                                            WhatsApp and Telegram automation <span>with our apps</span>
                                        </h5>
                                        <p className='card-text'>
                                            Utilize our apps to automate messaging workflows, maintain engagement, and boost customer satisfaction.
                                        </p>
                                    </div>
                                    <div className='text-center'>
                                        <img src='/images_growstack/home/wt.svg' alt='GrowStack Logo' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-md-12' data-aos='fade-up' data-aos-easing='ease-in-sine' data-aos-duration='1000'>
                            <div className='card-capability discover'>
                                <div className='card-body'>
                                    <h5 className='card-title'>
                                        Discover valuable contacts <span>with Google web scraping</span>
                                    </h5>
                                    <p className='card-text'>
                                        Use our Google web scraping tool to identify and collect contact details, enhancing your marketing and
                                        outreach efforts.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Capability;
