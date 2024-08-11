"use client";
import Image from "next/image";
import FeatureItem from "./FeatureItem";


interface Props {
   item: any;
   provided: any;
}

export default function DropZone ({ item, provided }: Props) {
   return (
      <div className="relative z-20 mt-6 md:mt-8 lg:mt-10 w-64 md:w-72 lg:w-[505px] p-6 md:px-16 md:py-10 mx-auto bg-[#A7A7A7]/10 border border-primary-green/10 rounded-2.5xl overflow-hidden flex ">
         <div
            className="bg-white w-52 md:w-64 lg:w-96 py-3 lg:py-5 rounded-2.5xl border border-[#2B44E740]/25 border-dashed drop-shadow-2xl flex justify-center"
            {...provided.droppableProps}
            ref={provided.innerRef}
         >
            {Object.keys(item).length === 0 ? (
               <div className="flex flex-col items-center">
                  <div className="size-[72px] animate-spin select-none">
                     <Image src="/assets/ai_features/default-spiner-icon.svg" width={72} height={72} alt="Gobe" />
                  </div>
                  <span className="inline-block mt-2 text-base">Drag Features</span>
               </div>
            ) : (<FeatureItem {...item} />)}
         </div>
      </div>
   )
}
