import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./CraftBrand.scss";
function CraftBrand() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="craftBrand">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">Efficiency unleashed</span>
            <h3 className="heading">
              <span>Instantly craft, brand, and launch </span> <br />
              your custom AI chat
            </h3>
          </div>
          <div className="appraoch_support_content">
            <ul>
              <li>
                <div
                  className="imgBlock"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <img
                    src="/images_growstack/customMarketing/craft1.svg"
                    alt="craft"
                  />
                </div>
                <section
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <h3>Create your AI chat</h3>
                  <h5 className="heading">Train on your data</h5>
                  <p>
                    Quickly upload files and websites to create a custom AI
                    chat. No coding required.
                  </p>
                </section>
              </li>
              <li>
                <div
                  className="imgBlock"
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <img
                    src="/images_growstack/customMarketing/craft2.svg"
                    alt="craft"
                  />
                </div>
                <section
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <h3>Customize your chat</h3>
                  <h5 className="heading">Personalize and configure</h5>
                  <p>
                    Add details to tailor your AI chat's personality and
                    functionality to your needs.
                  </p>
                </section>
              </li>
              <li>
                <div
                  className="imgBlock"
                  data-aos="fade-right"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <img
                    src="/images_growstack/customMarketing/craft3.png"
                    alt="craft"
                  />
                </div>
                <section
                  data-aos="fade-left"
                  data-aos-easing="ease-in-sine"
                  data-aos-duration="1000"
                >
                  <h3>Launch and share</h3>
                  <h5 className="heading">Deploy with one click</h5>
                  <p>
                    Easily share your AI chat with friends, embed it on your
                    website.
                  </p>
                </section>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CraftBrand;
