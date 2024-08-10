
interface Document {
  name: string;
  workbook: string;
  category: "active" | "inactive" | "disabled";
  created: string;
  language: "English (USA)" | "English (UK)" | "Spanish" | "French" | "Hindi";
  wordsUsed: number;
}


export const documents: Document[] = [
  { name: "Lorem ipsum dolor sit", workbook: "Games", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 1024 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 941 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 941 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 541 },
  { name: "Lorem ipsum dolor sit", workbook: "Games", category: "disabled", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 517 },
  { name: "Lorem ipsum dolor sit amet", workbook: "Document", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 184 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 941 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 541 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 541 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Games", category: "disabled", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 517 },
  { name: "Lorem ipsum dolor sit", workbook: "Games", category: "disabled", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 517 },
  { name: "Lorem ipsum dolor sit amet", workbook: "Document", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 184 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 941 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 541 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 541 },
  { name: "Lorem ipsum dolor sit", workbook: "Games", category: "disabled", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 517 },
  { name: "Lorem ipsum dolor sit amet", workbook: "Document", category: "active", created: "May 02 2024 01:53 AM", language: "English (USA)", wordsUsed: 184 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 381 },
  { name: "Lorem ipsum dolor sit", workbook: "Content", category: "active", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 3894 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "disabled", created: "May 02 2024 01:53 AM", language: "Hindi", wordsUsed: 841 },
  { name: "Lorem ipsum dolor sit", workbook: "Wizard", category: "active", created: "May 02 2024 01:53 AM", language: "Spanish", wordsUsed: 81 },
  { name: "Lorem ipsum dolor sit", workbook: "All", category: "inactive", created: "May 02 2024 01:53 AM", language: "French", wordsUsed: 8419 },
];
