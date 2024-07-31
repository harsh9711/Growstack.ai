import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Editing.scss'
function Editing() {
    useEffect(() => {
        AOS.init();
    }, []); 
    return (
        <React.Fragment>
            <div className="editing">
                <div className="container">
                    <div className="row align-items-end mb-3 mb-md-5" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <div className="col-md-5">
                            <span className="user">Core Features</span>
                            <h3 className="heading mt-2 mb-2 mb-md-0"><span>Beyond background </span> editing</h3>
                        </div>
                        <div className="col-md-7">
                            <p>Achieve polished and compelling product imagery that captivates your audience and showcases your brand's excellence with expert background editing that goes beyond ordinary standards.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit1.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Background remover</h4>
                                    <p>Cutout Images</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit2.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Magic eraser</h4>
                                    <p>remove objects</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit3.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Batch edit</h4>
                                    <p>Edit multiple photos</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit4.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Colorize</h4>
                                    <p>Colorize your image</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit5.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Upscaler</h4>
                                    <p>Increase resolution</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4" data-aos="fade-up"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                            <div className="d-flex align-items-center block">
                                <div className="flex-shrink-0">
                                    <img src="/images/textVideo/edit6.svg" alt="edit" />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4>Photo photos maker</h4>
                                    <p>Male a profile photo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Editing
