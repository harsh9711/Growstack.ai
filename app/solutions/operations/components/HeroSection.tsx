import React from 'react';
import Image from 'next/image';
import Navbar from "@/components/navbar/Navbar";
import { ArrowRight } from 'lucide-react';

const HeroSection = ({
  logoUrl = '/images/logo.png',
  logoAlt = 'Custom Logo',
  bgGradient = 'bg-[#14171B]',
  title = 'Streamline your business',
  subtitle = 'operations with Growstack',
  description = "Optimize processes and enhance communication with Growstack’s innovative solutions. Empower your team to overcome challenges and drive operational excellence.",
  primaryButtonText = 'Free trial',
  secondaryButtonText = 'See demo',
  playStoreImage = '/play2.png',
  appleStoreImage = '/apple2.png',
  heroImage = '/operationshero.svg',
  heroImageAlt = 'Center Image',
}) => {
  return (
    <section className={`${bgGradient} w-full mb-10 2xl:mb-20 overflow-hidden`}>
      <Navbar logoUrl={logoUrl} logoAlt={logoAlt} backgroundColor="white" />

      <div className="relative flex items-center max-w-[1220px] 2xl:max-w-[1350px] 2xl:p-0 p-4 w-full  h-full justify-center mx-auto">
        <div className="w-full flex flex-row justify-between brightness-110 relative items-center mt-10 mb-10 2xl:mt-32 2xl:mb-4">
          <div className="w-full max-w-[700px] gap-y-4 flex flex-col">
            <div
              data-aos="fade-right"
              data-aos-duration="1200"
              className="bg-white text-black py-2 2xl:px-4 text-center items-center justify-center flex text-[10px] 2xl:text-[12px] rounded-full font-semibold uppercase max-w-[200px] 2xl:max-w-[252px] shadow-lg w-full tracking-widest"
            >
              Growstack for Sales Team
            </div>

            <div className="2xl:max-w-3xl w-full brightness-95">
              <h1
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[26px] xl:text-[48px] w-full leading-normal text-white"
              >
                <span className="font-semibold text-white">{title}</span>
                <br />
                <span className="font-light 2xl:whitespace-nowrap text-white">{subtitle}</span>
              </h1>
              <p
                data-aos="fade-right"
                data-aos-duration="1500"
                className="text-[16px] 2xl:text-[18px] text-white mt-4 w-full max-w-[600px] leading-normal font-light"
              >
                {description}
              </p>

              <div className="flex flex-col gap-20 mt-10">
                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex flex-row gap-8 group text-[12px] 2xl:text-[18px]"
                >
                  <button className="bg-white hover:bg-[#034737] font-medium flex items-center gap-2 text-[#034737] 2xl:py-4 2xl:px-7 rounded-xl py-2 px-2 group-hover:font-bold shadow-md hover:shadow-">
                    {primaryButtonText} <ArrowRight />
                  </button>
                  <button className="border border-white flex items-center gap-2 text-white hover:font-bold font-medium 2xl:py-4 py-2 px-2  2xl:px-7 rounded-xl shadow-md shadow-[#00000025]">
                    {secondaryButtonText} <ArrowRight className="text-white" />
                  </button>
                </div>

                <div
                  data-aos="fade-right"
                  data-aos-duration="1500"
                  className="flex  flex-wrap gap-4"
                >
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image className="w-full h-full" src={playStoreImage} alt="Play Store" width={180} height={400} />
                  </button>
                  <button className="flex items-center gap-2 text-primary-green rounded-xl">
                    <Image className="w-full h-full" src={appleStoreImage} alt="Apple Store" width={180} height={400} />
                  </button>
                </div>
              </div>
            </div>
          </div>
<Image src="/greenarrow.svg" alt="green" width={100} height={100}  className='w-[200px] absolute translate-x-[700px] -translate-y-40'/>
          <div className="2xl:flex mt-10 xl:flex lg:flex md:flex hidden items-end relative w-full justify-end">
            <div
              data-aos="fade-left"
              data-aos-duration="1500"
              className="w-full relative z-0"
            >
              <Image
                className="xl:w-[1500px] w-full 2xl:w-full  2xl:translate-x-40 xl:translate-x-72 h-full"
                src={heroImage}
                alt={heroImageAlt}
                width={842}
                height={463}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
