export type BillHistory = {
  invoice: string;
  amount: number;
  created_on: {
    date: string;
    time: string;
  };
  status: "Overdue" | "Paid" | "Pending";
};
