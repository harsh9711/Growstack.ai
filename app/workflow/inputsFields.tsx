import React, { useState } from "react";

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

const getTypeFromParam = (paramType: string): string => {
  return paramType.split("_")[0];
};

const InputFields = ({ param, inputKey, handleInputChange }: any) => {
  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1 relative">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}{" "}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <span
          // onMouseEnter={() => toggleTooltip(key, true)}
          // onMouseLeave={() => toggleTooltip(key, false)}
          className="cursor-pointer"
        >
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
          {/* {visibleTooltip[key] && (
                        <div className="absolute bottom-[80%] left-[140px] transform -translate-x-1/2 mb-2 w-max bg-white text-black text-xs p-2 rounded shadow-lg z-10">
                            {param.description}
                        </div>
                    )} */}
        </span>
      </div>
      <div className="input-group">
        <input
          type={getTypeFromParam(param.type)}
          value={param?.value || ""}
          placeholder={`Enter ${param.label.toLowerCase()}`}
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

const BooleanField = ({ param, inputKey, handleInputChange }: any) => {
  return (
    <div
      key={inputKey}
      className="input-box flex items-center justify-between mb-3"
    >
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
        </label>
        <span>
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
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

const DropDown = ({ param, inputKey }: any) => {
  console.log("DropDown", param);
  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>
        <span>
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
      </div>
      {/* <div className="input-group">
                <input
                    type="text"
                    placeholder={`Select the allowed ${param?.label.toLowerCase()} for upload`}
                    className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                />
            </div> */}

      <div className="input-group relative">
        <select
          className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none appearance-none"
          defaultValue=""
          required={!!param.required}
          value={param?.value || ""}
        >
          <option value="" disabled>
            {`Select the allowed ${param?.label.toLowerCase()} for upload`}
          </option>
          {param?.options &&
            param.options.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
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
  return (
    <div key={inputKey} className="input-box mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          {param.required && <span className="text-[#CF0000]">*</span>}
        </label>

        <span>
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
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

  return (
    <div key={inputKey} className="input-box mt-3 mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          <span>
            {param.required && <span className="text-[#CF0000]">*</span>}
          </span>
        </label>
        <span>
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
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

const UploadFileButton = ({ param, inputKey, handleInputChange }: any) => {
  console.log(param);

  return (
    <div key={inputKey} className="input-box mt-3 mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          <span>
            {param.required && <span className="text-[#CF0000]">*</span>}
          </span>
        </label>
        <span>
          <img src="/assets/node_icon/info-circle.svg" alt="info icon" />
        </span>
      </div>

      <div className="upload-file-button mb-4">
        <button className="w-full h-[40px] font-medium bg-[#2DA771] text-white text-[14px] rounded-[10px] flex items-center justify-center gap-2">
          <img src="/assets/node_icon/file-upload-icon.svg" />
          Upload file
        </button>

        <h3 className="text-center text-[12px] text-[#5B5D60] font-medium mt-3">(.pdf, .doc, .docx)</h3>
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
    case "dropdown":
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
    case "uploadfile_button":
      return <UploadFileButton param={param} inputKey={inputKey} />;
    default:
      return null;
  }
};

export default DynamicInput;
