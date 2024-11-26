import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AllData } from "../../data";
import { useDispatch } from "react-redux";
import { addNode, removeNode } from "@/lib/features/workflow/node.slice";
import { MasterNodeProps, NodeState } from "@/types/workflows";
import "reactflow/dist/style.css";
import { useAppSelector } from "@/lib/hooks";
import { convertNodeData } from "@/utils/dataResolver";

const masterNode: MasterNodeProps[] = [
  {
    _id: "673dce159ee6b3af4f35afde",
    name: "Short text",
    description: "This is short text field",
    type: "short-text",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/short-text.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Placeholder",
        type: "text_placeholder",
        required: false,
        options: [],
        description: "Add placeholder",
      },
      "2": {
        label: "Default Value",
        type: "text_default_value",
        required: false,
        options: [],
        description: "Add default text",
      },
      "3": {
        label: "Description",
        type: "text_description",
        required: false,
        description: "Add description",
        options: [],
      },
      "4": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "If Topic is required or not",
      },
      "5": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: ["nothing"],
    __v: 0,
  },
  {
    _id: "673e01d49ee6b3af4f35afdf",
    name: "Long text",
    description: "This is long text field",
    type: "long-text",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/long-text.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Placeholder",
        type: "text_placeholder",
        required: false,
        options: [],
        description: "Add placeholder",
      },
      "2": {
        label: "Default Value",
        type: "text_default_value",
        required: false,
        options: [],
        description: "Add default text",
      },
      "3": {
        label: "Description",
        type: "text_description",
        required: false,
        description: "Add description",
        options: [],
      },
      "4": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "If Topic is required or not",
      },
      "5": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: ["nothing"],
    __v: 0,
  },
  {
    _id: "673e06739ee6b3af4f35afe0",
    name: "Boolean",
    description: "This is boolean field",
    type: "boolean",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/switch.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Default value",
        type: "checkbox",
        required: false,
        options: [],
        description: "Add placeholder",
      },
      "2": {
        label: "Description",
        type: "text_description",
        required: false,
        description: "Add description",
        options: [],
      },
      "3": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "If Topic is required or not",
      },
      "4": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },
  {
    _id: "673e0e439ee6b3af4f35afe2",
    name: "Number",
    description: "This is number field",
    type: "number",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/number-hashtag.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Placeholder",
        type: "text_placeholder",
        required: false,
        options: [],
        description: "Add placeholder",
      },
      "2": {
        label: "Default value",
        type: "text_default_value",
        required: false,
        description: "Add description",
        options: [],
      },
      "3": {
        label: "Descriptions",
        type: "text_description",
        required: false,
        options: [],
        description: "If Descriptions is available",
      },
      "4": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "Select if Topic is required",
      },
      "5": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },
  {
    _id: "673e132c9ee6b3af4f35afe3",
    name: "File upload",
    description: "This is file upload field",
    type: "file-upload",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/file-upload.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Descriptions",
        type: "text_description",
        required: false,
        options: [],
        description: "If Descriptions is available",
      },
      "2": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "Select if Topic is required",
      },
      "3": {
        label: "File Type",
        type: "dropdown_file_type",
        required: false,
        options: ["pdf", "txt", "png", "jpg"],
        description: "Select if Topic is required",
      },
      "4": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },

  {
    _id: "673e132c9ee6b3af4f35afe4",
    name: "Checklist",
    description: "This is checklist field",
    type: "checklist",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/circle-checklist.svg",
    parameters: {
      "0": {
        label: "Input label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },
      "1": {
        label: "Option",
        type: "select_option",
        required: false,
        options: ["Option1", "Option2", "Option3", "Option4"],
        description: "If Descriptions is available",
      },
      "2": {
        label: "Description",
        type: "text_input_label",
        required: false,
        options: [],
        description: "Add default text",
      },
      "3": {
        label: "Required",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "Select if Topic is required",
      },

      "4": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },

  {
    _id: "673e132c9ee6b3af4f35afe4",
    name: "Plain Text",
    description: "This is plain text field",
    type: "plain-text",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/short-text.svg",
    parameters: {
      "0": {
        label: "Joiner Label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },

      "1": {
        label: "Value",
        type: "text_input_label",
        required: false,
        options: [],
        description: "Add default text",
      },

      "2": {
        label: "Show in output preview tab",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "Select if Topic is required",
      },

      "3": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },

  {
    _id: "673e132c9ee6b3af4f35afe4",
    name: "Markdown",
    description: "This is markdown field",
    type: "markdown",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "/svgs/long-text.svg",
    parameters: {
      "0": {
        label: "Joiner Label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },

      "1": {
        label: "Value",
        type: "text_input_label",
        required: false,
        options: [],
        description: "Add default text",
      },

      "2": {
        label: "Show in output preview tab",
        type: "checkbox_required",
        required: false,
        options: [],
        description: "Select if Topic is required",
      },

      "3": {
        label: "Variable name",
        type: "text_variable_name",
        required: true,
        options: [],
        description: "Add default text",
      },
    },
    dynamicParams: [],
    __v: 0,
  },

  {
    _id: "673e132c9ee6b3af4f35afe4",
    name: "Form",
    description: "This is form field",
    type: "form",
    category: "general",
    subCategory: "Input type",
    functionToExecute: "processTextGpt",
    logoUrl: "assets/node_icon/form-single.svg",
    parameters: {
      "0": {
        label: "Input Label",
        type: "text_input_label",
        required: true,
        options: [],
        description: "This is text field.",
      },

      "1": {
        label: "Variable Name",
        type: "text_input_label",
        required: false,
        options: [],
        description: "Add default text",
      },

    },
    dynamicParams: [],
    __v: 0,
  },
];


const GeneralCategory = ({ setNodes }: any): React.ReactElement => {
  const dispatch = useDispatch();
  const { isLoading, masterNode } = useAppSelector(state => state.masterNode);

  if ((masterNode && !masterNode.length) || !masterNode) {
    return <div>Data not found</div>;
  }

  const generalData = masterNode?.filter(item => item.category.toLocaleLowerCase() === "general");
  const modifiedNodes = generalData.map(convertNodeData);


  const groupedGenerals = modifiedNodes.reduce(
    (acc: { [key: string]: typeof modifiedNodes }, model) => {
      if (!acc[model.subCategory]) {
        acc[model.subCategory] = [];
      }
      acc[model.subCategory].push(model);
      return acc;
    },
    {}
  );

  const handleClick = (nodeData: NodeState) => {
    setNodes((prevNodes: NodeState[]) => {
      const lastNode = prevNodes[prevNodes.length - 1];
      let nextNodeX = 200;
      let nextNodeY = 0;
      if (lastNode) {
        nextNodeX = lastNode.position.x + 200;
        nextNodeY = lastNode.position.y;

        if (nextNodeX > 1600) {
          nextNodeX = 200;
          nextNodeY += 200;
        }
      }

      return [
        ...prevNodes,
        {
          ...nodeData,
          id: Date.now().toString(),
          position: { x: nextNodeX, y: nextNodeY },
        },
      ];
    });
  };

  const handleDragStart = (event: React.DragEvent, item: NodeState) => {
    dispatch(addNode(item));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="bg-white absolute w-4/5 h-[500px] top-[120px] rounded-2xl overflow-y-auto backdrop-blur-sm shadow-md">
      <div className="bg-white p-5 pt-0">
        <div className="sticky top-0 z-10 bg-white">
          <div className="flex items-center justify-between pt-5">
            <h4 className="text-xl font-medium text-[#14171B] leading-6">
              General
            </h4>
            <div className="flex items-center p-2 rounded-lg border border-[#EBEBEB] mr-2.5 bg-[#F7F7F7]">
              <Image
                src="/images/workflow/search-normal.svg"
                alt="Search"
                width={16}
                height={16}
                className="cursor-pointer mr-2.5 text-sm font-normal text-[#5A5963]"
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-[#F7F7F7]"
              />
            </div>
          </div>
          <hr className="border-0 border-t border-gray-300 my-5" />
        </div>

        <div className="flex flex-wrap h-full overflow-y-auto">
          {Object.keys(groupedGenerals).map((subCategory, index) => (
            <div key={index.toString()} className="mb-2.5 w-full">
              <h3 className="text-base leading-6 font-normal text-[#878787]">
                {subCategory}
              </h3>
              <div className="flex flex-wrap pt-1">
                {groupedGenerals[subCategory].map((item, _) => (
                  <div
                    key={_.toString()}
                    className="h-[92px] w-[130px] bg-transparent m-1 rounded-lg flex justify-center items-center cursor-pointer border border-[#E5E5E5]"
                    onClick={() => handleClick(item.node)}
                    draggable
                    onDragStart={event => {
                      handleDragStart(event, item.node);
                    }}
                    onDragEnd={() => {
                      dispatch(removeNode());
                    }}
                  >
                    <div className="h-full w-full rounded-lg bg-white flex justify-center items-center flex-col">
                      {item?.logoUrl && (
                        <Image
                          src={item.logoUrl}
                          alt={item.name}
                          width={26}
                          height={17}
                          draggable={false}
                        />
                      )}
                      <p className="text-sm leading-5 font-medium text-[#020817] mt-2">
                        {item.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneralCategory;
