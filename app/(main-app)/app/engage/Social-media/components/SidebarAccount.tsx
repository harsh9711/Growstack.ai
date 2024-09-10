import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem"; // Adjust the import path if necessary
import instance from "@/config/axios.config";
import {formatRelativeDate} from "@/utils/dateformate"

interface MessageData {
  senderId: string;
  message: string;
  created: string;
  senderDetails: {
    name: string;
    username: string;
    profileImage?: string;
  };
  attachments?: { type: string; url: string }[];
}

interface DataArray {
  platform: string;
  messages: any;
  lastUpdated:any;
}

interface SidebarItemProps {
  title: string;
  time: string;
  author: string;
  message: any;
  imageUrl: string;
  onClick?: () => void;
}

const MessageList = ({ onSelectMessage }: { onSelectMessage: (message: SidebarItemProps) => void }) => {
  const [dataArray, setDataArray] = useState<DataArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await instance.get("/users/api/v1/social-media/profile/messages");
        if (response.data.success) {
          setDataArray(response.data.data); // Setting data array directly
        } else {
          setError("Failed to fetch messages.");
        }
      } catch (err) {
        setError("An error occurred while fetching messages.");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      {/* Loop through the data array */}
      {dataArray.map((dataItem, index) => (
        <>
        <SidebarItem
          key={index}
          title={dataItem.platform}  
          time={formatRelativeDate(dataItem.messages.lastUpdated)}  
          author={dataItem.messages.messages[0]?.senderDetails.username || ""} 
          message={dataItem.messages.messages[0]?.message || "No message available"} 
          imageUrl={dataItem.messages.messages[0]?.senderDetails.profileImage || "/logo/growstack-mini.png"}
          onClick={() =>
            onSelectMessage({
              title: dataItem.platform,
              time:formatRelativeDate(dataItem.messages.messages[0]?.created),
              author: `${dataItem.messages.messages[0]?.senderDetails.username}`,
              message: dataItem.messages.messages,
              imageUrl: dataItem.messages.messages[0]?.senderDetails.profileImage || "/logo/growstack-mini.png",
            })
          }
        />
        </>
      ))}
    </div>
  );
};

export default MessageList;
