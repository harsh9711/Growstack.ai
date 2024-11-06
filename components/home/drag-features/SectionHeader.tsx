import Link from "next/link";
import ArrowRight from "./icons/ArrowRight";
import Image from "next/image";
import "../../../styles/animate.css";
export default function SectionHeader() {
  return (
    <div className="max-w-fit w-full  mx-auto px-5 lg:px-10 2xl:py-6 py-4">
      <div className="lg:flex items-center justify-center space-y-4 md:space-y-8 lg:space-y-0 lg:space-x-5">
        <div className="items-center justify-center">
          <div className="w-full items-center justify-center">
            <h1 className="text-[26px] sm:flex flex-col  text-center text-white xl:text-[32px] 2xl:text-[48px] font-medium ">
              <span className="font-extrabold sm:flex  text-white px-2">
                AI-powered revenue playground
              </span>{" "}
       <span className="items-center justify-center flex flex-row gap-8">    
         <svg
                className="svgclasses 2xl:flex hidden"
                width="150"
                height="150"
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <g className="path-group path-group-1">
                  <path
                    d="M61.6524 11.0078C60.2227 10.8476 56.1524 10.0859 54.5235 8.4687C52.8946 6.8476 52.1446 2.7695 51.9844 1.3398C51.9063 0.57808 51.2539 0 50.4961 0C49.7344 0 49.0859 0.57812 49.0078 1.3398C48.8476 2.7695 48.0859 6.8398 46.4687 8.4687C44.8476 10.0976 40.7695 10.8476 39.3398 11.0078C38.5781 11.0859 38 11.7383 38 12.4961C38 13.2656 38.5781 13.9063 39.3398 13.9844C40.7695 14.1328 44.8398 14.8946 46.4687 16.5235C48.0898 18.1446 48.8476 22.2227 49.0078 23.6524C49.0859 24.4141 49.7383 24.9922 50.4961 24.9922C51.2656 24.9922 51.9063 24.4141 51.9844 23.6524C52.1328 22.2227 52.8946 18.1524 54.5235 16.5235C56.1446 14.9024 60.2227 14.1446 61.6524 13.9844C62.4141 13.9063 62.9922 13.2539 62.9922 12.4961C62.9922 11.7344 62.4141 11.0859 61.6524 11.0078Z"
                    fill="#ffffff"
                  />
                </g>
                <g className="path-group path-group-2">
                  <path
                    d="M46.6532 37.5077C46.5438 37.496 35.5322 36.2577 31.1332 31.8593C26.7348 27.4609 25.5043 16.4493 25.4848 16.3393C25.4067 15.5776 24.7543 14.9995 23.9965 14.9995C23.2348 14.9995 22.5863 15.5776 22.5082 16.3393C22.4965 16.4487 21.2582 27.4603 16.8598 31.8593C12.4614 36.2577 1.4498 37.4882 1.3398 37.5077C0.57808 37.5858 0 38.2382 0 38.996C0 39.7577 0.57813 40.4062 1.3398 40.4843C1.44918 40.496 12.4608 41.7343 16.8598 46.1327C21.2582 50.5311 22.4887 61.5427 22.5082 61.6527C22.5863 62.4144 23.2387 62.9925 23.9965 62.9925C24.7582 62.9925 25.4067 62.4144 25.4848 61.6527C25.4965 61.5433 26.7348 50.5317 31.1332 46.1327C35.5316 41.7343 46.5432 40.5038 46.6532 40.4843C47.4149 40.4062 47.993 39.7538 47.993 38.996C47.993 38.2343 47.4149 37.5858 46.6532 37.5077Z"
                    fill="#ffffff"
                  />
                </g>
                <g className="path-group path-group-3">
                  <path
                    d="M57.9922 54.9956C57.9922 60.3276 49.9922 60.3276 49.9922 54.9956C49.9922 49.6636 57.9922 49.6636 57.9922 54.9956Z"
                    fill="#ffffff"
                  />
                </g>
                <g className="path-group path-group-4">
                  <path
                    d="M11.9922 6.99558C11.9922 12.3276 3.99219 12.3276 3.99219 6.99558C3.99219 1.66358 11.9922 1.66358 11.9922 6.99558Z"
                    fill="#ffffff"
                  />
                </g>
              </svg>{" "}
              <svg
                className="svgclasses2 2xl:hidden sm:flex hidden"
                width="150"
                height="150"
                viewBox="0 0 63 63"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ overflow: "visible" }}
              >
                <g className="path-group path-group-1">
                  <path
                    d="M61.6524 11.0078C60.2227 10.8476 56.1524 10.0859 54.5235 8.4687C52.8946 6.8476 52.1446 2.7695 51.9844 1.3398C51.9063 0.57808 51.2539 0 50.4961 0C49.7344 0 49.0859 0.57812 49.0078 1.3398C48.8476 2.7695 48.0859 6.8398 46.4687 8.4687C44.8476 10.0976 40.7695 10.8476 39.3398 11.0078C38.5781 11.0859 38 11.7383 38 12.4961C38 13.2656 38.5781 13.9063 39.3398 13.9844C40.7695 14.1328 44.8398 14.8946 46.4687 16.5235C48.0898 18.1446 48.8476 22.2227 49.0078 23.6524C49.0859 24.4141 49.7383 24.9922 50.4961 24.9922C51.2656 24.9922 51.9063 24.4141 51.9844 23.6524C52.1328 22.2227 52.8946 18.1524 54.5235 16.5235C56.1446 14.9024 60.2227 14.1446 61.6524 13.9844C62.4141 13.9063 62.9922 13.2539 62.9922 12.4961C62.9922 11.7344 62.4141 11.0859 61.6524 11.0078Z"
                    fill="#034737"
                  />
                </g>
                <g className="path-group path-group-2">
                  <path
                    d="M46.6532 37.5077C46.5438 37.496 35.5322 36.2577 31.1332 31.8593C26.7348 27.4609 25.5043 16.4493 25.4848 16.3393C25.4067 15.5776 24.7543 14.9995 23.9965 14.9995C23.2348 14.9995 22.5863 15.5776 22.5082 16.3393C22.4965 16.4487 21.2582 27.4603 16.8598 31.8593C12.4614 36.2577 1.4498 37.4882 1.3398 37.5077C0.57808 37.5858 0 38.2382 0 38.996C0 39.7577 0.57813 40.4062 1.3398 40.4843C1.44918 40.496 12.4608 41.7343 16.8598 46.1327C21.2582 50.5311 22.4887 61.5427 22.5082 61.6527C22.5863 62.4144 23.2387 62.9925 23.9965 62.9925C24.7582 62.9925 25.4067 62.4144 25.4848 61.6527C25.4965 61.5433 26.7348 50.5317 31.1332 46.1327C35.5316 41.7343 46.5432 40.5038 46.6532 40.4843C47.4149 40.4062 47.993 39.7538 47.993 38.996C47.993 38.2343 47.4149 37.5858 46.6532 37.5077Z"
                    fill="#034737"
                  />
                </g>
                <g className="path-group path-group-3">
                  <path
                    d="M57.9922 54.9956C57.9922 60.3276 49.9922 60.3276 49.9922 54.9956C49.9922 49.6636 57.9922 49.6636 57.9922 54.9956Z"
                    fill="#034737"
                  />
                </g>
                <g className="path-group path-group-4">
                  <path
                    d="M11.9922 6.99558C11.9922 12.3276 3.99219 12.3276 3.99219 6.99558C3.99219 1.66358 11.9922 1.66358 11.9922 6.99558Z"
                    fill="#034737"
                  />
                </g>
              </svg>
              just drag and drop!</span> 
            </h1>
            {/* <p className=" font-medium  max-w-[700px] sm:text-start text-center  text-[12px] xl:text-[12px] 2xl:text-[16px] ">
              Explore Tailored AI Solutions for Your Goals. Drag and drop to
              start exploring now!
            </p> */}
          </div>
        </div>
        <div className="sm:hidden flex items-center justify-center space-x-5 ">
          <Link href="/auth/register">
            <h2 className=" inline-flex items-center space-x-3.5 2xl:text-[20px] text-[14px] min-w-['107px'] 2xl:h-14 h-10 border-2 border-primary-lightgreen  rounded-lg sm:rounded-2xl p-2 2xl:px-4 2xl:py-3.5 hover:bg-primary-lightgreen text-white">
              <span className="">Free trial</span>
              <ArrowRight />
            </h2>
          </Link>
          <Link href="/demo" legacyBehavior>
            <h2 className=" inline-flex items-center space-x-3.5 2xl:text-[20px] text-[14px] min-w-['107px'] 2xl:h-14 h-10 border-2 border-primary-lightgreen  rounded-lg sm:rounded-2xl p-2 2xl:px-4 2xl:py-3.5 hover:bg-primary-lightgreen  text-white">
              <span className="whitespace-nowrap">Get a demo</span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}