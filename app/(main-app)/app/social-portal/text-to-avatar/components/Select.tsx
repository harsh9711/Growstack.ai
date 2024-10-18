import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative z-20 w-full">
      <div
        className="custom-select-trigger flex items-center justify-between border border-[#DEDEDE] bg-[#F5F5F5] h-[54px] w-full rounded-xl p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="select-menu"
      >
        <span>{value ? value : placeholder}</span>
        <div
          className="custom-arrow"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
        >
          <Image src="/arrowe.svg" width={10} height={10} alt="arrow" />
        </div>
      </div>

      {isOpen && (
        <ul
          id="select-menu"
          className="absolute z-20 mt-1 w-full bg-white border border-[#DEDEDE] rounded-xl shadow-lg"
          role="listbox"
        >
          {options.map(option => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className="p-2 hover:bg-[#F5F5F5] cursor-pointer"
              role="option"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
