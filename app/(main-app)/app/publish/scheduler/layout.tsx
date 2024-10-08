"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Picker from "emoji-picker-react";
import {
  LogoIcon,
  Cross,
  GenAi,
  InsertImage,
  Gif,
  ImgVector,
  LinkIcon,
  SmileEmoji,
  Clock,
  CaretDown,
  SendIcon2,
  Calender
} from "@/components/svgs";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
const calculateTimeLeft = (endTime: number): TimeLeft => {
  const difference = endTime - new Date().getTime();
  let timeLeft: TimeLeft = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [genPost, isGenPost] = useState<boolean>(false);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false); // Emoji picker state
  const [text, setText] = useState("");
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const gifInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleCaretClick = () => {
    setDropdownOpen((prev) => !prev); // Toggle dropdown
  };

  const handleGenPost = () => {
    isGenPost(true);
  };

  const endTimeRef = useRef<number>(
    new Date().getTime() + 4 * 24 * 60 * 60 * 1000
  );

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft(endTimeRef.current));
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  const onEmojiClick = (event: any, emojiObject: any) => {
    setText((prevText) => prevText + emojiObject.emoji); // Correct access to the emoji property
    setEmojiPickerOpen(false); // Close picker after emoji is selected
  };

  const handleImgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle the selected file(s) here
      console.log("Selected files:", files);
    }
  };

  const handleGifChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle the selected file(s) here
      console.log("Selected files:", files);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Handle the selected file(s) here
      console.log("Selected files:", files);
    }
  };

  return (
    <div className="flex-1 h-full w-full flex flex-col items-center justify-center text-center">
      <Image
        src="/logo/growstack-mini.png"
        alt=""
        width={60}
        height={60}
        className="mb-10"
      />
      <h1 className="text-3xl uppercase font-semibold mb-4">Coming Soon</h1>
      <p className="mb-10 max-w-2xl leading-loose">
        We’re currently working on creating something fantastic. We’ll be here
        soon. Subscribe to the newsletter to be notified.
      </p>
      <form className="w-full max-w-md">
        <div className="flex items-center border-b-2 border-primary-green py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="email"
            placeholder="Your Email"
            aria-label="Email"
          />
          <button
            className="flex-shrink-0 bg-primary-green hover:bg-primary-green border-primary-green hover:border-primary-green text-sm border-4 text-white py-1.5 px-2.5 rounded-lg"
            type="button"
          >
            Subscribe
          </button>
        </div>
      </form>
      <button onClick={handleGenPost}>Gen-Post</button>
      {genPost && (
        <Dialog open={genPost} onOpenChange={isGenPost}>
          <DialogContent
            showCloseButton={true}
            className="w-[498px] h-auto p-0 pb-4 border-0 max-w-none"
          >
            <DialogHeader>
              <DialogTitle className="px-5">
                <div className="bg-white py-3 border-b border-[#EBEBEB] text-black font-inter flex justify-between items-center">
                  <div className="flex items-center relative">
                    <div className="w-[50px] h-[50px] rounded-full border border-black bg-[#F5F5F5] flex items-center justify-center relative">
                      <LogoIcon />
                      <Cross
                        className="absolute w-4 h-4"
                        style={{
                          bottom: "0",
                          right: "0",
                          transform: "translate(25%, 25%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Write something... or type :balloon: to insert a 🎈"
              className="w-full h-auto border-none focus:outline-none pl-[20px] text-[15px] font-poppins font-normal leading-normal overflow-y-auto max-h-[7.5em] resize-none"
              style={{
                resize: "none",
                lineHeight: "1.5",
              }} // Set max height and hide overflow
            />
            <button className="flex items-center w-[150px] h-[35px] mt-2 ml-5 border border-dashed border-[#034737] rounded-[16px] text-[#034737] text-[14px] bg-transparent">
              <GenAi className="ml-2 mr-2" size={24} />
              {/* Added icon with right margin */}
              Generative AI
            </button>
            <div className="mt-[60px] ml-[15px]">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <button
                    onClick={() => imgInputRef.current?.click()} // Trigger file input
                  >
                    <InsertImage />
                  </button>
                  <button
                    onClick={() => gifInputRef.current?.click()} // Trigger file input
                  >
                    <Gif />
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()} // Trigger file input
                  >
                    <ImgVector />
                  </button>
                  <div className="border-l border-gray h-[28px] mx-2" />
                  <button
                    onClick={() => fileInputRef.current?.click()} // Trigger file input
                  >
                    <LinkIcon />
                  </button>
                </div>
                <div className="relative">
                  <SmileEmoji
                    onClick={() => setEmojiPickerOpen(!emojiPickerOpen)}
                  />
                  {emojiPickerOpen && (
                    <div className="absolute bottom-[200px] right-[50px]">
                      <Picker onEmojiClick={onEmojiClick} />{" "}
                      {/* Emoji Picker */}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={imgInputRef}
              onChange={handleImgChange}
              style={{ display: "none" }} // Hide the file input
            />
            <input
              type="file"
              accept="image/gif"
              ref={gifInputRef}
              onChange={handleGifChange}
              style={{ display: "none" }} // Hide the file input
            />
            <input
              type="file"
              accept="*/*" // Accept all file types
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }} // Hide the file input
            />
            <DialogFooter className="bg-[#F8F9FB] flex justify-between">
              <button className="mr-auto flex items-center ml-5">
                <Clock />
                <span className="ml-2">Select date & Time</span>
                <CaretDown className="ml-2" />
              </button>
              <div className="relative">
                <button className="border bg-primary-green rounded-[5px] text-white flex items-center p-2 mr-4">
                  <span className="mr-2">Save as Draft</span>
                  <div className="border-l border-white h-[28px] mx-2" />
                  <CaretDown
                    className="ml-2 w-5 h-5" // Increase size of CaretDown
                    onClick={handleCaretClick}
                  />
                </button>
                {isDropdownOpen && (
                <div className="absolute z-1000 w-[250px] h-auto bg-white rounded-[15px] shadow-lg flex flex-col justify-around p-2">
                  <button className="border-none p-1 rounded flex items-center">
                    <Calender className="mr-2"/> Schedule
                  </button>
                  <button className="border-none p-1 rounded flex items-center">
                    <SendIcon2 className="mr-2" /> Publish
                  </button>
                </div>
              )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
