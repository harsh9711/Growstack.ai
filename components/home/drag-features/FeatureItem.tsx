import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
   icon: {
      path: string;
      alt: string;
   };
   title: string;
   className?: string;
   provided?: any;
}

export default function FeatureItem (props: Props) {
   const { title, className, provided } = props;
   return (
      <div
         ref={provided?.innerRef}
         {...provided?.draggableProps}
         {...provided?.dragHandleProps}
         className={cn("text-center  inline-flex flex-col items-center justify-center max-w-28 xl:max-w-48 px-3", className)}>
         {props?.icon ? (
            <div className=" w-8 h-8 2xl:w-[85px] 2xl:h-[89px] mx-auto">
               <Image src={props?.icon.path} width={85} height={86} alt={props?.icon.alt ? props?.icon.alt : title} className="w-full h-full"/>
            </div>
         ) : (
            <div className="flex items-center justify-center md:w-16 md:h-[68px] p-1.5 md:p-3 mx-auto bg-white rounded-xl lg:rounded-3xl border-2 border-white drop-shadow-lg mb-3.5">
               <span className="">No image</span>
            </div>
         )}
         <span className="inline-block -mt-2 text-[12px] 2xl:text-[16px] ">{title}</span>
      </div>
   )
}
