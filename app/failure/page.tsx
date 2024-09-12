"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

const PricingPage: React.FC = () => {
  const [seconds, setSeconds] = useState(5);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/Payment");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div
          className="relative bg-white xl:max-h-[374px] h-full w-full max-w-[599px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-2xl shadow-lg p-6"
          data-aos="zoom-in"
          data-aos-duration="500"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <Image
              src="/failure.gif"
              width={100}
              height={100}
              alt="Payment Success"
              className="mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold text-green-600">Oh no!</h2>
            <p className="text-lg text-gray-700 mt-2">
              We were unable to process
            </p>
            <div className="mt-6">
              <p className="text-lg text-gray-600">
                Redirecting to dashboard in
              </p>
              <h3 className="text-4xl font-bold text-red-600">
                {seconds} seconds
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
