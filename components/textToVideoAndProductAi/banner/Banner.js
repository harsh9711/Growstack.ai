import React from "react";
import "./Banner.scss";
import "../../../app/layout.scss";
import Link from "next/link";

function Banner() {
  return (
    <React.Fragment>
      <div className="textbanner">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-5/12">
              <div className="bannerContent">
                <span className="user">Feature</span>
                <h2 className="vtitle">
                  {" "}
                  <span>Text to avatar &</span> <br />
                  AI backdrop
                </h2>
                <p>
                  Our innovative AI features seamlessly convert your written
                  text into dynamic, engaging videos. Whether you're a marketer,
                  educator, blogger, or business owner, our tool helps you bring
                  your words to life, enhancing your communication and
                  engagement with your audience.
                </p>

                <div className="btns reverse">
                  <Link href="/auth/register" className="sheen">
                    Get a free trial{" "}
                    <svg
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                  <Link href="/demo" className="no-underline">
                    {" "}
                    Get a demo{" "}
                    <svg
                      width="21"
                      height="16"
                      viewBox="0 0 21 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5061 8.70711C20.8966 8.31658 20.8966 7.68342 20.5061 7.29289L14.1421 0.928932C13.7516 0.538408 13.1184 0.538408 12.7279 0.928932C12.3374 1.31946 12.3374 1.95262 12.7279 2.34315L18.3848 8L12.7279 13.6569C12.3374 14.0474 12.3374 14.6805 12.7279 15.0711C13.1184 15.4616 13.7516 15.4616 14.1421 15.0711L20.5061 8.70711ZM0 9L19.799 9V7L0 7L0 9Z"
                        fill="#fff"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-7/12">
              <img
                src="images_growstack/textVideo/tool_banner 1.svg"
                className="w-100"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Banner;
