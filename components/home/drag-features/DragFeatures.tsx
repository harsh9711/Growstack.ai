"use client";

import { useEffect, useState } from "react";
import { categoryItems as mainCategories } from "./data";

import DragingBoard from "./DragingBoard";
import SectionHeader from "./SectionHeader";
import FeaturesCategory from "./category/FeaturesCategory";


export default function DragFeatures () {
   const [categoryItems, setCategoryItems] = useState(mainCategories);
   const [activeNavItem, setActiveNavItem] = useState(categoryItems[0]);
   const [activeNavId, setActiveNavId] = useState<number>(1);
   const [activeFeaturedItem, setActiveFeaturedItem] = useState<any>({});

   useEffect(() => {
      console.log("I'm loading from parent ..");

      const nextCategories = categoryItems.map(category => {
         if (category.id == activeNavId) {
            const activeCategory = { ...category, isActive: true }
            setActiveNavItem(activeCategory);
            return activeCategory;
         }
         return { ...category, isActive: false };
      });
      setCategoryItems(nextCategories);
      setActiveFeaturedItem({});
   }, [activeNavId]);

   return (
      <section className="pt-16 mt-1">
         <div className="max-w-8xl mx-auto px-4">
            <SectionHeader />
            {/* Dragable container */}
            <DragingBoard activeNavItem={activeNavItem} activeFeaturedItem={activeFeaturedItem} setActiveFeaturedItem={setActiveFeaturedItem} />
            {/* Category Nav area */}
            <FeaturesCategory items={categoryItems} setActiveNavId={setActiveNavId} />
         </div>
      </section>
   )
}