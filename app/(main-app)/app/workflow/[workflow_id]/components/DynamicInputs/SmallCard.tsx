import React from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";
import { useAppSelector } from "@/lib/hooks";

const SmallCardFiled: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  const { avatars } = useAppSelector(state => state.avatarVoice);

  return (
    <div className="input-box mt-3 mb-3">
      <div className="label-box flex gap-2 items-center mb-1">
        <label className="font-medium text-[#14171B] text-[12px]">
          {param.label}
          <span>
            {param.required && <span className="text-[#CF0000]">*</span>}
          </span>
        </label>
        <Tooltip
          description={param?.description || ""}
          position="bottom-full left-[-23px]"
        />
        {param?.error && (
          <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
        )}
      </div>

      <div className="avatar-main-box nowheel max-h-[250px] overflow-y-scroll overflow-x-hidden">
        <div className="grid grid-cols-4 gap-2">
          {avatars?.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col items-center rounded-[10px] shadow-sm p-2 relative cursor-pointer ${param.value === item.id ? "bg-[#2DA771]" : "bg-[#F8F8FA]"
                }`}
              onClick={() => handleInputChange(inputKey, param.type, item.id)}
            >
              <img
                src={item.thumbnailUrl}
                alt={item.name}
                className="w-[45px] h-[45px] object-cover rounded-[10px]"
              />
              <p className={`text-[10px] mt-2 text-center  ${param.value === item.id ? "text-white" : "text-gray-600"} `}>
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmallCardFiled;
