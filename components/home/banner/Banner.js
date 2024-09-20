import Link from "next/link";
import React from "react";
import "./Banner.scss";
import Circle from "./Circle";

function Banner() {
  return (
    <React.Fragment>
      <div className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="bannerContent">
                <span className="user">Users around the world</span>
                <h2 className="textTitle">
                  <span>Your AI Catalyst for</span> <br /> business success!
                </h2>
                <p>
                  AI is transforming the way we work. GrowStack transforms your business into an innovation powerhouse, driving unmatched productivity and
                  meaningful progress.
                </p>
                <div className="btns btnFlex">
                  <Link href="/auth/register" className="sheen">
                    Free trial{" "}
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                  <Link href="/demo" className="sheen">
                    Get a demo{" "}
                    <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                </div>
                <div className="sale opacity-0">
                  <Link href="/marketing-and-sales-assistant">Marketing & sales assistant</Link>
                  <img src="/images_growstack/banner/tri.svg" alt="banner" />
                </div>
                {/* <div className="store">
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/playStore.svg" alt="banner" />
                  </Link>
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/apple.svg" alt="banner" />
                  </Link>
                </div> */}
              </div>
            </div>
            <div className="col-lg-6 bannerImg">
              <img src="/images_growstack/banner/banner.svg" alt="banner" />
            </div>
          </div>
        </div>
        <div className="circleBlock">
          <Circle />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Banner;
