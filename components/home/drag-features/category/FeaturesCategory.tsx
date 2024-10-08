import { featureCategoryData as items } from "../data";
import CategoryBtn from "./CategoryBtn";
export default function FeaturesCategory () {

   return (
      <div className="max-w-7.5xl mx-auto px-5 lg:px-10  py-8">
         <div className="rounded-2.5xl border border-[#EFEFEF] overflow-hidden p-4 2xl:p-6 bg-white -mt-16 2xl:-mt-20 relative z-20 ">
            <div className="flex flex-row justify-center items-center xl:space-y-0 lg:space-x-6 space-x-4 xl:space-x-8.5">
               <h5 className="text-sm 2xl:text-lg text-primary-green">What do you want to do?</h5>
               <span className="w-20 h-px xl:w-px xl:h-8 bg-[#D0D0D0]  2xl:flex hidden"></span>
               <div className=" flex 2xl:text-[14px]  text-[12px] items-center grow gap-4 lg:gap-0 flex-wrap lg:grid lg:gap-y-4 xl:flex lg:grid-cols-3 lg:space-x-4">
                  {items.map((category) => <CategoryBtn key={category.title} {...category} />)}
               </div>
            </div>
         </div>
      </div>
   )
}
