"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import './navLink.scss'

const NavLink = ({ item, onToggleSubmenu, onCloseMobileMenu }) => {
  const pathName = usePathname();
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  const isActive = () => {
    if (pathName === item.path) return true;
    if (hasSubmenu) {
      return item.submenu.some(sub => pathName === sub.path);
    }
    return false;
  };

  const handleMainLinkClick = (e) => {
    if (hasSubmenu) {
      e.preventDefault();
      onToggleSubmenu(item.title);
    } else {
      onCloseMobileMenu();
    }
  };

  const handleSubmenuItemClick = () => {
    onCloseMobileMenu();
    onToggleSubmenu(null);
  };

  return (
    <div className="navLink">
      <div className="mainLink">
        <Link href={item.path} onClick={handleMainLinkClick} className={`menu_item ${isActive() ? 'active' : ''}`}>
          {item.title}
        </Link>
        {hasSubmenu && (
          <Image
            src="/images/header/arrow.svg"
            alt="arrow"
            width={10}
            height={10}
            className={`arrow ${item.isOpen ? 'arrowOpen' : ''}`}
          />
        )}
      </div>
      {hasSubmenu && (
        <div className="submenu" style={{ display: item.isOpen ? 'block' : 'none' }}>
          {item.submenu.map(sub => (
            <Link key={sub.title} href={sub.path} className="submenu_item" onClick={handleSubmenuItemClick}>
              {sub.title} <img src="/images/header/arrow.svg" alt="arrow" />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavLink;
