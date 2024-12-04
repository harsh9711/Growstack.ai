import React, { useRef } from "react";
import Tooltip from "../tooltip/Tooltip";
import { DynamicInputProps } from "@/types/workflows";


const UploadButton: React.FC<DynamicInputProps> = ({ param, inputKey, handleInputChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="input-box mb-3">
            <div className="label-box flex items-center gap-2 relative mb-1">
                <label className="font-medium text-[#14171B] text-[12px]">
                    {param.label}
                    {param.required && <span className="text-[#CF0000]">*</span>}
                </label>
                <Tooltip
                    description={param?.description || ""}
                    position="bottom-full left-[-23px]"
                />
                {param?.error && (
                    <p className="ml-2 text-red-500 mt-1">{param?.error}</p>
                )}
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

export default UploadButton