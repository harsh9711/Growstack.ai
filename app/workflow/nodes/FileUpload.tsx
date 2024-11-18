import React, { useState } from "react";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type ChatGptNodeProps } from "./types";
import Image from "next/image";

const FileUploaded = ({ data, id }: NodeProps<ChatGptNodeProps>) => {
  const [isNextBoxOpen, setIsNextBoxOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleNextClick = () => {
    setIsNextBoxOpen(true);
  };

  const handleEditClick = () => {
    setIsNextBoxOpen(false);
  };
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div>
      <div className="long-text-box" id="large-box">
        <div className="long-text-info-image relative">
          <div className="long-text text-center">
            <h4 className="text-sm font-medium text-[#2DA771]">
              General input
            </h4>
            <span className="text-xs font-medium text-[#14171B]">
              (Upload file)
            </span>
          </div>

          <div className="text-image text-center">
            <img
              src="/assets/node_icon/uploaded-file-img.png"
              alt="long text icon"
              className="w-[140px] mx-auto"
            />
          </div>
          <div
            className="toggle-button-box absolute right-0 left-0 mx-auto bottom-[-10px] z-10 cursor-pointer"
            onClick={handleDropdownClick}
          >
            <img
              src="/assets/node_icon/toggle-switch.png"
              alt="toggle switch"
              className="w-[25px] mx-auto"
              style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
            />
          </div>
        </div>

        {isDropdownOpen && (
          <div className="long-text-form bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[400px] absolute left-1/2 transform -translate-x-1/2">
            {isNextBoxOpen ? (
              <>
                <div className="long-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-2">
                  <img
                    src="/assets/node_icon/file-icon.png"
                    alt="long text icon"
                    className="w-[20px] mb-2"
                  />

                  <h5 className="text-sm text-[#14171B] font-medium">
                    File upload
                  </h5>
                </div>

                <div className="select-sheet-heading mb-2">
                  <h5 className="text-sm text-[#14171B] font-medium">
                    Select Sheet
                  </h5>
                </div>

                <div className="form-box">
                  <div className="input-box mb-3">
                    <div className="label-box flex gap-2 items-center mb-1">
                      <label className="font-medium text-[#14171B] text-[12px]">
                        Input Label <span className="text-[#CF0000]">*</span>
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Enter field label"
                        className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="input-box mb-3">
                    <div className="label-box flex gap-2 items-center mb-1">
                      <label className="font-medium text-[#14171B] text-[12px]">
                        Description
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="input-group">
                      <textarea
                        rows={4}
                        placeholder="Enter description"
                        className="form-control focus:outline-none shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="input-box flex items-center justify-between mb-3">
                    <div className="label-box flex gap-2 items-center mb-1">
                      <label className="font-medium text-[#14171B] text-[12px]">
                        Required
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="flex items-center">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 shadow-md bg-gray-300 peer-focus:outline-none peer-focus:ring-2-none peer-focus:ring-none rounded-full peer-checked:bg-[#2DA771]"></div>
                        <div className="peer-checked:translate-x-5 absolute left-0 top-0 m-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                      </label>
                    </div>
                  </div>

                  <div className="input-box mb-3">
                    <div className="label-box flex gap-2 items-center mb-1">
                      <label className="font-medium text-[#14171B] text-[12px]">
                        File Type<span className="text-[#CF0000]">*</span>
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Select the allowed file type for upload"
                        className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="input-box mb-3">
                    <div className="label-box flex gap-2 items-center mb-1">
                      <label className="font-medium text-[#14171B] text-[12px]">
                        Variable Name <span className="text-[#CF0000]">*</span>
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Enter the variable name"
                        className="form-control shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="submit-button">
                    <button
                      onClick={handleEditClick}
                      className="bg-[#2DA771] text-white text-sm font-medium p-3 w-full rounded-[10px]"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="long-text-heading bg-[#FFE6FF] p-4 rounded-[16px] mb-5">
                  <img
                    src="/assets/node_icon/file-icon.png"
                    alt="long text icon"
                    className="w-[20px] mb-2"
                  />

                  <h5 className="text-sm text-[#14171B] font-medium">
                    File upload
                  </h5>
                </div>

                <div className="form-box">
                  <div className="input-box mb-7">
                    <div className="label-box flex gap-2 items-center mb-1">
                    <label className="font-medium text-[#14171B] text-[12px]">
                        Upload Resume <span className="text-[#CF0000]">*</span>
                      </label>

                      <span>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            cx="9"
                            cy="9"
                            r="6.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M9.00406 6H9.01156"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                          <path
                            d="M8.25 9H9V12H9.75"
                            stroke="#C3C3C3"
                            stroke-width="0.8"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </span>
                    </div>

                    <div className="upload-button mb-2">
                      <button className="bg-[#2DA771] flex items-center justify-center gap-2 text-white text-sm font-medium p-3 w-full rounded-[10px]">
                        <img
                          src="/assets/node_icon/upload.png"
                          alt="long text icon"
                          className="w-[20px]"
                        />
                        Upload file
                      </button>
                    </div>

                    <div className="para">
                      <p>(.pdf, .doc, .docx)</p>
                    </div>
                  </div>

                  <div className="text-box mb-5">
                    <h4 className="text-[#14171B] font-medium text-sm">
                      Variable name:{" "}
                      <span className="bg-[#FFE6FF] text-[#14171B] text-[12px] rounded-[20px] font-medium pt-3 pb-3 pr-4 pl-4">
                        resume
                      </span>
                    </h4>
                  </div>

                  <div className="submit-button">
                    <button
                      onClick={handleNextClick}
                      className=" bg-transparent border-2 border-[#2DA771] text-[#2DA771] text-sm font-medium p-3 w-full rounded-[10px]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploaded;
