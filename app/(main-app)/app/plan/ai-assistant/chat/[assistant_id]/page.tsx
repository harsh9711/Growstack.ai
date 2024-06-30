"use client"

import React, { useEffect, useState } from "react";
import axios from "@/config/axios.config";
import { Assistant } from "../../types";
import toast from "react-hot-toast";

interface PageProps {
  params: {
    assistant_id: string;
  };
}

const Page: React.FC<PageProps> = ({ params: { assistant_id } }: PageProps) => {
  const [assistantData, setAssistantData] = useState<Assistant | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssistantData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/ai/api/v1/assistant/chat/${assistant_id}`);
        setAssistantData(response.data);
      } catch (error) {
        console.error("Error fetching assistant data:", error);
        setError("Something went wrong fetching assistant data.");
        toast.error("Something went wrong fetching assistant data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssistantData();
  }, [assistant_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Assistant Details</h1>
      {assistantData ? (
        <>
          <div>ID: {assistantData.id}</div>
          <div>Name: {assistantData.name}</div>
          <div>Role: {assistantData.role}</div>
          <div>
            Avatar: <img src={assistantData.avatar} alt={assistantData.name} />
          </div>
          <div>Welcome Message: {assistantData.welcome_message}</div>
        </>
      ) : (
        <div>No assistant data available.</div>
      )}
    </div>
  );
};

export default Page;
