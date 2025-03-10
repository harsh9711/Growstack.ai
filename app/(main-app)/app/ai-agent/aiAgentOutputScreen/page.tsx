"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import KeywordInsights from "../agentScreen/textOutput";
import { FaArrowLeft, FaChevronDown, FaChevronUp, FaLink } from "react-icons/fa";
import { z } from "zod";
import { API_URL } from "@/lib/api";
import {
  BackIcon, InputLinkIcon
} from "@/components/svgs";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import { paragon } from "@useparagon/connect";
import LinkedInUI from "../agentScreen/LinkedInUI";
import dotenv from "dotenv";
import DotsLoader from "@/components/DotLoader";
dotenv.config();
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
  interface ParagonUserDetails {
    [key: string]: any; // Adjust this based on the actual structure of `paragon.getUser()`
  }
  const searchParams = useSearchParams();
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const [agentDetails, setAgentDetails] = useState<AgentDetails | null>(null);
  const [inputs, setInputs] = useState<Input[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [output, setOutput] = useState<OutputData | null>(null);
  const [file, setFile] = useState(null);
  const [agent, setAgent] = useState("")
  const [expandedInput, setExpandedInput] = useState(false);
  const [expandedOutput, setExpandedOutput] = useState(false);
  const [paragonDetails, setParagonDetails] = useState<ParagonUserDetails>({});
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchAgents = async () => {
    try {
      // Assuming searchParams is already defined, for example:
      const searchParams = new URLSearchParams(window.location.search);

      const agentId: string | null = searchParams.get("agentId");
      const agentName: string | null = searchParams.get("agentName");

      // Check if either agentId or agentName is missing
      if (!agentId || !agentName) {
        setErrors({ general: "Agent ID or Name is missing" });
        return;
      }

      // Fetch agent details by ID
      const agentDetails = await getAgentById(agentId);

      // If agent details are found, update the state
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
    } catch (error) {
      // Handle any errors that occur during the fetch
      setErrors({ general: "An error occurred while fetching agent details" });
      console.error(error);
    }
  };


  async function getAgentById(agentId: string): Promise<AgentDetails | null> {
    try {
      const response = await instance.get(`${API_URL}/agents/api/v1/${agentId}`);
      if (response.status === 200) {
        paragonStatus(response.data.data.toolsRequired)
        paragonConnect()
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
    variableValidation: z
      .union([
        z.array(z.enum(["EMAIL", "TEXT", "LONG_TEXT", "URL", "PDF", "DOCX", "DATE", "PHONE_NUMBER", "NUMBER"])),
        z.enum(["EMAIL", "TEXT", "LONG_TEXT", "URL", "PDF", "DOCX", "DATE", "PHONE_NUMBER", "NUMBER"]),
      ])
      .optional(),
    variableLimit: z.number().optional(),
    isRequired: z.boolean().optional(),
  });

  const paragonStatus = async (platforms: string[]) => {
    try {
      const response = await instance.post(`/users/api/v1/connectors/connect`, {});
      const token = response?.data?.data?.token;
      if (!token) {
        throw new Error("Authentication token is missing in the response");
      }
      await paragon.authenticate(
        process.env.NEXT_PUBLIC_PARAGON_PROJECT_ID || "2dc0dcd7-005c-4c8e-a04a-3dfa9c69352e",
        token
      );

      const user: any = { ...paragon.getUser() };
      if (!user?.integrations || typeof user.integrations !== "object") {
        throw new Error("User integrations are missing or invalid");
      }

      // Filter the integrations by matching keys with requested platforms (case-insensitive)
      const filteredIntegrations = Object.keys(user.integrations)
        .filter((key) =>
          platforms.some((platform) => key.toLowerCase() === platform.toLowerCase())
        )
        .reduce((acc, key) => {
          acc[key] = user.integrations[key]; // Retain the matching key-value pairs
          return acc;
        }, {} as Record<string, any>);
      setParagonDetails(filteredIntegrations);
    } catch (error: any) {
      console.error("Error in paragonStatus:", error.message || error);
      throw error; // Re-throw the error if it needs to be handled elsewhere
    }
  };
  interface Input {
    variableValues: any;
    variableName: string;
    variableDisplayName: string;
    value: string;
    variableValidation?: any;
    variableLimit?: number;
    isRequired: boolean;
    variableType: string;
    variablePlaceholder: string
  }

  const handleInputChange = async (
    index: number,
    value: string | null,
    file: File | null
  ) => {
    if (file) {
      const formData = new FormData();
      formData.append("document", file);

      try {
        // Make the API call to upload the file
        const response = await instance.post(
          `${API_URL}/users/api/v1/file/upload`,
          formData
        );
        value = response.data.data.fileUrl; // Set the file URL in the value
      } catch (error) {
        toast.error("Error uploading file");
        return;
      }
    }


    const updatedInputs: Input[] = [...inputs]; // Clone the inputs array
    const input = updatedInputs[index];
    type Errors = Record<string, string>;
    const updatedErrors: Errors = { ...errors }; // Clone the errors object

    // Reset specific input error
    updatedErrors[input.variableName] = "";

    try {
      // Real-time validation
      if (value !== null) {
        inputSchema.parse({
          variableName: input.variableName,
          variableDisplayName: input.variableDisplayName,
          value: value,
          variableValidation: input.variableValidation,
          variableLimit: input.variableLimit,
          isRequired: input.isRequired,
        });

        // Character limit validation
        if (input.variableLimit && value.length > input.variableLimit) {
          updatedErrors[input.variableName] = `${input.variableDisplayName} exceeds the character limit of ${input.variableLimit}.`;
        }

        if (input.variableValidation?.includes("EMAIL") && value) {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid email.`;
          }
        }

        if (input.variableValidation?.includes("URL") && value) {
          if (!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid URL.`;
          }
        }

        if (input.variableValidation?.some((v: string) => ["PDF", "DOCX"].includes(v)) && value) {
          if (!/^https?:\/\/[^\s$.?#].[^\s]*\.(pdf|docx)$/i.test(value)) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid ${input.variableValidation} file.`;
          }
        }
        if (input.variableValidation?.includes("NUMBER") && value) {
          if (isNaN(Number(value))) {
            updatedErrors[input.variableName] = `${input.variableDisplayName} is not a valid number.`;
          }
        }
      }

      // Update the value
      updatedInputs[index].value = value || "";

      // Update states
      setInputs(updatedInputs);
      setErrors(updatedErrors);
    } catch (err: any) {
      updatedErrors[input.variableName] = err.message || err.errors[0].message;
      setErrors(updatedErrors);
    }
  };

  const paragonConnect = () => {
    for (const [name, details] of Object.entries(paragonDetails)) {
        return details.enabled; // Return true if any detail is enabled
    }
    return "not required";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((err) => err !== '');
    if (hasErrors) {
      return;
    }
    const updatedErrors: Errors = {};
    const missingRequiredFields = inputs.filter((input) => input.isRequired && !input.value);
    if (missingRequiredFields.length > 0) {
      missingRequiredFields.forEach((input) => {
        updatedErrors[input.variableName] = `${input.variableDisplayName} is required.`;
      });
      setErrors(updatedErrors);
      return;
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
      // Make the API call
      setOutput(null);
      const response = await instance.post(
        `${API_URL}/agents/api/v1/run/${agent}`,
        bodyData
      );
      setExpandedInput(false);
      if (response.status === 200) {
        setOutput(null)
        setExpandedOutput(true);
        setOutput(response.data);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Error executing the agent. Please try again.';
      toast.error(errorMessage)
      console.error('Error executing the agent:', error);
    }
  };

  const renderInputs = () => {
    let longTextInput: JSX.Element | null = null;
    const shortTextInputs: JSX.Element[] = [];

    inputs.forEach((input, index) => {
      const isRequired = input.isRequired;

      if (input.variableType === "LONG_TEXT") {
        longTextInput = (
          <div key={index} className="mb-4 flex flex-col w-full">
            <label className="text-md text-black">
              {input.variableDisplayName} {isRequired && <span className="text-red-500">*</span>}
            </label>
            <textarea
              style={{ fontSize: "12px" }}
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
      }else if (input.variableType === "DROPDOWN") {
        shortTextInputs.push(
          <div key={index} className="mb-4 flex flex-col w-full relative">
            <label className="text-md text-black mb-2 flex items-center font-medium">
              {input.variableDisplayName}
              {input.isRequired && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="relative">
              <select
                style={{ fontSize: "12px", paddingLeft: "1rem",paddingRight:"1rem" }}
                value={input.value || ""}
                onChange={(e) => handleInputChange(index, e.target.value, null)}
                className="w-full p-3 rounded-xl focus:outline-none bg-[#EFEFEF]"
              >
                <option value="" disabled>
                  {input.variablePlaceholder || "Select an option..."}
                </option>
                {input.variableValues.map((option: string | number | readonly string[] | undefined, optionIndex: React.Key | null | undefined) => (
                  <option key={optionIndex} value={option}>
                    {typeof option === 'string' ? option.charAt(0).toUpperCase() + option.slice(1) : option}
                  </option>
                ))}
              </select>
            </div>
            {errors[input.variableName] && (
              <p className="text-red-500 text-sm mt-1">
                {errors[input.variableName]}
              </p>
            )}
          </div>
        );
      } 
      else {
        // For short text inputs
        shortTextInputs.push(
          <div key={index} className="mb-4 flex flex-col w-full relative">
            <label className="text-md text-black mb-2 flex items-center">
              {input.variableDisplayName}
              {isRequired && <span className="text-red-500 ml-1">*</span>}
              {input.variableValidation === "URL" && (
                <span className="ml-2 text-gray-500">
                  <InputLinkIcon />
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={
                  input.variableValidation === "EMAIL"
                    ? "email"
                    : input.variableValidation === "NUMBER"
                      ? "number"
                      : input.variableValidation === "PHONE_NUMBER"
                        ? "tel"
                        : "text"
                }
                style={{ fontSize: "12px", paddingLeft: "1rem" }}
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
            {shortTextInputs.slice(0, 2)}
          </div>
        )}
      </>
    );
  };

  const handleConnect = async (integrationType: string) => {
    try {
      const Paragonresponse = await paragon.connect(integrationType, {});
      getAgentById(agent)
      fetchAgents(); // Call fetchAgents after the connection is successful
    } catch (error) {
      console.error(`Failed to connect to ${integrationType}:`, error);
    }
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
          <div className="w-full rounded-2xl border-2 border-l-8 border-l-yellow-500">
            <div className="flex justify-between gap-6">
              <div className="flex-1 md:mr-6 text-center md:text-left mt-4">
                <p className="ml-2 text text-sm text-gray-500">Agent Name & Description</p>
                <p className="text-lg md:text-lg font-bold m-2" style={{ height: '30px' }}>
                  {agentDetails?.name || "Agent not found"}
                </p>
                <p className="text-base m-2">
                  {agentDetails?.description || "No description available."}

                </p>

              </div>

              <div>
                <div className="flex mt-3" >
                  {Object.entries(paragonDetails).map(([name, details]) => (
                    <>
                      {details.enabled ?
                        <div className="bg-pink-100 p-5 rounded-md flex items-center justify-center mr-5 mb-2">
                          <main className="flex items-center space-x-6">
                            <div className=" flex flex-col space-x-3">
                              <div className="flex justify-center items-center mb-1">
                                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.90909 21.5035H6.36366V10.6853L3.44673 5.5918L0 5.91254V19.5944C0 20.6491 0.854328 21.5035 1.90909 21.5035Z" fill="#0085F7" />
                                  <path d="M21.6406 21.5035H26.0952C27.15 21.5035 28.0043 20.6491 28.0043 19.5944V5.91254L24.5625 5.5918L21.6407 10.6853V21.5035H21.6406Z" fill="#00A94B" />
                                  <path d="M21.6323 2.41422L19.0156 7.40735L21.6323 10.687L27.9959 5.91422V3.36879C27.9959 1.00946 25.3025 -0.33804 23.4141 1.07787L21.6323 2.41422Z" fill="#FFBC00" />
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.36837 10.6868L3.875 5.41985L6.36837 2.41406L14.0047 8.14132L21.6411 2.41406V10.6868L14.0047 16.4141L6.36837 10.6868Z" fill="#FF4131" />
                                  <path d="M0 3.36879V5.91422L6.36366 10.687V2.41422L4.58183 1.07787C2.69341 -0.33804 0 1.00946 0 3.36879Z" fill="#E51C19" />
                                </svg>
                              </div>
                              <button onClick={() => {
                                if (details.enabled) handleConnect(name);
                              }} className="border-2 bg-green-600 border-green-600 text-white p-1 rounded-full hover:bg-green-600 hover:text-white transition">
                                connected
                              </button>
                              <div className="flex">
                                <div className="mt-2 mr-2">
                                  <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="3" cy="3.5" r="3" fill="#2DA771" />
                                  </svg>
                                </div>

                                {details.allCredentials[0].providerId.split('@')[0]}
                              </div>

                            </div>
                          </main>
                        </div>
                        :
                        <div className="bg-pink-100 p-5 rounded-md flex items-center justify-center mr-5">
                          <main className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3">
                              <div className="flex justify-center items-center">
                                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.90909 21.5035H6.36366V10.6853L3.44673 5.5918L0 5.91254V19.5944C0 20.6491 0.854328 21.5035 1.90909 21.5035Z" fill="#0085F7" />
                                  <path d="M21.6406 21.5035H26.0952C27.15 21.5035 28.0043 20.6491 28.0043 19.5944V5.91254L24.5625 5.5918L21.6407 10.6853V21.5035H21.6406Z" fill="#00A94B" />
                                  <path d="M21.6323 2.41422L19.0156 7.40735L21.6323 10.687L27.9959 5.91422V3.36879C27.9959 1.00946 25.3025 -0.33804 23.4141 1.07787L21.6323 2.41422Z" fill="#FFBC00" />
                                  <path fill-rule="evenodd" clip-rule="evenodd" d="M6.36837 10.6868L3.875 5.41985L6.36837 2.41406L14.0047 8.14132L21.6411 2.41406V10.6868L14.0047 16.4141L6.36837 10.6868Z" fill="#FF4131" />
                                  <path d="M0 3.36879V5.91422L6.36366 10.687V2.41422L4.58183 1.07787C2.69341 -0.33804 0 1.00946 0 3.36879Z" fill="#E51C19" />
                                </svg>
                              </div>
                              <span className="text-gray-600 text-2xl">&rarr;</span>
                              <button onClick={() => {
                                if (!details.enabled) handleConnect(name);
                              }} className="border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-600 hover:text-white transition">
                                Sign In
                              </button>
                            </div>
                          </main>
                        </div>}
                    </>
                  ))}
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Input Parameters */}
        <div className="col-span-1 flex flex-col">
          <div>
            <div className="w-full rounded-2xl border-2 flex flex-col h-full border-l-8 border-l-red-500">
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
              <div>
                {paragonConnect() === "not required" || paragonConnect() == true ? (
                  <div className="mt-4 flex justify-center">
                    <button disabled={isLoading}
                      type="submit"
                      className="py-2 mb-4 px-8 bg-[#2DA771] text-sm text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors duration-300"
                    >
                      {isLoading ? (
                        <div className="flex">
                          {'Analyzing'}
                          <div role="status">
                            <svg
                              aria-hidden="true"
                              className="inline w-4 h-4 ml-1 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                              viewBox="0 0 100 101"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                              />
                              <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                              />
                            </svg>
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      ) : (
                        'Analyze'
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-red-500 mb-3">Please connect to your Gmail account.</p>
                )}
              </div>

            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col">
          <div>
            <div className="w-full rounded-2xl border-2 flex flex-col h-full border-l-8 border-l-green-500">
              <button
                type="button"
                onClick={() => setExpandedOutput((prev) => !prev)}
                className="w-full text-left bg-gray-100 p-2 rounded-t-2xl border-b flex justify-between items-center"
              >
                <span className="text font-bold">{expandedOutput ? "Output Details" : "Output Details"}</span>
                <span>{expandedOutput ? <FaChevronUp /> : <FaChevronDown />}</span>
              </button>
              <div className="p-6"></div>
              {!output && <>
                <div className="text-center mb-4">
                  <h1><strong>No output details available</strong></h1>
                </div>
              </>}
              {expandedOutput && (
                <div className="p-2 ">
                  {output && (
                    <div className="mt-2 px-4">
                      <KeywordInsights runnerAgentId={output.data.runnerAgentId} setLoader={setIsLoading} />
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
