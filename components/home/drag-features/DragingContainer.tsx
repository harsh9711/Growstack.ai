interface Props {
   children: React.ReactNode;
}

export default function DragingContainer ({ children }: Props) {
   return (
      <div
         className="bg-white relative z-10 text-center mt-12.5 border border-[#DFDFDF] rounded-4xl pb-16 px-6 md:px-10 lg:pb-48 lg:px-16 xl:px-24 overflow-hidden bg-[url('/assets/squre-vector-mask.svg')] bg-repeat bg-contain">
         {children}
      </div>
   )
}
