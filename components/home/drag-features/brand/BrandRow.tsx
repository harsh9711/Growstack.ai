import { cn } from "@/lib/utils";
import { brandItems } from "../data";
import BrandItem from "./BrandItem";

export default function BrandRow (props: any) {
   return (
      <div className={cn("flex flex-wra items-center justify-center mt-8", props?.className)}>
         {brandItems.map((item, index) => (
            <BrandItem key={item.iconAlt ? item.iconAlt : index} icon={item.icon} iconAlt={item.iconAlt} />
         ))}
      </div>
   )
}
