export interface Review {
  date: string;
  source: string;
  rating: number;
  review: string;
  status: "pending" | "approved" | "rejected";
  reviewer: string;
  reviewText: string;
}
