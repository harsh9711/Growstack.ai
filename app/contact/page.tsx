"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Accordion from "react-bootstrap/Accordion";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import "../../styles/customarrow.css";
import Footer from "@/components/footer/Footer";
const RequestForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    companyName: "",
    phoneNumber: "",
    preferredDateTime: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="firstName"
          >
            First Name
          </label>
          <div className=" bg-white border appearance-none w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 mt-0.5"
            >
              <circle
                cx="7.9987"
                cy="4.66618"
                r="2.66667"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 13.9995V12.6662C4 11.1934 5.19391 9.99951 6.66667 9.99951H9.33333C10.8061 9.99951 12 11.1934 12 12.6662V13.9995"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full border-none outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastName"
          >
            Last Name
          </label>
          <div className=" bg-white border appearance-none w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 mt-0.5"
            >
              <circle
                cx="7.9987"
                cy="4.66618"
                r="2.66667"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 13.9995V12.6662C4 11.1934 5.19391 9.99951 6.66667 9.99951H9.33333C10.8061 9.99951 12 11.1934 12 12.6662V13.9995"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full border-none outline-none"
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <div className=" bg-white border appearance-none w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] flex items-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 mt-0.5"
            >
              <path
                d="M1 3.5C1 2.11929 2.11929 1 3.5 1H12.5C13.8807 1 15 2.11929 15 3.5V12.5C15 13.8807 13.8807 15 12.5 15H3.5C2.11929 15 1 13.8807 1 12.5V3.5Z"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 3L8 8L1 3"
                stroke="#034737"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email..."
              className="w-full border-none outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phoneNumber"
          >
            Phone Number (optional)
          </label>
          <div className=" bg-white border appearance-none w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] flex items-center">
            <svg
              className="mr-2 mt-0.5"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.33333 2.6665H6L7.33333 5.99984L5.66667 6.99984C6.38064 8.44752 7.55231 9.6192 9 10.3332L10 8.6665L13.3333 9.99984V12.6665C13.3333 13.4029 12.7364 13.9998 12 13.9998C6.61843 13.6728 2.32704 9.3814 2 3.99984C2 3.26346 2.59695 2.6665 3.33333 2.6665"
                stroke="#667085"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.33333 2.6665H6L7.33333 5.99984L5.66667 6.99984C6.38064 8.44752 7.55231 9.6192 9 10.3332L10 8.6665L13.3333 9.99984V12.6665C13.3333 13.4029 12.7364 13.9998 12 13.9998C6.61843 13.6728 2.32704 9.3814 2 3.99984C2 3.26346 2.59695 2.6665 3.33333 2.6665"
                stroke="#667085"
                stroke-opacity="0.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full border-none outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="message"
          >
            Message/Questions (optional)
          </label>
          <div className=" bg-white border appearance-none w-full py-3.5 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-[10px] flex items-center">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Enter message/questions"
              className="w-full border-none outline-none h-32"
            />
          </div>
        </div>

        <div className="rounded-xl focus:outline-none focus:shadow-outline flex border-[#034737] border-2 group items-center justify-center">
          <button
            type="submit"
            className="rounded   w-full max-w-[530px] group-hover:hover:bg-[#034737] group-hover:text-white text-[#034737] font-normal text-[16px] py-4 px-4 "
          >
            Send message
          </button>
        </div>
      </form>
    </div>
  );
};
const CustomAccordion = () => {
  const [activeKey, setActiveKey] = useState(null);

  const handleToggle = (key: any) => {
    setActiveKey(activeKey === key ? null : key);
  };

  const items = [
    {
      header:
        "How can GrowStack transform my business strategies into success stories?",
      body: "Sign up on our website and explore our AI-driven features. For personalized guidance, our customer support team is always ready to assist you.",
    },
    {
      header: "Can I upgrade or downgrade my plan at any time?",
      body: "Yes, you have the flexibility to upgrade or downgrade your plan anytime, ensuring you always have the right tools for your business needs.",
    },
    {
      header:
        "How does GrowStack address unique business challenges with tailored solutions?",
      body: "Our AI-powered tools adapt to your specific needs, offering personalized solutions that tackle your unique business challenges effectively.",
    },
    {
      header:
        "What benefits does GrowStack offer for businesses seeking growth and efficiency?",
      body: "GrowStack provides AI-powered efficiency, seamless integration, and data-driven insights, helping your business achieve exceptional growth and productivity.",
    },
    {
      header: "Is my data secure with GrowStack?",
      body: "Absolutely. We partner with all major LLMs, offering choice and flexibility while ensuring your data is 100% secure and exclusively yours.",
    },
    {
      header: "How can I manage my business on the go with GrowStack?",
      body: "Our intuitive mobile app allows you to stay productive and in control from anywhere, offering real-time access to tasks and insights.",
    },
  ];

  return (
    <Accordion
      activeKey={activeKey}
      className=" h-full w-full xl:w-[1330px] "
      data-aos="fade-up"
      data-aos-easing="ease-in-sine"
      data-aos-duration="1000"
    >
      {items.map((item, index) => (
        <Accordion.Item
          key={index}
          eventKey={index.toString()}
          className=" mb-4 rounded-[20px] w-full xl:w-[1330px] overflow-hidden  bg-white "
        >
          <Accordion.Header
            className={`flex text-[20px] max-w-[1330px]  rounded-[20px] flex-row font-bold items-center justify-between transition-all duration-200 w-full `}
            onClick={() => handleToggle(index.toString())}
          >
            <div className="rounded-[20px] flex flex-row leading-8 items-center w-full gap-20 justify-between">
              <div
                className={`${
                  activeKey === index.toString() ? "text-primary-green" : ""
                }`}
              >
                {item.header}
              </div>
              <div
                className={`flex items-center justify-center border w-10 h-10 bg-${
                  activeKey === index.toString() ? "primary-green" : "white"
                } rounded-full transition-transform transform ${
                  activeKey === index.toString() ? "rotate-180 " : "-rotate-90"
                }`}
              >
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.85156 1.93066L10.0003 10.0426L18.1491 1.93066"
                    stroke={`${
                      activeKey === index.toString() ? "white" : "#034737"
                    } `}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </Accordion.Header>
          <Accordion.Body className="rounded-[20px] border-b-8 max-w-[1330px] border-[#D9D9D9] p-4   w-full font-normal text-[18px] text-gray-700 bg-white">
            {item.body}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

const Contact = () => {
  return (
    <div className="">
      {" "}
      <Navbar />
      <div className=" pt-20 flex flex-col items-start mx-auto max-w-[1330px]">
        {" "}
        <div className=" flex w-full font-bold bg-[#03473714] text-[#034737] rounded-full items-center justify-between px-6 py-2 text-[12px] max-w-[145px] ">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4H9L11 9L8.5 10.5C9.57096 12.6715 11.3285 14.429 13.5 15.5L15 13L20 15V19C20 20.1046 19.1046 21 18 21C9.92765 20.5094 3.49056 14.0724 3 6C3 4.89543 3.89543 4 5 4"
              stroke="#034737"
              stroke-width="1.2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Contact us
        </div>
        <div className="2xl:p-0  mt-6 flex flex-wrap gap-6 w-full items-start mx-auto justify-between">
          <div className="relative z-20 flex flex-col gap-y-2 max-w-[543px] w-full">
            <h2 className="text-[42px]  font-bold text-black">
              Connect with us <span className="font-light">directly</span>
            </h2>
            <p className="text-[20px] text-[#034737] font-medium">
              Prefer a direct approach? Reach out to our team via email or
              phone.
            </p>

            <div className="flex flex-col gap-y-6">
              <div className="bg-white flex flex-row gap-4 w-full justify-between group border-[#E6E6E6] border pt-4 px-4  rounded-[20px]">
                <svg
                  width="66"
                  height="66"
                  viewBox="0 0 66 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="66"
                    height="66"
                    rx="10"
                    fill="#F3F3F3"
                    className="transition-colors duration-300 group-hover:fill-[#034737]"
                  />
                  <path
                    className=" transition-colors duration-300 fill-[#14171B]   group-hover:fill-[#ffffff]"
                    d="M30.3629 36.5573C29.8174 37.1634 29.5265 37.9452 29.5568 38.7694C29.5871 39.5937 29.9205 40.3573 30.5084 40.927C31.0781 41.4725 31.8053 41.7694 32.5811 41.7694H32.6841C33.4962 41.7452 34.2477 41.3937 34.7993 40.7876C35.3447 40.1816 35.6356 39.3997 35.6053 38.5755C35.5508 36.8664 34.1447 35.527 32.4781 35.5755C31.6659 35.5997 30.9144 35.9513 30.3629 36.5573ZM32.575 36.7391C33.575 36.7391 34.4053 37.5694 34.4356 38.6119C34.4538 39.1331 34.272 39.624 33.9326 40.0058C33.5932 40.3816 33.1387 40.5937 32.6417 40.6119C32.1387 40.624 31.6781 40.4422 31.3144 40.0967C30.9447 39.7452 30.7326 39.2603 30.7205 38.7391C30.7023 38.2179 30.8841 37.727 31.2235 37.3452C31.5629 36.9755 32.0174 36.7573 32.5144 36.7391H32.575Z"
                    fill="white"
                  />
                  <path
                    className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                    d="M48.8479 34.2123C49.7146 34.182 50.3994 33.4547 50.3691 32.5941L49.9388 19.6486C49.9329 19.4419 49.8859 19.2385 49.8006 19.0502C49.7153 18.8618 49.5933 18.6924 49.4418 18.5516C49.1375 18.2697 48.7353 18.1175 48.3206 18.1274L19.8661 18.9153C18.1509 18.9698 16.7994 20.4062 16.8539 22.1153C16.8842 22.9456 17.2297 23.7092 17.8418 24.2789C18.4236 24.8183 19.1752 25.1153 19.9691 25.1153H20.0721C21.7873 25.0607 23.1388 23.6244 23.0842 21.9153C23.06 21.2062 22.7873 20.5516 22.3327 20.0183L48.363 19.2971C48.4661 19.291 48.5752 19.3335 48.66 19.4062C48.7388 19.4789 48.7873 19.582 48.7873 19.685L49.2176 32.6304C49.2236 32.8547 49.0479 33.0365 48.8236 33.0486L24.9327 33.8365C24.9146 33.4547 24.8903 33.0789 24.8721 32.685C24.7812 31.085 24.7085 29.7698 24.6721 28.9698C25.3024 28.9335 25.9449 28.9032 26.5691 28.885C28.2176 28.8304 29.9206 28.7698 31.5146 28.4668C32.7267 28.2365 33.0721 27.4183 32.9994 26.788C32.9085 25.9456 32.0721 25.085 30.8479 25.1335L28.8721 25.188C27.757 25.2183 26.5994 25.2426 25.4661 25.2971C24.0176 25.3698 22.5691 25.4607 21.1267 25.5516L19.2539 25.6668C17.1691 25.7941 14.0236 25.982 13.7873 29.0789C13.6479 30.8971 13.6661 32.7395 13.8479 34.5516C13.86 34.6971 13.8721 34.8547 13.8842 35.0244C13.9812 36.3456 14.1449 38.5516 15.9933 38.9153C16.1267 38.9395 16.26 38.9516 16.3933 38.9516C16.6964 38.9516 17.0055 38.885 17.2842 38.7638L17.4842 44.8426C17.5146 45.8304 17.6115 46.8001 17.7752 47.885C17.9267 48.8971 18.5873 49.7577 19.4903 50.1153C19.8055 50.2426 20.1267 50.3032 20.4539 50.3032C20.9994 50.3032 21.5449 50.1213 22.0479 49.7759C22.3933 50.0547 22.8479 50.2062 23.3206 50.2062C23.5267 50.2062 23.7388 50.1759 23.9509 50.1213C24.6176 49.9456 25.1449 49.4971 25.357 48.9213C25.6418 48.1456 25.4661 43.4183 25.0115 34.988L48.8479 34.2123ZM19.9691 20.085C20.4661 20.085 20.9388 20.2668 21.3024 20.6062C21.6842 20.9577 21.9024 21.4365 21.9146 21.9516C21.9509 23.0183 21.1024 23.9153 20.0297 23.9516C19.5024 23.9638 19.0115 23.782 18.6297 23.4304C18.2479 23.0789 18.0297 22.6001 18.0176 22.085C17.9812 21.0183 18.8236 20.1213 19.9024 20.085H19.9509H19.9691ZM24.2297 48.5274C24.1509 48.7456 23.9206 48.9213 23.6176 49.0062C23.2842 49.0971 22.9449 49.0426 22.7388 48.8729C22.3449 48.5456 22.3206 47.6244 22.3085 47.0183C22.2903 46.2486 22.26 45.4789 22.2358 44.7032C22.1812 43.1274 22.1267 41.4971 22.1206 39.8971C22.1206 39.7428 22.0593 39.5948 21.9502 39.4857C21.8411 39.3766 21.6931 39.3153 21.5388 39.3153C21.3845 39.3153 21.2365 39.3766 21.1274 39.4857C21.0183 39.5948 20.957 39.7428 20.957 39.8971C20.963 41.5153 21.0176 43.1516 21.0721 44.7395C21.0964 45.5092 21.1206 46.2789 21.1449 47.0971C21.157 47.5577 21.1752 48.2183 21.3752 48.8062C20.8964 49.1395 20.3752 49.2304 19.8964 49.0365C19.3691 48.8244 18.9994 48.3274 18.9024 47.7092C18.7449 46.6668 18.6539 45.7456 18.6236 44.8001L18.3873 37.6183V37.5577L18.1752 31.2547C18.163 30.9335 17.8782 30.6668 17.5752 30.691C17.4987 30.6934 17.4235 30.7108 17.3538 30.7422C17.2841 30.7736 17.2213 30.8185 17.169 30.8742C17.1166 30.93 17.0758 30.9954 17.0488 31.067C17.0218 31.1385 17.0091 31.2146 17.0115 31.291L17.2115 37.3698C16.9812 37.6668 16.563 37.8486 16.1933 37.7759C15.2964 37.6001 15.1267 36.3395 15.0236 34.9456C15.0115 34.7638 14.9994 34.5941 14.9812 34.4426C14.8115 32.6971 14.7933 30.9213 14.9267 29.1698C15.0782 27.2304 16.8358 26.982 19.3206 26.8304L21.1752 26.7153C22.6176 26.6244 24.06 26.5335 25.5024 26.4668C26.6236 26.4123 27.7691 26.382 28.8782 26.3577C29.5388 26.3395 30.2055 26.3274 30.8661 26.3032C31.4418 26.3032 31.7933 26.6547 31.8236 26.9153C31.8539 27.1698 31.4964 27.2789 31.2782 27.3213C29.7691 27.6062 28.1146 27.6607 26.5085 27.7153C25.5327 27.7516 24.5206 27.782 23.557 27.8668C23.2358 27.8971 22.9994 28.1759 23.0297 28.4971C23.0539 28.7577 23.2418 28.9516 23.4842 29.0062C23.5206 29.8123 23.5933 31.1335 23.6842 32.7395C23.957 37.5638 24.5085 47.5759 24.2297 48.5274Z"
                    fill="white"
                  />
                  <path
                    className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                    d="M40.2296 27.5571C40.1448 27.5268 40.0236 27.3571 39.9205 27.2056C39.7266 26.9208 39.4842 26.5693 39.0418 26.4177C38.2357 26.1329 37.5084 26.7571 37.2357 26.9935L33.1448 30.4965C32.9024 30.7087 32.8721 31.0723 33.0781 31.3208C33.1933 31.4541 33.3569 31.5268 33.5205 31.5268C33.6539 31.5268 33.7872 31.4784 33.8963 31.3874L37.9872 27.8844C38.4114 27.5208 38.5872 27.5026 38.6478 27.5208C38.7327 27.5511 38.8539 27.7208 38.9569 27.8723C39.1508 28.1571 39.3933 28.5087 39.8418 28.6662C40.4721 28.8844 41.1327 28.6056 41.7933 27.8359L44.9024 24.2359V25.9329C44.9024 26.0872 44.9637 26.2352 45.0728 26.3443C45.1819 26.4534 45.3299 26.5147 45.4842 26.5147C45.6385 26.5147 45.7865 26.4534 45.8956 26.3443C46.0047 26.2352 46.066 26.0872 46.066 25.9329L46.0599 22.5935C46.0605 22.5091 46.0423 22.4256 46.0067 22.3491C45.971 22.2726 45.9188 22.205 45.8539 22.1511C45.7899 22.0973 45.7152 22.0575 45.6348 22.0346C45.5544 22.0116 45.47 22.0059 45.3872 22.0177L42.3933 22.4844C42.2468 22.5152 42.1177 22.6011 42.0328 22.7243C41.9478 22.8476 41.9135 22.9987 41.9368 23.1466C41.9602 23.2944 42.0394 23.4277 42.1582 23.5188C42.277 23.6098 42.4262 23.6518 42.5751 23.6359L44.0781 23.3996L40.9084 27.0723C40.5569 27.4784 40.3205 27.5874 40.2296 27.5571ZM37.3205 43.5753C36.0963 42.2541 34.2114 42.0177 32.9024 41.9571C31.369 41.8905 29.2478 42.1268 27.8357 43.7026C26.266 45.4602 26.266 47.5632 26.5024 49.5753C26.5387 49.8723 26.7872 50.0905 27.0781 50.0905C27.1024 50.0905 27.1266 50.0905 27.1448 50.0844C27.466 50.0481 27.6902 49.7571 27.6539 49.4359C27.4175 47.4238 27.5024 45.8117 28.6963 44.4784C29.7993 43.242 31.5569 43.0602 32.8357 43.1208C34.0357 43.1753 35.5266 43.3693 36.4539 44.3693C37.5933 45.5996 37.6236 47.2541 37.6599 49.0056L37.666 49.2056C37.6721 49.5268 37.9266 49.7814 38.2599 49.7753C38.3363 49.7737 38.4117 49.7571 38.4817 49.7264C38.5517 49.6957 38.6149 49.6515 38.6678 49.5964C38.7207 49.5412 38.7623 49.4762 38.79 49.405C38.8178 49.3338 38.8312 49.2578 38.8296 49.1814L38.8236 48.9814C38.7993 47.0905 38.7569 45.1329 37.3205 43.5753Z"
                    fill="white"
                  />
                  <path
                    className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                    d="M29.8471 45.5758C29.7707 45.5782 29.6955 45.5956 29.6258 45.627C29.5561 45.6584 29.4933 45.7033 29.441 45.759C29.3886 45.8147 29.3478 45.8802 29.3207 45.9517C29.2937 46.0233 29.2811 46.0994 29.2835 46.1758L29.3926 49.5031C29.4047 49.8182 29.6593 50.0667 29.9744 50.0667H29.9926C30.069 50.0644 30.1442 50.047 30.2139 50.0156C30.2836 49.9841 30.3464 49.9393 30.3988 49.8835C30.4511 49.8278 30.492 49.7623 30.519 49.6908C30.546 49.6193 30.5586 49.5431 30.5562 49.4667L30.4471 46.1395C30.4411 45.8122 30.1744 45.5455 29.8471 45.5758ZM35.0714 45.3637C34.995 45.3661 34.9198 45.3834 34.8501 45.4149C34.7804 45.4463 34.7176 45.4912 34.6652 45.5469C34.6129 45.6026 34.572 45.6681 34.545 45.7396C34.518 45.8111 34.5053 45.8873 34.5077 45.9637L34.6108 49.1576C34.6229 49.4728 34.8774 49.7213 35.1926 49.7213H35.2108C35.2872 49.7189 35.3624 49.7015 35.4321 49.6701C35.5018 49.6387 35.5646 49.5938 35.6169 49.5381C35.6693 49.4824 35.7101 49.4169 35.7372 49.3454C35.7642 49.2738 35.7768 49.1977 35.7744 49.1213L35.6714 45.9273C35.6653 45.6061 35.3986 45.3395 35.0714 45.3637ZM45.7623 35.1576C44.0471 35.2122 42.6956 36.6485 42.7502 38.3576C42.8047 40.0304 44.1926 41.3576 45.8653 41.3576H45.9683C47.6835 41.3031 49.035 39.8667 48.9805 38.1576C48.9259 36.4425 47.4653 35.091 45.7623 35.1576ZM45.932 40.1879C44.8532 40.2243 43.9502 39.3819 43.9199 38.3152C43.8835 37.2485 44.732 36.3516 45.8047 36.3152H45.8714C46.9199 36.3152 47.7865 37.1395 47.8168 38.1879C47.8244 38.443 47.7817 38.6971 47.6911 38.9357C47.6005 39.1743 47.4637 39.3927 47.2887 39.5784C47.1137 39.7641 46.9038 39.9135 46.671 40.0181C46.4382 40.1227 46.1871 40.1804 45.932 40.1879ZM52.3199 48.5576C52.2835 46.6607 52.2411 44.7031 50.7502 43.1455C49.5017 41.8425 47.6593 41.6001 46.1926 41.5334C44.6108 41.4607 42.4229 41.7092 40.9623 43.2788C39.3259 45.0364 39.3259 47.1455 39.5744 49.1637C39.6108 49.4607 39.8593 49.6789 40.1502 49.6789C40.1744 49.6789 40.1986 49.6788 40.2229 49.6728C40.5441 49.6364 40.7683 49.3455 40.732 49.0243C40.4896 47.0182 40.5805 45.4061 41.8168 44.0728C42.9683 42.8304 44.8047 42.6364 46.138 42.697C47.3865 42.7516 48.9441 42.9455 49.9077 43.9455C51.0835 45.1758 51.1199 46.8243 51.1502 48.5758L51.1562 48.7758C51.1623 49.091 51.4229 49.3455 51.738 49.3455H51.7502C51.8266 49.3439 51.9019 49.3273 51.9719 49.2966C52.0419 49.2659 52.1052 49.2217 52.1581 49.1666C52.211 49.1114 52.2525 49.0464 52.2802 48.9752C52.308 48.904 52.3215 48.828 52.3199 48.7516V48.5576Z"
                    fill="white"
                  />
                  <path
                    className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                    d="M43.0053 45.1573C42.9289 45.1596 42.8537 45.177 42.784 45.2085C42.7143 45.2399 42.6515 45.2847 42.5992 45.3405C42.5468 45.3962 42.506 45.4617 42.479 45.5332C42.4519 45.6047 42.4393 45.6809 42.4417 45.7573L42.5508 49.0846C42.5629 49.3997 42.8175 49.6482 43.1326 49.6482H43.1508C43.2272 49.6458 43.3024 49.6284 43.3721 49.597C43.4418 49.5656 43.5046 49.5207 43.557 49.465C43.6093 49.4093 43.6502 49.3438 43.6772 49.2723C43.7042 49.2007 43.7169 49.1246 43.7144 49.0482L43.6053 45.7209C43.5993 45.3997 43.3326 45.127 43.0053 45.1573ZM48.4659 44.9391C48.3895 44.9414 48.3143 44.9588 48.2446 44.9903C48.1749 45.0217 48.1121 45.0666 48.0598 45.1223C48.0074 45.178 47.9666 45.2435 47.9396 45.315C47.9125 45.3865 47.8999 45.4627 47.9023 45.5391L48.0053 48.733C48.0175 49.0482 48.272 49.2967 48.5872 49.2967H48.6053C48.6818 49.2943 48.757 49.2769 48.8267 49.2455C48.8963 49.2141 48.9592 49.1692 49.0115 49.1135C49.0638 49.0578 49.1047 48.9923 49.1317 48.9208C49.1587 48.8492 49.1714 48.7731 49.169 48.6967L49.0659 45.5027C49.0646 45.426 49.0478 45.3504 49.0167 45.2802C48.9856 45.2101 48.9408 45.1469 48.8849 45.0943C48.8289 45.0418 48.7631 45.001 48.6911 44.9743C48.6192 44.9477 48.5426 44.9357 48.4659 44.9391ZM46.2114 17.4421C46.6962 17.63 47.1084 17.7633 47.169 17.6664C47.2296 17.5694 46.8841 17.2543 46.3629 17.0543C45.8417 16.8543 45.375 16.8543 45.3568 16.9633C45.3265 17.0785 45.7265 17.2543 46.2114 17.4421ZM48.1144 16.333C49.1084 16.6603 49.8417 17.127 49.9144 17.03C49.9872 16.9512 49.3205 16.2967 48.2478 15.9391C47.1811 15.5755 46.2538 15.6967 46.2599 15.7997C46.2659 15.9209 47.1265 15.9936 48.1144 16.333Z"
                    fill="white"
                  />
                </svg>

                <div className="flex flex-row items-center gap-10 justify-center ">
                  <div>
                    {" "}
                    <h2 className="text-[14px] font-medium">Sales inquiries</h2>
                    <h2 className="text-black group-hover:text-[#034737]  transition-colors duration-300 group-hover:font-bold text-[18px]">
                      sales@growstack.com:
                    </h2>
                    <p className="max-w-[400px] text-black text-[16px]">
                      Our sales team is ready to assist with pricing and demo
                      requests.
                    </p>
                  </div>
                  <div className="group">
                    {" "}
                    <div
                      className={`flex items-center  group-hover:bg-primary-green justify-center border w-16 h-16 
                
                rounded-full transition-transform transform `}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.792893 19.7929C0.402369 20.1834 0.402369 20.8166 0.792893 21.2071C1.18342 21.5976 1.81658 21.5976 2.20711 21.2071L0.792893 19.7929ZM21.5 1.5C21.5 0.947716 21.0523 0.500001 20.5 0.500001L11.5 0.500002C10.9477 0.500001 10.5 0.947717 10.5 1.5C10.5 2.05229 10.9477 2.5 11.5 2.5L19.5 2.5L19.5 10.5C19.5 11.0523 19.9477 11.5 20.5 11.5C21.0523 11.5 21.5 11.0523 21.5 10.5L21.5 1.5ZM2.20711 21.2071L21.2071 2.20711L19.7929 0.792895L0.792893 19.7929L2.20711 21.2071Z"
                          fill=""
                          className="transition-colors duration-300 fill-[#034737] group-hover:fill-[#ffffff]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-row gap-4 w-full justify-between group border-[#E6E6E6] border pt-4 px-4  rounded-[20px]">
                <svg
                  width="66"
                  height="66"
                  viewBox="0 0 66 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="66"
                    height="66"
                    rx="10"
                    fill="#F3F3F3"
                    className="transition-colors duration-300 group-hover:fill-[#034737]"
                  />
                  <g clip-path="url(#clip0_4401_12205)">
                    <path
                      d="M39.7131 48.7075L39.713 48.7081C39.6639 48.9349 39.5388 49.1381 39.3585 49.2841C39.1782 49.43 38.9534 49.51 38.7214 49.5108L38.721 49.5108L35.9542 49.5108C35.684 49.5108 35.4302 49.4051 35.2371 49.2122C35.237 49.2121 35.237 49.212 35.2369 49.2119L35.3076 49.1412L39.7131 48.7075ZM39.7131 48.7075C39.7269 48.6417 39.7349 48.5693 39.7342 48.4965M39.7131 48.7075L39.7342 48.4965M39.7342 48.4965C39.7342 48.4967 39.7342 48.4968 39.7342 48.497H39.6342M39.7342 48.4965C39.7342 48.4964 39.7342 48.4962 39.7342 48.4961L39.6342 48.497M39.6342 48.497C39.6348 48.5623 39.6277 48.6276 39.6152 48.687L38.721 47.5838C38.9645 47.5838 39.1931 47.6782 39.367 47.8528C39.5392 48.0244 39.6342 48.2536 39.6342 48.497ZM49.2308 30.5702L49.2329 30.6328L49.2901 30.6583C50.6004 31.2408 51.5173 32.5526 51.5173 34.0754V38.3871C51.5163 39.1083 51.3069 39.8139 50.9144 40.419C50.5219 41.0241 49.9629 41.5029 49.3047 41.7979L49.2456 41.8244V41.8891V43.9809C49.2456 46.9063 46.8655 49.2864 43.9395 49.2864H41.257H41.1863L41.1627 49.353C40.7994 50.3771 39.8252 51.0908 38.7216 51.0908H35.9548H35.9545C35.6136 51.0917 35.2759 51.0248 34.9611 50.8942C34.6462 50.7635 34.3605 50.5716 34.1204 50.3295L34.12 50.3291C33.6301 49.8415 33.3598 49.1902 33.3597 48.4959C33.3604 48 33.5028 47.5147 33.7703 47.0971C34.0377 46.6795 34.419 46.3471 34.8692 46.1391L34.8695 46.139C35.2051 45.9826 35.5719 45.9014 35.9548 45.9014H38.7216H38.7219C39.2588 45.8998 39.7828 46.0664 40.2201 46.3778C40.6575 46.6892 40.9864 47.1298 41.1606 47.6376L41.1838 47.7052H41.2552H43.9395H43.9396C44.9271 47.7042 45.8738 47.3116 46.5721 46.6134C47.2704 45.9152 47.6632 44.9685 47.6644 43.981V43.9809V42.2062V42.1145L47.573 42.1066C46.3539 42.0011 45.3927 40.9875 45.3927 39.7433V32.7205C45.3927 31.4877 46.3374 30.4809 47.5411 30.3601L47.6369 30.3504L47.6309 30.2543C47.4068 26.6517 45.9169 23.3334 43.3713 20.7878C40.5994 18.0159 36.9159 16.4889 32.9991 16.4889C25.2146 16.4889 18.8312 22.5855 18.3649 30.2539L18.359 30.35L18.4548 30.3595C19.6596 30.4792 20.6061 31.4866 20.6061 32.7205V39.7438C20.6053 40.3761 20.3538 40.9823 19.9067 41.4294C19.4596 41.8765 18.8535 42.128 18.2212 42.1288C17.2296 42.1277 16.2788 41.7332 15.5776 41.032C14.8764 40.3308 14.4819 39.38 14.4809 38.3883L14.4809 34.0767C14.4818 33.3525 14.6927 32.6441 15.0881 32.0374L15.0043 31.9828L15.0881 32.0374C15.4835 31.4307 16.0463 30.9517 16.7085 30.6584L16.7657 30.633L16.7679 30.5705C17.0765 21.8823 24.2366 14.9076 32.9991 14.9076C37.3378 14.9076 41.4181 16.5982 44.4887 19.6693L44.4889 19.6695C47.4003 22.5664 49.0963 26.4653 49.2308 30.5702ZM18.2205 40.5469H18.2206C18.6642 40.5469 19.0242 40.1862 19.0242 39.7433V32.7205C19.0242 32.2776 18.6642 31.9169 18.2206 31.9169H18.2205C17.6481 31.9175 17.0994 32.1452 16.6946 32.55C16.2899 32.9547 16.0622 33.5035 16.0615 34.0759V34.076V38.3878L16.0615 38.3879C16.0622 38.9603 16.2899 39.5091 16.6946 39.9138C17.0994 40.3186 17.6481 40.5463 18.2205 40.5469ZM49.936 38.3879V38.3878V34.076V34.0759C49.9354 33.5035 49.7077 32.9547 49.303 32.55C48.8982 32.1452 48.3494 31.9175 47.777 31.9169H47.7769C47.3333 31.9169 46.9733 32.2776 46.9733 32.7205V39.7433V39.7434C46.9735 39.9565 47.0582 40.1607 47.2089 40.3114C47.3595 40.462 47.5638 40.5467 47.7768 40.5469H47.777C48.3494 40.5463 48.8982 40.3186 49.303 39.9138C49.7077 39.5091 49.9354 38.9603 49.936 38.3879Z"
                      fill="white"
                      className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                      stroke="#F3F3F3"
                      stroke-width="0.2"
                    />
                    <path
                      d="M27.3035 40.6871C27.3023 40.9304 27.3493 41.1715 27.4416 41.3966C27.534 41.6217 27.6699 41.8264 27.8417 41.9988C28.0134 42.1711 28.2175 42.3079 28.4422 42.4011C28.667 42.4943 28.9079 42.5422 29.1513 42.5419C29.3944 42.5424 29.6352 42.4939 29.8592 42.3994C30.0832 42.3048 30.2859 42.1661 30.4551 41.9915L27.3035 40.6871ZM27.4035 38.6944V38.5944H27.3035H27.233C26.2589 38.5934 25.325 38.2059 24.6363 37.5172C23.9475 36.8284 23.5601 35.8945 23.559 34.9205L23.559 27.231C23.5601 26.2569 23.9475 25.3231 24.6363 24.6343C25.325 23.9455 26.2589 23.5581 27.233 23.557L38.767 23.557C39.7468 23.557 40.6685 23.9395 41.3635 24.6345C42.0585 25.3295 42.4409 26.2517 42.4409 27.2309V34.9205C42.4399 35.8945 42.0524 36.8284 41.3637 37.5172C40.6749 38.2059 39.741 38.5934 38.7669 38.5944H33.77H33.7288L33.6995 38.6235L30.3846 41.9206L30.3846 41.9206L30.3833 41.9219C30.2234 42.0869 30.032 42.2179 29.8203 42.3073C29.6087 42.3966 29.3812 42.4424 29.1515 42.4419H29.1512C28.921 42.4422 28.6931 42.3969 28.4805 42.3087C28.268 42.2205 28.0749 42.0912 27.9125 41.9282C27.7501 41.7651 27.6215 41.5716 27.5342 41.3587C27.4468 41.1458 27.4024 40.9177 27.4035 40.6875V40.6871V38.6944ZM27.2333 37.0132H27.2335H28.1947C28.4044 37.0132 28.6055 37.0965 28.7538 37.2448C28.9021 37.393 28.9854 37.5941 28.9854 37.8038V40.6871C28.9854 40.6876 28.9854 40.6883 28.9853 40.689C28.9853 40.7 28.985 40.7316 28.9988 40.7633C29.0162 40.8031 29.0484 40.8302 29.0874 40.8463C29.117 40.859 29.1561 40.868 29.198 40.8528C29.2306 40.841 29.2529 40.8171 29.2589 40.8105C29.2592 40.8103 29.2594 40.81 29.2596 40.8098C29.2598 40.8096 29.2599 40.8095 29.2601 40.8093L32.846 37.243C32.9941 37.0959 33.1944 37.0132 33.4037 37.0132H38.7676H38.7678C39.3225 37.0125 39.8544 36.7919 40.2467 36.3996C40.6389 36.0073 40.8596 35.4754 40.8603 34.9207V34.9206V27.2309C40.8603 26.674 40.6424 26.1487 40.2461 25.7524L40.2461 25.7524C39.8499 25.3568 39.3252 25.1383 38.7676 25.1383H27.2335L27.2333 25.1383C26.6786 25.1389 26.1467 25.3596 25.7544 25.7519C25.3622 26.1442 25.1415 26.676 25.1408 27.2308V27.2309V34.9206L25.1408 34.9207C25.1415 35.4754 25.3622 36.0073 25.7544 36.3996C26.1467 36.7919 26.6786 37.0125 27.2333 37.0132Z"
                      fill="white"
                      className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                      stroke="#F3F3F3"
                      stroke-width="0.2"
                    />
                    <path
                      d="M27.4594 31.2183C27.4594 30.5497 28.0042 30.0043 28.6733 30.0043C29.3437 30.0043 29.8885 30.5497 29.8885 31.2183C29.8885 31.8868 29.3431 32.4322 28.6733 32.4322C28.0048 32.4322 27.4594 31.8868 27.4594 31.2183ZM31.7854 31.2183C31.7854 30.5497 32.3303 30.0043 32.9994 30.0043C33.6698 30.0043 34.2146 30.5497 34.2146 31.2183C34.2146 31.8868 33.6698 32.4322 32.9994 32.4322C32.3309 32.4322 31.7854 31.8868 31.7854 31.2183ZM36.1115 31.2183C36.1115 30.5497 36.6564 30.0043 37.3255 30.0043C37.9953 30.0043 38.5406 30.5498 38.5406 31.2183C38.5406 31.8868 37.9953 32.4322 37.3255 32.4322C36.6569 32.4322 36.1115 31.8868 36.1115 31.2183Z"
                      fill="white"
                      className=" transition-colors duration-300 fill-[#14171B] group-hover:fill-[#ffffff]"
                      stroke="#F3F3F3"
                      stroke-width="0.2"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4401_12205">
                      <rect
                        width="38"
                        height="38"
                        fill="white"
                        transform="translate(14 14)"
                      />
                    </clipPath>
                  </defs>
                </svg>

                <div className="flex flex-row items-center gap-10 justify-center ">
                  <div>
                    {" "}
                    <h2 className="text-[14px] font-medium">Support</h2>
                    <h2 className="text-black group-hover:text-[#034737]  transition-colors duration-300 group-hover:font-bold text-[18px]">
                      sales@growstack.com:
                    </h2>
                    <p className="max-w-[400px] text-black text-[16px]">
                      For technical support or product questions.
                    </p>
                  </div>
                  <div className="group">
                    {" "}
                    <div
                      className={`flex items-center  group-hover:bg-primary-green justify-center border w-16 h-16 
                
                rounded-full transition-transform transform `}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.792893 19.7929C0.402369 20.1834 0.402369 20.8166 0.792893 21.2071C1.18342 21.5976 1.81658 21.5976 2.20711 21.2071L0.792893 19.7929ZM21.5 1.5C21.5 0.947716 21.0523 0.500001 20.5 0.500001L11.5 0.500002C10.9477 0.500001 10.5 0.947717 10.5 1.5C10.5 2.05229 10.9477 2.5 11.5 2.5L19.5 2.5L19.5 10.5C19.5 11.0523 19.9477 11.5 20.5 11.5C21.0523 11.5 21.5 11.0523 21.5 10.5L21.5 1.5ZM2.20711 21.2071L21.2071 2.20711L19.7929 0.792895L0.792893 19.7929L2.20711 21.2071Z"
                          fill=""
                          className="transition-colors duration-300 fill-[#034737] group-hover:fill-[#ffffff]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white flex flex-row gap-4 w-full  group border-[#E6E6E6] border pt-4 px-4  rounded-[20px]">
                <svg
                  width="66"
                  height="66"
                  viewBox="0 0 66 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="66"
                    height="66"
                    rx="10"
                    fill="#F3F3F3"
                    className="transition-colors duration-300 group-hover:fill-[#034737]"
                  />
                  <path
                   className=" transition-colors duration-300  group-hover:stroke-[#ffffff]"
                    d="M21.5417 18.833H28.375L31.7917 27.3747L27.5208 29.9372C29.3504 33.6469 32.3528 36.6493 36.0625 38.4788L38.625 34.208L47.1667 37.6247V44.458C47.1667 46.345 45.637 47.8747 43.75 47.8747C29.9597 47.0366 18.963 36.0399 18.125 22.2497C18.125 20.3627 19.6547 18.833 21.5417 18.833"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="flex flex-row items-center gap-10 w-full justify-between justify-center ">
                  <div>
                    {" "}
                    <h2 className="text-[14px] font-medium">Phone</h2>
                    <h2 className="text-black group-hover:text-[#034737]  transition-colors duration-300 group-hover:font-bold text-[18px]">
                      +1-9192399348
                    </h2>
                    <p className="max-w-[400px] text-black text-[16px]">
                      Available Mon-Fri, 9AM-6PM PST
                    </p>
                  </div>
                  <div className="group">
                    {" "}
                    <div
                      className={`flex items-center  group-hover:bg-primary-green justify-center border w-16 h-16 
                
                rounded-full transition-transform transform `}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.792893 19.7929C0.402369 20.1834 0.402369 20.8166 0.792893 21.2071C1.18342 21.5976 1.81658 21.5976 2.20711 21.2071L0.792893 19.7929ZM21.5 1.5C21.5 0.947716 21.0523 0.500001 20.5 0.500001L11.5 0.500002C10.9477 0.500001 10.5 0.947717 10.5 1.5C10.5 2.05229 10.9477 2.5 11.5 2.5L19.5 2.5L19.5 10.5C19.5 11.0523 19.9477 11.5 20.5 11.5C21.0523 11.5 21.5 11.0523 21.5 10.5L21.5 1.5ZM2.20711 21.2071L21.2071 2.20711L19.7929 0.792895L0.792893 19.7929L2.20711 21.2071Z"
                          fill=""
                          className="transition-colors duration-300 fill-[#034737] group-hover:fill-[#ffffff]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>{" "}
              <div className="bg-white flex flex-row gap-4 w-full justify-between group border-[#E6E6E6] border pt-4 px-4  rounded-[20px]">
                <svg
                  width="66"
                  height="66"
                  viewBox="0 0 66 66"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="66" height="66" rx="10" fill="#F3F3F3" className="transition-colors duration-300 group-hover:fill-[#034737]" />
                  <circle
                    cx="32.75"
                    cy="31.1875"
                    r="4.6875"
                         className=" transition-colors duration-300  group-hover:stroke-[#ffffff]"
                    stroke="#14171B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                     className=" transition-colors duration-300  group-hover:stroke-[#ffffff]"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M41.5891 40.0261L34.9594 46.6558C33.7392 47.8747 31.7623 47.8747 30.5422 46.6558L23.9109 40.0261C19.0296 35.1445 19.0297 27.23 23.9112 22.3486C28.7928 17.4671 36.7072 17.4671 41.5888 22.3486C46.4703 27.23 46.4704 35.1445 41.5891 40.0261V40.0261Z"
                    stroke="#14171B"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <div className="flex flex-row items-center gap-10 justify-center ">
                  <div>
                    {" "}
                    <h2 className="text-[14px] font-medium">Address</h2>
                    <h2 className="text-black group-hover:text-[#034737]  transition-colors duration-300 group-hover:font-bold text-[18px]">
                      1638 Macalpine Circle, Morrisville,
                    </h2>
                    <p className="max-w-[400px] text-black text-[16px]">
                      North Carolina 27560, USA
                    </p>
                  </div>
                  <div className="group">
                    {" "}
                    <div
                      className={`flex items-center  group-hover:bg-primary-green justify-center border w-16 h-16 
                
                rounded-full transition-transform transform `}
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.792893 19.7929C0.402369 20.1834 0.402369 20.8166 0.792893 21.2071C1.18342 21.5976 1.81658 21.5976 2.20711 21.2071L0.792893 19.7929ZM21.5 1.5C21.5 0.947716 21.0523 0.500001 20.5 0.500001L11.5 0.500002C10.9477 0.500001 10.5 0.947717 10.5 1.5C10.5 2.05229 10.9477 2.5 11.5 2.5L19.5 2.5L19.5 10.5C19.5 11.0523 19.9477 11.5 20.5 11.5C21.0523 11.5 21.5 11.0523 21.5 10.5L21.5 1.5ZM2.20711 21.2071L21.2071 2.20711L19.7929 0.792895L0.792893 19.7929L2.20711 21.2071Z"
                          fill=""
                          className="transition-colors duration-300 fill-[#034737] group-hover:fill-[#ffffff]"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-20 bg-[#F7FAFC] mb-40 rounded-[30px] p-10 gap-y-6 max-w-[610px] max-h-[882px] w-full flex flex-col">
            <div className="flex flex-col gap-y-2">
              <h2 className="text-[28px]  font-bold text-black">
                How can we <span className="font-light">assist you?</span>
              </h2>
              <p>
                Reach out by completing the form below. Our team will respond
                within one business day.
              </p>
              <div>
                <RequestForm />
              </div>
            </div>
          </div>
        </div>
        <svg
          className="xl:flex hidden absolute left-0 top-80 z-0"
          width="479"
          height="703"
          viewBox="0 0 479 703"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M345.281 655.809C311.808 639.721 293.136 621.482 286.54 598.405C278.661 570.871 286.175 541.69 293.437 513.497C294.243 510.409 295.032 507.342 295.799 504.275C317.499 417.71 312.888 347.336 281.689 289.139C251.547 232.898 199.655 198.097 149.471 164.449C98.4583 130.248 45.7115 94.8887 16.0201 37.0159C9.88855 25.0811 4.63702 12.6646 0 0V7.33895C4.07091 17.8677 8.58133 28.1968 13.7207 38.2233C43.7115 96.7002 96.7496 132.232 148.025 166.633C197.958 200.104 249.573 234.71 279.414 290.375C310.286 347.974 314.824 417.731 293.287 503.647C292.521 506.694 291.728 509.751 290.939 512.839C283.926 540.064 275.972 570.891 284.039 599.115C293.01 630.478 322.651 647.811 344.161 658.146C384.105 677.311 426.171 691.186 468.226 702.447H478.454C433.359 690.764 388.076 676.333 345.281 655.809Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M197.845 315.603C172.148 261.194 123.21 226.393 75.8897 192.745C49.6815 174.099 22.9813 155.1 0 132.633V136.203C22.69 158.064 48.7757 176.636 74.3952 194.855C121.45 228.328 170.103 262.933 195.508 316.714C248.104 428.085 133.966 530.615 58.4389 598.456L49.278 606.732C32.1916 622.13 15.2667 638.445 0 656.489V660.554C15.6938 641.687 33.2466 624.673 50.999 608.667L60.1599 600.422C136.265 532.045 251.269 428.734 197.845 315.603Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M123.764 364.155C121.211 316.909 91.106 282.304 65.1602 257.446C45.5849 238.703 23.7358 221.215 0 205.178V208.348C23.0565 224.035 44.3034 241.07 63.3764 259.34C88.9701 283.889 118.686 317.959 121.175 364.309C123.436 406.366 103.797 442.032 86.9218 464.522C62.5355 497.038 30.8452 523.296 0 548.606V551.972C31.4865 526.167 63.9909 499.426 88.9835 466.076C106.121 443.236 126.061 407.025 123.764 364.155Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 287.338C19.7781 305.979 32.6547 327.996 37.0416 351.382C44.5041 391.123 23.1697 427.458 0 453.818V457.73C24.2988 430.751 47.4459 392.77 39.5923 350.908C34.9676 326.256 21.1831 303.138 0 283.787V287.338Z"
            fill="#F0F3F7"
          />
        </svg>
        <svg
          className="xl:flex hidden absolute right-0 -bottom-56 z-0"
          width="457"
          height="681"
          viewBox="0 0 457 681"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M129.002 635.27C161.427 619.686 179.513 602.018 185.903 579.663C193.535 552.992 186.257 524.725 179.222 497.415C178.442 494.424 177.677 491.452 176.934 488.481C155.914 404.628 160.381 336.458 190.602 280.084C219.8 225.604 270.067 191.893 318.679 159.299C368.094 126.169 419.189 91.9168 447.95 35.8566C453.89 24.2956 458.977 12.2679 463.469 0V7.1091C459.525 17.3081 455.156 27.3137 450.178 37.0262C421.126 93.6717 369.749 128.091 320.08 161.415C271.71 193.837 221.712 227.359 192.805 281.28C162.9 337.076 158.505 404.648 179.367 487.873C180.11 490.824 180.877 493.786 181.642 496.777C188.435 523.149 196.139 553.012 188.325 580.351C179.636 610.732 150.922 627.523 130.087 637.533C91.3934 656.099 50.6451 669.539 9.90689 680.447H-0.00100708C43.6826 669.13 87.5467 655.151 129.002 635.27Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M271.82 305.719C296.712 253.013 344.118 219.303 389.956 186.708C415.343 168.646 441.207 150.243 463.469 128.479V131.937C441.489 153.114 416.221 171.104 391.404 188.752C345.823 221.177 298.693 254.699 274.083 306.795C223.135 414.678 333.698 513.996 406.86 579.713L415.734 587.73C432.285 602.646 448.68 618.449 463.469 635.928V639.866C448.266 621.59 431.263 605.109 414.067 589.604L405.193 581.618C331.472 515.382 220.069 415.306 271.82 305.719Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M343.581 352.75C346.054 306.984 375.216 273.463 400.349 249.384C419.312 231.227 440.476 214.287 463.469 198.752V201.823C441.134 217.019 420.553 233.52 402.077 251.218C377.285 274.998 348.5 308.001 346.089 352.899C343.898 393.64 362.922 428.188 379.269 449.974C402.892 481.471 433.59 506.907 463.469 531.425V534.685C432.968 509.689 401.482 483.785 377.272 451.48C360.671 429.355 341.356 394.278 343.581 352.75Z"
            fill="#F0F3F7"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M463.469 278.339C444.31 296.396 431.837 317.723 427.587 340.376C420.358 378.873 441.025 414.07 463.469 439.605V443.394C439.931 417.26 417.509 380.469 425.116 339.918C429.596 316.038 442.949 293.644 463.469 274.899V278.339Z"
            fill="#F0F3F7"
          />
        </svg>
      </div>
      <div
        data-aos="fade-up"
        data-aos-easing="ease-in-sine"
        data-aos-duration="1000"
        className="flex flex-col bg-[#FAFBFC] py-20 w-full items-center justify-center"
      >
        <div className=" items-center flex flex-col justify-center">
          <div className=" flex w-full font-bold bg-[#03473714] text-[#034737] rounded-full items-center leading-normal justify-between px-4 py-2 text-[12px] max-w-[75px] ">
            FAQ
          </div>
          <h3 className="text-[42px] max-w-4xl mx-auto leading-normal text-center font-semibold ">
            Quick answers
            <span className="text-black font-light ml-2">on GrowStack</span>
          </h3>
        </div>
        <div className="flex flex-col   w-full  gap-10 items-center justify-between">
          <div className="mt-4">
            <Image
              src="/img.svg"
              width={100}
              height={100}
              alt="image"
              className="absolute w-full h-full -translate-x-[600px]"
            />{" "}
            <CustomAccordion />
          </div>
        </div>
      </div>
      <div className="z-40 relative">
        {" "}
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
