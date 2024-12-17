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
} from "@/components/svgs";
import { ALL_ROUTES } from "@/utils/constant";

let navLinks: NavLink[] = [
  {
    icon: <DashboardIcon />,
    href: "/app",
    title: "Dashboard",
  },

  {
    icon: <PlanIcon />,
    sublinks: [
      {
        icon: <LayoutIcon />,
        name: "AI  LLM comparison",
        href: ALL_ROUTES.AI_PLAYGROUND,
      },
      {
        icon: <AiAppsIcon />,
        name: "AI templates",
        href: ALL_ROUTES.AI_TEMPLATE,
      },
      {
        icon: <AiAssistantIcon />,
        name: "AI assistant",
        href: ALL_ROUTES.AI_ASSISTANT,
      },
      {
        icon: <ChatgptIcon />,
        name: "AI custom GPT",
        href: ALL_ROUTES.AI_CUSTOM_GPT,
      },
      {
        icon: <CampaignIcon />,
        name: "AI Blog wizard",
        href: ALL_ROUTES.AI_WIZARD,
      },
      {
        icon: <TextToVideoIcon />,
        name: "Text to avatar",
        href: ALL_ROUTES.TEXT_TO_AVATAR,
      },
      {
        icon: <ProductAiIcon />,
        name: "AI backdrop",
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
