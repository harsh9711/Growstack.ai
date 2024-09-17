import { FeatureRouteMap } from "@/types/common";

/* eslint-disable no-unused-vars */
export enum ALL_ROUTES {
    ROOT = '/',
    PRICING = '/pricing',
    AI_ASSISTANT = '/app/plan/ai-assistant',
    SINGLE_AI_ASSISTANT_CHAT = '/app/plan/ai-assistant/chat/:id',
    AI_CHAT = '/app/plan/ai-chat',
    AI_CUSTOM_GPT = '/app/plan/custom-gpts',
    AI_CUSTOM_GPT_NEW = '/app/plan/custom-gpts/new',
    AI_CUSTOM_GPTS = '/app/plan/custom-gpts/gpt',
    AI_PLAYGROUND = '/app/plan/ai-playground',
    AI_TEMPLATE = '/app/plan/ai-templates',
    SINGLE_AI_TEMPLATE = '/app/plan/ai-templates/:id',
    CREATE_AI_TEMPLATE = '/app/plan/ai-templates/create-template',
    AI_WIZARD = "/app/create/ai-articles",
    CONTACT_REPOSITORY = "/app/engage/contacts"
}

export const featureRouteMap: FeatureRouteMap = {
    ai_assistant: [
        { path: ALL_ROUTES.AI_ASSISTANT, partialMatch: false },
        { path: ALL_ROUTES.SINGLE_AI_ASSISTANT_CHAT, partialMatch: true },
    ],
    ai_playground: [
        { path: ALL_ROUTES.AI_PLAYGROUND, partialMatch: false },
    ],
    ai_chat: [
        { path: ALL_ROUTES.AI_CHAT, partialMatch: false },
        { path: ALL_ROUTES.AI_CHAT, partialMatch: false },
    ],
    ai_custom_gpt: [
        { path: ALL_ROUTES.AI_CUSTOM_GPT, partialMatch: false },
        { path: ALL_ROUTES.AI_CUSTOM_GPT_NEW, partialMatch: false },
        { path: ALL_ROUTES.AI_CUSTOM_GPTS, partialMatch: false },
    ],
    ai_templates: [
        { path: ALL_ROUTES.AI_TEMPLATE, partialMatch: false },
        {
            path: ALL_ROUTES.SINGLE_AI_TEMPLATE,
            partialMatch: true,
            excepts: [
                {
                    ancestorRoute: "/ai-templates",
                    exceptPath: ["/create-template", "/update-template"],
                },
            ],
        },
    ],
    ai_wizard: [
        { path: ALL_ROUTES.AI_WIZARD, partialMatch: false },
    ],
    social_media_posting: [
        { path: "/social-media", partialMatch: false },
        { path: "/social-media/:id", partialMatch: true },
    ],
};
