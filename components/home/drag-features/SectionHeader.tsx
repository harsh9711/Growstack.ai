import Link from "next/link";
import ArrowRight from "./icons/ArrowRight";
import Image from "next/image";

export default function  SectionHeader() {
  return (
    <div className="max-w-4xl w-full  mx-auto px-5 lg:px-10 2xl:mb-14 mb-4">
      <div className="lg:flex items-center justify-center space-y-4 md:space-y-8 lg:space-y-0 lg:space-x-5">
        <div className="items-center justify-center">
          <div className="w-full items-center justify-center">
            <h1 className="text-[26px] sm:flex sm:text-start text-center  xl:text-[32px] 2xl:text-[48px] font-medium mb-1">
              Your{" "}
              <span className="font-extrabold sm:flex text-primary-green/80  px-2">
                AI catalyst{" "}
                <Image src="/ai2.svg" width={30} height={30} alt="aihero" className="ml-2 sm:flex hidden " />
              </span>{" "}
              for success!
            </h1>
            <p className=" font-medium  max-w-[700px] sm:text-start text-center  text-[12px] xl:text-[12px] 2xl:text-[16px] ">
              Explore Tailored AI Solutions for Your Goals. Drag and drop to
              start exploring now!
            </p>
          </div>
        </div>
        <div className="sm:hidden flex items-center justify-center space-x-5 pb-10">
               <Link href="/auth/register">
                  <h2 className=" inline-flex items-center space-x-3.5 2xl:text-[20px] text-[14px] min-w-['107px'] 2xl:h-14 h-10 border-2 border-primary-green text-primary-green rounded-2xl p-2 2xl:px-4 2xl:py-3.5 hover:bg-primary-green hover:text-white">
                     <span className="">Free trial</span>
                     <ArrowRight />
                  </h2>
               </Link>
               <Link href="/demo" legacyBehavior>
               <h2 className=" inline-flex items-center space-x-3.5 2xl:text-[20px] text-[14px] min-w-['107px'] 2xl:h-14 h-10 border-2 border-primary-green text-primary-green rounded-2xl p-2 2xl:px-4 2xl:py-3.5 hover:bg-primary-green hover:text-white">
               <span className="whitespace-nowrap">Get a demo</span>
                  </h2>
               </Link>
            </div>
      </div>
    </div>
  );
}
