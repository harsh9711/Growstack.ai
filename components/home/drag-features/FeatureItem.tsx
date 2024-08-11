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
   const { icon: { path, alt }, title, className, provided } = props;
   return (
      <div
         ref={provided?.innerRef}
         {...provided?.draggableProps}
         {...provided?.dragHandleProps}
         className={cn("text-center space-y-2.5 inline-flex flex-col items-center", className)}>
         <div className=" md:w-16 md:h-[68px] p-1.5 md:p-3 mx-auto bg-white rounded-xl lg:rounded-3xl border-2 border-white drop-shadow-lg">
            <Image src={path} width={40} height={40} alt={alt ? alt : title} />
         </div>
         <span className="inline-block text-sm lg:text-xl">{title}</span>
      </div>
   )
}
