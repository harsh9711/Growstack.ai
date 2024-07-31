import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './CoreFeatures.scss'
import VideoBanner from '@/components/videoBanner/VideoBanner'
function CoreFeatures() {
    useEffect(() => {
        AOS.init();
    }, []);
  return (
    <React.Fragment>
      <div className="coreFeatures">
        <div className="container">
            <div className="title" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                <span className="user">
                Core Features
                </span>
                <h3 className="heading">
                    <span>GPT made simple:</span> <br /> power up you business content
                </h3>
            </div>
            <div className="cardsBlock">
                            <div className="row">
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core1.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core1.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">Easy no-code setup</h5>
                                            <p className="card-text">Creating custom GPT apps without any coding expertise is a game-changer for businesses and individuals looking to leverage advanced AI technology.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core2.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core2.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">Deploy Your Custom Bot</h5>
                                            <p className="card-text">Deploying your customized chatbot is a quick and seamless process, guaranteeing swift activation of your bespoke bot.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core3.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core3.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">Real-Time Testing</h5>
                                            <p className="card-text">Test your app in real-time as you build it, ensuring everything works perfectly before going live. Make adjustments on the fly without any downtime.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core4.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core4.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">Built-In Integrations</h5>
                                            <p className="card-text">Seamlessly integrate your GPT app with popular third-party services and platforms like CRM systems, social media, and customer support tools.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core5.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core5.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">One-Click Deployment</h5>
                                            <p className="card-text">With just a single click, you can deploy your chatbot to your desired channels or platforms,</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 my-1 my-md-2 px-2" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="icon">
                                             <img className="overlay" src="/images/customMarketing/core6.svg" alt="icon" /> 
                                                <img src="/images/customMarketing/core6.svg" alt="icon" />
                                            </div>
                                            <h5 className="heading">Visual Customization</h5>
                                            <p className="card-text"> Easily customize the look and feel of your app with our visual design tools. Adjust colors, fonts, layouts, and more to match your brand identity.</p>
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

export default CoreFeatures
