import React, { useEffect, useRef } from "react";
import "../../../../../../../../styles/markdown.css";


const ChatMessages = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <>
      <div className="mt-4 flex justify-start items-start gap-4">
        <div className="max-w-5xl bg-[#F1F1F1] text-primary-black py-3 px-5 rounded-xl text-[15px] leading-[1.8]">
        
        </div>
      </div>
   
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
