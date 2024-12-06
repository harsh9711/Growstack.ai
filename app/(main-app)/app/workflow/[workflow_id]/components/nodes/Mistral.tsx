import React, { useState } from "react";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type MistralNodeProps } from "./types";
import Image from "next/image";

const Mistral = ({ data, id }: NodeProps<MistralNodeProps>) => {
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
  const options = [
    "mistral-1.0-70B",
    "mistral-large-latest",
    "mistral-small-latest",
    "pixtral-12b-2409",
    "open-mistral-nemo",
    "open-mixtral-8x22b",
    "open-mixtral-8x7b",
    "open-mistral-7b",
  ];

  return (
    <div>
      <div className="node-main-box">
        <div className="node-top-box relative">
          <div className="node-name text-center">
            <h4 className="text-sm font-medium text-[#2DA771]">LLM Nodes</h4>
            <span className="text-xs font-medium text-[#14171B]">
              (Mistral)
            </span>
          </div>

          <div className="node-image-box">
            <img
              src="/assets/node_icon/mistral-img.svg"
              alt="mistral node image"
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
                  src="/assets/node_icon/mistral-single.svg"
                  alt="mistral icon"
                  className="mb-1"
                />
                <h4 className="text-sm font-medium text-[#14171B]">
                Mistral
                </h4>
              </div>

              <div className="form-box">
                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      System Prompt <span className="text-[#CF0000]">*</span>
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
                          className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <textarea
                      rows={5}
                      placeholder="Enter system prompt"
                      className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Input Prompt <span className="text-[#CF0000]">*</span>
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
                    <textarea
                      rows={5}
                      placeholder="Enter your prompt"
                      className="form-control outline-0 shadow-none w-full p-4 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Model selection <span className="text-[#CF0000]">*</span>
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
                      {options.map((option, index) => (
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
                      Response Length
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
                          className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
                        />
                      </div>
                    )}
                  </div>

                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter max length"
                      className="form-control outline-0 shadow-none w-full p-3 rounded-[10px] bg-[#F2F2F2] text-[#14171B] text-[12px] font-medium focus:outline-none"
                    />
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Creativity Level
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
                          className="absolute bottom-[-8px] left-0 right-[76px] mx-auto"
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
                      <span className="text-[12px] font-medium text-[#5B5D60]">
                        0
                      </span>

                      <span className="text-[12px] font-medium text-[#5B5D60]">
                        1
                      </span>
                    </div>
                  </div>
                </div>

                <div className="input-box mb-3">
                  <div className="label-box flex items-center gap-2 relative mb-1">
                    <label className="text-[12px] text-[#14171B] font-medium">
                      Variable Name
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
                        onMouseEnter={() => handleMouseEnter("input7")}
                        onMouseLeave={handleMouseLeave}
                      >
                        <img
                          src="/assets/node_icon/info-circle.svg"
                          alt="info icon"
                          className="relative"
                        />
                      </button>

                      {isHovered === "input7" && (
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

                <div className="topic-box">
                  <div className="topic-text w-auto p-3 inline-block rounded-full bg-[#DAEAF6]">
                    <h5 className="text-[12px] font-medium text-[#14171B]">
                      topic
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

export default Mistral;
