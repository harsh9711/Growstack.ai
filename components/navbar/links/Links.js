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
        title: "AI Marketing and Sales Apps",
        path: "/solutions/marketing",
        img: "/navbar/22.svg",
      },
      {
        title: "Text to Avatar and AI Backdrop",
        path: "/text-to-avatar-and-ai-backdrop",
        img: "/navbar/23.svg",
      },
      {
        title: "Marketing and Sales Assistants",
        path: "/marketing-and-sales-assistant",
        img: "/navbar/24.svg",
      },
      {
        title: "Custom GPT",
        path: "/custom-marketing-gpt-apps",
        img: "/navbar/26.svg",
      },
      {
        title: "Social Planner Hub",
        path: "/social-planner-hub",
        img: "/navbar/27.svg",
      },
      {
        title: "Prospect Scraping",
        path: "/features/prospect-scraping-and-contacts",
        img: "/navbar/28.svg",
      },
      {
        title: "AI Secured Chat",
        path: "/features/ai-secured-chat",
        img: "/navbar/29.svg",
      },
      {
        title: "AI LLM Comparison",
        path: "/features/ai-llm-comparison",
        img: "/navbar/30.svg",
      },
      {
        title: "AI Content Wizard",
        path: "/features/ai-content-wizard",
        img: "/navbar/31.svg",
      },
    ],
  },
  {
    title: "Solutions",
    path: "",
    submenu: [
      {
        title: "Marketing",
        path: "/solutions/marketing",
        img: "/navbar/1.svg",
      },
      {
        title: "Sales",
        path: "/solutions/sales",
        img: "/navbar/2.svg",
      },
      {
        title: "Revops",
        path: "/solutions/revops",
        img: "/navbar/3.svg",
      },
      {
        title: "Customer Service",
        path: "/solutions/customer_service",
        img: "/navbar/4.svg",
      },

      {
        title: "Finance",
        path: "/solutions/finance",

        img: "/navbar/5.svg",
      },
      {
        title: "Business Operations",
        path: "/solutions/operations",
        img: "/navbar/6.svg",
      },
      {
        title: "Information Technology",
        path: "/solutions/It",

        img: "/navbar/7.svg",
      },
      {
        title: "Supply Chain",
        path: "/solutions/supplychain",
        img: "/navbar/8.svg",
      },
      {
        title: "Leadership",
        path: "/solutions/leadership-team",
        img: "/navbar/9.svg",
      },

      {
        title: "Large Enterprise",
        path: "/solutions/largeenterprise",
        img: "/navbar/10.svg",
      },
      {
        title: "MidMarket Enterprise",
        path: "/solutions/midmarketenterprise",
        img: "/navbar/11.svg",
      },
      {
        title: "Small businesses",
        path: "/solutions/smallbusinesses",
        img: "/navbar/12.svg",
      },
      { title: "Startup", path: "/solutions/startup", img: "/navbar/12.svg" },
      {
        title: "Technology",
        path: "/solutions/technology-industry",
        img: "/navbar/13.svg",
      },
      {
        title: "Retail",
        path: "/solutions/retail-industry",
        img: "/navbar/14.svg",
      },
      // {
      //   title: "Insurance",
      //   path: "/solutions/insurance",
      //   img: "/navbar/15.svg",
      // },
      {
        title: "Healthcare",
        path: "/solutions/healthcare",
        img: "/navbar/16.svg",
      },
      {
        title: "ECommerce",
        path: "/solutions/ecommerce",
        img: "/navbar/17.svg",
      },
      {
        title: "Media & Publishing",
        path: "/solutions/media_and_publishing",
        img: "/navbar/18.svg",
      },
      // {
      //   title: "Real Estate",
      //   path: "/solutions/real-estate",
      //   img: "/navbar/19.svg",
      // },
      // {
      //   title: "Education",
      //   path: "/solutions/education",
      //   img: "/navbar/20.svg",
      // },
    ],
  },
  // {
  //   title: "GTM",
  //   path: "/gtm",
  // },
  {
    title: "Pricing",
    path: "/pricing",
  },
  // {
  //   title: "Resources",
  //   path: "/resources",
  // },
  {
    title: "FAQs",
    path: "/faq",
  },
];

const Links = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleSubmenu = title => {
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
          {links.map(link => (
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
            {links.map(link => (
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
