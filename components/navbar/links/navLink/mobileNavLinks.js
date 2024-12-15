import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import "./navLink.scss";

// Custom hook for detecting clicks outside of a component
const useClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

const MobileNavLink = ({ item, onToggleSubmenu, onCloseMobileMenu }) => {
  const pathName = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navLinkRef = useRef(null);
  const submenuRef = useRef(null);
  const [submenuPosition, setSubmenuPosition] = useState("");

  // Adjust submenu position to ensure it's fully visible
  useEffect(() => {
    if (item.isOpen && submenuRef.current && navLinkRef.current) {
      const navRect = navLinkRef.current.getBoundingClientRect();
      const submenuRect = submenuRef.current.getBoundingClientRect();
      const windowWidth = window.innerWidth;

      // Check if submenu goes beyond right side of screen
      if (navRect.left + submenuRect.width > windowWidth) {
        setSubmenuPosition("right-0");
      }
      // Check if submenu goes beyond left side of screen
      else if (navRect.left - submenuRect.width < 0) {
        setSubmenuPosition("-left-10");
      } else {
        setSubmenuPosition("");
      }
    }
  }, [item.isOpen]);

  const isActive = () => {
    if (pathName === item.path) return true;
    if (hasSubmenu) {
      return item.submenu.some(sub => pathName === sub.path);
    }
    return false;
  };

  // Handle click outside to close submenu
  useClickOutside(navLinkRef, () => {
    if (item.isOpen) {
      onToggleSubmenu(null);
    }
  });

  const handleMainLinkClick = e => {
    if (hasSubmenu) {
      e.preventDefault();
      onToggleSubmenu(item.title);
    } else {
      onCloseMobileMenu(); // Close the mobile menu only for main links without submenus
    }
  };

  const handleSubmenuItemClick = () => {
    onCloseMobileMenu(); // Close the menu on submenu item click
    onToggleSubmenu(null); // Reset submenu state
  };

  const renderNestedNav = list => (
    <div className="nested-nav grid-cols-3 md:grid-cols-3">
      {list.map((nav, index) => (
        <Link
          href={nav.path}
          key={index}
          className="p-2 group rounded flex flex-col items-center text-[14px] justify-between border border-gray-300 hover:bg-gray-100"
          onClick={handleSubmenuItemClick}
        >
          <img src={nav.img} alt={nav.title} className="w-8 h-8" />
          <span className="text-center group-hover:text-[#2DA771] text-[12px]">
            {nav.title}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <div ref={navLinkRef} className="navLink relative">
      <div className="mainLink">
        <Link
          href={item.path}
          onClick={handleMainLinkClick}
          className={`menu_item ${isActive() ? "active" : ""}`}
        >
          {item.title}
        </Link>
        {hasSubmenu && (
          <Image
            src="/images_growstack/header/arrow.svg"
            alt="arrow"
            width={10}
            height={10}
            className={`arrow ${item.isOpen ? "arrowOpen" : ""}`}
          />
        )}
      </div>
      {hasSubmenu && (
        <div
          ref={submenuRef}
          className={`
            submenu
            absolute
            z-50
            bg-white
            shadow-lg
            rounded-lg
            w-[300px]
            max-w-[90vw]
            ${item.isOpen ? "block" : "hidden"}
            ${submenuPosition}
          `}
          style={{
            top: "100%",
          }}
        >
          {renderNestedNav(item.submenu)}
        </div>
      )}
    </div>
  );
};

export default MobileNavLink;
