import CategoryBtn from "./CategoryBtn";

interface Props {
   setActiveNavId: (id: number) => void;
   items: Array<any>;
}

export default function FeaturesCategory ({ setActiveNavId, items }: Props) {
   const handleClick = (id: number) => {
      setActiveNavId(id)
   };

   return (
      <div className="max-w-7.5xl mx-auto px-5 lg:px-10">
         <div className="rounded-2.5xl border border-[#EFEFEF] overflow-hidden p-6 lg:p-7.5 bg-white -mt-8.5 relative z-20 drop-shadow-2xl">
            <div className="xl:flex items-center space-y-4 xl:space-y-0 lg:space-x-6 xl:space-x-8.5">
               <h5 className="text-xl text-primary-green">What do you want to do?</h5>
               <span className="w-20 h-px xl:w-px xl:h-8 bg-[#D0D0D0] inline-block"></span>
               <div className="flex items-center grow space-x-4">
                  {items.map((category) => <CategoryBtn onClick={handleClick} key={category.title} {...category} />)}
               </div>
            </div>
         </div>
      </div>
   )
}
