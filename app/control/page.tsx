"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

function Cta2() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="py-24 bg-primary-green relative overflow-hidden">
      <div className="container flex w-full flex-row  justify-center sm:justify-between mx-auto">
        <div className="flex flex-col sm:flex-row items-center">
          <div
            className="w-full flex items-center  flex-col sm:items-start sm:w-1/2"
            data-aos="fade-right"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <span className="rounded-full  px-4 font-bold sm:text-[12px] text-[10px] py-2  bg-[#FFFFFF14] text-white   leading-tight">
              TAKE CONTROL
            </span>
            <h3 className="text-white  sm:text-start text-center text-3xl sm:text-4xl font-bold my-5 leading-8">
              On-The-Go with our mobile app{" "}
              <span className="font-medium">
                integrated CRM platform built for success
              </span>
            </h3>
            <p className="text-white sm:text-start text-center">
              Stay productive anywhere with real-time control and insights,
              effortlessly managing your business with our intuitive mobile app.
            </p>
            <Link href="/auth/register">
              <h2 className="mt-6 inline-flex items-center bg-transparent text-white py-3 px-5 rounded-lg border border-white transition-colors duration-300 hover:bg-white hover:text-green-900">
                Get Started
                <svg
                  className="ml-2"
                  width="21"
                  height="16"
                  viewBox="0 0 21 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                    fill="currentColor"
                  />
                </svg>
              </h2>
            </Link>
          </div>
          <div
            className="w-full absolute right-0 sm:flex hidden sm:w-1/2 "
            data-aos="fade-left"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <img
              className="absolute -right-0 top-2.5 transform -translate-y-1/2 w-[700px] sm:w-[700px] max-w-full"
              src="/images_growstack/home/cta.png"
              alt="cta"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cta2;
