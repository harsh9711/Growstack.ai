import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRef, useEffect } from "react";
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

  const renderNestedNav = list => (
    <div className="flex justify-between rounded-xl">
      <div className="flex flex-row ">
        <div
          className="border-b rounded-tl-[20px] rounded-bl-[20px] rounded-r-[40px] bg-gradient-to-r from-[#2DA771]/100  to-[#008F50]/100 text-white w-full max-w-[60px] flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-sm hover:shadow-indigo-500/70 transition-all duration-300 transform scale-105"
          style={{
            backdropFilter: "blur(3px)",
          }}
        >
          <h3 className="font-extrabold whitespace-nowrap text-sm -rotate-90">
            BY TEAM
          </h3>
        </div>

        <div className="grid grid-cols-3 m-4 border-gray-300">
          {list.slice(0, 9).map(
            (nav, index) =>
              nav && (
                <Link
                  href={nav.path}
                  key={index}
                  className={`p-2 group rounded flex flex-row items-center max-w-[300px] text-[16px] gap-6 justify-between transition-all duration-300 ease-in-out transform hover:scale-105
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

      <div className="flex flex-row">
        <div
          className="border-b rounded-tl-[20px] rounded-bl-[20px] rounded-r-[40px] bg-gradient-to-r from-[#2DA771]/100  to-[#008F50]/100 text-white w-full max-w-[60px] flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-sm hover:shadow-indigo-500/70 transition-all duration-300 transform scale-105"
          style={{
            backdropFilter: "blur(3px)", // Additional blur to enhance the fog effect
          }}
        >
          {" "}
          <div className="-rotate-90 flex flex-row">
            <h3 className="font-extrabold whitespace-nowrap text-sm">
              BY INDUSTRY
            </h3>
            <div className="border border-gray-300 w-full h-6 mx-4"></div>
            <h3 className="font-extrabold whitespace-nowrap text-sm">
              BY COMPANY
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-4 m-4 border-gray-300">
          {list.slice(9).map(
            (nav, index) =>
              nav && (
                <Link
                  href={nav.path}
                  key={index}
                  className={`p-2 rounded group flex flex-row items-center max-w-[300px] text-[16px] gap-6 justify-between transition-all duration-300 ease-in-out transform hover:scale-105
                  ${index % 4 !== 0 ? "border-l" : ""} 
                  ${index % 4 !== 3 ? "border-r" : ""} 
                  ${index < 8 ? "border-b" : ""} 
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

  const renderNestedNavForFeatures = list => {
    return (
      <div className="flex justify-between rounded-xl">
        <div className="flex flex-row">
          <div
            className="border-b rounded-tl-[20px] rounded-bl-[20px] rounded-r-[40px] bg-gradient-to-r from-[#2DA771]/100  to-[#008F50]/100 text-white w-full max-w-[60px] flex items-center justify-center shadow-lg shadow-indigo-500/40 hover:shadow-sm hover:shadow-indigo-500/70 transition-all duration-300 transform scale-105"
            style={{
              backdropFilter: "blur(3px)", // Additional blur to enhance the fog effect
            }}
          >
            {" "}
            <h3 className="font-extrabold whitespace-nowrap text-sm -rotate-90">
              FEATURES
            </h3>
          </div>
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
