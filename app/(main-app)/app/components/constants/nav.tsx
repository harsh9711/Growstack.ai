import {
  AdsAnalyticsIcon,
  AiAppsIcon,
  AiArticleIcon,
  AiAssistantIcon,
  AiPlaygroundIcon,
  AnalyseIcon,
  AutomationIcon,
  BotIcon,
  CampaignIcon,
  ChatgptIcon,
  CreateIcon,
  DashboardIcon,
  DebugIcon,
  DocumentIcon,
  EngageIcon,
  IntegrationIcon,
  LayoutIcon,
  MailIcon,
  MultiPostingIcon,
  PlanIcon,
  PostingLogsIcon,
  PresentationAnalyticsIcon,
  ProductAiIcon,
  PublishIcon,
  QuickPostingIcon,
  ReportAnalyticsIcon,
  ReputationIcon,
  SchedulerIcon,
  SettingsIcon,
  ShapeIcon,
  SquareShapeIcon,
  TelegramIcon,
  TextToVideoIcon,
  TridentIcon,
  UserIcon,
  WhatsappIcon,
} from "@/components/svgs";

const navLinks: NavLink[] = [
  {
    icon: <DashboardIcon />,
    href: "/app",
    title: "Dashboard",
  },
  {
    icon: <PlanIcon />,
    sublinks: [
      {
        icon: <AiPlaygroundIcon />,
        name: "AI  LLM comparison",
        href: "/app/plan/ai-playground",
      },
      {
        icon: <BotIcon />,
        name: "AI secured chat",
        href: "/app/plan/ai-chat",
      },
      {
        icon: <AiAppsIcon />,
        name: "AI templates",
        href: "/app/plan/ai-templates",
      },
      {
        icon: <AiAssistantIcon />,
        name: "AI assistant",
        href: "/app/plan/ai-assistant",
      },
      {
        icon: <ChatgptIcon />,
        name: "AI custom GPT",
        href: "/app/plan/custom-gpts",
      },
    ],
    title: "Plan",
  },
  {
    icon: <CreateIcon />,
    sublinks: [
      // {
      //   icon: <LayoutIcon />,
      //   name: "AI website builder",
      //   href: "/app/create/website-builder",
      // },
      {
        icon: <AiArticleIcon />,
        name: "AI content wizard",
        href: "/app/create/ai-articles",
      },
      {
        icon: <TextToVideoIcon />,
        name: "Text to avatar",
        href: "/app/plan/text-to-video",
      },
      {
        icon: <ProductAiIcon />,
        name: "AI background generator ",
        href: "/app/create/product-ai",
      },
      {
        icon: <TextToVideoIcon />,
        name: "Text to video (coming soon)",
        href: "/account/profile",
      },

      // {
      //   icon: <MailIcon />,
      //   name: "AI email builder",
      //   href: "/app/create/email-builder",
      // },
    ],
    title: "Create",
  },
  {
    icon: <PlanIcon />,
    sublinks: [
      {
        icon: <ShapeIcon />,
        name: "AI workflow builder",
        href: "/app/create/workflow-builder",
      },

      {
        icon: <TridentIcon />,
        name: "Prospect scraping",
        href: "/app/engage/web-scraping",
      },
      {
        icon: <UserIcon />,
        name: "Contact repository",
        href: "/app/engage/contacts",
      },
      {
        icon: <BotIcon />,
        name: "MDR agent (coming soon)",
        href: "/account/profile",
      },
      {
        icon: <BotIcon />,
        name: "Linkedin agent (coming soon)",
        href: "/account/profile",
      },
      {
        icon: <BotIcon />,
        name: "Contact intelligence (coming soon)",
        href: "/account/profile",
      },
    ],
    title: "Automate",
  },
  {
    icon: <PublishIcon />,
    sublinks: [
      {
        icon: <SchedulerIcon />,
        name: "Scheduler",
        subItems: [
          {
            icon: <QuickPostingIcon />,
            name: "Quick posting",
            href: "/app/publish/scheduler/quick-posting/profiles",
          },
          // {
          //   icon: <MultiPostingIcon />,
          //   name: "Multi Posting",
          //   href: "/app/publish/scheduler/multi-posting",
          // },
          {
            icon: <SettingsIcon />,
            name: "Settings",
            href: "/app/publish/scheduler/settings",
          },
          {
            icon: <PostingLogsIcon />,
            name: "Posting Logs",
            href: "/app/publish/scheduler/posting-logs",
          },

          // {
          //   icon: <DebugIcon />,
          //   name: "Posting debug logs",
          //   href: "/app/publish/scheduler/debug-logs",
          // },
        ],
      },
      {
        icon: <PresentationAnalyticsIcon />,
        name: "Content calender (coming soon)",
        href: "/app/analyse/social-media",
      },
      {
        icon: <PresentationAnalyticsIcon />,
        name: "Posting logs",
        href: "/app/analyse/social-media",
      },
    ],
    title: "Publish",
  },
  {
    icon: <EngageIcon />,
    sublinks: [
           
      // {
      //   icon: <AutomationIcon />,
      //   name: "WhatsApp and telegram automation with our apps",
      //   subItems: [
      //     {
      //       icon: <WhatsappIcon />,
      //       name: "WhatsApp overview",
      //       href: "/app/engage/automation/whatsapp-automation",
      //     },
      //     {
      //       icon: <TelegramIcon />,
      //       name: "Telegram overview",
      //       href: "/app/engage/automation/telegram-automation",
      //     },
      //     {
      //       icon: <CampaignIcon />,
      //       name: "Campaigns",
      //       href: "/app/engage/automation/campaigns",
      //     },
      //     {
      //       icon: <AiAssistantIcon />,
      //       name: "AI assistant",
      //       href: "/app/engage/automation/ai-assistant",
      //     },
      //     {
      //       icon: <SettingsIcon />,
      //       name: "Settings",
      //       href: "/app/engage/automation/settings",
      //     },
      //   ],
      // },
      {
        icon: <SquareShapeIcon />,
        name: "Social media conversation hub",
        href: "/app/engage/Social-media",
      },
      {
        icon: <WhatsappIcon />,
        name: "WhatsApp automation (coming soon)",
        href: "/app/engage/automation/whatsapp-automation",
      },
      {
        icon: <TelegramIcon />,
        name: "Telegram automation (coming soon)",
        href: "/app/engage/automation/telegram-automation",
      },
      // {
      //   icon: <DocumentIcon />,
      //   name: "Social advocacy",
      //   href: "/app/engage/social-advocacy",
      // },
    ],
    title: "Engage",
  },
  {
    icon: <AnalyseIcon />,
    sublinks: [
      {
        icon: <PresentationAnalyticsIcon />,
        name: "Social media analytics",
        href: "/app/analyse/social-media",
      },

      {
        icon: <ReputationIcon />,
        name: "Social media AI insights (coming soon)",
        href: "/app/analyse/reputation-manager",
      },
      {
        icon: <AdsAnalyticsIcon />,
        name: "Recommendation engine (coming soon)",
        href: "/app/analyse/ads-analytics",
      },
      // {
      //   icon: <ReportAnalyticsIcon />,
      //   name: "Email & SMS Analytics",
      //   href: "#",
      // },
    ],
    title: "Analyse",
  },
];

export default navLinks;
