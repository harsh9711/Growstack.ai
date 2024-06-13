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
  MessageIcon,
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
  TextResizeIcon,
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
        href: "#",
      },
      {
        icon: <AiAssistantIcon />,
        name: "AI assistant",
        href: "#",
      },
      {
        icon: <ChatgptIcon />,
        name: "AI custom GPT",
        href: "#",
      },
      {
        icon: <TextToVideoIcon />,
        name: "Text to video",
        href: "#",
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
        href: "#",
      },
      {
        icon: <MailIcon />,
        name: "AI email builder",
        href: "#",
      },
      {
        icon: <ShapeIcon />,
        name: "AI workflow builder",
        href: "#",
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
      // {
      //   icon: <AffiliateMarketingIcon />,
      //   name: "AI Marketing and sales assistants",
      //   href: "/app/engage/ai-marketing-and-sales-assistant",
      // },
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
        href: "#",
      },
      {
        icon: <ReputationIcon />,
        name: "Reputation mgmt. system",
        href: "/app/analyse/reputation-manager",
      },
      {
        icon: <AdsAnalyticsIcon />,
        name: "Ads analytics",
        href: "#",
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
            href: "#",
          },
          {
            icon: <TelegramIcon />,
            name: "Telegram overview",
            href: "#",
          },
          {
            icon: <CampaignIcon />,
            name: "Campaign",
            href: "#",
          },
          {
            icon: <AiAssistantIcon />,
            name: "AI assistant",
            href: "#",
          },
          {
            icon: <SettingsIcon />,
            name: "Settings",
            href: "#",
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
