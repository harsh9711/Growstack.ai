export default function DragingContainer ({ children }: { children: React.ReactNode }) {
   return (
      <div className="mt-12.5 border border-[#DFDFDF] rounded-4xl relative z-10 py-32 md:pb-48 md:px-16 xl:px-24 overflow-hidden bg-[url('/assets/squre-vector-mask.svg')] bg-repeat bg-contain">
         {children}
      </div>
   )
}
