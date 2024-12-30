import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import "./navLink.scss";

const NavLink = ({ item, onToggleSubmenu, onCloseMobileMenu }) => {
  const pathName = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navbarRef = useRef(null);

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
  };
  const [activeSection, setActiveSection] = useState("");

  const renderNestedNav = list => {
    const handleSectionClick = section => {
      if (activeSection === section) {
        setActiveSection(null);
      } else {
        setActiveSection(section);
      }
    };

    return (
      <div className="flex">
        <div className="flex flex-col bg-white rounded-xl shadow-lg">
          {/* Button and Dropdown Container 1 - BY TEAM */}
          <div className="flex relative">
            <div
              onClick={() => handleSectionClick("team")}
              className={`cursor-pointer bg-gradient-to-r w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "team"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className="flex items-center justify-center gap-3  px-4 whitespace-nowrap text-sm w-full text-center">
                BY TEAM
                <Image
                  src="/images_growstack/header/arrow.svg"
                  alt="arrow"
                  width={10}
                  height={10}
                />
              </h3>
            </div>

            {/* Team Dropdown - Positioned to the right */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "team"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
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

          {/* Button and Dropdown Container 2 - BY COMPANY */}
          <div className="flex relative">
            <div
              onClick={() => handleSectionClick("company")}
              className={`cursor-pointer bg-gradient-to-r  w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "company"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className="flex items-center justify-center gap-3 px-4 whitespace-nowrap text-sm w-full text-center">
                BY COMPANY
                <Image
                  src="/images_growstack/header/arrow.svg"
                  alt="arrow"
                  width={10}
                  height={10}
                />
              </h3>
            </div>

            {/* Company Dropdown - Positioned to the right */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "company"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
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

          {/* Button and Dropdown Container 3 - BY INDUSTRY */}
          <div className="flex relative">
            <div
              onClick={() => handleSectionClick("industry")}
              className={`cursor-pointer bg-gradient-to-r w-[150px] min-w-[150px] h-12 flex items-center justify-center transition-all duration-300 transform ${
                activeSection === "industry"
                  ? "scale-110 text-[#2DA771] font-semibold"
                  : "scale-105 text-black font-light"
              }`}
            >
              <h3 className=" flex items-center justify-center gap-3 px-4 whitespace-nowrap text-sm w-full text-center">
                BY INDUSTRY
                <Image
                  src="/images_growstack/header/arrow.svg"
                  alt="arrow"
                  width={10}
                  height={10}
                />
              </h3>
            </div>

            {/* Industry Dropdown - Positioned to the right */}
            <div
              className={`absolute left-[160px] top-0 transform transition-all duration-300 ease-in-out origin-left ${
                activeSection === "industry"
                  ? "opacity-100 scale-x-100 translate-x-0"
                  : "opacity-0 scale-x-0 -translate-x-1/4 pointer-events-none"
              }`}
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
        </div>
      </div>
    );
  };

  const renderNestedNavForFeatures = list => {
    return (
      <div className="flex justify-between rounded-xl">
        <div className="flex flex-row w-[320px]">
          {/* <div
            className="border-b rounded-tl-[20px] rounded-bl-[20px] rounded-r-[40px] bg-gradient-to-r from-[#2DA771]/100  to-[#008F50]/100 text-white w-full max-w-[60px] flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-sm hover:shadow-indigo-500/70 transition-all duration-300 transform scale-105"
            style={{
              backdropFilter: "blur(3px)", // Additional blur to enhance the fog effect
            }}
          >
            {" "}
            <h3 className="font-extrabold whitespace-nowrap text-sm -rotate-90">
              FEATURES
            </h3>
          </div> */}
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
    <div className="navLink">
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
              : "" || item.title === "Features"
                ? "submenufeatures"
                : "submenu"
          }
          style={{ display: item.isOpen ? "block" : "none" }}
        >
          {item.title === "Solutions"
            ? renderNestedNav(item.submenu)
            : item.title === "Features"
              ? renderNestedNavForFeatures(item.submenu)
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
