import { useState } from "react";
import clsx from "clsx";
import ChatInput from "./ChatInput";
import Image from "next/image";
import Link from "next/link";

export default function Sidebargpt() {
  const tabs = ["Create", "Configure"];
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const [showBox, setShowBox] = useState(true);

  const handleTabClick = (index: number) => {
    const totalTabs = tabs.length;
    const percentage = (index / totalTabs) * 100;
    setSelectedTabIndex(index);
    setTabUnderlineLeft(percentage);
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    instructions: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data:", formData);
  };

  const handleSend = () => {
    setShowBox(true);
  };

  return (
    <div className="justify-between flex flex-row w-full h-full transition-all duration-500 opacity-100">
      <div className="bg-white w-full h-full rounded-2xl overflow-hidden transition-all duration-500 opacity-100 border relative">
        <div className="w-full flex flex-col items-center">
          <div className="w-80 flex relative bg-white border shadow-2xl translate-y-10 rounded-2xl overflow-hidden">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                  selectedTabIndex === index
                    ? "!text-white  font-medium"
                    : "!text-black font-medium"
                }`}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
              style={{
                left: `calc(${tabUnderlineLeft}%)`,
                width: `${100 / tabs.length}%`,
              }}
            ></div>
          </div>
          <div className="w-full p-4 px-8 mt-4">
            {selectedTabIndex === 0 && (
              <p className="mt-10 flex flex-col gap-y-72">
                <span className="flex flex-col gap-y-4">
                  <h2 className="font-bold text-[18px]">GPT builder</h2>
                  <p className="text-[14px] flex flex-col gap-y-4">
                    Hi! I’ll help you build a new GPT. You can say something
                    like, “make a creative who helps generate visuals for new
                    products” or make a software engineer who helps format my
                    code.”
                    <br className="mt-4" />
                    <span className="mt-4">
                      What would you like to make?{" "}
                    </span>
                  </p>
                </span>
                <ChatInput onSend={handleSend} />{" "}
              </p>
            )}

            {selectedTabIndex === 1 && (
              <p className="mt-10 flex flex-col gap-y-4 ">
                <span className="flex flex-col gap-y-4">
                  <span className="item-center text-center mx-auto">
                    <svg
                      width="112"
                      height="112"
                      viewBox="0 0 112 112"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="56"
                        cy="56"
                        r="55.5"
                        stroke="black"
                        stroke-dasharray="2 2"
                      />
                      <path
                        d="M56.0001 42.582V69.4154"
                        stroke="#14171B"
                        stroke-width="3.35417"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M42.5833 56.0013H69.4166"
                        stroke="#14171B"
                        stroke-width="3.35417"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <div className=" w-full mx-auto p-4 ">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-4">
                        <label
                          htmlFor="name"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Name your GPT"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  text-gray-800 bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="description"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Description
                        </label>
                        <input
                          type="text"
                          id="description"
                          name="description"
                          placeholder="Add a short description about what this GPT does"
                          value={formData.description}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                      </div>

                      <div className="mb-4">
                        <label
                          htmlFor="instructions"
                          className="block text-[14px] font-semibold text-gray-700"
                        >
                          Instructions
                        </label>
                        <textarea
                          id="instructions"
                          placeholder="What does this GPT do? How does it behave? What should it avoid doing?"
                          name="instructions"
                          value={formData.instructions}
                          onChange={handleChange}
                          className="mt-1 block w-full px-3 py-2  text-black bg-[#F2F2F2] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                      </div>

                      <Link href="/app/plan/custom-gpts/redirect">
            <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 border  px-3.5 py-2 rounded-full font-medium items-center">
             
              <h2 className='text-sm font-medium'>Create Action</h2>
            </button>
          </Link>
                    </form>
                  </div>
                </span>
                
                <ChatInput onSend={handleSend} />{" "}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="bg-gray-100 w-full  h-full rounded-2xl overflow-hidden transition-all duration-500 opacity-100 relative">
          <div className="w-full flex flex-col items-center">
            <div className="w-full p-4 px-8 mt-4">
              <p className="mt-4 flex flex-col gap-y-[148px]">
                <span className="flex flex-col ">
                  <h2 className="font-bold text-xl text-[18px] text-center">
                    Preview
                  </h2>
                </span>
                <div className="mx-auto items-center justify-center flex flex-col gap-y-8">
                  <Image
                    src="/cookie.png"
                    alt="cookie"
                    className="rounded-xl items-center "
                    width={100}
                    height={100}
                  />
                  <span className="items-center justify-center flex flex-col">
                    {" "}
                    <h2 className="font-bold text-[18px]">Cookie Helper</h2>
                    <p className="text-[14px]">
                      A helpful guide for baking cookies
                    </p>
                  </span>
                </div>
                <ChatInput onSend={handleSend} />
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}

