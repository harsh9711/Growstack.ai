export interface ISidebarItem {
  _id: string;
  title: string;
  createdDate: string;
  updatedDate?: string;
  selected: boolean;
  onRename: (_id: string, newTitle: string) => void;
  onSelect: () => void;
}
