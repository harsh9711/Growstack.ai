import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
const Dropdown = ({ label, items, value, onChange, title, showTitle, required = true, disabled = false }: DropdownProps) => (
  <div className="space-y-2">
    {showTitle && <label className="text-[15px]">{title}</label>}
    <Select disabled={disabled} value={value} onValueChange={onChange} required={required}>
      <SelectTrigger className="w-full border-none">
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item: any, index: number) => (
          <SelectItem value={item} key={index}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

export default Dropdown;
