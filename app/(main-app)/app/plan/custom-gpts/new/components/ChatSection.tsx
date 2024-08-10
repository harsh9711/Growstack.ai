import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput";
import ChatOptions from "./ChatOptions";
import ChatMessages from "./ChatMessages";



const ChatSection = () => {




 

  return (
    <div className="flex-1 h-full flex flex-col px-8 pb-8">
      <div className="flex-1 flex flex-col h-full max-h-[55vh] overflow-y-auto">
        <ChatMessages />
      </div>
      <div className="space-y-4">
        <ChatOptions />
        <ChatInput onSend={function (): void {
          throw new Error("Function not implemented.");
        } }/>
      </div>
    </div>
  );
};

export default ChatSection;
