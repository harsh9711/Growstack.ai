import Link from "next/link";
import ArrowRight from "./icons/ArrowRight";

export default function SectionHeader () {
   return (
      <div className="max-w-7.5xl mx-auto px-5 lg:px-10">
         <div className="md:flex items-center space-y-4 md:space-y-0 md:space-x-5">
            <div className="grow">
               <h1 className="text-5xl mb-1">Your AI catalyst for success!</h1>
               <p>Explore Tailored AI Solutions for Your Goals. Drag and drop to start exploring now!</p>
            </div>
            <div className="inline-flex items-center space-x-5">
               <Link href="/" legacyBehavior>
                  <a className="sheen inline-flex items-center space-x-3.5 min-w-['107px'] h-14 border border-primary-green text-primary-green rounded-lg px-5 py-3.5 text-lg hover:bg-primary-green hover:text-white">
                     <span className="whitespace-nowrap">Free trial</span>
                     <ArrowRight />
                  </a>
               </Link>
               <Link href="/">Get a demo</Link>
            </div>
         </div>
      </div>
   )
}
