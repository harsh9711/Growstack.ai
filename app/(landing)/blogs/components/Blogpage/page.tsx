import React from 'react'
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
import HeroSection from '../HeroSection';
import { ContentBox } from '../ContentBox';
import Image from 'next/image';
import { blogs } from '../../blogs';
import Link from 'next/link';
const Blogpage = () => {
  return (
    <div className="flex flex-col">
    <div className="relative z-40">
      <Navbar
        logoUrl="/white.png"
        logoAlt="Custom Logo"
        backgroundColor="white"
      />
    </div>
    <HeroSection
      title="Privacy policy"
      description=" Your privacy matters to us. Review how we collect, use, and protect your personal information."
      lastUpdatedDate="12-09-2024"
    />
    <div className='mt-20 '><ContentBox/></div>
    <div className='p-4 sm:p-0 max-w-[1240px] mt-20 sm:mt-40 items-center justify-center mx-auto'>
        <h1 className="text-3xl font-semibold">Related articles</h1>
        {blogs.map((item, index) => (
         <Link href={"blogs/components/Blogpage"} >
          <div
            key={index} 
          
            className=" mt-10 space-y-4 flex sm:flex-row flex-col gap-10 items-center shadow-box-sm !bg-white rounded-3xl border border-[#E8E8E8]"
          >
            <div className="relative w-full flex justify-center items-center">
              <Image
                src={item.background_poster}
                alt="blog"
                height={1000}
                width={1000}
                className="w-full rounded-l-3xl"
              />
              <div className="absolute inset-10 flex justify-center items-center">
                <Image
                  src={item.banner_img}
                  alt="blog"
                  height={520}
                  width={520}
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row justify-between gap-y-4 gap-x-3">
              <div className="space-y-6">
                <div
                  className={`py-3 px-5 font-semibold text-[14px] rounded-full max-w-fit`}
                  style={{ backgroundColor: item.tag.theme_color }}
                >
                  {item.tag.tage_title}
                </div>
                <h1 className="text-3xl leading-normal font-semibold bg-gradient-to-b from-black to-black/30 bg-clip-text text-transparent">
                  {item.title}
                </h1>
                <p className="leading-relaxed max-w-5xl">{item.description}</p>
                <div className="flex gap-2 items-center">
                  <Image
                    src={item.author.profile_img}
                    alt=""
                    width={1000}
                    height={1000}
                    className="w-[60px] h-[60px] object-cover rounded-full"
                  />
                  <div>
                    <h1 className="font-semibold">{item.author.names}</h1>
                    <p className="text-sm text-[#041D34] text-opacity-50">
                      {item.author.date_posted}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end"></div>
            </div>
          </div></Link>
        ))}
      </div>
  <div>
  </div>
    <Footer />
  </div>
  )
}

export default Blogpage