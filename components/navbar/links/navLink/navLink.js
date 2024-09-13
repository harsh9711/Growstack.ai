import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useRef, useEffect } from "react";
import "./navLink.scss";
import 'bootstrap/dist/css/bootstrap.min.css';



const NavLink = ({ item, onToggleSubmenu, onCloseMobileMenu }) => {
  const pathName = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const navbarRef = useRef(null);

  const isActive = () => {
    if (pathName === item.path) return true;
    if (hasSubmenu) {
      return item.submenu.some((sub) => pathName === sub.path);
    }
    return false;
  };

  const handleMainLinkClick = (e) => {
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
  const renderNestedNav = (list) => {
    return (
      <div className="flex justify-between gap-4 w-full">
        <div className="flex flex-col ">
          <h3 className="font-extrabold text-sm text-gray-300 my-2">Company Type</h3>
          <div className="grid grid-cols-1">
            {list.slice(0, 4).map((nav) => {
              if (nav) {
                return (
                  <Link
                  href={nav.path}
                  key={nav.title}
                  className="p-2 rounded flex flex-row items-center max-w-[250px] whitespace-nowrap text-lg gap-2 justify-between hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleSubmenuItemClick}
                >
                  <span className="flex gap-2 items-center overflow-hidden">
                    <img
                      src={nav.img}
                      alt={nav.title}
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <span className="truncate">{nav.title}</span>
                  </span>
                  <img
                    src="/images_growstack/header/arrow.svg"
                    alt="arrow"
                    className="w-2 h-2 flex-shrink-0"
                  />
                </Link>
                );
              }
            })}
          </div>
        </div>

        <div className=" px-2 flex  ">
          <div className="border-1 border-gray-300 h-full rounded-2xl"></div>
        </div>

        <div className="flex flex-col  ">
          <h3 className="font-extrabold text-gray-300  text-sm my-2">Teams</h3>
          <div className="grid grid-cols-2 gap-x-10  ">
            {list.slice(4, 12).map((nav) => {
              if (nav) {
                return (
                  <Link
                  href={nav.path}
                  key={nav.title}
                  className="p-2 rounded flex flex-row items-center max-w-[250px] whitespace-nowrap text-lg gap-2 justify-between hover:bg-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleSubmenuItemClick}
                >
                  <span className="flex gap-2 items-center overflow-hidden">
                    <img
                      src={nav.img}
                      alt={nav.title}
                      className="w-6 h-6 flex-shrink-0"
                    />
                    <span className="truncate">{nav.title}</span>
                  </span>
                  <img
                    src="/images_growstack/header/arrow.svg"
                    alt="arrow"
                    className="w-2 h-2 flex-shrink-0"
                  />
                </Link>
                
                );
              }
            })}
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
            item.title === "Solutions" ? "submenusolutions" : "submenu"
          }
          style={{ display: item.isOpen ? "block" : "none" }}
        >
          {item.title === "Solutions"
            ? renderNestedNav(item.submenu)
            : item.submenu.map((sub) => (
                <Link
                  key={sub.title}
                  href={sub.path}
                  className="submenu_item"
                  onClick={handleSubmenuItemClick}
                >
                  {sub.title}{" "}
                  <img src="/images_growstack/header/arrow.svg" alt="arrow" />
                </Link>
              ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
