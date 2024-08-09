"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import RepeatText from "../../midmarketenterprise/components/RepeatText";

const HeroSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
         <section className="px-36 ">
        <div className="relative flex items-center w-full h-full   pt-32 pb-52  bg-gradient-to-b from-[#ffffff]/30 to-[#61C453]/20 "  data-aos="fade-up">
          <div className="w-full h-full mx-auto flex flex-col  justify-center items-center max-h-[1110px] max-w-[1774px] ">
            <div className="flex flex-col items-center justify-center mx-auto w-full">
              <div className=" w-full gap-y-4 flex flex-col items-center justify-center mx-auto"data-aos="zoom-in">
                <div className=" text-[#034737] shadow-lg shadow-gradient-to-b from-[#000000]/70 to-[#000000]/30  border whitespace-nowrap py-2 px-4 flex items-center gap-3 text-[12px] rounded-full tracking-widest  font-semibold uppercase w-full max-w-[303px] ">
                  Growstack for large enterprises
                </div>

                <div className="  items-center flex flex-col gap-y-4 justify-center  mx-auto ">
                  <h1 className="text-[56px]  leading-12 flex flex-col  items-center justify-center text-[#14171B] bg-clip-text ">
                    <span className="font-semibold text-center">
                    Maximize efficiency 
                    </span>
                    <span className="font-light text-center">
                    with all-in-one AI marketing

                    </span>
                  </h1>

                  <p className="text-[18px]  items-center justify-center text-center max-w-[819px] leading-loose">
                  Growstack's all-in-one AI marketing platform is designed for small businesses facing tight budgets and limited manpower. Our suite of AI-powered tools automates content creation, optimizes marketing workflows, and enhances customer interactions, enabling small businesses to achieve significant marketing efficiency and drive growth.
                  </p>
                  <div className="relative flex flex-row items-end gap-x-20" data-aos="fade-up" data-aos-delay="200">
              <Image
                src="/solutions/heropage3rd/hero1.png"
                width={1951}
                height={448}
                alt="img"
                className="w-[350px] h-[350px]"
              />
              
            
           <div className="flex flex-col gap-y-24 mt-4 items-center justify-center ">
                    <div className="flex flex-row gap-8 ">
                      <button className="bg-white text-[#034737] font-medium flex items-center gap-2 py-4 px-7 rounded-xl hover:font-bold shadow-md shadow-[#00000025]" data-aos="fade-right">
                        Free trial <ArrowRight className="text-[#034737]" />
                      </button>
                      <button className="border border-[#14171B] flex items-center gap-2 text-[#14171B] hover:font-bold font-medium py-4 px-7 rounded-xl shadow-md shadow-[#00000025]"  data-aos="fade-left">
                        See demo <ArrowRight className="text-[#14171B]" />
                      </button>
                    </div>
                    <div className="relative flex flex-row gap-x-20" data-aos="fade-up">
            
                 <Image
                src="/solutions/heropage3rd/hero2.png"
                width={1951}
                height={448}
                alt="img"
                className="w-[300px] h-[200px]"
              />   <Image
              src="/solutions/heropage3rd/hero3.png"
              width={1951}
              height={448}
              alt="img"
              className="w-[300px] h-[200px]"
            />
            
            </div>
                  </div>     <Image
                src="/solutions/heropage3rd/hero4.png"
                width={1951}
                height={448}
                alt="img"
                className="w-[350px] h-[350px]" data-aos="fade-up"
              /></div>  
                </div>
              </div>
            </div>
       
          </div>
        </div>
      </section>
      <div className="flex flex-row w-full max-w-[1660px] mx-auto">
                    <Image
                        src="/playstore.svg"
                        alt="image"
                        width={247}
                        height={73}
                      className="relative -top-24" data-aos="fade-up"
                      />
                 
                   <div className="bg-black z-[40] relative -top-24 max-w-[1030px] max-h-[244px]  py-4 h-full w-full rounded-[20px] items-center justify-center mx-auto text-white" data-aos="fade-up">
        <h2 className="font-bold text-[28px] mt-2 text-center">
        Growstack's Solutions for 
        </h2>
        <h2 className="font-light text-[28px] text-center ">
        Small Business Success
        </h2>

        <p className="mt-4 text-white text-[18px] max-w-[612px] w-full items-center font-light justify-center mx-auto text-center">
        Discover how Growstack's AI-driven tools streamline your tasks and drive success for small businesses
        </p>
      </div>    
                    <button className="flex items-center gap-2 ">
                      <Image
                        src="/apple.png"
                        alt="image"
                        width={220}
                        height={74}
                        className="relative -top-24" data-aos="fade-up"
                      />
                    </button></div>
      <div className="absolute top-[1210px]">
        <RepeatText />
      </div>
    </>
  );
};

export default HeroSection;
