
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

export default function AiAgent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const categories = [];
  interface Agent {
    name: string;
    description: string;
    users: number;
    agentId: string;
  }
  useEffect(() => {
    const fetchAgents = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8087/agents/api/v1/');

        if (response.data.message === "Agents fetched successfully") {
          // Ensure the data is an array of Agent objects
          setAgents(response.data.data.map((agent: any) => ({
            name: agent.name,
            description: agent.description,
            users: agent.users,
            agentId: agent.agentId,
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
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="lg:w-1/4 w-full lg:h-1/4 h-auto bg-white p-6 shadow-lg rounded-2xl mb-6 lg:mb-0">
        <div className="space-y-6">
          <ul>
            <li>
              <a
                href="#"
                className="w-full text-gray-700 bg-gray-200 py-2 px-4 mb-4 rounded-lg font-medium flex items-center"
              >
                <Plus className="mr-2 text text-md" />
                Create new AI agent
                <ChevroRight className="ml-auto " />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center py-2 bg-[#2DA771] mb-4 px-4 text-white rounded-lg font-medium"
              >
                <AiAgentIcon className="mr-2 text text-md" />
                AI Agents
                <ChevroRight className="ml-auto text-white" />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                <MyAIAgents className="mr-2 text text-md" />
                My AI agents
                <ChevroRight className="ml-auto" />
              </a>
            </li>
          </ul>
        </div>
      </aside>



      {/* Main Content */}
      <main className="lg:w-3/4 w-full p-6">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-2xl">
          {loading ? (
            <p className="text-gray-500 col-span-full">Loading agents...</p>
          ) : error ? (
            <p className="text-red-500 col-span-full">{error}</p>
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map((agent, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-3 flex justify-between items-center relative">
                  <GptIcon className="w-12 h-12 absolute top-6 left-4 rounded-lg" />
                  <span className="text-gray-600 text-sm font-small ml-auto">
                    {agent.users} users
                  </span>
                </div>
                <div className="p-4 flex flex-col">
                  <h3 className="text-md mt-4 font-semibold text-gray-800">
                    {agent.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="text text-sm text-gray-500"> {agent.description}</p>
                    <button
                      onClick={() => {
                        handleAgentSelect(agent.name);
                        router.push(`/app/ai-agent/aiAgentOutputScreen?agentId=${agent.agentId}&agentName=${agent.name}`);
                      }}
                      className="ml-4 px-6 py-2 text-green-500 border border-green-500 rounded-lg hover:bg-[#2DA771] hover:text-white transition"
                    >
                      Hire
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
