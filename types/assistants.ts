export interface Assistant {
  name: string;
  description: string;
  status: "active" | "inactive" | "disabled";
  created_on: {
    date: string;
    time: string;
  };
}
