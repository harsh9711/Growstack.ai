import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Faqs.scss";
import dynamic from "next/dynamic";

const CustomAccordion = dynamic(() => import("./CustomAccordion"), {
  ssr: false,
});

function Faqs() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="faqs">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">FAQ</span>
            <h3 className="heading">
              <span>Quick answers</span> on GrowStack
            </h3>
          </div>
          <CustomAccordion />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Faqs;
