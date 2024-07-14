// types.ts

export interface VideoData {
  createdAt: number;
  download: string;
  duration: string;
  id: string;
  lastUpdatedAt: number;
  status: "complete" | "in_progress";
  title: string;
  visibility: "public" | "private";
  videoScript: string;
}
