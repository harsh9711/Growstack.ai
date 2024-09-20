import Link from "next/link";
import ArrowRight from "./icons/ArrowRight";

export default function SectionHeader () {
   return (
      <div className="max-w-7.5xl pt-10 mx-auto px-5 lg:px-10">
         <div className="lg:flex items-center space-y-4 md:space-y-8 lg:space-y-0 lg:space-x-5">
            <div className="grow">
               <div className="max-w-xl xl:max-w-full">
                  <h1 className="text-[48px] font-extrabold mb-1">Your AI catalyst for success!</h1>
                  <p className="text-[18px] font-medium  max-w-[700px] ">Explore Tailored AI Solutions for Your Goals. Drag and drop to start exploring now!</p>
               </div>
            </div>
            <div className="inline-flex items-center space-x-5">
               <Link href="/auth/register" legacyBehavior>
                  <h2 className=" inline-flex items-center space-x-3.5 min-w-['107px'] h-14 border-2 border-primary-green text-primary-green rounded-2xl px-4 py-3.5 text-lg hover:bg-primary-green hover:text-white">
                     <span className="whitespace-nowrap">Free trial</span>
                     <ArrowRight />
                  </h2>
               </Link>
               <Link href="/demo" legacyBehavior>
               <h2 className=" inline-flex items-center space-x-3.5 min-w-['107px'] h-14 border-2 border-primary-green text-primary-green rounded-2xl px-4 py-3.5 text-lg hover:bg-primary-green hover:text-white">
                     <span className="whitespace-nowrap">Get a demo</span>
                  </h2>
               </Link>
            </div>
         </div>
      </div>
   )
}
