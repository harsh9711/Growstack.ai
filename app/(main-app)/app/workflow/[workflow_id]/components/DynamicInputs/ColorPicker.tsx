import React, { useState } from "react";

interface ColorPickerProps {
  param: any;
  inputKey: string;
  handleInputChange: (key: string, type: string, value: any) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedColor = param.value || "#ff0000"; // Default to red

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    handleInputChange(inputKey, "color_picker", newColor);
  };

  return (
    <div className="relative">
      <label className="text-[15px]">{param.label || "Pick a Color"}</label>
      <div
        className="w-full p-4 h-[46px] border border-gray-100 bg-[#F5F5F5] rounded-lg mt-2 flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm">
          {selectedColor ? "Color Selected" : "Select a color"}
        </span>
        <div
          className="w-6 h-6 rounded-full"
          style={{ backgroundColor: selectedColor }}
        />
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg p-4">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
