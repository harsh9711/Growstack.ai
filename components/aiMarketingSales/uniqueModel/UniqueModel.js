import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./UniqueModel.scss";
import Image from "next/image";
function UniqueModel() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="uniqueModel">
        <div className="container">
          <div
            className="title"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="user">
              THE WORLD'S MOST ADVANCED AI LANGUAGE MODEL
            </span>
            <h3>
              Write unique and human-like <span>copy in seconds</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white pb-3">
                <Image
                  src="/images_growstack/aiMarket/model1.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <p className="heading text-2xl my-0">
                  <span>Powered by </span>
                  AI
                </p>
                <p>
                  The GPT-3 AI language model is nothing like you've seen
                  before: natural, unique and creative.
                </p>
              </div>
            </div>
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white">
                <Image
                  src="/images_growstack/aiMarket/model2.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <p className="heading text-2xl my-0">
                  <span>Powerful </span>
                  settings
                </p>
                <p>
                  Adjust the creativity level or the tone of voice to generate
                  the perfect copy for your business.
                </p>
              </div>
            </div>
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white">
                <Image
                  src="/images_growstack/aiMarket/model3.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <h5 className="heading text-2xl my-0">
                  <span>Optimized for </span>
                  conversions
                </h5>
                <p>
                  Trained with conversions in mind to write content that
                  captures attention and converts.
                </p>
              </div>
            </div>
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white">
                <Image
                  src="/images_growstack/aiMarket/model4.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <h5 className="heading text-2xl my-0">
                  <span>50+ Available </span>
                  tools
                </h5>
                <p>
                  Generate all types of copy or content in seconds with the
                  ultimate creative writing tool.
                </p>
              </div>
            </div>
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white">
                <Image
                  src="/images_growstack/aiMarket/model5.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <h5 className="heading text-2xl my-0">
                  <span>Grammar </span>
                  check
                </h5>
                <p>
                  Don't let poor grammar hurt your visitor's trust, GrowStack
                  can check and rewrite your content.
                </p>
              </div>
            </div>
            <div
              className=" my-2 my-md-2 px-2"
              data-aos="fade-up"
              data-aos-easing="ease-in-sine"
              data-aos-duration="1000"
            >
              <div className="card bg-white">
                <Image
                  src="/images_growstack/aiMarket/model6.svg"
                  width={100}
                  height={100}
                  alt="icon"
                />
                <h5 className="heading text-2xl my-0">
                  <span>Sentence </span>
                  rewriter
                </h5>
                <p>
                  AI understands your sentence and rewrites it in a completely
                  unique and smart way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default UniqueModel;
