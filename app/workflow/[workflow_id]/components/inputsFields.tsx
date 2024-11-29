import React, { useRef, useState, useEffect } from "react";

interface Parameter {
  label: string;
  type: string;
  required: boolean;
  options: any[];
  description: string;
}

interface DynamicInputProps {
  param: Parameter;
  key: string;
  inputKey: string;
  visibleTooltip: { [key: string]: boolean };
  toggleTooltip: (key: string, isVisible: boolean) => void;
  handleInputChange: (key: string, type: string, value: string) => void;
}

interface Option {
  value: string;
  label: string;
  imageUrl: string;
}

interface AddFieldDropdownProps {
  options: Option[];
  onSelect: (option: Option) => void;
  inputKey: string;
}

const options = [
  { label: "Short Text", value: "Short Text", imageUrl: "short-single.svg" },
  { label: "Long Text", value: "Long Text", imageUrl: "long-single.svg" },
  { label: "Boolean", value: "Boolean", imageUrl: "boolean-single.svg" },
  { label: "Number", value: "Number", imageUrl: "number-single.svg" },
  {
    label: "File Upload",
    value: "File Upload",
    imageUrl: "uploadfile-single.svg",
  },
  { label: "Checklist", value: "Checklist", imageUrl: "checklist-single.svg" },
];

const getTypeFromParam = (paramType: string): string => {
  return paramType.split("_")[0];
};

const InputFields = ({ param, inputKey, handleInputChange }: any) => {
  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1 relative">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}{" "}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input1")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input1" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>
      <div className="input-group">
        <input
          type={getTypeFromParam(param.type)}
          value={param?.value || ""}
          placeholder={param.placeholder || ""}
          className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
          required={!!param.required}
          onChange={e =>
            handleInputChange(inputKey, param.type, e.target.value)
          }
        />
        {param?.error && (
          <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
        )}
      </div>
    </div>
  );
};

const TextAreaField = ({ param, inputKey, handleInputChange }: any) => {
  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div className="input-box mb-3">
      <div className="label-box flex items-center gap-2 relative mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}{" "}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input2")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input2" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>

      <div className="input-group">
        <textarea
          rows={5}
          placeholder={param.placeholder || ""}
          className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
          onChange={e =>
            handleInputChange(inputKey, param.type, e.target.value)
          }
        />
        {/* {input.includes('$') && (
          <ul>
            {suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        )} */}
      </div>
    </div>
  );
};

const Slider = ({ param, inputKey, handleInputChange }: any) => {
  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div className="input-box mb-3">
      <div className="label-box flex items-center gap-2 relative mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}{" "}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input3")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input3" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>

      <div className="input-group">
        <div className="range-slider-box flex w-full mx-auto items-center justify-center">
          <div className="py-1 relative w-full">
            <div className="h-2 bg-[#F2F2F2] rounded-full">
              <div
                className="absolute h-2 rounded-full bg-[#2DA771]"
                style={{ width: "57.194%", left: "0" }}
              ></div>
              <div
                className="absolute h-4 w-4 bg-[#2DA771] shadow border border-[#2DA771] rounded-full cursor-pointer"
                unselectable="on"
                style={{ left: "53.571%", top: "0" }}
              >
                <span className="sr-only">Slider thumb</span>
              </div>
            </div>
          </div>
        </div>

        <div className="range-text flex items-center justify-between">
          <span className="text-[12px] font-medium text-[#5B5D60]">0</span>

          <span className="text-[12px] font-medium text-[#5B5D60]">1</span>
        </div>
      </div>
    </div>
  );
};

const BooleanField = ({ param, inputKey, handleInputChange }: any) => {
  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div
      key={inputKey}
      className="input-box flex items-center justify-between mb-3"
    >
      <div className="label-box flex gap-2 items-center mb-1 relative">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input4")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input4" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>
      <div className="flex items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type={getTypeFromParam(param.type)}
            className="sr-only peer"
            checked={!!param.value}
            onChange={e =>
              handleInputChange(inputKey, param.type, e.target.checked)
            }
          />
          <div className="w-11 h-6 bg-gray-300 shadow-md peer-focus:outline-none peer-focus:ring-2-none peer-focus:ring-none rounded-full peer-checked:bg-[#2DA771]"></div>
          <div className="peer-checked:translate-x-5 absolute left-0 top-0 m-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
        </label>
      </div>
    </div>
  );
};

const DropDown = ({ param, inputKey, handleInputChange }: any) => {
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const selectOption = (option: Option) => {
    setSelectedOption(option);
    // setIsOpen(false);
    // onSelect(option);
  };

  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1 relative">
        <label className="text-[12px] text-[#14171B] font-medium">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input5")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input5" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>
      <div className="input-group">
        <select
          id="options"
          name="options"
          className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
          required={!!param.required}
          value={param?.value || ""}
          onChange={e =>
            handleInputChange(inputKey, param.type, e.target.value)
          }
        // value={param?.value || ""}
        >
          {param?.options &&
            param.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

const SelectOption = ({ param, inputKey }: any) => {
  console.log("SelectOption", param);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>

        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input6")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input6" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>

      <div className="input-group border-0 relative overflow-hidden">
        <input
          type="text"
          placeholder="Add option"
          className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
        />

        <button
          className="option-button absolute right-2 top-4"
          onClick={toggleDropdown}
        >
          <img
            src="/assets/node_icon/add-option-icon.svg"
            alt="add option icon"
          />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 left-0 z-10 mx-auto w-[360px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {param?.options &&
              param.options.map((option: string, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                >
                  {option}
                </a>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CheckboxField = ({ param, inputKey, handleInputChange }: any) => {
  console.log(param);

  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  return (
    <div key={inputKey} className="input-box mt-3 mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          <span>
            {param.required && <span className="text-[#CF0000]">*</span>}
          </span>
        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input6")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input6" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}
      </div>

      {param?.options &&
        param.options.map((option: string, index: number) => (
          <div className="flex items-center space-x-2 mt-2" key={index}>
            <input
              type="checkbox"
              id="example"
              className="h-[16px] w-[16px] rounded border-[0.5px] border-[#E2E2E2] text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="example"
              className="text-sm font-medium text-[#14171B]"
            >
              {option}
            </label>
          </div>
        ))}
    </div>
  );
};

const UploadButton = ({ param, inputKey, handleInputChange }: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const [isHovered, setIsHovered] = useState(null);

  const handleMouseEnter = (inputName: any) => {
    setIsHovered(inputName);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };
  return (
    <div className="input-box mb-3">
      <div className="label-box flex items-center gap-2 relative mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}

        </label>
        <button
          className="relative"
          onMouseEnter={() => handleMouseEnter("input6")}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src="/assets/node_icon/info-circle.svg"
            alt="info icon"
            className="relative"
          />
        </button>

        {isHovered === "input6" && (
          <div className="absolute bottom-full left-[60px] mb-2 w-[250px] bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2 break-words before:absolute before:left-[25px] before:bottom-0 before:w-[12px] before:h-[0px] before:bg-white before:border-[1px] before:border-[#fff] before:z-10">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              {param.description}
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-7px] left-[25px]"
            />
          </div>
        )}

        {/* {isHovered === "input1" && (
          <div className="absolute bottom-full mb-2 w-full bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2">
            <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
              Provide a brief, descriptive text about the subject
              matter or main focus. This field allows you to specify
              the topic that will be used throughout the workflow.
            </p>

            <img
              src="/assets/node_icon/Polygon-shape.svg"
              alt="polygon shape"
              className="absolute bottom-[-8px] left-0 right-[46px] mx-auto"
            />
          </div>
        )} */}
      </div>

      <div className="upload-image-button">
        <input
          type="file"
          accept={param?.value || ""}
          ref={fileInputRef}
          className="hidden"
        />
        <button
          className="w-full h-[40px] font-medium bg-[#2DA771] text-white text-[14px] rounded-[10px] flex items-center justify-center gap-2"
          onClick={handleButtonClick}
        >
          <img src="/assets/node_icon/file-upload-icon.svg" />
          {param.placeholder || "Upload file"}
        </button>
      </div>
    </div>
  );
};

const MultiSelectDropdown = ({ param, inputKey, handleInputChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const multiselectItems: string[] = [];

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleInputSelectChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleSelectItem = (item: string) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleRemoveItem = (item: string) => {
    setSelectedItems(selectedItems.filter(selected => selected !== item));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === "Enter" &&
      inputValue.trim() &&
      !selectedItems.includes(inputValue.trim())
    ) {
      setSelectedItems([...selectedItems, inputValue.trim()]);
      setInputValue("");
      e.preventDefault();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div>
      <label className="font-medium text-[#14171B] text-[12px]">
        {param.label}{" "}
        {param.required && <span className="text-[#CF0000]">*</span>}
      </label>
      <div
        key={inputKey}
        ref={containerRef}
        className="relative w-full max-w-md mx-auto"
      >
        <div className="flex flex-wrap gap-2 items-center p-3 rounded-[10px] bg-[#F2F2F2]">
          {selectedItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center bg-[#2DA771] text-[#fff] px-3 py-1 rounded-full text-sm"
            >
              {item}
              <button
                onClick={() => handleRemoveItem(item)}
                className="ml-2 text-[#fff] hover:text-[#fff]"
              >
                &times;
              </button>
            </div>
          ))}

          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputSelectChange}
            onClick={handleInputClick} // Toggle dropdown on input click
            onFocus={() => setIsOpen(true)} // Open on focus
            onKeyDown={handleInputKeyDown}
            placeholder="Add Option"
            className="flex-grow bg-transparent outline-none text-[#14171B] text-sm font-medium"
          />
        </div>

        <button
          onClick={toggleDropdown}
          className="absolute right-2 top-4 text-gray-500 hover:text-gray-700"
        >
          <img
            src="/assets/node_icon/add-option-icon.svg"
            alt="add item"
            className="w-5 h-5"
          />
        </button>

        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute w-full bg-white border-[0.5px] border-[#EBEBEB] rounded-[5px] shadow-xl z-10 p-3"
          >
            <div className="py-1 max-h-60 overflow-y-auto">
              {multiselectItems.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={() => handleSelectItem(item)}
                  className={`block p-2 pt-1 pb-1 mb-1 text-[11px] text-[#14171B] hover:bg-[#2da7711a] hover:text-[#2DA771] rounded-[5px] cursor-pointer ${selectedItems.includes(item)
                    ? "bg-[#2da7711a] text-[#2DA771]"
                    : ""
                    }`}
                >
                  {item}
                </a>
              ))}
              {inputValue && !multiselectItems.includes(inputValue) && (
                <a
                  href="#"
                  onClick={() => handleSelectItem(inputValue.trim())}
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-blue-100 rounded-md cursor-pointer"
                >
                  {inputValue.trim()}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const AddFieldDropdown: React.FC<AddFieldDropdownProps> = ({
  options,
  onSelect,
  inputKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div key={inputKey} className="input-box mt-4 mb-3">
      <div className="custom-select-box relative bg-white w-full">
        <div
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full p-3 bg-white border-[2px] border-[#2DA771] rounded-[10px] cursor-pointer"
        >
          {!selectedOption ? (
            <div className="flex items-center space-x-2">
              <img
                src="/assets/node_icon/add-option-icon.svg"
                alt="add icon"
                className="w-[17px] h-[20px]"
              />
              <span className="text-14 font-400 text-[#2DA771]">
                Add New Field
              </span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <img
                src={`/assets/node_icon/${selectedOption.imageUrl}`}
                alt={selectedOption.label}
                className="w-[17px] h-[20px]"
              />
              <span className="text-14 font-400 text-[#2DA771]">
                {selectedOption.label}
              </span>
            </div>
          )}
          <img
            src="/assets/node_icon/chevron-down.svg"
            alt="arrow down icon"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        {isOpen && (
          <div className="absolute left-0 w-full bg-white border-[0.5px] border-[#EBEBEB] rounded-[5px] shadow-xl z-10 p-3">
            {options.map(option => (
              <div
                key={option.value}
                onClick={() => selectOption(option)}
                className="flex items-center justify-between rounded-[5px] p-2 pt-1 pb-1 mb-1 cursor-pointer text-[#14171B] text-[11px] font-[500] hover:bg-[#2da7711a] hover:text-[#2DA771]"
              >
                <span>{option.label}</span>
                <img
                  src={`/assets/node_icon/${option.imageUrl}`}
                  alt={option.label}
                  className="w-[16px] h-[16px] object-contain mr-2"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DynamicInput: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  visibleTooltip,
  toggleTooltip,
  handleInputChange,
}) => {
  switch (param.type) {
    case "text_input_label":
    case "text_placeholder":
    case "text_default_value":
    case "text_description":
    case "text_variable_name":
    case "text_topic":
    case "text_overview":
    case "text":
    case "number":
      return (
        <InputFields
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "checkbox_show_preview":
    case "checkbox_required":
    case "checkbox":
      return (
        <BooleanField
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "dropdown_file_type":
    case "dropdown_model_selection":
    case "dropdown":
    case "dropdownn_model":
    case "dropdown_quality":
    case "dropdown_options":
      return (
        <DropDown
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "select_option":
      return (
        <SelectOption
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "checkbox_field":
      return <CheckboxField param={param} inputKey={inputKey} />;
    case "text_area":
    case "textarea_system_prompt":
    case "textarea_input_prompt":
    case "textarea_prompt":
      return (
        <TextAreaField
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "slider":
    case "slider_creativity_level":
      return (
        <Slider
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "button_upload":
      return (
        <UploadButton
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    case "multiselect_dropdown":
      return (
        <MultiSelectDropdown
          param={param}
          inputKey={inputKey}
          handleInputChange={handleInputChange}
        />
      );
    default:
      return null;
  }
};

export default DynamicInput;
