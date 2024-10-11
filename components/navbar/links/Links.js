import React, { useState } from "react";
import "./links.scss";
import NavLink from "./navLink/navLink";
import Image from "next/image";

const links = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "Features",
    path: "",
    submenu: [
      {
        title: "AI marketing and sales apps",
        path: "/ai-marketing-and-sales-app",
      },
      {
        title: "Text to avatar and AI background",
        path: "/text-to-avatar-and-ai-background",
      },
      {
        title: "Marketing and sales assistants",
        path: "/marketing-and-sales-assistant",
      },
      // {
      //   title: "AI Website landing page and email Builder",
      //   path: "/ai-website-and-email-builder",
      // },
      {
        title: "Custom GPT ",
        path: "/custom-marketing-gpt-apps",
      },
      { title: "Social planner hub", path: "/social-planner-hub" },
      { title: "Prospect scraping ", path: "/features/prospect-scraping-and-contacts" },
      { title: "AI secured chat", path: "/features/ai-secured-chat" },
      { title: "AI LLM comparison", path: "/features/ai-llm-comparison" },
      { title: "AI content wizard", path: "/features/ai-content-wizard" },
    ],
  },
  {
    title: "Solutions",
    path: "",
    submenu: [
      {
        title: "Large Enterprise",
        path: "/solutions/largeenterprise",
        img: "/large.svg",
      },
      {
        title: "MidMarket Enterprise",
        path: "/solutions/midmarketenterprise",
        img: "/mid.svg",
      },
      {
        title: "Small businesses",
        path: "/solutions/smallbusinesses",
        img: "/small.svg",
      },
      { title: "Startup", path: "/solutions/startup", img: "/startup.svg" },

      {
        title: "Marketing",
        path: "/solutions/marketing",
        img: "/marketing.svg",
      },
      { title: "Sales", path: "/solutions/sales", img: "/sales.svg" },
      { title: "Revops", path: "/solutions/revops", img: "/revops.svg" },
      {
        title: "Customer Service",
        path: "/solutions/customer_service",
        img: "/cust.svg",
      },

      {
        title: "Business Operations",
        path: "/solutions/operations",
        img: "/buss.svg",
      },
      { title: "Finance", path: "/solutions/finance", img: "/finance.svg" },
      {
        title: "Supply Chain",
        path: "/solutions/supplychain",
        img: "/supply.svg",
      },
      { title: "IT", path: "/solutions/It", img: "/it.svg" },
    ],
  },
];

const Links = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <React.Fragment>
      <div className="white-background-links z-20">
        {" "}
        {/* Add this class */}
        <div className="links">
          {links.map((link) => (
            <NavLink
              item={{ ...link, isOpen: openSubmenu === link.title }}
              key={link.title}
              onToggleSubmenu={handleToggleSubmenu}
              onCloseMobileMenu={handleCloseMobileMenu}
            />
          ))}
        </div>
        <Image
          className="menuButton"
          src="/images_growstack/banner/hamburger.png"
          alt="hamburger"
          width={30}
          height={30}
          onClick={toggleMobileMenu}
        />
        {isMobileMenuOpen && (
          <div className="mobileLinks">
            {links.map((link) => (
              <NavLink
                item={{ ...link, isOpen: openSubmenu === link.title }}
                key={link.title}
                onToggleSubmenu={handleToggleSubmenu}
                onCloseMobileMenu={handleCloseMobileMenu}
              />
            ))}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Links;
