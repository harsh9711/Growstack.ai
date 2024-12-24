import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Banner.scss";
import { GoArrowRight } from "react-icons/go";
import { ArrowRight } from "lucide-react";

const Banner: React.FC = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="solMarketingBanner">
        <div className="container">
          <div className="flex flex-row gap-10">
            <div className="">
              <div className="bannerContent">
                <span className="user">Growstack for MARKETING Team</span>
                <h2 className="solsheading">
                  <span>AI Marketing and Sales Apps</span> <br /> with GrowStack{" "}
                  <img
                    src="/images_growstack/solutions/curveArrow.svg"
                    alt="arrow"
                  />
                </h2>
                <p className="font-medium">
                  Streamline your process, enahnce your campaigns and maximize
                  your results with All-in-One AI powered Marketing solutions.
                </p>

                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row  mt-8 gap-8 group text-[12px] 2xl:text-[18px]"
                >
                  <Link href="/auth/register" className="sheen">
                    {" "}
                    <button className="bg-[#2DA771] font-medium flex items-center gap-2 text-white 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                      Get a free trial <ArrowRight className="text-white " />
                    </button>
                  </Link>
                  <Link href="/demo" className="no-underline">
                    {" "}
                    <button className="border border-black flex items-center gap-2 text-black hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                      Get a demo
                      <ArrowRight className="text-black" />
                    </button>{" "}
                  </Link>
                </div>

                <div className="sale"></div>
                {/* <div className="store">
                  <Link href="/register">
                    <img
                      src="/images_growstack/banner/playStore.svg"
                      alt="banner"
                    />
                  </Link>
                  <Link href="/register">
                    <img
                      src="/images_growstack/banner/apple.svg"
                      alt="banner"
                    />
                  </Link>
                </div> */}
              </div>
            </div>
            <div>
              <div className="solMarketingSideImg">
                <img
                  src="/images_growstack/solutions/marketingBanner.svg"
                  alt="banner"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Banner;
