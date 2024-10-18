import Image from "next/image";

interface Props {
  icon: string;
  iconAlt?: string;
}

export default function BrandItem({ icon, iconAlt }: Props) {
  return (
    <div className="inline-flex justify-center max-w-[40px] xl:max-w-[100px] max-h-[40px] xl:max-h-[100px]">
      <Image
        width={80}
        height={40}
        src={`/assets/ai_icons/${icon}`}
        alt={iconAlt ? iconAlt : "Brand icon"}
        className="h-full w-full"
      />
    </div>
  );
}
