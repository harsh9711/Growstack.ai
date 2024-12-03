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

    useEffect(() => {
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

            <div
                className="nowheel flex items-center rounded-lg bg-white justify-center relative p-2 w-full h-[250px] overflow-y-auto scrollbar-none cursor-pointer"
                onWheel={e => {
                    e.stopPropagation();
                }}
                onScroll={e => {
                    const scrollContainer = e.currentTarget;
                    const indicator = scrollContainer.querySelector(
                        ".scroll-indicator"
                    ) as HTMLElement;
                    const scrollHeight =
                        scrollContainer.scrollHeight - scrollContainer.clientHeight;
                    const scrollTop = scrollContainer.scrollTop;

                    if (indicator) {
                        const progress = (scrollTop / scrollHeight) * 100;
                        (indicator as HTMLElement).style.height =
                            `${(scrollContainer.clientHeight / scrollContainer.scrollHeight) * 100}%`;
                        indicator.style.top = `${progress}%`;
                    }
                }}
            >
                <div className="grid grid-cols-4 gap-2">
                    {avatars?.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-[#F8F8FA] rounded-[10px] shadow-sm p-2 relative"
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
                <div
                    className="scroll-indicator absolute right-0 top-0 w-[3px] bg-[#2DA771] rounded-lg cursor-pointer"
                    style={{ height: "10%", top: "0%" }}
                ></div>
            </div>
        </div>
    );
};

export default SmallCardFiled;
