import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './Interface.scss'
import Link from 'next/link'
function Interface() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="interface">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-6 col-lg-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="content">
                    <span className="user">Smooth interface</span>
                    <h3>Chat with your AI assistant</h3>
                    <p>Lorem ipsum dolor sit amet consectetur. Massa risus ut non orci aliquam. Sit pulvinar placerat turpis gravida donec varius laoreet dolor lorem.</p>
                    <Link href="/register" className='sheen'>Explore <img src="/images_growstack/home/arrow.svg" alt="arrow" /></Link>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                    <div className="interFaceImg">
                        <img src="/images_growstack/salesMarketing/interface.png" alt="interface" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Interface
