export interface Template {
  _id: string;
  user_id: string;
  doc_type: string;
  doc_name: string;
  workbook: string;
  category: string;
  
  doc_content: {
    video_id: string;
    status: string;
    video_thumbnailUrl: string;
    video_url:string;
  };
  createdAt: string;
  updatedAt: string;
  created_by: string;
  id: string;
  lastUpdatedAt: number;
  variables: Record<string, any>;
  thumbnailUrl: string;
  status: string;
  author: string;
  initial: string;
  editedTime: string;
  title:string;
  onSuccess?: () => void; 
}
