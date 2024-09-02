export interface Feature {
    title: string;
    description: string;
    hasDash?: boolean;
    tickCount?: number;
  }
  
  export interface Section {
    title: string;
    features: Feature[];
  }
  
  export interface ContentBoxProps {
    sections: Section[];
  }
  