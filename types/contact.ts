export interface Contact {
  name: string;
  profile_image: string;
  phone: string;
  email: string;
  created_on: {
    date: string;
    time: string;
  };
  last_activity: string;
  tags: string[];
}
