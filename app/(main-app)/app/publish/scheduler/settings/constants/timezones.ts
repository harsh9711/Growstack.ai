import { SelectItem } from "@/types/selectitem";

export const timezones: SelectItem[] = [
  { value: "UTC", label: "Coordinated Universal Time (UTC)" },
  { value: "EST", label: "Eastern Standard Time (EST)" },
  { value: "CST", label: "Central Standard Time (CST)" },
  { value: "MST", label: "Mountain Standard Time (MST)" },
  { value: "PST", label: "Pacific Standard Time (PST)" },
  { value: "GMT", label: "Greenwich Mean Time (GMT)" },
  { value: "CET", label: "Central European Time (CET)" },
  { value: "EET", label: "Eastern European Time (EET)" },
  { value: "JST", label: "Japan Standard Time (JST)" },
  { value: "AEST", label: "Australian Eastern Standard Time (AEST)" },
];
