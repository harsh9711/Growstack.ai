"use client";

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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import clsx from "clsx";
import { ChevronRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header className="bg-white shadow-2xl shadow-primary-green/10 py-4 px-10 rounded-[24px] w-full max-w-[90%] mx-auto relative z-[5]">
      <nav className="flex justify-between items-center">
        <div className="border-r border-[#DEDEDE] pr-10">
          <Image src="/logo/growstack.svg" alt="" width={150} height={40} draggable={false} className="select-none max-h-14" />
        </div>
        <div className="flex gap-3">
          {navLinks.map((link, index) => (
            <DropdownMenu key={index}>
              <DropdownMenuTrigger>
                <div
                  className={clsx(
                    "flex justify-center items-center p-3 pr-6 rounded-2xl gap-4 text-[15px] transition-all duration-500",
                    pathname === "#" ? "bg-primary-green text-white !hover:bg-primary-green hover:bg-opacity-90" : "hover:bg-[#F1F1F1]"
                  )}>
                  <div className="bg-[#FAFAFB] p-2.5 rounded-lg">
                    {React.cloneElement(link.icon, { className: clsx(pathname === "#" && "text-primary-green") })}
                  </div>
                  {!link.sublinks && link.href ? <Link href={link.href}>{link.title}</Link> : <h2>{link.title}</h2>}
                </div>
              </DropdownMenuTrigger>
              {link.sublinks && (
                <DropdownMenuContent>
                  {link.sublinks.map((item, index) => (
                    <DropdownMenuItem inset key={index}>
                      <div className="flex flex-row w-[300px] justify-between">
                        <div className="flex gap-3">
                          {React.cloneElement(item.icon, { className: clsx(pathname === "#" && "text-primary-green") })}
                          <h2>{item.name}</h2>
                        </div>
                        <ChevronRight className="text-gray-500" />
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <div className="bg-[#F4F4F4] p-3.5 max-w-3xl mx-auto flex items-center gap-4 rounded-xl">
            <Search className="text-[#14171BB8]" />
            <input type="text" placeholder="Search" className="w-full flex items-center bg-transparent text-[#14171BB8] placeholder:text-[#14171BB8]" />
          </div>
          <button className="cursor-pointer bg-[#F4F4F4] py-3 px-3 rounded-xl">
            <IoIosNotificationsOutline size={26} />
          </button>
          <button>
            <Image src="/dummy/person-0.png" alt="" width={100} height={100} className="w-[50px] h-[50px] object-cover rounded-xl" />
          </button>
        </div>
      </nav>
    </header>
  );
}

const navLinks = [
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
        href: "#",
      },
    ],
    title: "Publish",
  },
  {
    icon: <EngageIcon />,
    sublinks: [
      {
        icon: <AffiliateMarketingIcon />,
        name: "Marketing and sales assistants",
        href: "#",
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
        href: "#",
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
