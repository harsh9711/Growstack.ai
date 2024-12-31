"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <React.Fragment>
      <div className="bg-[#FAFBFC]  border overflow-hidden pt-12  rounded-t-[40px]">
        <div className=" w-full md:flex flex-col hidden mx-auto px-6">
          <div className="bg-[url('/footer.svg')] bg-cover bg-no-repeat fade-in-background  mx-auto text-white sm:rounded-tr-[60px] rounded-tr-[80px] pt-12 px-6 w-full max-w-[1650px] ">
            <div className="flex flex-col max-w-[1245px] mx-auto items-start space-y-12 mb-12">
              <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-x-10 xl:gap-x-32">
                <div className="flex sm:items-start items-center  justify-center sm:justify-between mb-6">
                  <h2 className="text-2xl font-bold">Company</h2>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-6">Information</h4>
                  <ul className="text-sm font-light space-y-2">
                    <li>
                      <Link href="/contact">Pricing</Link>
                    </li>
                    <li>
                      <Link href="/blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link href="/faq">FAQs</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-6">Support</h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/return-policy">Refund & Return Policy</Link>
                    </li>
                    <li>
                      <Link href="/terms-of-service">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
                <div className="hidden">
                  <h4 className="font-bold text-lg mb-6">Support</h4>
                  <ul className="text-sm space-y-2">
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                    <li>
                      <Link href="/return-policy">Refund & Return Policy</Link>
                    </li>
                    <li>
                      <Link href="/terms-of-service">Terms & Conditions</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Image
              src="/biglogo.svg"
              width={1448}
              height={270}
              alt="big"
              className="mx-auto mb-20"
            />
            <div className="w-full mx-auto mt-6 border-t border-white max-w-[1345px] py-10  text-white text-sm">
              <div className="text-center flex flex-col  gap-4 sm:flex-row justify-between items-center w-full">
                <p className="text-white">Copyright © 2024 Growstack</p>
                <div className="grid sm:grid-cols-4 grid-cols-2 justify-center gap-4">
                  {[
                    {
                      href: "https://x.com/Growstackai",
                      src: "/images_growstack/footer/x.svg",
                      alt: "x",
                    },
                    {
                      href: "https://www.facebook.com/profile.php?id=61564942453752",
                      src: "/images_growstack/footer/facebook.svg",
                      alt: "facebook",
                    },
                    {
                      href: "https://www.linkedin.com/company/growstack-inc",
                      src: "/images_growstack/footer/linkedin.svg",
                      alt: "linkedin",
                    },
                    {
                      href: "https://www.instagram.com/growstack.ai",
                      src: "/images_growstack/footer/instagram.svg",
                      alt: "instagram",
                    },
                  ].map(({ href, src, alt }, index) => (
                    <Link
                      key={index}
                      href={href}
                      target="_blank"
                      className="flex items-center justify-center border rounded-full w-12 h-12 p-2"
                    >
                      <Image src={src} alt={alt} width={24} height={24} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" w-full mx-auto md:hidden flex flex-col px-6">
          <div
            className="flex  max-w-[1245px] mx-auto w-full gap-y-8 flex-wrap items-center justify-center mb-12"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <h3 className="text-[#2DA771] text-2xl sm:text-3xl sm:text-start text-center font-semibold mb-4 sm:mb-0 max-w-[450px]">
              Ready to see a personalized demo?
            </h3>
            <div className="flex gap-4">
              <Link
                href="/demo"
                className="bg-white px-4 py-2 rounded-lg text-lg transition-colors duration-300 text-[#2DA771] hover:bg-primary-light-green hover:text-white"
              >
                Get a demo
              </Link>
              <Link
                href="/auth/register"
                className="border border-primary-light-green px-4 py-2 rounded-lg text-lg transition-colors duration-300 text-[#2DA771] hover:bg-primary-light-green hover:text-white"
              >
                Get a 7-day free trial
              </Link>
            </div>
          </div>

          <div className="bg-[url('/footer.svg')]  bg-cover bg-no-repeat fade-in-background  mx-auto text-white sm:rounded-tr-[60px] rounded-tr-[80px] pt-12 px-6 w-full max-w-[1650px] ">
            <div className="flex flex-row max-w-[1245px] mx-auto items-start space-y-12 mb-12">
              <div className="w-full">
                <div className="flex sm:items-start items-center  justify-center sm:justify-between mb-6">
                  <h2 className="text-2xl font-bold">Company</h2>
                </div>
                <div className="grid gap-y-8 gap-x-12 grid-cols-2 sm:grid-cols-3">
                  <div>
                    <h4 className="font-bold text-lg mb-6">Information</h4>
                    <ul className="text-sm font-light space-y-2">
                      <li>
                        <Link href="/contact">Pricing</Link>
                      </li>
                      <li>
                        <Link href="/blogs">Blogs</Link>
                      </li>
                      <li>
                        <Link href="/faq">FAQs</Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-6">Support</h4>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link href="/return-policy">
                          Refund & Return Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-of-service">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="hidden">
                    <h4 className="font-bold text-lg mb-6">Support</h4>
                    <ul className="text-sm space-y-2">
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link href="/return-policy">
                          Refund & Return Policy
                        </Link>
                      </li>
                      <li>
                        <Link href="/terms-of-service">Terms & Conditions</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <Image
              src="/biglogo.svg"
              width={1448}
              height={270}
              alt="big"
              className="mx-auto sm:mb-20"
            />
            <div className="w-full mx-auto mt-6 border-t border-white max-w-[1345px] py-8 sm:py-10  text-white text-sm">
              <div className="text-center flex flex-col  gap-4 sm:flex-row justify-between items-center w-full">
                <p className="text-white">Copyright © 2024 Growstack</p>
                <div className="grid grid-cols-4  mt-2 justify-center gap-4">
                  {[
                    {
                      href: "https://x.com/Growstackai",
                      src: "/images_growstack/footer/x.svg",
                      alt: "x",
                    },
                    {
                      href: "https://www.facebook.com/profile.php?id=61564942453752",
                      src: "/images_growstack/footer/facebook.svg",
                      alt: "facebook",
                    },
                    {
                      href: "https://www.linkedin.com/company/growstack-inc",
                      src: "/images_growstack/footer/linkedin.svg",
                      alt: "linkedin",
                    },
                    {
                      href: "https://www.instagram.com/growstack.ai",
                      src: "/images_growstack/footer/instagram.svg",
                      alt: "instagram",
                    },
                  ].map(({ href, src, alt }, index) => (
                    <Link
                      key={index}
                      href={href}
                      target="_blank"
                      className="flex items-center justify-center border rounded-full w-12 h-12 p-2"
                    >
                      <Image src={src} alt={alt} width={24} height={24} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
