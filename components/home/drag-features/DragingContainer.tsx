interface Props {
  children: React.ReactNode;
}

export default function DragingContainer({ children }: Props) {
  return (
    <div className="bg-white relative  z-10 text-center xl:mt-4 xl:h-[400px] lg:h-[410px] 2xl:h-full 2xl:mt-8 border border-[#DFDFDF] rounded-4xl pb-16  md:px-10 2xl:pb-48 2xl:px-16 px-24 overflow-hidden bg-[url('/assets/squre-vector-mask.svg')] bg-repeat bg-contain">
      {children}
    </div>
  );
}
