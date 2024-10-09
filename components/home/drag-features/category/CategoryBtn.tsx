"use client";
import { cn } from "@/lib/utils";
import { childItems, featureItems } from "../data";
import { useDragableFeatures } from "../store";

interface CategoryProps {
   id: number;
   title: string;
}

export default function CategoryBtn (props: CategoryProps) {
   const { title, id } = props;
   const { activeCategory, setActiveCategory, setSelectedItems, setDraggedItem, setStep, setNavItems } = useDragableFeatures();
   const handleClick = () => {
      const currentItems = featureItems.filter((item) => item.categoryId === id);
      setActiveCategory(props);
      setNavItems(currentItems);
      if (currentItems.length === 1) {
         const item = currentItems[0];
         const currentChilItems = childItems.get(Number(item.id));
         setDraggedItem(item);
         setStep(1);
         return setSelectedItems(currentChilItems);
      }
      setStep(0);
      setSelectedItems(currentItems);
      setDraggedItem(null);
   }

   const isActive = activeCategory?.id === props.id;

   return (
      <button type="button" onClick={handleClick} className={cn("group flex-1 inline-flex items-center justify-center space-x-2 p-4 2xl:px-5 py-1.5 2xl:py-2 border border-[#F1F1F1] hover:border-primary-green hover:text-primary-green rounded-[61px] text-black transition-all", isActive && "text-white bg-primary-green border-primary-green hover:text-white")}>
         <span className={cn("relative inline-flex items-center justify-center size-3 2xl:size-4 rounded-full border border-current before:inline-block before:size-3 before:rounded-full before:bg-primary-green before:opacity-0", isActive && "after:opacity-100 bg-current")}></span>
         <span>{title}</span>
      </button>
   )
}
