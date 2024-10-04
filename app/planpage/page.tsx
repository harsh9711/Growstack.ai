"use client";
import { ArrowRight, Link } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "../(main-app)/app/components/Navbar";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

interface IPlan {
  plan_type: string;
  plan_id: string;
  plan_name: string;
  amount: number;
}

const plans: IPlan[] = [
  {
    plan_type: "BASIC",
    plan_name: "BASIC",
    plan_id: "DdGwBYrs",
    amount: 49.99,
  },
  {
    plan_type: "PRO",
    plan_name: "PRO",
    plan_id: "5TKGLu1R",
    amount: 99.99,
  },
  {
    plan_type: "BUSINESS",
    plan_name: "BUSINESS",
    plan_id: "63jJBuIn",
    amount: 199.99,
  },
];

const page = () => {
  const searchParams = useSearchParams();
  const querySearch = searchParams.get("payment");
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedPlan(event.target.value);
  };

  useEffect(() => {
    console.log("querySearchxx", querySearch);
    if (querySearch === "success") {
      toast.success("Payment done successfully!");
    } else if (querySearch === "failure") {
      toast.error("Error occured during payment!");
    }
  }, [querySearch]);

  const handlePlanSubscription = async (plan: IPlan) => {
    const currentPath = localStorage.getItem("currentPathname");
    const payload = { product: plan, currency: "usd" };
    const res = await instance.post(
      `${API_URL}/users/api/v1/payments/create-checkout-session?currentPath=${currentPath}`,
      payload
    );
    if (res) {
      const redirectUrl = res.data.url; 
      window.location.href = redirectUrl;
    }
  };
  return (
    <main className="items-center justify-center mx-auto">
      <Navbar />
      <div className="bg-[#EBF0F6] h-80 w-full max-w-[1840px] mx-auto absolute top-0 left-0 right-0 rounded-b-[60px]" />
      <div className="relative  mt-20  border border-[#E8E8E8] bg-white rounded-3xl z-[1] w-full h-full max-h-[1977px] items-center justify-center max-w-[1668px] top-40 left-[100px]">
        <h2 className="text-[24px] font-semibold z-[40] absolute -translate-y-32 translate-x-10">
          Subscription models
        </h2>

        <div className="w-full flex bg-white rounded-3xl flex-col gap-6 ">
          <div className="w-full  max-w-[1668px] bg-white  flex flex-row items-center justify-center p-8 rounded-3xl  space-y-5">
            <div className="space-y-3 absolute -translate-x-[600px]">
              <div className="flex flex-col gap-2 mb-10">
                <h1 className="text-[#9D9D9D] text-[20px]">Select Plan</h1>
                {/* <label htmlFor="monthly-plan-select">Monthly Plan</label> */}
                <select
                  id="monthly-plan-select"
                  value={selectedPlan}
                  onChange={handleChange}
                  className="w=full max-w-[239px] border rounded-xl p-2 "
                >
                  <option value="basic">Monthly Plan</option>
                  <option value="standard">Standard Plan - $20/month</option>
                  <option value="premium">Premium Plan - $30/month</option>
                  {/* Add more plans as needed */}
                </select>
              </div>
              <svg
                width="206"
                height="33"
                viewBox="0 0 206 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M54.56 13.36C54.56 14.1067 54.38 14.8067 54.02 15.46C53.6733 16.1133 53.12 16.64 52.36 17.04C51.6133 17.44 50.6667 17.64 49.52 17.64H47.18V23H44.38V9.04H49.52C50.6 9.04 51.52 9.22667 52.28 9.6C53.04 9.97333 53.6067 10.4867 53.98 11.14C54.3667 11.7933 54.56 12.5333 54.56 13.36ZM49.4 15.38C50.1733 15.38 50.7467 15.2067 51.12 14.86C51.4933 14.5 51.68 14 51.68 13.36C51.68 12 50.92 11.32 49.4 11.32H47.18V15.38H49.4ZM59.348 13.64C59.708 13.0533 60.1746 12.5933 60.748 12.26C61.3346 11.9267 62.0013 11.76 62.748 11.76V14.7H62.008C61.128 14.7 60.4613 14.9067 60.008 15.32C59.568 15.7333 59.348 16.4533 59.348 17.48V23H56.548V11.92H59.348V13.64ZM66.0539 10.6C65.5606 10.6 65.1472 10.4467 64.8139 10.14C64.4939 9.82 64.3339 9.42667 64.3339 8.96C64.3339 8.49333 64.4939 8.10667 64.8139 7.8C65.1472 7.48 65.5606 7.32 66.0539 7.32C66.5472 7.32 66.9539 7.48 67.2739 7.8C67.6072 8.10667 67.7739 8.49333 67.7739 8.96C67.7739 9.42667 67.6072 9.82 67.2739 10.14C66.9539 10.4467 66.5472 10.6 66.0539 10.6ZM67.4339 11.92V23H64.6339V11.92H67.4339ZM69.4803 17.46C69.4803 16.3133 69.7136 15.3133 70.1803 14.46C70.647 13.5933 71.2936 12.9267 72.1203 12.46C72.947 11.98 73.8936 11.74 74.9603 11.74C76.3336 11.74 77.467 12.0867 78.3603 12.78C79.267 13.46 79.8736 14.42 80.1803 15.66H77.1603C77.0003 15.18 76.727 14.8067 76.3403 14.54C75.967 14.26 75.5003 14.12 74.9403 14.12C74.1403 14.12 73.507 14.4133 73.0403 15C72.5736 15.5733 72.3403 16.3933 72.3403 17.46C72.3403 18.5133 72.5736 19.3333 73.0403 19.92C73.507 20.4933 74.1403 20.78 74.9403 20.78C76.0736 20.78 76.8136 20.2733 77.1603 19.26H80.1803C79.8736 20.46 79.267 21.4133 78.3603 22.12C77.4536 22.8267 76.3203 23.18 74.9603 23.18C73.8936 23.18 72.947 22.9467 72.1203 22.48C71.2936 22 70.647 21.3333 70.1803 20.48C69.7136 19.6133 69.4803 18.6067 69.4803 17.46ZM83.6516 10.6C83.1582 10.6 82.7449 10.4467 82.4116 10.14C82.0916 9.82 81.9316 9.42667 81.9316 8.96C81.9316 8.49333 82.0916 8.10667 82.4116 7.8C82.7449 7.48 83.1582 7.32 83.6516 7.32C84.1449 7.32 84.5516 7.48 84.8716 7.8C85.2049 8.10667 85.3716 8.49333 85.3716 8.96C85.3716 9.42667 85.2049 9.82 84.8716 10.14C84.5516 10.4467 84.1449 10.6 83.6516 10.6ZM85.0316 11.92V23H82.2316V11.92H85.0316ZM93.938 11.76C95.258 11.76 96.3246 12.18 97.138 13.02C97.9513 13.8467 98.358 15.0067 98.358 16.5V23H95.558V16.88C95.558 16 95.338 15.3267 94.898 14.86C94.458 14.38 93.858 14.14 93.098 14.14C92.3246 14.14 91.7113 14.38 91.258 14.86C90.818 15.3267 90.598 16 90.598 16.88V23H87.798V11.92H90.598V13.3C90.9713 12.82 91.4446 12.4467 92.018 12.18C92.6046 11.9 93.2446 11.76 93.938 11.76ZM105.361 11.74C106.187 11.74 106.914 11.9067 107.541 12.24C108.167 12.56 108.661 12.98 109.021 13.5V11.92H111.841V23.08C111.841 24.1067 111.634 25.02 111.221 25.82C110.807 26.6333 110.187 27.2733 109.361 27.74C108.534 28.22 107.534 28.46 106.361 28.46C104.787 28.46 103.494 28.0933 102.481 27.36C101.481 26.6267 100.914 25.6267 100.781 24.36H103.561C103.707 24.8667 104.021 25.2667 104.501 25.56C104.994 25.8667 105.587 26.02 106.281 26.02C107.094 26.02 107.754 25.7733 108.261 25.28C108.767 24.8 109.021 24.0667 109.021 23.08V21.36C108.661 21.88 108.161 22.3133 107.521 22.66C106.894 23.0067 106.174 23.18 105.361 23.18C104.427 23.18 103.574 22.94 102.801 22.46C102.027 21.98 101.414 21.3067 100.961 20.44C100.521 19.56 100.301 18.5533 100.301 17.42C100.301 16.3 100.521 15.3067 100.961 14.44C101.414 13.5733 102.021 12.9067 102.781 12.44C103.554 11.9733 104.414 11.74 105.361 11.74ZM109.021 17.46C109.021 16.78 108.887 16.2 108.621 15.72C108.354 15.2267 107.994 14.8533 107.541 14.6C107.087 14.3333 106.601 14.2 106.081 14.2C105.561 14.2 105.081 14.3267 104.641 14.58C104.201 14.8333 103.841 15.2067 103.561 15.7C103.294 16.18 103.161 16.7533 103.161 17.42C103.161 18.0867 103.294 18.6733 103.561 19.18C103.841 19.6733 104.201 20.0533 104.641 20.32C105.094 20.5867 105.574 20.72 106.081 20.72C106.601 20.72 107.087 20.5933 107.541 20.34C107.994 20.0733 108.354 19.7 108.621 19.22C108.887 18.7267 109.021 18.14 109.021 17.46ZM124.161 23.14C123.188 23.14 122.308 22.9733 121.521 22.64C120.748 22.3067 120.134 21.8267 119.681 21.2C119.228 20.5733 118.994 19.8333 118.981 18.98H121.981C122.021 19.5533 122.221 20.0067 122.581 20.34C122.954 20.6733 123.461 20.84 124.101 20.84C124.754 20.84 125.268 20.6867 125.641 20.38C126.014 20.06 126.201 19.6467 126.201 19.14C126.201 18.7267 126.074 18.3867 125.821 18.12C125.568 17.8533 125.248 17.6467 124.861 17.5C124.488 17.34 123.968 17.1667 123.301 16.98C122.394 16.7133 121.654 16.4533 121.081 16.2C120.521 15.9333 120.034 15.54 119.621 15.02C119.221 14.4867 119.021 13.78 119.021 12.9C119.021 12.0733 119.228 11.3533 119.641 10.74C120.054 10.1267 120.634 9.66 121.381 9.34C122.128 9.00667 122.981 8.84 123.941 8.84C125.381 8.84 126.548 9.19333 127.441 9.9C128.348 10.5933 128.848 11.5667 128.941 12.82H125.861C125.834 12.34 125.628 11.9467 125.241 11.64C124.868 11.32 124.368 11.16 123.741 11.16C123.194 11.16 122.754 11.3 122.421 11.58C122.101 11.86 121.941 12.2667 121.941 12.8C121.941 13.1733 122.061 13.4867 122.301 13.74C122.554 13.98 122.861 14.18 123.221 14.34C123.594 14.4867 124.114 14.66 124.781 14.86C125.688 15.1267 126.428 15.3933 127.001 15.66C127.574 15.9267 128.068 16.3267 128.481 16.86C128.894 17.3933 129.101 18.0933 129.101 18.96C129.101 19.7067 128.908 20.4 128.521 21.04C128.134 21.68 127.568 22.1933 126.821 22.58C126.074 22.9533 125.188 23.14 124.161 23.14ZM134.788 14.22V19.58C134.788 19.9533 134.875 20.2267 135.048 20.4C135.235 20.56 135.542 20.64 135.968 20.64H137.268V23H135.508C133.148 23 131.968 21.8533 131.968 19.56V14.22H130.648V11.92H131.968V9.18H134.788V11.92H137.268V14.22H134.788ZM142.082 13.64C142.442 13.0533 142.909 12.5933 143.482 12.26C144.069 11.9267 144.736 11.76 145.482 11.76V14.7H144.742C143.862 14.7 143.196 14.9067 142.742 15.32C142.302 15.7333 142.082 16.4533 142.082 17.48V23H139.282V11.92H142.082V13.64ZM146.648 17.42C146.648 16.3 146.868 15.3067 147.308 14.44C147.762 13.5733 148.368 12.9067 149.128 12.44C149.902 11.9733 150.762 11.74 151.708 11.74C152.535 11.74 153.255 11.9067 153.868 12.24C154.495 12.5733 154.995 12.9933 155.368 13.5V11.92H158.188V23H155.368V21.38C155.008 21.9 154.508 22.3333 153.868 22.68C153.242 23.0133 152.515 23.18 151.688 23.18C150.755 23.18 149.902 22.94 149.128 22.46C148.368 21.98 147.762 21.3067 147.308 20.44C146.868 19.56 146.648 18.5533 146.648 17.42ZM155.368 17.46C155.368 16.78 155.235 16.2 154.968 15.72C154.702 15.2267 154.342 14.8533 153.888 14.6C153.435 14.3333 152.948 14.2 152.428 14.2C151.908 14.2 151.428 14.3267 150.988 14.58C150.548 14.8333 150.188 15.2067 149.908 15.7C149.642 16.18 149.508 16.7533 149.508 17.42C149.508 18.0867 149.642 18.6733 149.908 19.18C150.188 19.6733 150.548 20.0533 150.988 20.32C151.442 20.5867 151.922 20.72 152.428 20.72C152.948 20.72 153.435 20.5933 153.888 20.34C154.342 20.0733 154.702 19.7 154.968 19.22C155.235 18.7267 155.368 18.14 155.368 17.46ZM164.183 14.22V19.58C164.183 19.9533 164.27 20.2267 164.443 20.4C164.63 20.56 164.936 20.64 165.363 20.64H166.663V23H164.903C162.543 23 161.363 21.8533 161.363 19.56V14.22H160.043V11.92H161.363V9.18H164.183V11.92H166.663V14.22H164.183ZM178.977 17.22C178.977 17.62 178.95 17.98 178.897 18.3H170.797C170.864 19.1 171.144 19.7267 171.637 20.18C172.13 20.6333 172.737 20.86 173.457 20.86C174.497 20.86 175.237 20.4133 175.677 19.52H178.697C178.377 20.5867 177.764 21.4667 176.857 22.16C175.95 22.84 174.837 23.18 173.517 23.18C172.45 23.18 171.49 22.9467 170.637 22.48C169.797 22 169.137 21.3267 168.657 20.46C168.19 19.5933 167.957 18.5933 167.957 17.46C167.957 16.3133 168.19 15.3067 168.657 14.44C169.124 13.5733 169.777 12.9067 170.617 12.44C171.457 11.9733 172.424 11.74 173.517 11.74C174.57 11.74 175.51 11.9667 176.337 12.42C177.177 12.8733 177.824 13.52 178.277 14.36C178.744 15.1867 178.977 16.14 178.977 17.22ZM176.077 16.42C176.064 15.7 175.804 15.1267 175.297 14.7C174.79 14.26 174.17 14.04 173.437 14.04C172.744 14.04 172.157 14.2533 171.677 14.68C171.21 15.0933 170.924 15.6733 170.817 16.42H176.077ZM185.361 11.74C186.187 11.74 186.914 11.9067 187.541 12.24C188.167 12.56 188.661 12.98 189.021 13.5V11.92H191.841V23.08C191.841 24.1067 191.634 25.02 191.221 25.82C190.807 26.6333 190.187 27.2733 189.361 27.74C188.534 28.22 187.534 28.46 186.361 28.46C184.787 28.46 183.494 28.0933 182.481 27.36C181.481 26.6267 180.914 25.6267 180.781 24.36H183.561C183.707 24.8667 184.021 25.2667 184.501 25.56C184.994 25.8667 185.587 26.02 186.281 26.02C187.094 26.02 187.754 25.7733 188.261 25.28C188.767 24.8 189.021 24.0667 189.021 23.08V21.36C188.661 21.88 188.161 22.3133 187.521 22.66C186.894 23.0067 186.174 23.18 185.361 23.18C184.427 23.18 183.574 22.94 182.801 22.46C182.027 21.98 181.414 21.3067 180.961 20.44C180.521 19.56 180.301 18.5533 180.301 17.42C180.301 16.3 180.521 15.3067 180.961 14.44C181.414 13.5733 182.021 12.9067 182.781 12.44C183.554 11.9733 184.414 11.74 185.361 11.74ZM189.021 17.46C189.021 16.78 188.887 16.2 188.621 15.72C188.354 15.2267 187.994 14.8533 187.541 14.6C187.087 14.3333 186.601 14.2 186.081 14.2C185.561 14.2 185.081 14.3267 184.641 14.58C184.201 14.8333 183.841 15.2067 183.561 15.7C183.294 16.18 183.161 16.7533 183.161 17.42C183.161 18.0867 183.294 18.6733 183.561 19.18C183.841 19.6733 184.201 20.0533 184.641 20.32C185.094 20.5867 185.574 20.72 186.081 20.72C186.601 20.72 187.087 20.5933 187.541 20.34C187.994 20.0733 188.354 19.7 188.621 19.22C188.887 18.7267 189.021 18.14 189.021 17.46ZM205.175 11.92L198.315 28.24H195.335L197.735 22.72L193.295 11.92H196.435L199.295 19.66L202.195 11.92H205.175Z"
                  fill="#14171B"
                />
                <path
                  d="M30 1.63802C30 1.63802 29.0103 15.6437 26.2786 21.3244C21.1637 31.9686 15.0004 32.9899 15.0004 32.9899C15.0004 32.9899 8.8377 31.9686 3.7214 21.3244C0.991845 15.6437 0 1.63802 0 1.63802L14.9996 0L30 1.63802Z"
                  fill="#034737"
                />
                <path
                  d="M21.0547 10.1917L22.2997 11.4367L13.4835 20.2529L9.09229 15.8595L10.3373 14.6152L13.4857 17.7635L21.0547 10.1917Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="border-[#D3D3D3] border w-[0.2px] h-[159px] -translate-x-[400px]"></div>
            <div className="absolute flex flex-row translate-x-52 -translate-y-6">
              {plans.map((plan) => (
                <Plan
                  plan={plan}
                  amount={plan.amount}
                  handlePlanSubscription={() => handlePlanSubscription(plan)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="relative p-12 ">
          <div className="bg-[#03473712] flex flex-row gap-80 p-4 rounded-2xl h-[204px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              User Benefits
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">
                Users of ChatGPT or Gemini can access multiple agnostic LLMs in
                one place at a lower cost.
              </p>
              <p className="w-[205px] ">
                Influencers can streamline post management, scheduling, and
                analytics on a single platform.
              </p>
              <p className="w-[205px] ">
                New business can enhance brand awareness, streamline marketing,
                cut costs, and focus on personalization.
              </p>
              <p className="w-[205px] ">
                SME & LE’s benefit from personalized marketing, quicker campaign
                execution, and efficient content creation, leading to reduced
                marketing expenses.
              </p>
            </div>
          </div>
        </div>
        <div className="relative  p-12">
          <div className=" flex flex-row gap-56 p-4 rounded-2xl h-[87px]">
            <h2 className="text-left font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Apps, AI Chat, AI Assistants,
              <br />
              AI Playground, Custom GPT
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative  p-12">
          <div className="bg-[#03473708] flex flex-row gap-80 p-4 rounded-2xl h-[87px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Article Wizard
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">10</p>
              <p className="w-[205px] ">20</p>
              <p className="w-[205px] ">50</p>
              <p className="w-[205px] ml-6 ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative  p-12 ">
          <div className=" flex flex-row gap-56 p-4 rounded-2xl h-[87px]">
            <h2 className="text-left font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Apps, AI Chat, AI Assistants,
              <br />
              AI Playground, Custom GPT
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative  p-12 ">
          <div className="bg-[#03473708] flex flex-row gap-80 p-4 rounded-2xl h-[87px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Article Wizard
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">10</p>
              <p className="w-[205px] ">20</p>
              <p className="w-[205px] ">50</p>
              <p className="w-[205px] ml-6 ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12">
          <div className=" flex flex-row gap-56 p-4 rounded-2xl h-[87px]">
            <h2 className="text-left font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Apps, AI Chat, AI Assistants,
              <br />
              AI Playground, Custom GPT
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12">
          <div className="bg-[#03473708] flex flex-row gap-80 p-4 rounded-2xl h-[87px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Article Wizard
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">10</p>
              <p className="w-[205px] ">20</p>
              <p className="w-[205px] ">50</p>
              <p className="w-[205px] ml-6 ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12">
          <div className=" flex flex-row gap-56 p-4 rounded-2xl h-[87px]">
            <h2 className="text-left font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Apps, AI Chat, AI Assistants,
              <br />
              AI Playground, Custom GPT
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12">
          <div className="bg-[#03473708] flex flex-row gap-80 p-4 rounded-2xl h-[87px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Article Wizard
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">10</p>
              <p className="w-[205px] ">20</p>
              <p className="w-[205px] ">50</p>
              <p className="w-[205px] ml-6 ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12">
          <div className=" flex flex-row gap-56 p-4 rounded-2xl h-[87px]">
            <h2 className="text-left font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Apps, AI Chat, AI Assistants,
              <br />
              AI Playground, Custom GPT
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
              <p className="w-[205px] ">Unlimited</p>
            </div>
          </div>
        </div>
        <div className="relative p-12 ">
          <div className="bg-[#03473708] flex flex-row gap-80 p-4 rounded-2xl h-[87px]">
            <h2 className="text-center font-semibold whitespace-nowrap translate-x-20 mt-4">
              AI Article Wizard
            </h2>
            <div className="flex flex-row text-[14px] text-center gap-20 mt-4">
              <p className="w-[205px] ">10</p>
              <p className="w-[205px] ">20</p>
              <p className="w-[205px] ">50</p>
              <p className="w-[205px] ml-6 ">Unlimited</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;

interface PlanProps {
  plan: IPlan;
  amount: number;
  handlePlanSubscription: () => void;
}

const Plan = ({ amount, plan, handlePlanSubscription }: PlanProps) => {
  return (
    <div
      key={plan.plan_id}
      className="flex flex-col gap-y-2 w-full max-w-[296px] items-center justify-center group hover:h-[239px] hover:bg-[#104D5B] rounded-2xl px-20 relative"
    >
      <div className="absolute bg-white text-[#034737] p-2 rounded-full px-16 -translate-y-28 opacity-0">
        Best Value
      </div>
      <h2 className="text-[20px] text-center font-light group-hover:text-white">
        Basic
      </h2>
      <h2 className="text-[28px] text-center font-semibold group-hover:text-[#A9FF9B] flex">
        {`US$ ${amount}`}
      </h2>
      <h2 className="text-[16px] text-center font-light group-hover:text-white">
        Per Month
      </h2>
      <button
        type="button"
        onClick={handlePlanSubscription}
        className="border-[#034737] group-hover:text-white group-hover:border-white text-[#034737] border p-4 max-w-[220px] w-full rounded-2xl px-20 text-center items-center justify-center whitespace-nowrap relative z-20  "
      >
        <h2 className="text-center -translate-x-14 text-[#034737] group-hover:text-white">
          Subscribe now
        </h2>
      </button>
    </div>
  );
};
