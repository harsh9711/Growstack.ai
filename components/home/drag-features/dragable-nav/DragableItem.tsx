"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useDragableFeatures } from "../store";

interface Props {
   title: string;
   icon: {
      path: string;
      alt: string;
   };
   color: {
      from: string,
      to: string;
   };
   provided?: any;
   snapshot?: any;
   className?: string;
}

export default function DragableItem ({ title, icon: { path, alt }, color, provided, snapshot, className }: Props) {
   const { isDraggingOverDropZone } = useDragableFeatures();

   const isDraggingOver = isDraggingOverDropZone && snapshot.isDragging;

   return (

      <div
         ref={provided?.innerRef}
         {...provided?.draggableProps}
         {...provided?.dragHandleProps}
         className={cn("inline-flex items-center space-x-2.5 cursor-pointer", className)}
      >
         {isDraggingOver ? (
            <>
               <div className="min-w-16 min-h-[67px] lg:w-16 lg:h-[67px] xl:w-[85px] xl:h-[89px] mx-auto">
                  <Image src={path} width={85} height={86} alt={alt ? alt : title} />
               </div>
               <span className="inline-block">{title}</span>
            </>
         ) : (
            <>
               <div className={cn(`size-8 xl:size-10 rounded-lg border border-white drop-shadow inline-flex items-center justify-center bg-gradient-to-b ${color?.from} ${color?.to}`)}>
                  <Image src="/assets/ai_features/Iconly/Glass/Bookmark-white.png" width={20} height={22} alt="Bookmark" />
               </div>
               <span className={`whitespace-nowrap text-sm lg:text-base`}>{title}</span>
            </>
         )}

      </div>
   )
}
