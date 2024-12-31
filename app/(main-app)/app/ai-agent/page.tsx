
"use client";

import React, { useState, useEffect } from "react";
import {
  AgentIcon,
  Plus,
  PersonIcon,
  GptIcon,
  ChevroRight, MyAIAgents, AiAgentIcon
} from "@/components/svgs";
import { useRouter } from "next/navigation";
const axios = require('axios');
import { API_URL } from "@/lib/api";
import { authenticateUser } from "@/utils/paraGonAuth";
import instance from "@/config/axios.config";
import { paragon } from "@useparagon/connect";
const integrationsResponse = {
  authenticated: true,
  integrations: {
    whatsapp: { enabled: false },
    facebookpages: { enabled: false },
    linkedin: { enabled: true },
    googlesheets: { enabled: false },
    gmail: { enabled: true },
  },
};
export default function AiAgent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = [];
  const [paragonDetails, setParagonDetails] = useState<ParagonUserDetails>({});
  interface ParagonUserDetails {
    [key: string]: any; // Adjust this based on the actual structure of `paragon.getUser()`
  }
  interface Agent {
    image: string | undefined;
    name: string;
    description: string;
    users: number;
    agentId: string;
  }

  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await instance.get(`${API_URL}/agents/api/v1/`);

        if (response.data.message === "Agents fetched successfully") {
          setAgents(response.data.data.map((agent: any) => ({
            name: agent.name,
            description: agent.description,
            users: agent.users,
            agentId: agent.agentId,
            image: agent.image
          })));
        } else {
          throw new Error("Failed to fetch agents.");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);


  // Filter agents based on the search query
  const filteredAgents = agents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAgentSelect = (agentName: string) => {
    setSelectedAgent(agentName);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen mt-4">



      {/* Main Content */}
      <main className=" w-full p-6 ">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
          <div className="col-span-1 lg:col-span-4">
            <header>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
                Explore AI Agents
              </h1>
              <p className="text-gray-500">Most popular Agents by our community</p>
            </header>
          </div>

          {/* Search Bar */}
          <div className="col-span-1 lg:col-span-2">
            <input
              type="text"
              placeholder="Search agents..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Update search query
            />
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 rounded-2xl">
          {loading ? (
            // Skeleton loader for agents
            Array(6).fill(6, 1, 6).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-3 flex justify-between items-center relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-lg animate-pulse absolute top-6 left-4"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded animate-pulse ml-auto mt-4"></div>
                </div>
                <div className="p-4 flex flex-col">
                  <div className="w-3/4 h-6 bg-gray-300 rounded animate-pulse mt-4"></div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-20 h-8 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          ) : error ? (
            <p className="text-red-500 col-span-full">{error}</p>
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map((agent, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-3 flex justify-between items-center relative">
                  {agent.image ? (
                    <img className="w-12 h-12 absolute top-6 left-4 rounded-lg" src={agent.image} alt="Agent" />
                  ) : (
                    <GptIcon className="w-12 h-12 absolute top-6 left-4 rounded-lg" />
                  )}
                  <span className="text-gray-600 text-sm font-small ml-auto mt-4">{agent.users}</span>
                </div>
                <div className="p-4 flex flex-col">
                  <h3
                    className="text-md mt-7 font-semibold text-gray-800"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {agent.name}
                  </h3>
                  <div className="flex items-center justify-between mt-4">
                    <p
                      className="text-sm text-gray-500"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {agent.description}
                    </p>
                    <button
                      onClick={() => {
                        handleAgentSelect(agent.name);
                        router.push(`/app/ai-agent/aiAgentOutputScreen?agentId=${agent.agentId}&agentName=${agent.name}`);
                      }}
                      className="ml-4 px-6 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-[#2DA771] hover:text-white transition"
                    >
                      Recruit
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No agents match your search query.</p>
          )}

        </div>

      </main>
    </div>
  );
}
