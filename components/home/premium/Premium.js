import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Premium() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="bg-[url('/computergreen.svg')] rounded-2xl bg-cover bg-no-repeat py-4 sm:py-10 bg-white ">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center">
            <div
              className="w-full sm:w-5/12"
              data-aos="fade-right"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <img
                src="/images_growstack/home/premium.svg"
                alt="premium"
                className="w-full sm:mb-0 mb-7"
              />
            </div>
            <div
              className="w-full sm:w-7/12"
              data-aos="fade-left"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="flex flex-col items-center sm:items-start sm:text-start text-center max-w-[700px]">
                <div
                  className="w-full rounded-2xl flex items-start justify-center max-w-fit px-4 py-2  bg-[#FFFFFF14]"
                  data-aos="fade-in"
                >
                  <h2 className="text-center text-white leading-snug capitalize text-[12px] sm:text-[16px] font-extrabold">
                    Security
                  </h2>
                </div>

                <h3 className="text-[16px] sm:text-[28px] text-white font-bold my-5 leading-tight ">
                  Security & data privacy of the highest degree
                </h3>
                <p className="text-white m-0 sm:text-[16px] text-[12px] ">
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
