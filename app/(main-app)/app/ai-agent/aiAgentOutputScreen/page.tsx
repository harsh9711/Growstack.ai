"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import KeywordInsights from "../agentScreen/textOutput";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaLink } from "react-icons/fa";
import { z } from "zod";
import { API_URL } from "@/lib/api";
import {
  BackIcon, InputLinkIcon
} from "@/components/svgs";
const uploadDetails = () => {
  interface AgentDetails {
    name: string;
    description: string;
    inputs?: any[];
  }
  interface Errors {
    [key: string]: string; // Define that the object can have string keys and string values
  }
  interface OutputData {
    data: {
      runnerAgentId: string;
      // Add other properties as needed
    };
  }
  const searchParams = useSearchParams();
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [agentDetails, setAgentDetails] = useState<AgentDetails | null>(null);
  const [inputs, setInputs] = useState<Input[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [output, setOutput] = useState<OutputData | null>(null);
  const [file, setFile] = useState(null);
  const [showKeywordInsights, setShowKeywordInsights] = useState(false);
  const [agent, setAgent] = useState("")
  const [expandedInput, setExpandedInput] = useState(false);
  const [expandedOutput, setExpandedOutput] = useState(false);
  const [showSubmit, setShowSubmit] = useState(false);
  useEffect(() => {
    const agentId: any = searchParams.get("agentId");
    const agentName = searchParams.get("agentName");
    setAgent(agentId)
    if (!agentId || !agentName) {
      setErrors({ general: "Agent ID or Name is missing" });
      return;
    }

    async function fetchAgentDetails() {
      const agentDetails = await getAgentById(agentId);
      if (agentDetails) {
        setCurrentAgent(agentName);
        setAgentDetails(agentDetails);
        setInputs(agentDetails.inputs || []);
        setErrors({}); // Reset errors
      } else {
        setAgentDetails(null);
        setInputs([]);
        setErrors({ general: "Agent not found" });
      }
    }

    fetchAgentDetails();
  }, [searchParams]);

  async function getAgentById(agentId: string): Promise<AgentDetails | null> {
    try {
      const response = await axios.get(`${API_URL}/agents/api/v1/${agentId}`, {
        headers: {
          'Content-Type': 'application/json',

        },
      });
      if (response.status === 200) {
        return response.data.data as AgentDetails;
      } else {
        throw new Error("Agent not found");
      }
    } catch (error) {
      console.error("Error fetching agent:", error);
      setErrors({ general: "Failed to fetch agent details" });
      return null;
    }
  }
  const inputSchema = z.object({
    variableName: z.string(),
    variableDisplayName: z.string(),
    value: z.string(),
    variableValidation: z.enum(["EMAIL", "TEXT", "LONG_TEXT", "URL"]).optional(),
    variableLimit: z.number().optional(),
    isRequired: z.boolean().optional(),
  });


  interface Input {
    variableName: string;
    variableDisplayName: string;
    value: string;
    variableValidation?: string;
    variableLimit?: number;
    isRequired: boolean;
    variableType: string;
    variablePlaceholder: string
  }

  // const handleInputChange = (index: number, value: string | null, file: File | null) => {
  //   if (file) {
  //     console.log("file", file);

  //   }
  //   const updatedInputs: Input[] = [...inputs]; // Type 'Input[]' for the inputs array
  //   const input = updatedInputs[index];
  //   type Errors = Record<string, string>;
  //   // Reset specific input error
  //   const updatedErrors: Errors = { ...errors };  // Type 'Errors' for the errors object
  //   updatedErrors[input.variableName] = "";

  //   const parsedInput = {
  //     variableName: input.variableName,
  //     variableDisplayName: input.variableDisplayName,
  //     value: value,
  //     variableValidation: input.variableValidation,
  //     variableLimit: input.variableLimit,
  //     isRequired: input.isRequired,
  //   };

  //   try {
  //     if (input.isRequired && !value) {
  //       updatedErrors[input.variableName] = `${input.variableDisplayName} is required.`;
  //       setErrors(updatedErrors);
  //     }
  //     inputSchema.parse(parsedInput);
  //     if (input.variableLimit && value.length > input.variableLimit) {
  //       updatedErrors[input.variableName] = `${input.variableDisplayName} exceeds the character limit of ${input.variableLimit}.`;
  //       setErrors(updatedErrors);
  //       return;
  //     }

  //     // Validate email if applicable
  //     if (input.variableValidation === "EMAIL" && value) {
  //       if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
  //         updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid email.`;
  //       }
  //     }

  //     // Validate URL if applicable
  //     if (input.variableValidation === "URL" && value) {
  //       if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
  //         updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid URL.`;
  //       }
  //     }
  //     updatedInputs[index].value = value;
  //     setInputs(updatedInputs);
  //     setErrors(updatedErrors);
  //   } catch (err: any) {
  //     // Handle any validation errors from inputSchema
  //     updatedErrors[input.variableName] = err.message || err.errors[0].message;
  //     setErrors(updatedErrors);
  //   }
  // };


  const handleInputChange = (index: number, value: string | null, file: File | null) => {
    if (file) {
      console.log("file", file);
    }
  
    const updatedInputs: Input[] = [...inputs]; // Type 'Input[]' for the inputs array
    const input = updatedInputs[index];
    type Errors = Record<string, string>;
    
    // Reset specific input error
    const updatedErrors: Errors = { ...errors };  // Type 'Errors' for the errors object
    updatedErrors[input.variableName] = "";
  
    const parsedInput = {
      variableName: input.variableName,
      variableDisplayName: input.variableDisplayName,
      value: value,
      variableValidation: input.variableValidation,
      variableLimit: input.variableLimit,
      isRequired: input.isRequired,
    };
  
    try {
      // Check if required field is empty
      if (input.isRequired) {
        // If it's a text input (value), check if it is empty
        if (input.variableType !== "FILE" && !value) {
          updatedErrors[input.variableName] = `${input.variableDisplayName} is required.`;
        }
        // If it's a file input, check if the file is missing
        else if (input.variableType === "FILE" && !file) {
          updatedErrors[input.variableName] = `${input.variableDisplayName} is required.`;
        }
      
        // Only update errors if any error has been added
        if (updatedErrors[input.variableName]) {
          setErrors(updatedErrors);
        }
      }
      
  
      // Only proceed if value is not null
      if (value !== null) {
        inputSchema.parse(parsedInput);
  
        // Check if the value exceeds the character limit
        if (input.variableLimit && value.length > input.variableLimit) {
          updatedErrors[input.variableName] = `${input.variableDisplayName} exceeds the character limit of ${input.variableLimit}.`;
          setErrors(updatedErrors);
          return;
        }
  
        // Validate email if applicable
        if (input.variableValidation === "EMAIL" && value) {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid email.`;
          }
        }
  
        // Validate URL if applicable
        if (input.variableValidation === "URL" && value) {
          if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid URL.`;
          }
        }
  
        updatedInputs[index].value = value;
        setInputs(updatedInputs);
      } else if (file) {
        // Handle file input
        console.log("File uploaded:", file);
      }
  
      setErrors(updatedErrors);
    } catch (err: any) {
      // Handle any validation errors from inputSchema
      updatedErrors[input.variableName] = err.message || err.errors[0].message;
      setErrors(updatedErrors);
    }
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if there are any errors before proceeding
    const error = Object.values(errors).some((err) => err !== '');
    console.log("Error found:", error);
    if (error) {
      console.log("Errors during submit:", errors);
      return;
    }

    const missingRequiredFields = inputs.filter((input) => input.isRequired && !input.value);
    if (missingRequiredFields.length > 0) {
      const updatedErrors: Errors = {};  // Use an object to map variable names to error messages

      missingRequiredFields.forEach((input) => {
        updatedErrors[input.variableName] = `${input.variableDisplayName} is required.`;
      });

      setErrors(updatedErrors);
      // return;
    }

    setErrors({});

    const inputData: { [key: string]: any } = {};
    inputs.forEach((input) => {
      inputData[input.variableName] = input.value;
    });
    const bodyData = {
      inputs: inputData,
    };
    try {
      const response = await axios.post(
        `${API_URL}/agents/api/v1/run/${agent}`,
        bodyData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle the response (e.g., show success or output)
      if (response.status === 200) {
        setOutput(response.data); // Store response data in state
        console.log('Response:', response.data);
      } else {
        setErrors({ general: 'Failed to run the agent' });
      }
    } catch (error) {
      setErrors({ general: 'Error executing the agent' });
      console.error('Error executing the agent:', error);
    }
  };

  const renderInputs = () => {
    let longTextInput: JSX.Element | null = null;
    const shortTextInputs: JSX.Element[] = [];

    // Separate short, long text inputs, and file inputs
    inputs.forEach((input, index) => {
      const isRequired = input.isRequired;

      // For long text input
      if (input.variableType === "LONG_TEXT") {
        longTextInput = (
          <div key={index} className="mb-4 flex flex-col w-full">
            <label className="text-md text-black">
              {input.variableDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
              style={{ fontSize: '12px' }}
              placeholder={input.variablePlaceholder || "Enter details..."}
              value={input.value || ""}
              onChange={(e) => handleInputChange(index, e.target.value, null)}
              className="w-full p-4 h-[120px] rounded-md focus:outline-none resize-none"
              rows={10}
            />
            {errors[input.variableName] && (
              <p className="text-red-500 text-sm mt-1">{errors[input.variableName]}</p>
            )}
          </div>
        );
      } else if (input.variableType === "FILE") {
        // For file input
        shortTextInputs.push(
          <div key={index} className="mb-4 flex flex-col w-full relative">
            <label className="text-md text-black mb-2">
              {input.variableDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleInputChange(index, null, e.target.files[0]);
                  } else {
                    handleInputChange(index, null, null);
                  }
                }}
                className="w-full p-2 rounded-md focus:outline-none border border-gray-300 text-gray-700 file:bg-gray-100 file:border file:border-gray-300 file:rounded-md file:px-4 file:py-2 file:text-sm file:text-gray-700 file:cursor-pointer hover:file:bg-gray-200"
              />
            </div>
            {errors[input.variableName] && (
              <p className="text-red-500 text-sm mt-1">{errors[input.variableName]}</p>
            )}
          </div>
        );
      } else {
        // For short text input
        shortTextInputs.push(
          <div key={index} className="mb-4 flex flex-col w-full relative">
            <label className="text-md text-black mb-2 flex items-center">
              {input.variableDisplayName}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
              {input.variableValidation === "URL" && (
                <span className="ml-2 text-gray-500">
                  {/* Replace with your desired icon */}
                  <InputLinkIcon />
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type="text"
                style={{ fontSize: '12px', paddingLeft: "1rem" }}
                placeholder={input.variablePlaceholder || "Enter text..."}
                value={input.value || ""}
                onChange={(e) => handleInputChange(index, e.target.value, null)}
                className="w-full p-4 rounded-md focus:outline-none"
              />
            </div>
            {errors[input.variableName] && (
              <p className="text-red-500 text-sm mt-1">{errors[input.variableName]}</p>
            )}
          </div>
        );
      }

    });

    return (
      <>
        {!expandedInput ? (
          <div className="flex flex-col gap-4 overflow-auto max-h-[calc(100vh-120px)]">
            {/* Render all inputs in a column */}
            {shortTextInputs}
            {longTextInput}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Display only a portion of short text inputs initially */}
            {/* {shortTextInputs.slice(0, 2)} */}
          </div>
        )}
      </>
    );
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Back Button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="flex items-center bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none"
        >
          <BackIcon className="mr-2" />
          <span className="text-sm font-medium">Back</span>
        </button>

      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {/* Top Section */}
        <div className="col-span-1 md:col-span-3">
          <div className="w-full h-[120px] rounded-2xl border-2 border-l-8 border-l-green-500">
            <div className="flex items-center gap-6">
              <div className="flex-1 md:mr-6 text-center md:text-left mt-4">
                <p className="ml-2 text text-sm text-gray-500">Agent Name & Description</p>
                <p className="text-lg md:text-lg font-bold m-2" style={{ height: '30px' }}>
                  {agentDetails?.name || "Agent not found"}
                </p>
                <p className="text-base m-2">
                  {agentDetails?.description || "No description available."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Parameters */}
        <div className="col-span-1 flex flex-col">
          <div>
            <div className="w-full rounded-2xl border-2 flex flex-col h-full border-l-8 border-l-yellow-400">
              <button
                type="button"
                onClick={() => setExpandedInput((prev) => !prev)}
                className="w-full text-left bg-gray-100 p-2 rounded-t-2xl border-b flex justify-between items-center"
              >
                <span className="text font-bold">{expandedInput}Input Parameters</span>
                <span>{expandedInput ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>
              {/* Keep the card structure visible, toggle content inside */}
              <div className="p-4 overflow-y-auto flex-grow">
                {renderInputs()}
              </div>
              {/* Submit Button after renderInputs */}
              {!expandedInput && (
                <div className="mt-4 flex justify-center">
                  <button
                    type="submit"
                    className="py-2 mb-4 px-8 bg-[#2DA771] text-sm text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors duration-300"
                  >
                    Analyze
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Output Details */}
        <div className="col-span-2 flex flex-col">
          <div>
            <div className="w-full rounded-2xl border-2 flex flex-col h-full border-l-8 border-l-red-500">
              <button
                type="button"
                onClick={() => setExpandedOutput((prev) => !prev)}
                className="w-full text-left bg-gray-100 p-2 rounded-t-2xl border-b flex justify-between items-center"
              >
                <span className="text font-bold">{expandedOutput ? "Output Details" : "Output Details"}</span>
                <span>{expandedOutput ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>
              <div className="p-6"></div>
              {expandedOutput && (
                <div className="p-2 overflow-y-auto h-[70%]">
                  {output && (
                    <div className="mt-2 px-4">
                      <KeywordInsights runnerAgentId={output.data.runnerAgentId} />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default uploadDetails;