import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Efficiency.scss'
function Efficiency() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="efficiency">
        <div className="container">
                    <span className="user">Efficiency unleashed</span>
            <div className="row align-items-center">
                <div className="col-md-12 col-lg-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <h3 className="heading"><span>Tailor-made custom GPT for</span> all your business interactions</h3>
                </div>
                <div className="col-md-12 col-lg-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <p>You don’t need to integrate dozens of different services, since GrowStack has it all</p>
                </div>
            </div>
           <div className="borderline">
           <div className="card">
               <div className="row">
                 <div className="col-md-6">
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer1.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Chatbot</h4>
                      <p>Multi-channel and visually built</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer2.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Large language models</h4>
                      <p>GPT, Gemini, PaLM, Llama, and others</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer3.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Productivity</h4>
                      <p>Effortlessly design anything</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer3.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Educations</h4>
                      <p>Fastest way to learn anything</p>
                    </div>
                </div>
                </div>
                <div className="col-md-6">
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer4.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Scenarios</h4>
                      <p>For complex interactions and SOPs</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer6.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Writing</h4>
                      <p>Write tailored and engaging content</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer7.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Research & Analysis</h4>
                      <p>Do hours worth of research in minutes</p>
                    </div>
                </div>
                <div className="d-flex align-items-center block" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="flex-shrink-0">
                      <img src="/images/customMarketing/tailer8.svg" alt="tailer1" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h4>Programming</h4>
                      <p>Write code, debug, test and run</p>
                    </div>
                </div>
                </div>
               </div>
            </div>
           </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Efficiency
