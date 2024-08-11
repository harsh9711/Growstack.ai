// "use client";

import { useEffect, useState } from "react";
import BrandRow from "./brand/BrandRow";
import { selectableItems } from "./data";
import DragingContainer from "./DragingContainer";
import DropZone from "./DropZone";
import FeatureItem from "./FeatureItem";

export async function getServerSideProps (context: any) {
   resetServerContext();
   return {
      props: {},
   };
}

import {
   DragDropContext,
   Draggable,
   Droppable,
   resetServerContext,
} from "react-beautiful-dnd";
import DragableItemsNav from "./dragable-nav/DragableItemsNav";

interface Props {
   activeNavItem: any;
   setActiveFeaturedItem: (items: any) => void;
   activeFeaturedItem: any;
}

export default function DragingBoard (props: Props) {
   const { activeNavItem, setActiveFeaturedItem, activeFeaturedItem } = props;
   const [animate, setAnimate] = useState<boolean>(false);

   useEffect(() => {
      console.log("I'm loaded from child board..");
      const animateTimerId = setTimeout(() => {
         setAnimate(true);
      }, 150);

      return () => {
         setAnimate(false);
         clearTimeout(animateTimerId)
      };
   }, []);


   const handleDragDrop = (results: any) => {
      // we get the results from drag and drop
      const { source, destination, type } = results;

      if (!destination) return;

      if (
         source.droppableId === destination.droppableId &&
         source.index === destination.index
      )
         return;

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      if (type === "view_feature_area") {

         const selectedItemId = results.draggableId;

         const activeItems = selectableItems.find((item) => item.title.toLowerCase() === selectedItemId.toLowerCase())
         console.log(activeItems, selectedItemId);
         if (activeItems) {
            setActiveFeaturedItem(activeItems);
         } else {
            setActiveFeaturedItem({});
         }

         // return;
      }

   };
   //End  Tet functions




   return (
      <>
         <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="view_feature_area" type="view_feature_area">
               {(provided) => (
                  <DragingContainer>
                     <div className="absolute opacity-0 visually-hidden pointer-events-none">{provided.placeholder}</div>
                     {Object.entries(activeFeaturedItem).length !== 0 && (<DragableItemsNav dragableItems={activeNavItem.dragableNavItems} />)}

                     {
                        !Object.entries(activeFeaturedItem).length ?

                           activeNavItem.dragableNavItems.map((item: any, index: number) => {
                              return (
                                 <Draggable
                                    draggableId={item.title}
                                    key={item.title}
                                    index={index}
                                 >
                                    {(provided) => (
                                       <FeatureItem
                                          {...item}
                                          provided={provided}
                                          className={` absolute z-10 duration-1000 ${animate ? item.cordinate + ' opacity-100' : 'left-[50%] top-[73.87%] -translate-x-1/2 opacity-0'}`} />
                                    )}
                                 </Draggable>
                              );
                           }) :

                           (
                              activeFeaturedItem?.children?.map((item: any) => (
                                 <FeatureItem
                                    {...item}
                                    className={` absolute z-10 duration-1000 ${animate ? item.cordinate + ' opacity-100' : 'left-[50%] top-[73.87%] -translate-x-1/2 opacity-0'}`}
                                 />
                              ))
                           )
                     }
                     <BrandRow />
                     {/* Drop zone */}
                     <DropZone item={activeFeaturedItem} provided={provided} />
                  </DragingContainer>
               )}
            </Droppable>
         </DragDropContext>

      </>
   )
}
