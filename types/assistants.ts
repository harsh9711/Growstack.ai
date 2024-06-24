export interface Assistant {
  category: string | undefined;
  id: string;
  icon:string;
  name: string;
  description: string;
  status: 'disabled' | 'active' | 'inactive';
  created_on: {
    date: string;
    time: string;
  };
  custom_prompt: string; // Add this line
  userInputs: UserInput[]; // Ensure userInputs is part of the type
}
export interface UserInput {
  icon:string;
  title: string;
  description: string;
  type: string;
  required: string;
}