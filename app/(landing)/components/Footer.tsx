"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../../components/footer/Footer.scss";
import Link from "next/link";
import { ALL_ROUTES } from "@/utils/constant";

function Footer() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
          <div
            className="demo"
            data-aos="fade-up"
            data-aos-easing="ease-in-sine"
            data-aos-duration="1000"
          >
            <h3>Ready to see a personalized demo?</h3>
            <div className="btns fbtn">
              <Link href="/demo" className="sheen">
                Get Demo
              </Link>
              <Link href="/auth/register" className="sheen">
                Get 7-day free trial
              </Link>
            </div>
          </div>
        </div>
        <div className="innerBlock">
          <div className="container">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
              <div className="">
                <div className="footerLogo">
                  <img src="/images_growstack/footer/logo.svg" alt="logo" />
                </div>
              </div>
              <div className="">
                <h4>Company</h4>
                <ul>
                  {/* <li>
                                        <Link href='/company'>About us</Link>
                                    </li> */}
                  {/* <li>
                                        <Link href='/pricing'>Pricing</Link>
                                    </li> */}
                  <li>
                    <Link href="/faq">FAQs</Link>
                  </li>
                  <li>
                    <Link href="/contact">Contact us</Link>
                  </li>
                  <li>
                    <Link href="/demo">Request Demo</Link>
                  </li>
                  <li>
                    {/* <Link href="/auth/register">Get the App</Link> */}
                  </li>
                  <li>{/* <Link href="/auth/register">Blog</Link> */}</li>
                  <li>{/* <Link href="/auth/register">FAQ</Link> */}</li>
                </ul>
              </div>
              <div className="">
                <h4>Features</h4>
                <ul>
                  <li>
                    <Link href="/ai-marketing-and-sales-app">
                      AI marketing and sales apps
                    </Link>
                  </li>
                  <li>
                    <Link href="/text-to-avatar-and-ai-backdrop">
                      Text to avatar and AI backdrop
                    </Link>
                  </li>
                  <li>
                    <Link href="/marketing-and-sales-assistant">
                      Marketing and sales assistants
                    </Link>
                  </li>
                  <li>
                    {/* <Link href='/ai-website-and-email-builder'>AI Website landing page and email Builder</Link> */}
                  </li>
                  <li>
                    <Link href="/custom-marketing-gpt-apps">Custom GPT</Link>
                  </li>
                  <li>
                    <Link href="/social-planner-hub">Social planner hub</Link>
                  </li>
                </ul>
              </div>
              <div className="">
                <h4>Support</h4>
                <ul>
                  <li>{/* <Link href="/auth/register">Support</Link> */}</li>
                  <li>
                    <Link href="/terms-of-service">Terms of service</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy policy</Link>
                  </li>
                  <li>
                    <Link href="/return-policy">Refund & return policy</Link>
                  </li>
                  <li>{/* <Link href="/auth/register">Community</Link> */}</li>
                </ul>
              </div>
              <div className="">
                <h4>Newsletter</h4>
                <p>Subscribe to our newsletter</p>
                <form action="/" method="post">
                  <div className="input-group">
                    <div className="flex gap-1 w-10 sm:w-40 md:w-20 ">
                      <img
                        src="/images_growstack/footer/letter.svg"
                        alt="letter"
                      />
                      <input
                        type="email"
                        name="email"
                        className="text-[14px] md:text-[10px] xl:text-[14px]"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className="input-group-append ">
                      <button className="sheen" type="submit">
                        <img
                          src="/images_growstack/footer/newsletter.svg"
                          alt="newsletter"
                        />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="copyRight">
              <p>Copyright © 2024 Growstack</p>
              <div className="social">
                <Link href="/auth/register">
                  <img
                    src="/images_growstack/footer/youtube.svg"
                    alt="youtube"
                  />
                </Link>
                <Link href="/auth/register">
                  <img
                    src="/images_growstack/footer/facebook.svg"
                    alt="facebook"
                  />
                </Link>
                <Link href="/auth/register">
                  <img
                    src="/images_growstack/footer/twitter.svg"
                    alt="twitter"
                  />
                </Link>
                <Link href="/auth/register">
                  <img
                    src="/images_growstack/footer/linkedin.svg"
                    alt="linkedin"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Footer;
