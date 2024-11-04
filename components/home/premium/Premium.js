import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Premium.scss";

function Premium() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="premium bg-[url('/computergreen.svg')] bg-cover bg-no-repeat">
        <div className="container ">
          <div className="flex flex-col sm:flex-row items-center ">
            <div
              className="w-full sm:w-5/12"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <img src="/images_growstack/home/premium.svg" alt="premium" />
            </div>
            <div
              className="w-full sm:w-7/12"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="content">
                <span className="user"><h2 className="text-white">Security</h2></span>
                <h3>Security & data privacy of the highest degree </h3>
                <p className="text-white">
                  We collaborate with all major LLMs, ensuring choice and
                  flexibility while making sure your contact data is 100% secure
                  and cannot be used for anyone else's purposes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Premium;
