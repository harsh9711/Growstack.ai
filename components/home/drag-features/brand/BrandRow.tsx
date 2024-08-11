import { brandItems } from "../data";
import BrandItem from "./BrandItem";

export default function BrandRow () {
   return (
      <div className="flex items-center justify-center">
         {brandItems.map((item, index) => (
            <BrandItem key={item.iconAlt ? item.iconAlt : index} icon={item.icon} iconAlt={item.iconAlt} />
         ))}
      </div>
   )
}
