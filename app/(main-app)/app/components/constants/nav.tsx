import {
  AiAppsIcon,
  AiAssistantIcon,
  AnalyseIcon,
  CampaignIcon,
  ChatgptIcon,
  DashboardIcon,
  LayoutIcon,
  PlanIcon,
  ProductAiIcon,
  ShapeIcon,
  TextToVideoIcon,
  AgentNavigationIcon,
} from "@/components/svgs";
import HomeIcon from "@/components/svgs/home";
import { ALL_ROUTES } from "@/utils/constant";

const navLinks: NavLink[] = [
  {
    icon: <HomeIcon />,
    href: "/app",
    title: "Home",
  },

  {
    icon: <PlanIcon />,
    sublinks: [
      {
        icon: <LayoutIcon />,
        name: "AI LLM comparison",
        href: ALL_ROUTES.AI_PLAYGROUND,
      },
      {
        icon: <AiAppsIcon />,
        name: "AI Templates",
        href: ALL_ROUTES.AI_TEMPLATE,
      },
      {
        icon: <AiAssistantIcon />,
        name: "AI Assistant",
        href: ALL_ROUTES.AI_ASSISTANT,
      },
      {
        icon: <ChatgptIcon />,
        name: "AI Custom GPT",
        href: ALL_ROUTES.AI_CUSTOM_GPT,
      },
      {
        icon: <CampaignIcon />,
        name: "AI Blog wizard",
        href: ALL_ROUTES.AI_WIZARD,
      },
      {
        icon: <TextToVideoIcon />,
        name: "AI Text to Avatar",
        href: ALL_ROUTES.TEXT_TO_AVATAR,
      },
      {
        icon: <ProductAiIcon />,
        name: "AI Backdrop",
        href: ALL_ROUTES.AI_BACKGROUND_GENERATOR,
      },
    ],
    title: "AI Studio",
  },
  {
    icon: <AnalyseIcon />,
    sublinks: [
      {
        icon: <ShapeIcon />,
        name: "AI workflow builder",
        href: ALL_ROUTES.WORKFLOW_DASHBOARD,
      },
      {
        icon: <AgentNavigationIcon width={24} height={24} />,
        name: "AI Agent",
        href: ALL_ROUTES.AI_AGENT,
      },
    ],
    title: "Automation Hub",
  },
  // {
  //   icon: <ProductAiIcon />,
  //   href: "/app/publish/scheduler/quick-posting",
  //   title: "Publish",
  // },
];

export default navLinks;
