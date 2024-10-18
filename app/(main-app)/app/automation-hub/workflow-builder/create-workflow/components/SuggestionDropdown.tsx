import { MenuIcon } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

interface SuggestionDropdownProps {
  handleSubOptionClick: (subOption: SubOption) => void;
  setSuggestionOptions: (params: any) => void;
  dropdownRef: any;
  suggestionOptions: SuggestionOption[];
  isDropdownVisible: boolean;
}

type SuggestionOption = {
  type: string;
  name: string;
  label: string;
  icon: any;
  index: number;
  isExpanded: boolean;
  subOptions: SubOption[];
  show: boolean;
};

type SubOption = {
  label: string;
  name: string;
  show: boolean;
};

const SuggestionDropdown = ({
  dropdownRef,
  isDropdownVisible,
  handleSubOptionClick,
  setSuggestionOptions,
  suggestionOptions,
}: SuggestionDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: any) => setSearchQuery(e.target.value);

  const toggleSuggestion = (index: number) => {
    setSuggestionOptions((prevState: SuggestionOption[]) =>
      prevState.map((option, i) => {
        if (i === index) {
          return {
            ...option,
            isExpanded: !option.isExpanded,
          };
        }
        return option;
      })
    );
  };

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    setSuggestionOptions((prevState: SuggestionOption[]) =>
      prevState.map(option => {
        return {
          ...option,
          show: option.subOptions.some(subOption =>
            subOption.label.toLowerCase().includes(query)
          ),
          subOptions: option.subOptions.map(subOption => ({
            ...subOption,
            show: subOption.label.toLowerCase().includes(query),
          })),
        };
      })
    );
  }, [searchQuery]);

  return (
    <>
      {isDropdownVisible && (
        <div
          className="dropdown border border-white shadow-md rounded-xl mt-2"
          ref={dropdownRef}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md w-full mb-2"
            placeholder="Search..."
          />
          {suggestionOptions.map(
            (suggestion, index) =>
              suggestion.show && (
                <div key={index} className="mb-2">
                  <div
                    className="flex w-full justify-between items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100"
                    onClick={() => toggleSuggestion(index)}
                  >
                    <div className="flex flex-row gap-x-2">
                      {/* <MenuIcon className='rounded-xl border border-x-white shadow-md' /> */}
                      <div className="flex items-center">{suggestion.icon}</div>
                      <span>{suggestion.label}</span>
                    </div>
                    <div className="text-gray-400">
                      <IoIosArrowDropdown
                        className={`transform ${
                          suggestion.isExpanded
                            ? "rotate-180 text-2xl"
                            : "text-2xl"
                        }`}
                      />
                    </div>
                  </div>
                  {suggestion.isExpanded &&
                    suggestion.subOptions.map(
                      (subOption, subIndex) =>
                        subOption.show && (
                          <div
                            key={subIndex}
                            className="flex items-center gap-3 cursor-pointer p-2 rounded-md hover:bg-gray-100 ml-8"
                            onClick={() => handleSubOptionClick(subOption)}
                          >
                            <div className="flex flex-row gap-x-2">
                              {" "}
                              {suggestion.icon} <div>{subOption.label}</div>
                            </div>
                          </div>
                        )
                    )}
                </div>
              )
          )}
        </div>
      )}
    </>
  );
};

export default SuggestionDropdown;
