import { FeatureRouteMap } from "@/types/common";

/* eslint-disable no-unused-vars */
export enum ALL_ROUTES {
    ROOT = '/',
    PRICING = '/pricing',
    AI_ASSISTANT = '/app/plan/ai-assistant',
    SINGLE_AI_ASSISTANT_CHAT = '/app/plan/ai-assistant/chat/:id'
}



export const featureRouteMap: FeatureRouteMap = {
    ai_assistant: [
        { path: ALL_ROUTES.AI_ASSISTANT, partialMatch: false },
        { path: ALL_ROUTES.SINGLE_AI_ASSISTANT_CHAT, partialMatch: true },
    ],
    ai_playground: [
        { path: "/ai-playground", partialMatch: false },
    ],
    social_media_posting: [
        { path: "/social-media", partialMatch: false },
        { path: "/social-media/:id", partialMatch: true },
    ],
};