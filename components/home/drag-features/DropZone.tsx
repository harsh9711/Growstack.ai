"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect } from "react";
import FeatureItem from "./FeatureItem";
import { useDragableFeatures } from "./store";


interface Props {
   provided: any;
   snapshot: any;
}

export default function DropZone ({ provided, snapshot }: Props) {
   // export default function DropZone () {
   const { draggedItem, step, setIisDraggingOverDropZone } = useDragableFeatures();

   useEffect(() => {
      if (snapshot.isDraggingOver) {
         setIisDraggingOverDropZone(true);
      } else {
         setIisDraggingOverDropZone(false);
      }

      return () => setIisDraggingOverDropZone(false);
   }, [snapshot.isDraggingOver]);

   return (
      <div className={cn("relative z-20 mt-6 md:mt-8 lg:mt-10 transition-all p-6 md:px-10 xl:px-16 md:py-10 mx-auto bg-[#A7A7A7]/10 border border-primary-green/10 rounded-2.5xl overflow-hidden flex", !step ? 'w-4/5 md:w-80 lg:w-[420px] xl:w-[505px] ' : 'w-4/5 md:w-[505px] lg:w-[420px] xl:w-[505px]')}>
         <div
            className={cn("relative bg-white w-full py-3 px-6 lg:px-28 lg:py-5 rounded-2.5xl border border-[#2B44E740]/25 border-dashed drop-shadow-2xl flex justify-center items-center before:absolute before:inset-0 before:bg-blue-400/10 before:border before:border-blue-300 before:rounded-2.5xl before:border-dashed before:opacity-0 ", snapshot.isDraggingOver && 'before:opacity-100')}
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
         >
            {draggedItem ? <FeatureItem {...draggedItem} /> : <div className={cn("flex flex-col justify-center items-center", snapshot.isDraggingOver && "opacity-0 duration-300")}>
               <div className="size-[72px] animate-spin select-none">
                  <Image src="/assets/ai_features/default-spiner-icon.svg" width={72} height={72} alt="Gobe" />
               </div>
               <span className="inline-block mt-2 text-base">Drag Features</span>
            </div>}
            <div className="absolute pointer-events-none">{provided?.placeholder}</div>
         </div>
      </div>
   )
}
