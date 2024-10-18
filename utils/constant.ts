import { FeatureRouteMap } from "@/types/common";
import * as z from 'zod';

/* eslint-disable no-unused-vars */
export enum ALL_ROUTES {
    ROOT = '/',
    APP = '/app',
    LOGIN = '/auth/login',
    PRICING = '/pricing',
    UPGRADE = '/Upgrade',
    PAYMENT = '/Payment',
    AI_ASSISTANT = '/app/ai-studio/ai-assistant',
    SINGLE_AI_ASSISTANT_CHAT = '/app/ai-studio/ai-assistant/chat/:id',
    AI_CHAT = '/app/ai-studio/ai-chat',
    AI_CUSTOM_GPT = '/app/ai-studio/custom-gpts',
    TEXT_TO_AVATAR = '/app/social-portal/text-to-avatar',
    TEXT_TO_AVATAR_MY_AVATARS = '/app/social-portal/text-to-avatar/my-avatars',
    AI_CUSTOM_GPT_NEW = '/app/ai-studio/custom-gpts/new',
    AI_CUSTOM_GPTS = '/app/ai-studio/custom-gpts/gpt',
    AI_PLAYGROUND = '/app/ai-studio/ai-playground',
    AI_TEMPLATE = '/app/ai-studio/ai-templates',
    SINGLE_AI_TEMPLATE = '/app/ai-studio/ai-templates/:id',
    CREATE_AI_TEMPLATE = '/app/ai-studio/ai-templates/create-template',
    AI_WIZARD = "/app/ai-studio/ai-articles",
    CONTACT_REPOSITORY = "/app/engage/contacts",
    CONTACT_REPOSITORY_SETTINGS = "/app/engage/contacts/settings",
    WEB_SCRAPING = "/app/engage/web-scraping",
    SOCIAL_MEDIA_POSTING = "/app/publish/scheduler/quick-posting",
    SOCIAL_MEDIA_POSTING_CONNECT = "/app/publish/scheduler/quick-posting/profiles/connect-account",
    SOCIAL_MEDIA_POSTING_CONNECT_FINISH = "/app/publish/scheduler/quick-posting/profiles/connect-account/finish",
    SOCIAL_MEDIA_CONVERSATION_HUB = "/app/engage/Social-media",
    SOCIAL_MEDIA_ANALYSIS = "/app/analyse/social-media",
    BRAND_VOICE = "/account/ai-brandvoice",
    WORKFLOW_BUILDER = "/app/automation-hub/workflow-builder",
    WORKFLOW_BUILDER_CREATE = "/app/automation-hub/workflow-builder/create-workflow",
    ALL_WORKFLOW_BUILDER = "/app/automation-hub/workflow-builder/workflows",
    AI_BACKGROUND_GENERATOR = "/app/social-portal/product-ai",
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
    webscraping: [
        { path: ALL_ROUTES.WEB_SCRAPING, partialMatch: false },
    ],
    social_media_posting: [
        { path: ALL_ROUTES.SOCIAL_MEDIA_POSTING, partialMatch: false },
        { path: ALL_ROUTES.SOCIAL_MEDIA_POSTING_CONNECT, partialMatch: false },
        { path: ALL_ROUTES.SOCIAL_MEDIA_POSTING_CONNECT_FINISH, partialMatch: false },
    ],
    social_media_conversation: [
        { path: ALL_ROUTES.SOCIAL_MEDIA_CONVERSATION_HUB, partialMatch: false },
    ],
    social_media_analytics: [
        { path: ALL_ROUTES.SOCIAL_MEDIA_ANALYSIS, partialMatch: false },
    ],
    contacts_repository: [
        { path: ALL_ROUTES.CONTACT_REPOSITORY, partialMatch: false },
        { path: ALL_ROUTES.CONTACT_REPOSITORY_SETTINGS, partialMatch: false },
    ]
};



export const brandVoiceAnalyzeFormSchema = z.object({
    urls: z.array(z.string().max(255)).optional(),
    description: z.string().max(2000).optional(),
    file: z.any().optional(),
});

export const brandVoiceFormSchema = z.object({
    brandName: z.string().min(1, { message: 'Required' }).max(255),
    brandVoice: z.string().max(5000).optional(),
    isDefault: z.boolean().optional(),
});

export const urlRegex = new RegExp(
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/
);
