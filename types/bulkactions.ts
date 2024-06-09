export interface BulkAction {
  name: string;
  bulk_operation: string;
  status: "complete" | "In progress" | "Not started";
  created_on: {
    date: string;
    time: string;
  };
  completed_on: {
    date: string;
    time: string;
  };
  user: string;
}
