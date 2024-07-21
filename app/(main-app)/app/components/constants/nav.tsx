import {
  AdsAnalyticsIcon,
  AiAppsIcon,
  AiArticleIcon,
  AiAssistantIcon,
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
        icon: <BotIcon />,
        name: "AI chat",
        href: "/app/plan/ai-chat",
      },
      {
        icon: <AiAppsIcon />,
        name: "AI apps",
        href: "/app/plan/ai-apps",
      },
      {
        icon: <AiAssistantIcon />,
        name: "AI assistant",
        href: "/app/plan/ai-assistant",
      },
      // {
      //   icon: <ChatgptIcon />,
      //   name: "AI custom GPT",
      //   href: "/app/plan/custom-gpts",
      // },

      {
        icon: <TridentIcon />,
        name: "Web scraping",
        href: "/app/plan/web-scraping",
      },
      // {
      //   icon: <ProductAiIcon />,
      //   name: "AI playground",
      //   href: "/app/plan/ai-playground",
      // },
      {
        icon: <UserIcon />,
        name: "Contact",
        href: "/app/plan/contacts",
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
        icon: <MailIcon />,
        name: "AI email builder",
        href: "/app/create/email-builder",
      },
      // {
      //   icon: <ShapeIcon />,
      //   name: "AI workflow builder",
      //   href: "/app/create/workflow-builder",
      // },
      {
        icon: <TextToVideoIcon />,
        name: "Text to video",
        href: "/app/plan/text-to-video",
      },
      // {
      //   icon: <ProductAiIcon />,
      //   name: "Product AI ",
      //   href: "/app/create/product-ai",
      // },
    ],
    title: "Create",
  },
  {
    icon: <ChatgptIcon />,
    title: "AI custom GPT",
    href: "/app/plan/custom-gpts",
  },
  {
    icon: <ShapeIcon />,
    title: "AI workflow builder",
    href: "/app/create/workflow-builder",
  },
  {
    icon: <AiArticleIcon />,
    title: "AI article wizard",
    href: "/app/create/ai-articles",
  },
  // {
  //   icon: <PublishIcon />,
  //   sublinks: [
  //     {
  //       icon: <SchedulerIcon />,
  //       name: "Scheduler",
  //       subItems: [
  //         {
  //           icon: <QuickPostingIcon />,
  //           name: "Quick posting",
  //           href: "/app/publish/scheduler/quick-posting/profiles",
  //         },
  //         {
  //           icon: <MultiPostingIcon />,
  //           name: "Multi Posting",
  //           href: "/app/publish/scheduler/multi-posting",
  //         },
  //         {
  //           icon: <SettingsIcon />,
  //           name: "Settings",
  //           href: "/app/publish/scheduler/settings",
  //         },
  //         {
  //           icon: <PostingLogsIcon />,
  //           name: "Posting Logs",
  //           href: "/app/publish/scheduler/posting-logs",
  //         },
  //         {
  //           icon: <DebugIcon />,
  //           name: "Posting debug logs",
  //           href: "/app/publish/scheduler/debug-logs",
  //         },
  //       ],
  //     },
  //   ],
  //   title: "Publish",
  // },
  // {
  //   icon: <EngageIcon />,
  //   sublinks: [
  //     {
  //       icon: <AutomationIcon />,
  //       name: "WhatsApp and telegram automation with our apps",
  //       subItems: [
  //         {
  //           icon: <WhatsappIcon />,
  //           name: "WhatsApp overview",
  //           href: "/app/engage/integration/whatsapp-automation",
  //         },
  //         {
  //           icon: <TelegramIcon />,
  //           name: "Telegram overview",
  //           href: "/app/engage/integration/telegram-automation",
  //         },
  //         {
  //           icon: <CampaignIcon />,
  //           name: "Campaigns",
  //           href: "/app/engage/integration/campaigns",
  //         },
  //         {
  //           icon: <AiAssistantIcon />,
  //           name: "AI assistant",
  //           href: "/app/engage/integration/ai-assistant",
  //         },
  //         {
  //           icon: <SettingsIcon />,
  //           name: "Settings",
  //           href: "/app/engage/integration/settings",
  //         },
  //       ],
  //     },
  //     {
  //       icon: <SquareShapeIcon />,
  //       name: "Social media conversation hub",
  //       href: "/app/engage/Social-media",
  //     },
  //     {
  //       icon: <DocumentIcon />,
  //       name: "Social advocacy",
  //       href: "/app/engage/social-advocacy",
  //     },
  //   ],
  //   title: "Engage",
  // },
  // {
  //   icon: <AnalyseIcon />,
  //   sublinks: [
  //     {
  //       icon: <PresentationAnalyticsIcon />,
  //       name: "Social media analytics",
  //       href: "/app/analyse/social-media",
  //     },
  //     {
  //       icon: <ReputationIcon />,
  //       name: "Reputation mgmt. system",
  //       href: "/app/analyse/reputation-manager",
  //     },
  //     {
  //       icon: <AdsAnalyticsIcon />,
  //       name: "Ads analytics",
  //       href: "/app/analyse/ads-analytics",
  //     },
  //     {
  //       icon: <ReportAnalyticsIcon />,
  //       name: "Email & SMS Analytics",
  //       href: "#",
  //     },
  //   ],
  //   title: "Analyse",
  // },
];

export default navLinks;