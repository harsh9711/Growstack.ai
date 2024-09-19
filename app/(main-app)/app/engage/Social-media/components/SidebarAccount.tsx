import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem"; // Adjust the import path if necessary
import instance from "@/config/axios.config";
import {formatRelativeDate, timeDiffFromNow} from "@/utils/dateformate"
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
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
  recipientId:string
}

const MessageList = ({ onSelectMessage }: { onSelectMessage: (message: SidebarItemProps) => void }) => {
  const [dataArray, setDataArray] = useState<DataArray[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await instance.get("/users/api/v1/social-media/profile/messages");
        
        if (response.data.success) {
          setDataArray(response.data.data);
        } else {
          setError("Failed to fetch messages.");
        }
      } catch (err:any) {
        if (err.response) {
          if (err.response.data.message === "Please connect your social media account") {
            Swal.fire({
              title: "Social Media Account Required",
              text: "Please connect your social media account to proceed.",
              icon: "warning",
              showCancelButton: false,
              confirmButtonText: "Yes, connect now!",
              cancelButtonText: "Cancel",
              allowOutsideClick: false
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/app/publish/scheduler/quick-posting/profiles");
              }
            });
          }
        } 
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (dataArray.length === 0) return <div>Message: Channel not available.</div>;
  const date = new Date()
  return (
    <div>
      {/* Loop through the data array */}
      {dataArray.map((dataItem, index) => (
        <>
        <SidebarItem
          key={index}
          title={dataItem.platform}  
          time={timeDiffFromNow(dataItem.messages.lastUpdated)}  
          author={dataItem.messages.messages[0]?.senderDetails.username || ""} 
          message={dataItem.messages.messages[0]?.message || "No message available"} 
          imageUrl={dataItem.messages.messages[0]?.senderDetails.profileImage || "/logo/growstack-mini.png"}
          onClick={() =>
            onSelectMessage({
              recipientId:dataItem.messages.recipientId,
              title: dataItem.platform,
              time:formatRelativeDate(dataItem.messages.messages[0]?.created),
              author: dataItem.messages.messages[0]?.senderDetails.username || "",
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