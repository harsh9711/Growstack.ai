export interface PlanUsage {
    usage: {
        ai_wizard_credits: boolean;
        text_to_video_credits: number;
        ai_worfklow_credits: number;
        product_ai_credits: number;
        social_media_posting: boolean;
        social_media_conversation: boolean;
        social_media_analytics: boolean;
        webscraping_available: boolean;
        webscraping_and_contact: number;
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
}
