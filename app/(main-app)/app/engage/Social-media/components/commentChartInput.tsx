import React, { useRef, useState } from "react";
import { IoMdSend } from "react-icons/io"; // Importing send icon

const CommentChatInput = (props: any) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState(props.chatInput);
  const canSend = input.trim() !== ""; 

  return (
    <div className="shadow-lg rounded-lg bg-white">
      <div className="flex bg-white p-2 border gap-2 rounded items-end">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            props.handleChatInputCallback(e);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (canSend) {
                props.handlePostComment(input);
                setInput("");
              }
            }
          }}
          rows={1}
          className="w-full flex-1 p-2 bg-transparent resize-none overflow-hidden min-h-11 max-h-[300px]"
          placeholder="Write a comment..."
        />

        {/* Send button */}
        <button
          className={`ml-2 p-2 ${
            canSend ? "text-blue-500" : "text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => {
            if (canSend) {
              props.handlePostComment(input); 
              setInput(""); 
            }
          }}
          disabled={!canSend}
        >
          <IoMdSend size={30} />
        </button>
      </div>
    </div>
  );
};

export default CommentChatInput;
