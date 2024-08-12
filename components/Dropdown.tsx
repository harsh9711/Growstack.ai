import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";

interface DropdownProps {
  label?: string;
  title?: string;
  showTitle?: boolean;
  items: Array<any>;
  value: any;
  onChange: (value: any) => void;
  required?: boolean;
  disabled?: boolean;
}

const Dropdown = ({ label, items, value, onChange, title, showTitle, required = true, disabled = false }: DropdownProps) =>{
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );
return(
  <div className="space-y-2">
    {showTitle && <label className="text-[15px]">{title}</label>}
    <Select disabled={disabled} value={value} onValueChange={onChange} required={required}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
      <div className="sticky top-0 p-3  rounded-t-lg z-10">
            <div className="flex items-center bg-white border border-gray-300 rounded-md">
              <Search className="h-5 w-5 text-gray-400 mx-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 bg-transparent text-gray-700 rounded-md focus:outline-none"
              />
            </div>
          </div>
          <SelectGroup>
            {filteredItems.map((item: any, index: number) => (
              <SelectItem value={item} key={index}>
                {item}
              </SelectItem>
            ))}
          </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);
}

export default Dropdown;
