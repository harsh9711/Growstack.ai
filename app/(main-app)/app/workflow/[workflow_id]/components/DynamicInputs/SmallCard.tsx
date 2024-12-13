import instance from "@/config/axios.config";
import React, { useEffect } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";

const SmallCardFiled: React.FC<DynamicInputProps> = ({
  param,
  inputKey,
  handleInputChange,
}) => {
  interface Avatar {
    thumbnailUrl: string;
    name: string;
    isActive: boolean;
  }

  const [avatars, setAvatars] = React.useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = React.useState<Avatar | null>(
    null
  );

  useEffect(() => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    if (savedAvatar) {
      setSelectedAvatar(JSON.parse(savedAvatar));
    }
    getAvatar();
  }, []);

  const getAvatar = async () => {
    try {
      const result = await instance.get("/ai/api/v1/video/avatars");
      setAvatars(result.data.data);
      console.log("----result---->", result);
    } catch (error) {
      console.log("----error---->", error);
    }
  };

  const selectAvatar = (avatar: Avatar) => {
    if (selectedAvatar?.name === avatar.name) {
      setSelectedAvatar(null);
      localStorage.removeItem("selectedAvatar");
    } else {
      setSelectedAvatar(avatar);
      localStorage.setItem("selectedAvatar", JSON.stringify(avatar));
    }
  };

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
              className={`flex flex-col items-center rounded-[10px] shadow-sm p-2 relative cursor-pointer ${
                selectedAvatar?.name === item.name
                  ? "bg-[#2DA7711A]"
                  : "bg-[#F8F8FA]"
              }`}
              onClick={() => selectAvatar(item)}
            >
              <img
                src={item.thumbnailUrl}
                alt={item.name}
                className="w-[45px] h-[45px] object-cover rounded-[10px]"
              />
              <p className="text-[10px] mt-2 text-center text-gray-600">
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
