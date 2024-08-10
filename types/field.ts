export interface Field {
  name: string;
  object: string;
  folder: string;
  unique_key: string;
  created_on: {
    date: string;
    time: string;
  };
}
