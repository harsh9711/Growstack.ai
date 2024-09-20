import { cn } from "@/lib/utils";
import { Draggable } from "react-beautiful-dnd";
import { useDragableFeatures } from "../store";
import DragableItem from "./DragableItem";

interface Props<T> {
   items: Array<T>;
   className?: string;
   provided?: any;
   snapshot?: any;
}

export default function DragableItemsNav<T> (props: Props<T>) {
   const { items, className, provided, snapshot } = props;
   const { isDraggingOverDropZone } = useDragableFeatures();
   const isEmpty = items.length;

   return (
      <div
         {...provided.droppableProps}
         ref={provided.innerRef}
         isDraggingOver={snapshot.isDraggingOver}
         className={cn("relative z-50 bg-white px-6 py-3 lg:py-4 xl:py-5 lg:px-8 xl:px-10 rounded-br-[30px] rounded-bl-[30px] shadow-2xl inline-flex flex-wrap lg:flex-row mx-auto items-center justify-center gap-4 lg:gap-5 xl:gap-10", !isEmpty && 'opacity-0', className)}>
         {Array.from(items).map((item: any, index: number) => {
            return (
               <Draggable
                  draggableId={item.id.toString()}
                  key={item.id}
                  index={index}
               >
                  {(provided, snapshot) => (
                     <DragableItem {...item} provided={provided} snapshot={snapshot} className={`relative before:content-['Drag_me'] before:whitespace-nowrap before:absolute before:left-1/2 before:-translate-x-1/2 before:-top-3.5 before:ms-4 before:border before:border-red-400 before:bg-red-100 before:rounded-full before:text-xs before:px-1.5 before:py-0.5 hover:before:visible ${snapshot.draggingOver ||
                        snapshot.isDragging ||
                        snapshot.isDropAnimating
                        ? "before:visible"
                        : "before:invisible"
                        } ${isDraggingOverDropZone && snapshot.isDragging && 'flex-col before:invisible  space-y-2.5'}`} />
                  )}
               </Draggable>
            );
         })}
         {provided.placeholder}
      </div>
   )
}
