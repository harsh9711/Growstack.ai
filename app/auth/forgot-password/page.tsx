import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ForgotPassword() {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="w-full max-w-2xl max-h-[820px] h-full p-14 bg-[#F7FAFC] rounded-[30px]">
        <div className="w-full h-full max-w-[460px] mx-auto flex flex-col justify-between items-center space-y-10">
          <Image src={"/logo/growstack.svg"} alt="growstack" height={180} width={180} className="max-h-14" />
          <Image src={"/assets/forgot-login-password.svg"} alt="" height={400} width={400} />
          <div className="space-y-6 w-full">
            <div className="space-y-3">
              <h1 className="text-4xl font-bold text-center">Forgot password?</h1>
              <p className="text-[#002030B2] text-base text-center">Create your password now.</p>
            </div>
            <form className="space-y-7 !mt-7 w-full">
              {/* styled input field for email */}
              <div className="w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M11.3487 1.3335C13.6204 1.3335 15.3333 3.19127 15.3333 5.65486V10.3509C15.3333 11.6118 14.8885 12.7509 14.0801 13.5591C13.355 14.2832 12.4143 14.6668 11.3596 14.6668H4.63822C3.58563 14.6668 2.6456 14.2839 1.91977 13.5591C1.1114 12.7509 0.666626 11.6118 0.666626 10.3509V5.65486C0.666626 3.19127 2.37956 1.3335 4.65118 1.3335H11.3487ZM11.3487 2.35914H4.65118C2.93552 2.35914 1.68988 3.74512 1.68988 5.65486V10.3509C1.68988 11.3376 2.02824 12.219 2.64219 12.8323C3.17156 13.3622 3.8626 13.6412 4.64027 13.6412H11.3487C11.3501 13.6398 11.3556 13.6412 11.3596 13.6412C12.138 13.6412 12.8284 13.3622 13.3577 12.8323C13.9724 12.219 14.31 11.3376 14.31 10.3509V5.65486C14.31 3.74512 13.0644 2.35914 11.3487 2.35914ZM12.4238 5.52413C12.6019 5.74362 12.5685 6.06635 12.3495 6.2455L9.31791 8.71524C8.93453 9.0202 8.47611 9.17268 8.01838 9.17268C7.56201 9.17268 7.107 9.02156 6.72635 8.71934L3.66681 6.24686C3.44647 6.06909 3.41236 5.74567 3.58904 5.5255C3.76709 5.30601 4.08908 5.27114 4.30873 5.44823L7.36554 7.91798C7.7496 8.22293 8.29056 8.22293 8.67735 7.91524L11.7035 5.4496C11.9231 5.26977 12.2451 5.30396 12.4238 5.52413Z"
                    fill="#667085"
                  />
                </svg>
                <div className="relative group space-y-2 cursor-text w-full">
                  <input type="email" id="email" required className="text-sm peer focus:ring-0 h-[60px] w-full" />
                  <label
                    htmlFor="email"
                    className="cursor-text transform transition-all duration-300 absolute top-0 left-0 h-full flex items-center text-gray-400 group-focus-within:text-black text-sm group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 -translate-y-2 group-focus-within:bg-gradient-to-b peer-valid:bg-gradient-to-b from-[#F7FAFC] to-white group-focus-within:-translate-y-[22px] peer-valid:-translate-y-[22px] px-2 -translate-x-2">
                    Enter your email
                  </label>
                </div>
              </div>

              <button type="submit" className="bg-primary-green text-white h-[60px] w-full rounded-xl">
                Reset password
              </button>
            </form>

            <Link href="/auth/login" className="text-[#14171B] text-center flex items-center gap-4 justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
                <path d="M7 1L1 7L7 13" stroke="#14171B" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
