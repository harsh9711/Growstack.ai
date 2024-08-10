export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  slug: string;
  welcome_message: string;
}

export interface Chat {
  prompt: string;
  response: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Conversation {
  _id: string;
  assistant_id: string;
  chats: Chat[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
