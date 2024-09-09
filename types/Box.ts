export interface Feature {
  stripe_price_id: any;
  planType: string;
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
  price?: string;
}

export interface Section {
  title: string;
  features: Feature[];
}

export interface ContentBoxProps {
  sections: Section[];
}
  // let features = [
  //   {
  //     id: "price_1PuoqDLJfGs6Fay30N578pcf",
  //     title: "Basic",
  //     monthlyPrice: "20.00$",
  //     yearlyPrice: "200.00$",
  //     priceSuffix: "/mo",

  //     description:
  //       "Powerful AI features to create & improve your content everywhere you work online.",
  //     buttonLabel: "Contact sales",
  //     buttonStyle: "bg-[#034737]/10 text-[#034737]",
  //     featureList: [
  //       "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, ",
  //       "Mobile App +  Chrome Extension, AI Article Wizard, Image Generation",
  //       "Product AI : $0.4 cents per image",
  //       "Text to Video : $3 per video ",
  //       "AI Workflows : Based on images, video & text",
  //       "Max discount for yearly plans : 25% Off",
  //     ],
  //   },
  //   {
  //     id: "price_1PuoqDLJfGs6Fay30N578pcf",
  //     title: "Business",
  //     monthlyPrice: "99.00$",
  //     yearlyPrice: "999.00$",
  //     description:
  //       "Personalized AI features with additional control, security, team training & tech support.",
  //     buttonLabel: "Contact sales",
  //     buttonStyle: "bg-[#034737]/10 text-[#034737]",
  //     featureList: [
  //       "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, ",
  //       "Mobile App +  Chrome Extension, AI Article Wizard, Image Generation",
  //       "Product AI : $0.4 cents per image",
  //       "Text to Video : $3 per video ",
  //       "AI Workflows : Based on images, video & text",
  //       "Social Media Analytics",
  //       "Webscraping, Contact (Consent & Verification is extra) : Credit based",
  //       "Max discount for yearly plans : 50% Discount",
  //     ],
  //   },
  //   {
  //     id: "price_1PuoqDLJfGs6Fay30N578pcf",
  //     title: "Pro",
  //     monthlyPrice: "99.00$",
  //     yearlyPrice: "999.00$",
  //     description:
  //       "Personalized AI features with additional control, security, team training & tech support.",
  //     buttonLabel: "Contact sales",
  //     buttonStyle: "bg-[#034737]/10 text-[#034737]",
  //     featureList: [
  //       "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, ",
  //       "Mobile App +  Chrome Extension, AI Article Wizard, Image Generation",
  //       "Product AI : $0.4 cents per image",
  //       "Text to Video : $3 per video ",
  //       "AI Workflows : Based on images, video & text",
  //       "Social Media Analytics",
  //       "Webscraping, Contact (Consent & Verification is extra) : Credit based",
  //       "Max discount for yearly plans : 50% Discount",
  //     ],
  //   },
  // ];

