import React from "react";
import Link from "next/link";

function SocialLinks() {
  return (
    <div className=" hidden md:flex items-center ml-10">
      <div className=" relative flex items-center space-x-2  ">
        <Link href="/auth/login" className=" flex items-center text-[#2DA771] border-[#2DA771] border gap-4 text-lg px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out ">
          Login{" "}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8492 8.70711C15.2398 8.31658 15.2398 7.68342 14.8492 7.29289L8.48528 0.928932C8.09476 0.538408 7.46159 0.538408 7.07107 0.928932C6.68054 1.31946 6.68054 1.95262 7.07107 2.34315L12.7279 8L7.07107 13.6569C6.68054 14.0474 6.68054 14.6805 7.07107 15.0711C7.46159 15.4616 8.09476 15.4616 8.48528 15.0711L14.8492 8.70711ZM0 9H14.1421V7L0 7L0 9Z" fill="#2DA771" />
          </svg>

        </Link>
        <Link href="/auth/register" className=" whitespace-nowrap flex items-center text-[#2DA771] border-[#2DA771] border gap-4 text-lg sm:px-5 py-2.5 rounded-lg transition-all duration-300 ease-in-out ">
          Free trial{" "}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8492 8.70711C15.2398 8.31658 15.2398 7.68342 14.8492 7.29289L8.48528 0.928932C8.09476 0.538408 7.46159 0.538408 7.07107 0.928932C6.68054 1.31946 6.68054 1.95262 7.07107 2.34315L12.7279 8L7.07107 13.6569C6.68054 14.0474 6.68054 14.6805 7.07107 15.0711C7.46159 15.4616 8.09476 15.4616 8.48528 15.0711L14.8492 8.70711ZM0 9H14.1421V7L0 7L0 9Z" fill="#2DA771" />
          </svg>
        </Link>
        {/* <div className="absolute w-[2px] h-6 bg-gray-400 top-1/2 left-[-24px] transform -translate-y-1/2 rounded-full"></div> */}
      </div>
    </div>
  );
}

export default SocialLinks;
