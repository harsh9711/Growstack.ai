import React,{useEffect} from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import './PoweredBy.scss'
import Link from 'next/link'

function PoweredBy() {
  useEffect(() => {
    AOS.init();
}, []);
  return (
    <React.Fragment>
      <div className="poweredBy">
        <div className="container">
           <div className="title" data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
           <span className="user">
                Powered by
            </span>
            <h2 className="heading"><span>We are</span> model agnostic</h2>
           </div>
           <div className="images" data-aos="fade-down"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000">
            <Link href="/register"><img src="/images/home/poweredBy1.svg" alt="poweredBy" /></Link>
            <Link href="/register"><img src="/images/home/poweredBy7.svg" alt="poweredBy" /></Link>
            <Link href="/register"><img src="/images/home/poweredBy2.svg" alt="poweredBy" /></Link>
            <Link href="/register"><img src="/images/home/poweredBy3.svg" alt="poweredBy" /></Link>
            <Link href="/register"><img src="/images/home/poweredBy4.svg" alt="poweredBy" /></Link>
            <Link href="/register"><img src="/images/home/poweredBy5.svg" alt="poweredBy" /></Link>
           </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PoweredBy
