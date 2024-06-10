import {
  AnalyseIcon,
  BotIcon,
  CreateIcon,
  DashboardIcon,
  EngageIcon,
  IntegrationIcon,
  PlanIcon,
  PublishIcon,
  TridentIcon,
  LayoutIcon,
  MailIcon,
  MessageIcon,
  ShapeIcon,
  TextResizeIcon,
  UserIcon,
  SchedulerIcon,
  AffiliateMarketingIcon,
  SquareShapeIcon,
  BusinessIcon,
  DocumentIcon,
  PresentationAnalyticsIcon,
  ReputationIcon,
  AutomationWheelIcon,
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
        name: "AI chatbot (all LLM)",
        href: "#",
      },
      {
        icon: <TridentIcon />,
        name: "GMB web scrapping tool",
        href: "#",
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
        icon: <TextResizeIcon />,
        name: "Text to video",
        href: "#",
      },
      {
        icon: <MessageIcon />,
        name: "Custom marketing GPT apps",
        href: "#",
      },
      {
        icon: <ShapeIcon />,
        name: "AI workflow builder",
        href: "#",
      },
      {
        icon: <UserIcon />,
        name: "Contact",
        href: "/app/create/contacts",
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
        href: "/app/publish/scheduler",
      },
    ],
    title: "Publish",
  },
  {
    icon: <EngageIcon />,
    sublinks: [
      {
        icon: <AffiliateMarketingIcon />,
        name: "AI Marketing and sales assistants",
        href: "/app/engage/ai-marketing-and-sales-assistant",
      },
      {
        icon: <SquareShapeIcon />,
        name: "Social media conversation hub",
        href: "#",
      },
      {
        icon: <BusinessIcon />,
        name: "AI marketing and sales apps",
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
        icon: <PresentationAnalyticsIcon />,
        name: "Ads analytics",
        href: "#",
      },
      {
        icon: <MailIcon />,
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
        icon: <AutomationWheelIcon />,
        name: "WhatsApp and telegram automation with our apps",
        href: "#",
      },
      {
        icon: <PresentationAnalyticsIcon />,
        name: "Social Planner Hub",
        href: "#",
      },
    ],
    title: "Integration",
  },
];

export default navLinks;
