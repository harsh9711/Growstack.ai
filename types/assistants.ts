export interface Assistant {
  category: string | undefined;
  id: string;
  title:string;
  icon:string;
  name: string;
  description: string;
  status: 'disabled' | 'active' | 'inactive';
  created_on: {
    date: string;
    time: string;
  };
  custom_prompt: string; // Add this line
  inputs: inputs[]; // Ensure userInputs is part of the type
}
export interface inputs {
  icon:string;
  title: string;
  description: string;
  type: string;
  required: string;
}
