import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaFilePdf, FaFileWord, FaFileExcel } from "react-icons/fa";
import { IoMdSend, IoIosAttach, IoMdHappy } from "react-icons/io";
import Picker from 'emoji-picker-react';
import { LiaFolderSolid } from "react-icons/lia";
import { IoDocumentTextOutline } from "react-icons/io5";
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onFileUpload?: (file: File) => void;
}

const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
      return <FaFilePdf className="text-red-600" size={30} />;
    case 'txt':
      return <IoDocumentTextOutline  size={30} />;
    case 'doc':
    case 'docx':
      return <FaFileWord className="text-blue-600" size={30} />;
    case 'xls':
    case 'xlsx':
      return <FaFileExcel className="text-green-600" size={30} />;
    default:
      return <LiaFolderSolid className="text-gray-600" size={30} />;
  }
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [input, setInput] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [fileInfo, setFileInfo] = useState<{ name: string; file: File } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const canSend = input.trim() !== "" || fileInfo !== null;
  const handleSendMessage = () => {
    if (input.trim() !== "" || fileInfo) {
      onSendMessage(input);
      setInput(""); 
      setFileInfo(null);
      setUploadProgress(null);
    }
  };

  const handleEmojiClick = (emoji: { emoji: string }) => {
    setInput(prevInput => prevInput + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setFileInfo({ name: file.name, file });

      if (onFileUpload) {
        const uploadFile = async () => {
          for (let progress = 0; progress <= 100; progress += 10) {
            setUploadProgress(progress);
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          setUploadProgress(null);
          onFileUpload(file);
        };
        uploadFile();
      }
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFileInfo(null);
    setUploadProgress(null);
  };

  return (
    <div className="shadow-lg rounded-lg bg-white">
      <div className="flex flex-col p-2 border-b border-gray-200 rounded-t-lg">
        <div className="flex items-center">
        <button
          className="text-gray-600"
          onClick={handleAttachClick}
        >
          <IoIosAttach size={30} />
        </button>
        {fileInfo && (
          <div className="flex items-center justify-between  mt-2 p-2 bg-gray-100 border border-gray-300 rounded-lg">
            <div className="flex items-center space-x-2">
              {getFileIcon(fileInfo.name)}
              <span className="text-sm text-gray-700 truncate">{fileInfo.name}</span>
            </div>
            <button
              className="text-red-500 ml-2"
              onClick={handleRemoveFile}
            >
              <IoMdClose size={20} />
            </button>
          </div>
        )}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={1}
            className="w-full p-2 bg-transparent resize-none overflow-hidden min-h-[40px] max-h-[150px] rounded-lg  border-gray-0"
            placeholder="Write a message..."
          />
   
          <button
            className={`ml-2 p-2 ${canSend ? 'text-blue-500' : 'text-gray-400 cursor-not-allowed'}`}
            onClick={handleSendMessage}
            disabled={!canSend}
          >
            <IoMdSend size={30} />
          </button>
          <button className="mr-3" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <IoMdHappy size={30} />
        </button>
        </div>



        {uploadProgress !== null && (
          <div className="w-full bg-gray-200 rounded-full mt-2">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
      </div>


       
        {showEmojiPicker && (
          <div className="absolute bottom-16 z-50">
            <Picker onEmojiClick={handleEmojiClick} />
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
    </div>



  );
};

export default ChatInput;