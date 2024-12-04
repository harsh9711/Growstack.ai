import React, { useState } from "react";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type ReadImageNodeProps } from "./types";
import Image from "next/image";

const ReadImage = ({ data, id }: NodeProps<ReadImageNodeProps>) => {
  //INFORMATION HOVER STATE CALL HERE
  const [isHovered, setIsHovered] = useState(null);
  const handleMouseEnter = (id: any) => setIsHovered(id);
  const handleMouseLeave = () => setIsHovered(null);

  //DRODOWN STATE CALL HERE
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  //MODAL SELECTION MENU
  const Language = ["English", "Chines", "Hindi"];
  //TEXT EXTRACTION SELECTION MENU
  const TextExtraction = ["Good", "Bad"];
  //SIZE PROCESSING MODAL MENU
  const ProcessingModal = ["Large", "Small", "Medium"];
  //ANALYSIS SELECTION MENU
  const Analysis = ["Rounded", "Captured", "Blur"];

  return (
    <div>
      <div className="node-main-box">
        <div className="node-top-box relative">
          <div className="node-name text-center">
            <h4 className="text-sm font-medium text-[#2DA771]">Read Image</h4>
            <span className="text-xs font-medium text-[#14171B]">
              Read image using OpenAI
            </span>
          </div>

          <div className="node-image-box">
            <img
              src="/assets/node_icon/readimage-img.svg"
              alt="readimage node image"
              className="mx-auto"
            />
          </div>

          <div className="toggle-switch-icon text-center absolute bottom-[-15px] left-0 right-0 mx-auto z-10">
            <button onClick={handleDropdownClick}>
              <img
                src="/assets/node_icon/toggle-switch.svg"
                alt="toggle switch icon"
                className="mx-auto"
                style={{ transform: isDropdownOpen ? "rotate(180deg)" : "" }}
              />
            </button>
          </div>
        </div>

        {isDropdownOpen && (
          <>
            <div className="node-form-box bg-white p-4 border-2 border-[#2DA771] rounded-[20px] w-[320px] absolute left-1/2 transform -translate-x-1/2">
              <div className="node-form-heading-text p-3 bg-[#DAEAF6] rounded-[16px] mb-3">
                <img
                  src="/assets/node_icon/readimage-single.svg"
                  alt="readimage icon"
                  className="mb-1"
                />
                <h4 className="text-sm font-medium text-[#14171B]">
                  Read Image
                </h4>
              </div>

              <div className="form-box">
                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Image Upload <span className="text-[#CF0000]">*</span>
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
                    )}
                  </div>

                  <div className="upload-image-button">
                    <button className="w-full h-[40px] font-medium bg-[#2DA771] text-white text-[14px] rounded-[10px] flex items-center justify-center gap-2">
                      <img src="/assets/node_icon/file-upload-icon.svg" />
                      Upload Image
                    </button>

                 
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Image URL <span className="text-[#CF0000]">*</span>
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
                      <div className="absolute bottom-full mb-2 w-full bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2">
                        <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
                          Provide a brief, descriptive text about the subject
                          matter or main focus. This field allows you to specify
                          the topic that will be used throughout the workflow.
                        </p>

                        <img
                          src="/assets/node_icon/Polygon-shape.svg"
                          alt="polygon shape"
                          className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter image URL"
                      className="form-control outline-0 shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Text Language
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
                    )}
                  </div>

                  <div className="input-group">
                    <select
                      id="options"
                      name="options"
                      className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    >
                      {Language.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

               

            

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Text Extraction Mode
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
                    )}
                  </div>

                  <div className="input-group">
                    <select
                      id="options"
                      name="options"
                      className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    >
                      {TextExtraction.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Processing Modal <span className="text-[#CF0000]">*</span>
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
                    )}
                  </div>

                  <div className="input-group">
                    <select
                      id="options"
                      name="options"
                      className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    >
                      {ProcessingModal.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Purpose of Analysis
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
                    )}
                  </div>

                  <div className="input-group">
                    <select
                      id="options"
                      name="options"
                      className="form-control outline-0 shadow-none w-full p-3 cursor-pointer rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    >
                      {Analysis.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

         

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Variable Name
                    </label>
                    <button
                      className="relative"
                      onMouseEnter={() => handleMouseEnter("input8")}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img
                        src="/assets/node_icon/info-circle.svg"
                        alt="info icon"
                        className="relative"
                      />
                    </button>

                    {isHovered === "input8" && (
                      <div className="absolute bottom-full mb-2 w-full bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2">
                        <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
                          Provide a brief, descriptive text about the subject
                          matter or main focus. This field allows you to specify
                          the topic that will be used throughout the workflow.
                        </p>

                        <img
                          src="/assets/node_icon/Polygon-shape.svg"
                          alt="polygon shape"
                          className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter variable name"
                      className="form-control outline-0 shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="switch-button-box flex items-center justify-between">
                    <div className="label-box flex items-center gap-2 relative mb-1 w-full">
                      <label className="text-[12px] text-[#14171B] font-medium">
                        Show in output preview tab
                      </label>
                      <button
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("input9")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src="/assets/node_icon/info-circle.svg"
                          alt="info icon"
                          className="relative"
                        />
                      </button>

                      {isHovered === "input9" && (
                        <div className="absolute bottom-full mb-2 w-full bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2">
                          <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
                            Provide a brief, descriptive text about the subject
                            matter or main focus. This field allows you to
                            specify the topic that will be used throughout the
                            workflow.
                          </p>

                          <img
                            src="/assets/node_icon/Polygon-shape.svg"
                            alt="polygon shape"
                            className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
                          />
                        </div>
                      )}
                    </div>

                    <div className="input-group">
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-300 shadow-md peer-focus:outline-none peer-focus:ring-2-none peer-focus:ring-none rounded-full peer-checked:bg-[#2DA771]"></div>
                          <div className="peer-checked:translate-x-5 absolute left-0 top-0 m-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="output-box flex items-center justify-between">
                    <div className="label-box flex items-center gap-2 relative mb-1 w-full">
                      <label className="text-[12px] text-[#14171B] font-medium">
                        Outputs
                      </label>
                      <button
                        className="relative"
                        onMouseEnter={() => handleMouseEnter("input10")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src="/assets/node_icon/info-circle.svg"
                          alt="info icon"
                          className="relative"
                        />
                      </button>

                      {isHovered === "input10" && (
                        <div className="absolute bottom-full mb-2 w-full bg-white border-[1px] rounded-[10px] border-[#D3D3D3] p-2">
                          <p className="mb-0 font-[400] text-[9px] text-[#14171B]">
                            Provide a brief, descriptive text about the subject
                            matter or main focus. This field allows you to
                            specify the topic that will be used throughout the
                            workflow.
                          </p>

                          <img
                            src="/assets/node_icon/Polygon-shape.svg"
                            alt="polygon shape"
                            className="absolute bottom-[-8px] left-0 right-[144px] mx-auto"
                          />
                        </div>
                      )}
                    </div>

                    <div className="pencil-icon-box">
                      <img
                        src="/assets/node_icon/pencil-icon.svg"
                        alt="pencil icon"
                      />
                    </div>
                  </div>
                </div>

                <div className="topic-box">
                  <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#DAEAF6]">
                    <h5 className="text-[12px] font-medium text-[#14171B]">
                      summary
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReadImage;
