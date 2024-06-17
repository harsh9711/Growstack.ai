import {
  AdsAnalyticsIcon,
  AiAppsIcon,
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
        href: "#",
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
      {
        icon: <ChatgptIcon />,
        name: "AI custom GPT",
        href: "/app/plan/custom-gpts",
      },
      {
        icon: <TextToVideoIcon />,
        name: "Text to video",
        href: "/app/plan/text-to-video",
      },
      {
        icon: <TridentIcon />,
        name: "Web scraping",
        href: "/app/plan/web-scraping",
      },
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
      {
        icon: <LayoutIcon />,
        name: "AI website builder",
        href: "/app/create/website-builder",
      },
      {
        icon: <MailIcon />,
        name: "AI email builder",
        href: "/app/create/email-builder",
      },
      {
        icon: <ShapeIcon />,
        name: "AI workflow builder",
        href: "/app/create/workflow-builder",
      },
    ],
    title: "Create",
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
          {
            icon: <MultiPostingIcon />,
            name: "Multi Posting",
            href: "/app/publish/scheduler/multi-posting",
          },
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
          {
            icon: <DebugIcon />,
            name: "Posting debug logs",
            href: "/app/publish/scheduler/debug-logs",
          },
        ],
      },
    ],
    title: "Publish",
  },
  {
    icon: <EngageIcon />,
    sublinks: [
      {
        icon: <SquareShapeIcon />,
        name: "Social media conversation hub",
        href: "#",
      },
      {
        icon: <DocumentIcon />,
        name: "Social advocacy",
        href: "#",
      },
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
        name: "Reputation mgmt. system",
        href: "/app/analyse/reputation-manager",
      },
      {
        icon: <AdsAnalyticsIcon />,
        name: "Ads analytics",
        href: "/app/analyse/ads-analytics",
      },
      {
        icon: <ReportAnalyticsIcon />,
        name: "Email & SMS Analytics",
        href: "#",
      },
    ],
    title: "Analyse",
  },
  {
    icon: <IntegrationIcon />,
    sublinks: [
      {
        icon: <AutomationIcon />,
        name: "WhatsApp and telegram automation with our apps",
        subItems: [
          {
            icon: <WhatsappIcon />,
            name: "WhatsApp overview",
            href: "/app/integration/whatsapp-automation",
          },
          {
            icon: <TelegramIcon />,
            name: "Telegram overview",
            href: "/app/integration/telegram-automation",
          },
          {
            icon: <CampaignIcon />,
            name: "Campaigns",
            href: "/app/integration/campaigns",
          },
          {
            icon: <AiAssistantIcon />,
            name: "AI assistant",
            href: "/app/integration/ai-assistant",
          },
          {
            icon: <SettingsIcon />,
            name: "Settings",
            href: "/app/integration/settings",
          },
        ],
      },
      {
        icon: <SchedulerIcon />,
        name: "Social Planner Hub",
        href: "#",
      },
    ],
    title: "Integration",
  },
];

export default navLinks;
