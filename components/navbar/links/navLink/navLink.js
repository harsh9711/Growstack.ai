import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import "./navLink.scss";

const NavLink = ({ item, onToggleSubmenu, onCloseMobileMenu }) => {
  const pathName = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navbarRef = useRef(null);
  const [activeSection, setActiveSection] = useState("");

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = event => {
      // Check if click is outside the entire navbar component
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        // Close all menus
        onToggleSubmenu(null);
        setActiveSection("");
      }
    };

    // Only add listener if any menu is open
    if (item.isOpen || activeSection) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggleSubmenu, item.isOpen, activeSection]);

  const isActive = () => {
    if (pathName === item.path) return true;
    if (hasSubmenu) {
      return item.submenu.some(sub => pathName === sub.path);
    }
    return false;
  };

  const handleMainLinkClick = e => {
    if (hasSubmenu) {
      e.preventDefault();
      onToggleSubmenu(item.title);
    }
    onCloseMobileMenu();
  };

  const handleSubmenuItemClick = () => {
    onCloseMobileMenu();
    onToggleSubmenu(null);
    setActiveSection("");
  };

  const handleSectionClick = (section, event) => {
    // Stop event propagation to prevent closing the main menu
    event.stopPropagation();

    if (activeSection === section) {
      setActiveSection("");
    } else {
      setActiveSection(section);
    }
  };

  const renderNestedNav = list => {
    return (
      <div className="flex">
        <div className="flex flex-col bg-white rounded-xl shadow-lg">
          {/* Button and Dropdown Container 2 - COMPANY */}
          <div className="flex relative">
            <div
              onClick={e => handleSectionClick("company", e)}
              className={`cursor-pointer bg-gradient-to-r w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "company"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className="flex px-4 whitespace-nowrap text-sm w-full text-center">
                <div className="w-full flex items-center justify-between px-2">
                  Company
                  <Image
                    src="/images_growstack/header/arrow.svg"
                    alt="arrow"
                    width={10}
                    height={10}
                  />
                </div>
              </h3>
            </div>

            {/* Company Dropdown */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "company"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
                <div className="grid grid-cols-3 gap-1">
                  {list.slice(9, 13).map(
                    (nav, index) =>
                      nav && (
                        <Link
                          href={nav.path}
                          key={index}
                          className={`p-2 group rounded flex flex-row items-center max-w-[300px] text-[16px] gap-6 justify-between
                transition-all duration-300 ease-in-out transform
                hover:scale-105 hover:bg-gray-50
                ${index % 3 !== 0 ? "border-l" : ""}
                ${index % 3 !== 2 ? "border-r" : ""}
                ${index < 6 ? "border-b" : ""}
                border-gray-300`}
                          onClick={handleSubmenuItemClick}
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation:
                              activeSection === "team"
                                ? "fadeIn 0.5s ease-in-out forwards"
                                : "none",
                          }}
                        >
                          <span className="flex flex-col gap-2 w-full items-center">
                            <img
                              src={nav.img}
                              alt={nav.title}
                              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-center group-hover:text-[#2DA771] sm:text-[13px] text-[10px] w-full transition-colors duration-300">
                              {nav.title}
                            </span>
                          </span>
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Button and Dropdown Container 3 - INDUSTRY */}
          <div className="flex relative">
            <div
              onClick={e => handleSectionClick("industry", e)}
              className={`cursor-pointer bg-gradient-to-r w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "industry"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className="flex px-4 whitespace-nowrap text-sm w-full text-center">
                <div className="w-full flex items-center justify-between px-2">
                  Industry
                  <Image
                    src="/images_growstack/header/arrow.svg"
                    alt="arrow"
                    width={10}
                    height={10}
                  />
                </div>
              </h3>
            </div>

            {/* Industry Dropdown */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "industry"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
                <div className="grid grid-cols-3 gap-1">
                  {list.slice(13).map(
                    (nav, index) =>
                      nav && (
                        <Link
                          href={nav.path}
                          key={index}
                          className={`p-2 group rounded flex flex-row items-center max-w-[300px] text-[16px] gap-6 justify-between
                transition-all duration-300 ease-in-out transform
                hover:scale-105 hover:bg-gray-50
                ${index % 3 !== 0 ? "border-l" : ""}
                ${index % 3 !== 2 ? "border-r" : ""}
                ${index < 6 ? "border-b" : ""}
                border-gray-300`}
                          onClick={handleSubmenuItemClick}
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation:
                              activeSection === "team"
                                ? "fadeIn 0.5s ease-in-out forwards"
                                : "none",
                          }}
                        >
                          <span className="flex flex-col gap-2 w-full items-center">
                            <img
                              src={nav.img}
                              alt={nav.title}
                              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-center group-hover:text-[#2DA771] sm:text-[13px] text-[10px] w-full transition-colors duration-300">
                              {nav.title}
                            </span>
                          </span>
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Button and Dropdown Container 1 - TEAM */}
          <div className="flex relative">
            <div
              onClick={e => handleSectionClick("team", e)}
              className={`cursor-pointer bg-gradient-to-r w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "team"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className="flex px-4 whitespace-nowrap text-sm w-full text-center">
                <div className="w-full flex items-center justify-between px-2">
                  Team
                  <Image
                    src="/images_growstack/header/arrow.svg"
                    alt="arrow"
                    width={10}
                    height={10}
                  />
                </div>
              </h3>
            </div>

            {/* Team Dropdown */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "team"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
              onClick={e => e.stopPropagation()}
            >
              <div className="bg-white rounded-lg shadow-lg p-4 w-[300px]">
                <div className="grid grid-cols-3 gap-1">
                  {list.slice(0, 9).map(
                    (nav, index) =>
                      nav && (
                        <Link
                          href={nav.path}
                          key={index}
                          className={`p-2 group rounded flex flex-row items-center max-w-[300px] text-[16px] gap-6 justify-between
                transition-all duration-300 ease-in-out transform
                hover:scale-105 hover:bg-gray-50
                ${index % 3 !== 0 ? "border-l" : ""}
                ${index % 3 !== 2 ? "border-r" : ""}
                ${index < 6 ? "border-b" : ""}
                border-gray-300`}
                          onClick={handleSubmenuItemClick}
                          style={{
                            animationDelay: `${index * 50}ms`,
                            animation:
                              activeSection === "team"
                                ? "fadeIn 0.5s ease-in-out forwards"
                                : "none",
                          }}
                        >
                          <span className="flex flex-col gap-2 w-full items-center">
                            <img
                              src={nav.img}
                              alt={nav.title}
                              className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                            />
                            <span className="text-center group-hover:text-[#2DA771] sm:text-[13px] text-[10px] w-full transition-colors duration-300">
                              {nav.title}
                            </span>
                          </span>
                        </Link>
                      )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderNestedNavForAIStudio = list => {
    return (
      <div className="flex justify-between rounded-xl">
        <div className="flex flex-row w-[320px]">
          <div className="grid grid-cols-3 m-4 border-gray-300">
            {list.slice(0, 9).map(
              (nav, index) =>
                nav && (
                  <Link
                    href={nav.path}
                    key={index}
                    className={`p-2 group rounded flex flex-row items-center max-w-[150px] text-[16px] gap-6 justify-between transition-all duration-300 ease-in-out transform hover:scale-105
                  ${index % 3 !== 0 ? "border-l" : ""} 
                  ${index % 3 !== 2 ? "border-r" : ""} 
                  ${index < 6 ? "border-b" : ""} 
                  border-gray-300`}
                    onClick={handleSubmenuItemClick}
                  >
                    <span className="flex flex-col gap-2 w-full items-center">
                      <img src={nav.img} alt={nav.title} className="w-6 h-6" />
                      <span className="text-center group-hover:text-[#2DA771] sm:text-[13px] text-[10px] w-full">
                        {nav.title}
                      </span>
                    </span>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="navLink" ref={navbarRef}>
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
          className={
            item.title === "Solutions"
              ? "submenusolutions"
              : "" || item.title === "AI Studio"
                ? "submenufeatures"
                : "submenu"
          }
          style={{ display: item.isOpen ? "block" : "none" }}
        >
          {item.title === "Solutions"
            ? renderNestedNav(item.submenu)
            : item.title === "AI Studio"
              ? renderNestedNavForAIStudio(item.submenu)
              : item.submenu.map(sub => (
                  <Link
                    key={sub.title}
                    href={sub.path}
                    className="submenu_item"
                    onClick={handleSubmenuItemClick}
                  >
                    {sub.title}
                  </Link>
                ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
