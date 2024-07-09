export type Template = {
  createdAt: number;
  created_by: string;
  id: string;
  lastUpdatedAt: number;
  title: string;
  variables: Record<string, any>; // Assuming variables can be any key-value pairs
};
