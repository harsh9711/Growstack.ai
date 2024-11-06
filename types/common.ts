export interface PlanUsage {
  usage: {
    no_of_text_to_video: number;
    no_of_text_to_avatar: number;
    ai_wizard_credits: boolean;
    text_to_video_credits: number;
    ai_worfklow_credits: number;
    product_ai_credits: number;
    social_media_posting: boolean;
    social_media_conversation: boolean;
    social_media_analytics: boolean;
    webscraping_available: boolean;
    webscraping_and_contact: number;
    ai_background_generator_credits: number;
  };
  _id: string;
  plan_id: string;
  user_id: string;
  stripe_subscription_id: string;
  text_to_video_pricing: number;
  product_ai_pricing: number;
  usage_start_date: string;
  usage_expiry_date: string;
  usage_amount: number;
  plan_type: "MONTHLY" | "YEARLY" | string;
  createdAt: string;
  updatedAt: string;
  isFreeCouponApplied: boolean;
}

export interface Plan {
  features: string[];
  _id: string;
  plan: string;
  plan_type: string;
  plan_id: string;
  stripe_price_id: string;
  price: number;
  text_to_avatar_cost: number;
  text_to_video_cost: number;
  ai_background_generator_cost: number;
  max_yearly_discount: number;
  createdAt: string;
  updatedAt: string;
}

export type InputType = {
  variable_label: string;
  variable_type: string;
  variable_value: any;
  variable_values: any;
  is_prompt?: boolean;
};

export interface Usage {
  ai_chat: boolean;
  ai_playground: boolean;
  ai_assistant: boolean;
  ai_custom_gpt: boolean;
  ai_templates: boolean;
  ai_wizard: boolean;
  no_of_text_to_avatar: number;
  no_of_text_to_video: number;
  ai_background_generator_credits: number;
  social_media_posting: boolean;
  social_media_conversation: boolean;
  whatsapp_automation: boolean;
  telegram_automation: boolean;
  social_media_analytics: boolean;
  social_media_ai_insights: boolean;
  recommendation_engine: boolean;
  content_calendar: boolean;
  ai_worfklow_credits: number;
  webscraping: boolean;
  contacts_repository: boolean;
  contact_intelligence: boolean;
  linkedin_agent: boolean;
  mdr_agent: boolean;
}

interface ExceptRoute {
  ancestorRoute: string;
  exceptPath: string[];
}

interface Route {
  path: string;
  partialMatch: boolean;
  excepts?: ExceptRoute[];
}

export interface FeatureRouteMap {
  [key: string]: Route[];
}

export interface UserPlan {
  _id: string;
  plan_id: string;
  user_id: string;
  plan_name: string;
  plan_type?: string;
  plan_amount: number;
  ai_background_generator_cost: number;
  smart_ai_messages: number;
  fast_ai_messages: number;
  usage_expiry_date: string;
  no_of_messages: number;
  usage_amount: number;
  usage: Usage;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ChatResponse {
  response: string;
  conversation_id: string;
  response_type: "TEXT" | "IMAGE" | "VIDEO";
  noOfMessagesLeft?: number;
  totalMessages?: number;
  chatId: string;
  isImage?: boolean;
  totalNoOfMessages?:any
}

export interface BrandVoice {
  _id: string;
  user_id: string;
  brand_name: string;
  websites: string[];
  brand_voice: string;
  description?: string; // Optional field
  document_url: string;
  is_default: boolean;
  createdAt: string;
  updatedAt: string;
}
