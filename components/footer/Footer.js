"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Footer.scss";
import Link from "next/link";

function Footer() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <React.Fragment>
      <div className="footer">
        <div className="container">
          <div className="demo" data-aos="fade-up" data-aos-easing="ease-in-sine" data-aos-duration="1000">
            <h3>Ready to see a personalized demo?</h3>
            <div className="btns fbtn">
              <Link href="/auth/register" className="sheen">
                View Demo
              </Link>
              <Link href="/auth/register" className="sheen">
                Get 14-day free trial
              </Link>
            </div>
          </div>
        </div>
        <div className="innerBlock">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-12">
                <div className="footerLogo">
                  <img src="/images_growstack/footer/logo.svg" alt="logo" />
                </div>
              </div>
              <div className="col-lg-2 col-md-6">
                <h4>Company</h4>
                <ul>
                  <li>
                    <Link href="/auth/register">Company</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Pricing</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Get the App</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Blog</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6">
                <h4>Features</h4>
                <ul>
                  <li>
                    <Link href="/auth/register">Features</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Research assistant</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">AI Marketing & Sales Apps</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Imaginate app</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Marketing and sales assistants</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-2 col-md-6">
                <h4>Support</h4>
                <ul>
                  <li>
                    <Link href="/auth/register">Support</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Terms & Condition</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/auth/register">Community</Link>
                  </li>
                </ul>
              </div>
              <div className="col-lg-3 col-md-6">
                <h4>Newsletter</h4>
                <p>Subscribe to our newsletter</p>
                <div className="input-group">
                  <img src="/images_growstack/footer/letter.svg" alt="letter" />
                  <input type="text" className="form-control" placeholder="Enter your email" />
                  <div className="input-group-append">
                    <button className="sheen" type="button">
                      <img src="/images_growstack/footer/newsletter.svg" alt="newsletter" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="copyRight">
              <p>Copyright © 2024 growstack</p>
              <div className="social">
                <Link href="/auth/register">
                  <img src="/images_growstack/footer/youtube.svg" alt="youtube" />
                </Link>
                <Link href="/auth/register">
                  <img src="/images_growstack/footer/facebook.svg" alt="facebook" />
                </Link>
                <Link href="/auth/register">
                  <img src="/images_growstack/footer/twitter.svg" alt="twitter" />
                </Link>
                <Link href="/auth/register">
                  <img src="/images_growstack/footer/linkedin.svg" alt="linkedin" />
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
