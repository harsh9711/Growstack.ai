import Motion from "@/components/Motion";
import { Input } from "@/components/ui/input";
import React from "react";

export default function TelegramSection() {
  return (
    <Motion
      transition={{ duration: 0.2 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="border border-[#EDEFF0] bg-white rounded-3xl p-8 mt-8 flex items-start gap-6">
        <div className="!bg-white border border-[#EDEFF0] p-7 rounded-3xl w-full">
          <h1 className="text-xl font-semibold">AI writer setting</h1>
          <div className="space-y-2 mt-8">
            <div className="flex items-center justify-between">
              <label className="font-medium">
                Secret key <span className="text-[#F00]">*</span>
              </label>
              <span className="text-primary-black text-opacity-60 cursor-pointer">
                Click here to get the key
              </span>
            </div>
            <Input
              type="text"
              placeholder="Name your report"
              value="******************************"
            />
          </div>
          <div className="flex justify-end gap-4 w-full">
            <button className="py-3.5 h-14 w-full max-w-[180px] px-6 bg-primary-green sheen rounded-xl text-white mt-6 flex items-center justify-center gap-3 whitespace-nowrap">
              Submit
            </button>
          </div>
        </div>
        <div className="!bg-white border border-[#EDEFF0] p-7 rounded-3xl w-full">
          <h1 className="text-xl font-semibold">
            Get started with whatsapp cloud API
          </h1>
          <div className="mt-5">
            <ul className="list-decimal translate-x-6 pr-6 space-y-3">
              <li>Create a Telegram Account.</li>
              <li>Open Telegram and search for "Bot Father.</li>
              <li>
                Start a chat with Bot Father and use the new bot command to
                create a new bot.
              </li>
              <li>
                Follow the instructions to set a name and username for your bot.
              </li>
              <li>
                After creating the bot, Bot Father will provide you with a
                token.
              </li>
              <li>
                To add a bot to a Telegram group and use it as an administrator
                to get group activity via the Telegram Bot API, follow these
                steps:
              </li>
              <li className="space-y-3">
                Create a Telegram Account.
                <ol className="translate-x-6 pr-6 space-y-3 list-[lower-alpha]">
                  <li className="mt-3">
                    Add the Bot to Your Group{" "}
                    <ol className="space-y-3 translate-x-6 pr-6 mt-2 list-[lower-roman]">
                      <li>Open the group where you want to add the bot.</li>
                      <li>
                        Click on the group name at the top to open Group Info.
                      </li>
                      <li>
                        Tap on the three dots in the top-right corner and select
                        "Manage Group."
                      </li>
                      <li>
                        Click on "Administrators" and then "Add Administrator."
                      </li>
                      <li>
                        Search for your bot\'s username (e.g., @YourBotUsername)
                        and add it as an administrator.
                      </li>
                    </ol>
                  </li>
                  <li>Add the Bot to Your Group</li>
                  <li>Add the Bot to Your Group</li>
                  <li>Add the Bot to Your Group</li>
                </ol>
              </li>
              <li>Create a Telegram Account.</li>
              <li>Use the Telegram Bot API:</li>
            </ul>
          </div>
        </div>
      </div>
    </Motion>
  );
}
