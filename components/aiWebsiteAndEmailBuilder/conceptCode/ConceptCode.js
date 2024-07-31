import Link from 'next/link'
import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './ConceptCode.scss'
function ConceptCode() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="conceptCode">
        <div className="content">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6" data-aos="fade-right"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <div className="image">
                            <img src="/images_growstack/emailBuilder/code.svg" alt="conceptCode" />
                        </div>
                    </div>
                    <div className="col-md-6" data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                        <div className="text">
                            <h3>From Concept to Code: Your Vision, Our Creation</h3>
                            <p>Choose the type of website you want and simply describe what you need. Let AI craft a unique website for you with relevant images and bespoke content. Use our powerful AI tool to fine-tune your website until you're ready to hit 'Go Live'.</p>
                            <div className="btns cbtn">
                            <Link href="/register" className='sheen'>Get Started <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z" fill="black"/>
                            </svg></Link>
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

export default ConceptCode
