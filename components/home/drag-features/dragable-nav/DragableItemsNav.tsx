import DragableItem from "./DragableItem";

interface Props<T> {
   dragableItems: Array<T>;
}

export default function DragableItemsNav<T> (props: Props<T>) {
   const { dragableItems } = props;
   return (
      <div className="absolute left-1/2 top-0 -translate-x-1/2 bg-white px-6 py-3 lg:py-5 lg:px-10 rounded-br-[30px] rounded-bl-[30px] shadow-2xl flex items-center justify-center space-x-4 md:space-x-7 xl:space-x-10">
         {Array.from(dragableItems).map((item: any) => (<DragableItem key={item.title} {...item} />))}
      </div>
   )
}
