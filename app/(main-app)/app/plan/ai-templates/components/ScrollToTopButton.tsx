"use client";

// components/ScrollToTopButton.tsx
import { useEffect, useState } from "react";
import { RiArrowUpDoubleLine } from "react-icons/ri";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    // if (window.scrollY > 300) {
    //   setIsVisible(true);
    // } else {
    //   setIsVisible(false);
    // }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 h-14 w-14 grid place-content-center rounded-xl shadow-2xl bg-primary-green hover:bg-opacity-90 text-white transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}>
      <RiArrowUpDoubleLine size={30} />
    </button>
  );
};

export default ScrollToTopButton;
