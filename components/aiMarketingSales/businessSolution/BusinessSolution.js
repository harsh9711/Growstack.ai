import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./BusinessSolution.scss";
import VideoBanner from "@/components/videoBanner/VideoBanner";
function BusinessSolution() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="businessSolution">
        <div className="wrapper">
          <div className="container">
            <div className="flex flex-col items-center mx-auto justify-center mb-3 mb-md-4">
              <div
                className="items-center justify-center "
                data-aos="fade-right"
                data-aos-easing="ease-in-sine"
                data-aos-duration="1000"
              >
                <span className="user items-center justify-center mx-auto translate-x-60 ">
                  Benefits
                </span>
                <h3 className="heading mt-2 mb-2 mb-md-0">
                  Best solutions <span>for your business</span>
                </h3>
              </div>
              {/* <div data-aos="fade-left"
                            data-aos-easing="ease-in-sine"
                            data-aos-duration="1000">
                                <p>Lorem ipsum dolor sit amet consectetur. Imperdiet sodales hac at curabitur.</p>
                            </div> */}
            </div>
            <div className="row">
              <div className="cardsBlock">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div
                    className=""
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1000"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="icon">
                          <img
                            src="/images_growstack/aiMarket/choose1.svg"
                            alt="icon"
                          />
                        </div>
                        <h5 className="card-title">Improved content quality</h5>
                        <p className="card-text">
                          AI ensures that content is consistent in tone, style,
                          and accuracy, adhering to brand guidelines and
                          reducing the likelihood of errors.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1000"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="icon">
                          <img
                            src="/images_growstack/aiMarket/choose2.svg"
                            alt="icon"
                          />
                        </div>
                        <h5 className="card-title">Cost-effectiveness</h5>
                        <p className="card-text">
                          By automating the content creation process, AI writing
                          tools can significantly reduce the need for extensive
                          human labor, lowering costs associated with hiring
                          writers, editors, and proofreaders.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    data-aos="fade-up"
                    data-aos-easing="ease-in-sine"
                    data-aos-duration="1000"
                  >
                    <div className="card">
                      <div className="card-body">
                        <div className="icon">
                          <img
                            src="/images_growstack/aiMarket/choose3.svg"
                            alt="icon"
                          />
                        </div>
                        <h5 className="card-title">
                          Innovation and creativity
                        </h5>
                        <p className="card-text">
                          AI tools can assist in brainstorming and generating
                          new ideas for content, helping writers overcome
                          creative blocks and explore new topics and angles.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <VideoBanner /> */}
      </div>
    </React.Fragment>
  );
}

export default BusinessSolution;
