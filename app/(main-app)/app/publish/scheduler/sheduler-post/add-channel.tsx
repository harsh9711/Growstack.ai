"use client";

import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { SheduleBackground } from "@/components/svgs";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import { button } from "@material-tailwind/react";

export default function addChannel() {
  const tick = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 12L10 17L20 7"
        stroke="white"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );

  const connectsvg = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12H6"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 3V6"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.80156 7.79961L5.60156 5.59961"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M16.1992 7.79961L18.3992 5.59961"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M7.80156 16.1992L5.60156 18.3992"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 12L21 15L17 17L15 21L12 12"
        stroke="#034737"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [skipNow, setSkipNow] = useState<boolean>(false);

  useEffect(() => {
    handleGetProfileData();
  }, []);

  useEffect(() => {
    if (platforms.length > 0) {
      console.log("Updated platforms:", platforms);
    }
  }, [platforms]);

  const handleGetProfileData = async () => {
    try {
      setLoading(true);
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      );

      console.log("response", response.data.data.activeSocialAccounts);

      const extractedPlatforms = response.data.data.activeSocialAccounts.map(
        (account: any) => account.platform
      );

      setPlatforms(extractedPlatforms);

      if (response.data.data.activeSocialAccounts.length > 0) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching social profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const skipNowFn = async () => {
    setSkipNow(true);
  };
  const handleOnConnect = async () => {
    const currentPath = localStorage.getItem("currentPathname");
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/connect?currentPath=${currentPath}`
      );
      const url = response?.data.data;
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {!skipNow ? (
        <>
          <div className="absolute">
            <SheduleBackground />
          </div>
          <div className="grid justify-items-center ...">
            <div className="mt-7">
              <h1 className="text-[28px] font-semibold"> Add channels</h1>
              <p className="text-primary-black text-opacity-70 mt-3 leading-relaxed">
                Connect multiple pages or channels
              </p>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17  min-w-[500px]  flex justify-between items-center gap-3 bg-white  cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="#217BEE"
                        stroke="#EBEBEB"
                      />
                      <path
                        d="M34.9989 18.125C26.795 18.125 20.1211 24.7991 20.1211 33.0027C20.1211 41.2065 26.795 47.8808 34.9989 47.8808C43.2022 47.8808 49.8766 41.2065 49.8766 33.0027C49.8766 24.7991 43.2022 18.125 34.9989 18.125ZM39.2037 27.517C39.2037 27.5874 39.1758 27.655 39.1259 27.7048C39.0761 27.7546 39.0086 27.7826 38.9381 27.7826L37.2469 27.7837C36.131 27.7837 35.927 28.2182 35.927 29.0741V30.8495H38.8276C38.9039 30.8495 38.9766 30.8824 39.0268 30.9398C39.077 30.9972 39.1004 31.0734 39.0911 31.1491L38.6781 34.3454C38.6698 34.4094 38.6385 34.4683 38.59 34.5109C38.5415 34.5535 38.4791 34.577 38.4146 34.577H35.927V42.5136C35.927 42.5841 35.899 42.6516 35.8492 42.7015C35.7994 42.7513 35.7318 42.7793 35.6613 42.7793H32.3612C32.2907 42.7793 32.2232 42.7513 32.1734 42.7015C32.1235 42.6516 32.0956 42.5841 32.0956 42.5136V34.577H29.6C29.5295 34.577 29.462 34.549 29.4122 34.4992C29.3624 34.4494 29.3344 34.3818 29.3344 34.3114V31.1151C29.3344 31.0447 29.3624 30.9771 29.4122 30.9273C29.462 30.8775 29.5295 30.8495 29.6 30.8495H32.0956V28.7577C32.0956 25.9872 33.7722 24.2665 36.4718 24.2665C37.6323 24.2665 38.6579 24.3528 38.9729 24.3945C39.0368 24.403 39.0954 24.4343 39.1378 24.4828C39.1803 24.5312 39.2037 24.5934 39.2037 24.6578V27.517Z"
                        fill="white"
                      />
                    </svg>

                    <div className="ml-2 text-base">Facebook</div>
                  </div>
                  {platforms.includes("facebook") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17 w-[70%] min-w-[500px] flex  flex justify-between items-center gap-3 bg-[#FFFFFF] transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="#E4405F"
                        stroke="#EBEBEB"
                      />
                      <g clip-path="url(#clip0_10048_17044)">
                        <path
                          d="M41.1997 27.4314C41.0565 27.0606 40.8372 26.7239 40.556 26.4429C40.2748 26.162 39.9378 25.9431 39.5669 25.8003C39.0561 25.6111 38.5166 25.5111 37.9719 25.5047C37.0661 25.4634 36.7945 25.4531 34.5 25.4531C32.2055 25.4531 31.9339 25.4634 31.0281 25.5047C30.4829 25.5109 29.9428 25.6109 29.4314 25.8003C29.0606 25.9435 28.7239 26.1628 28.4429 26.444C28.162 26.7252 27.9431 27.0622 27.8003 27.4331C27.6111 27.9439 27.5111 28.4834 27.5047 29.0281C27.4634 29.9339 27.4531 30.2055 27.4531 32.5C27.4531 34.7945 27.4634 35.0661 27.5047 35.9719C27.5109 36.5171 27.6109 37.0572 27.8003 37.5686C27.9435 37.9394 28.1628 38.2761 28.444 38.5571C28.7252 38.838 29.0622 39.0569 29.4331 39.1997C29.9439 39.3889 30.4834 39.4889 31.0281 39.4953C31.9339 39.5366 32.2055 39.5469 34.5 39.5469C36.7945 39.5469 37.0661 39.5366 37.9719 39.4953C38.5171 39.4891 39.0572 39.3891 39.5686 39.1997C39.9394 39.0565 40.2761 38.8372 40.5571 38.556C40.838 38.2748 41.0569 37.9378 41.1997 37.5669C41.3889 37.0561 41.4889 36.5166 41.4953 35.9719C41.5366 35.0661 41.5469 34.7945 41.5469 32.5C41.5469 30.2055 41.5366 29.9339 41.4953 29.0281C41.4891 28.4829 41.3891 27.9428 41.1997 27.4314ZM34.5 36.9137C33.627 36.9137 32.7737 36.6549 32.0479 36.1699C31.322 35.6849 30.7563 34.9956 30.4222 34.1891C30.0882 33.3826 30.0008 32.4951 30.1711 31.6389C30.3414 30.7827 30.7617 29.9963 31.379 29.379C31.9963 28.7617 32.7827 28.3414 33.6389 28.1711C34.4951 28.0008 35.3826 28.0882 36.1891 28.4222C36.9956 28.7563 37.6849 29.322 38.1699 30.0479C38.6549 30.7737 38.9137 31.627 38.9137 32.5C38.9137 33.6706 38.4487 34.7933 37.621 35.621C36.7933 36.4487 35.6706 36.9137 34.5 36.9137ZM39.0873 28.9439C38.8834 28.9439 38.684 28.8834 38.5144 28.7701C38.3448 28.6568 38.2126 28.4957 38.1346 28.3073C38.0565 28.1189 38.0361 27.9115 38.0759 27.7115C38.1157 27.5114 38.2139 27.3277 38.3581 27.1835C38.5024 27.0392 38.6861 26.941 38.8862 26.9012C39.0862 26.8614 39.2935 26.8819 39.482 26.9599C39.6704 27.038 39.8315 27.1701 39.9448 27.3397C40.0581 27.5093 40.1186 27.7087 40.1186 27.9127C40.1186 28.1862 40.0099 28.4485 39.8165 28.6419C39.6231 28.8353 39.3608 28.9439 39.0873 28.9439Z"
                          fill="white"
                        />
                        <path
                          d="M34.5019 35.3651C36.0843 35.3651 37.367 34.0823 37.367 32.4999C37.367 30.9175 36.0843 29.6348 34.5019 29.6348C32.9195 29.6348 31.6367 30.9175 31.6367 32.4999C31.6367 34.0823 32.9195 35.3651 34.5019 35.3651Z"
                          fill="white"
                        />
                        <path
                          d="M34.5 16C31.2366 16 28.0465 16.9677 25.3331 18.7808C22.6197 20.5938 20.5048 23.1707 19.256 26.1857C18.0071 29.2007 17.6804 32.5183 18.3171 35.719C18.9537 38.9197 20.5252 41.8597 22.8327 44.1673C25.1403 46.4748 28.0803 48.0463 31.281 48.683C34.4817 49.3196 37.7993 48.9929 40.8143 47.744C43.8293 46.4952 46.4062 44.3803 48.2193 41.6669C50.0323 38.9535 51 35.7634 51 32.5C51 28.1239 49.2616 23.9271 46.1673 20.8327C43.0729 17.7384 38.8761 16 34.5 16ZM43.0422 36.0441C43.0275 36.7566 42.892 37.4616 42.6417 38.1289C42.421 38.6997 42.0835 39.218 41.6507 39.6507C41.218 40.0834 40.6997 40.421 40.1289 40.6417C39.4616 40.892 38.7567 41.0274 38.0441 41.0422C37.1263 41.0834 36.8341 41.0938 34.5 41.0938C32.1659 41.0938 31.8738 41.0834 30.9559 41.0422C30.2434 41.0274 29.5384 40.892 28.8711 40.6417C28.3003 40.421 27.782 40.0834 27.3493 39.6507C26.9166 39.218 26.579 38.6997 26.3583 38.1289C26.108 37.4616 25.9726 36.7566 25.9578 36.0441C25.9166 35.1262 25.9063 34.8341 25.9063 32.5C25.9063 30.1659 25.9166 29.8737 25.9578 28.9559C25.9726 28.2434 26.108 27.5384 26.3583 26.8711C26.579 26.3003 26.9166 25.782 27.3493 25.3493C27.782 24.9166 28.3003 24.579 28.8711 24.3583C29.5384 24.108 30.2434 23.9726 30.9559 23.9578C31.8738 23.9166 32.1659 23.9062 34.5 23.9062C36.8341 23.9062 37.1263 23.9166 38.0441 23.9578C38.7567 23.9726 39.4616 24.108 40.1289 24.3583C40.6997 24.579 41.218 24.9166 41.6507 25.3493C42.0835 25.782 42.421 26.3003 42.6417 26.8711C42.892 27.5384 43.0275 28.2434 43.0422 28.9559C43.0834 29.8737 43.0938 30.1659 43.0938 32.5C43.0938 34.8341 43.0834 35.1262 43.0422 36.0441Z"
                          fill="white"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_10048_17044">
                          <rect
                            width="33"
                            height="33"
                            fill="white"
                            transform="translate(18 16)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <div className="ml-2 text-base">Instagram</div>
                  </div>

                  {platforms.includes("instagram") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17 w-[100%] min-w-[500px] flex  flex justify-between items-center gap-3 bg-[#FFFFFF] transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="black"
                        stroke="#EBEBEB"
                      />
                      <path
                        d="M29.4167 30.0305V28.8989C29.0362 28.8367 28.6519 28.8026 28.2668 28.7969C24.5379 28.7887 21.2366 31.2836 20.1168 34.9559C18.997 38.6282 20.3188 42.6257 23.3795 44.8245C22.2571 43.5843 21.5064 42.0352 21.2179 40.3642C20.9295 38.6931 21.1157 36.9716 21.754 35.4074C22.3923 33.8432 23.4554 32.5032 24.8151 31.5491C26.1748 30.595 27.7728 30.0676 29.4164 30.0306L29.4167 30.0305Z"
                        fill="#25F4EE"
                      />
                      <path
                        d="M29.6209 42.8486C31.7058 42.8456 33.4195 41.1499 33.5108 38.9993V19.8089H36.9063C36.837 19.4079 36.804 19.0011 36.8076 18.5938L32.1631 18.5938V37.7658C32.0859 39.9272 30.368 41.6393 28.2732 41.6427C27.6472 41.6373 27.0314 41.4783 26.4766 41.179C26.8362 41.6934 27.3085 42.1128 27.8549 42.403C28.4013 42.6931 29.0064 42.8458 29.6209 42.8486ZM43.2487 26.32V25.2533C41.999 25.2538 40.777 24.8731 39.7362 24.1589C40.6486 25.2541 41.8816 26.0127 43.2487 26.32Z"
                        fill="#25F4EE"
                      />
                      <path
                        d="M39.7455 24.1622C38.7201 22.9567 38.1549 21.4071 38.1554 19.8027H36.9156C37.0757 20.6898 37.4092 21.5338 37.8958 22.2833C38.3823 23.0328 39.0117 23.6721 39.7455 24.1622ZM28.2735 33.5951C27.404 33.5997 26.5609 33.9042 25.8782 34.4604C25.1956 35.0165 24.7126 35.7923 24.5061 36.6644C24.2996 37.5365 24.3813 38.4549 24.7384 39.2735C25.0955 40.0921 25.7073 40.7639 26.4767 41.1823C26.0561 40.5826 25.8042 39.8745 25.7488 39.1363C25.6935 38.398 25.8369 37.6584 26.1632 36.999C26.4895 36.3397 26.986 35.7863 27.5978 35.4C28.2096 35.0137 28.913 34.8095 29.6301 34.8101C30.02 34.8154 30.4072 34.878 30.7799 34.9962V30.1169C30.3993 30.058 30.015 30.027 29.6301 30.0242H29.4234V33.7342C29.0487 33.6304 28.6613 33.5836 28.2735 33.5951Z"
                        fill="#FE2C55"
                      />
                      <path
                        d="M43.2545 26.3223V30.0324C40.941 30.0278 38.6876 29.2717 36.8134 27.8713V37.6196C36.8034 42.4839 32.9813 46.4218 28.2701 46.4218C26.5203 46.4251 24.8127 45.8677 23.3828 44.8265C24.5488 46.1214 26.0655 47.0237 27.7353 47.4159C29.405 47.8081 31.1505 47.6721 32.7443 47.0255C34.3381 46.379 35.7064 45.2518 36.671 43.7909C37.6355 42.33 38.1516 40.603 38.152 38.8349V29.1142C40.0324 30.5054 42.2887 31.2517 44.6021 31.2475V26.4703C44.1491 26.4689 43.6976 26.4193 43.2545 26.3223Z"
                        fill="#FE2C55"
                      />
                      <path
                        d="M36.8136 37.6206V27.8722C38.6935 29.2647 40.9501 30.011 43.2637 30.0055V26.2955C41.8969 25.9975 40.6609 25.2487 39.7422 24.1622C39.0084 23.6721 38.3791 23.0328 37.8925 22.2833C37.406 21.5338 37.0725 20.6898 36.9123 19.8027H33.5168V39.0029C33.4837 39.8386 33.1993 40.643 32.7031 41.3041C32.2069 41.9653 31.5235 42.4505 30.748 42.6922C29.9724 42.934 29.1432 42.9203 28.3755 42.653C27.6078 42.3858 26.9399 41.8783 26.4644 41.201C25.6949 40.7828 25.0829 40.1109 24.7257 39.2922C24.3686 38.4736 24.2868 37.5551 24.4933 36.6829C24.6999 35.8107 25.1829 35.0349 25.8656 34.4787C26.5484 33.9226 27.3916 33.6181 28.2612 33.6136C28.6512 33.6172 29.0386 33.6797 29.4111 33.7992V30.089C27.7587 30.1179 26.1501 30.6426 24.7815 31.5991C23.4129 32.5556 22.3435 33.9026 21.7035 35.4758C21.0635 37.049 20.8807 38.7805 21.1774 40.4591C21.474 42.1377 22.2373 43.6909 23.3742 44.9294C24.8181 45.9363 26.5282 46.4579 28.2703 46.4228C32.9816 46.4228 36.8036 42.4848 36.8136 37.6206Z"
                        fill="white"
                      />
                    </svg>

                    <div className="ml-2 text-base">TikTok</div>
                  </div>

                  {platforms.includes("tiktok") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17 w-[70%] min-w-[500px] flex  flex justify-between items-center gap-3 bg-[#FFFFFF] transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="#0A66C2"
                        stroke="#EBEBEB"
                      />
                      <path
                        d="M32.8582 16C23.5481 16 16 23.5524 16 32.868C16 42.1838 23.5478 49.7365 32.8582 49.7365C42.169 49.7365 49.7174 42.1838 49.7174 32.868C49.7171 23.5524 42.169 16 32.8582 16ZM25.8629 23.6078C27.0096 23.6078 27.9398 24.4566 27.9398 25.5037C27.9398 26.5507 27.0096 27.3995 25.8629 27.3995C24.7155 27.3995 23.7859 26.5507 23.7859 25.5037C23.7859 24.4566 24.7155 23.6078 25.8629 23.6078ZM27.9555 39.823H23.8518V29.1087H27.9555V39.823ZM41.9002 39.823H37.7767V33.9314C37.7767 33.2588 37.6519 32.7828 37.4033 32.5034C37.1544 32.2245 36.8048 32.0845 36.3551 32.0845C35.8575 32.0845 35.4537 32.273 35.1448 32.6498C34.8355 33.0266 34.6813 33.7024 34.6813 34.6777V39.823H30.5773V29.1087H34.3985V30.8537C34.9696 30.1412 35.5479 29.6316 36.1326 29.3254C36.7174 29.0194 37.4295 28.8666 38.2699 28.8666C39.4062 28.8666 40.295 29.2043 40.9371 29.8804C41.5787 30.5562 41.8999 31.6004 41.8999 33.0129L41.9002 39.823Z"
                        fill="white"
                      />
                    </svg>

                    <div className="ml-2 text-base">LinkedIn</div>
                  </div>
                  {platforms.includes("linkedin") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17 w-[70%] min-w-[500px] flex  flex justify-between items-center gap-3 bg-[#FFFFFF] transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="#D7143A"
                        stroke="#EBEBEB"
                      />
                      <path
                        d="M41.149 21.8693C39.2217 20.0191 36.5544 19 33.6386 19C29.1846 19 26.4452 20.8257 24.9315 22.3573C23.0658 24.2447 21.9961 26.7509 21.9961 29.2333C21.9961 32.3501 23.2998 34.7423 25.483 35.6323C25.6295 35.6924 25.777 35.7226 25.9216 35.7226C26.3822 35.7226 26.7471 35.4212 26.8736 34.9379C26.9473 34.6605 27.118 33.9763 27.1923 33.6793C27.3512 33.0928 27.2228 32.8107 26.8762 32.4022C26.2448 31.6551 25.9507 30.7716 25.9507 29.6218C25.9507 26.2065 28.4938 22.5767 33.2072 22.5767C36.9471 22.5767 39.2702 24.7023 39.2702 28.1239C39.2702 30.2831 38.8051 32.2827 37.9604 33.7546C37.3733 34.7774 36.3411 35.9966 34.7565 35.9966C34.0712 35.9966 33.4557 35.7151 33.0673 35.2243C32.7004 34.7604 32.5794 34.1611 32.727 33.5365C32.8937 32.8309 33.1211 32.0948 33.3411 31.3832C33.7423 30.0834 34.1216 28.8559 34.1216 27.8765C34.1216 26.2013 33.0917 25.0756 31.5591 25.0756C29.6114 25.0756 28.0854 27.0539 28.0854 29.5794C28.0854 30.818 28.4146 31.7444 28.5636 32.1001C28.3182 33.1397 26.8599 39.3205 26.5833 40.486C26.4233 41.1664 25.4598 46.5402 27.0546 46.9687C28.8464 47.4501 30.448 42.2164 30.611 41.625C30.7432 41.144 31.2054 39.3252 31.4887 38.2073C32.3537 39.0404 33.7465 39.6037 35.1016 39.6037C37.6564 39.6037 39.9539 38.4541 41.5711 36.3668C43.1395 34.3423 44.0033 31.5205 44.0033 28.4217C44.0031 25.9991 42.9628 23.6108 41.149 21.8693Z"
                        fill="white"
                      />
                    </svg>

                    <div className="ml-2 text-base">Pinterest</div>
                  </div>
                  {platforms.includes("pinterest") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full grid row-span-1 gap-2 mt-3 ">
                <div className="h-17 w-[70%] min-w-[500px] flex  flex justify-between items-center gap-3 bg-[#FFFFFF] transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8">
                  <div className="flex text-center items-center">
                    <svg
                      width="65"
                      height="65"
                      viewBox="0 0 65 65"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="64"
                        height="64"
                        rx="14.4425"
                        fill="black"
                        stroke="#EBEBEB"
                      />
                      <path
                        d="M32.5893 50C41.7514 50 49.1787 42.3888 49.1787 33C49.1787 23.6112 41.7514 16 32.5893 16C23.4273 16 16 23.6112 16 33C16 42.3888 23.4273 50 32.5893 50Z"
                        fill="black"
                        stroke="white"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M22.3703 23.1504L30.2998 34.0152L22.3203 42.8487H24.1163L31.1025 35.1146L36.7469 42.8487H42.8584L34.4825 31.373L41.9099 23.1504H40.1139L33.6802 30.2731L28.4817 23.1504H22.3703ZM25.0114 24.5059H27.819L40.2169 41.4932H37.4094L25.0114 24.5059Z"
                        fill="white"
                      />
                    </svg>

                    <div className="ml-2 text-base">X profile</div>
                  </div>
                  {platforms.includes("twitter") ? (
                    <button
                      className="min-w-[100px] py-3 px-1 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                      type="submit"
                    >
                      {tick} &nbsp;Done
                    </button>
                  ) : (
                    <button
                      onClick={handleOnConnect}
                      type="submit"
                      className="min-w-[140px] py-3 rounded-xl text-green sheen flex justify-center items-center border border-emerald-600 cursor-pointer"
                    >
                      {connectsvg}&nbsp; Connect
                    </button>
                  )}
                </div>
              </div>
              {platforms && (
                <div className="flex justify-end ... mt-5">
                  <button
                    onClick={skipNowFn}
                    className=" max-w-[140px] py-3 px-5 bg-primary-green sheen rounded-xl text-white  flex justify-center items-center"
                    type="submit"
                  >
                    Skip for now
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>skiped</h1>
        </>
      )}
    </>
  );
}
