"use client";
import Image from "next/image";

interface ItemProps {
   title: string;
   icon: {
      path: string;
      alt: string;
   };
   color: {
      from: string,
      to: string;
   };
}

export default function DragableItem ({ title, icon, color }: ItemProps) {
   return (
      <div className="inline-flex items-center space-x-2.5 cursor-pointer">
         <div className={`size-10 rounded-lg border border-white drop-shadow inline-flex items-center justify-center bg-gradient-to-b ${color.from} ${color.to}`}>
            <Image src="/assets/ai_features/Iconly/Glass/Bookmark-white.png" width={20} height={22} alt="Bookmark" />
         </div>
         <span className="whitespace-nowrap">{title}</span>
      </div>
   )
}
