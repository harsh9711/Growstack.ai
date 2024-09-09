export interface Feature {
  hasDash?: boolean;
  tickCount?: number;
  monthlyPrice?: string;
  yearlyPrice?: string;
  priceSuffix?: string;
  buttonLabel: string;
  buttonStyle: string;
  featureList: string[];
  id: string;
  title: string;

  description: string;

  price?: string; // Add this if `price` is an optional property
}

export interface Section {
  title: string;
  features: Feature[];
}

export interface ContentBoxProps {
  sections: Section[];
}
