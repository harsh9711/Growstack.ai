"use client";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useDispatch } from "react-redux";
import { loaderSelector } from "@/lib/features/documents/document.selector";
import { isActiveLoader } from "@/lib/features/documents/document.slice";

export default function SchedulerPage() {
  const router = useRouter();
  const loader = loaderSelector();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState<any>([]);

  console.log("LDR", loader);

  useEffect(() => {
    // const activeSocialAccounts = localStorage.getItem("activeSocialAccounts");
    if (profile?.activeSocialAccounts?.length > 0) {
      router.push("/app/publish/scheduler/quick-posting");
    } else {
    }
  }, [profile]);

  useEffect(() => {
    handleGetProfileData();
  }, []);

  const handleGetProfileData = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      );
      if (response.data.data.activeSocialAccounts.length > 0) {
        dispatch(isActiveLoader(true));
        setProfile(response.data.data);
      } else {
        dispatch(isActiveLoader(false));
      }
    } catch (error) {
      console.log("Error fetching social profile:", error);
      toast.error("Error fetching social profile data");
    }
  };

  const handleOnConnect = async () => {
    try {
      const response = await instance.get(
        API_URL + "/users/api/v1/social-media/connect"
      );
      console.log("response", response);
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
      <div className="w-full max-w-4xl bg-white px-10 py-14 rounded-3xl shadow-2xl shadow-gray-400">
        <h1 className="text-[28px] font-semibold">Connect a profile</h1>
        <p className="text-primary-black text-opacity-70 mt-3 leading-relaxed">
          Attach a profile to see how growstack can help grow your business.
        </p>
        <div className="w-full grid grid-cols-3 gap-4 mt-8">
          <div
            onClick={handleOnConnect}
            className="h-14 w-full flex items-center gap-3 bg-[#217BEE] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white"
          >
            <Image
              src="/icons/facebook-icon.svg"
              alt=""
              width={30}
              height={30}
            />
            Facebook
          </div>
          <div
            onClick={handleOnConnect}
            className="h-14 w-full flex items-center gap-3 bg-[#E4405F] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white"
          >
            <Image
              src="/icons/instagram-icon.svg"
              alt=""
              width={30}
              height={30}
            />
            Instagram
          </div>
          <div
            onClick={handleOnConnect}
            className="h-14 w-full flex items-center gap-3 bg-[#0A66C2] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white"
          >
            <Image
              src="/icons/linkedin-icon.svg"
              alt=""
              width={30}
              height={30}
            />
            Linkedin
          </div>
          <div
            onClick={handleOnConnect}
            className="h-14 w-full flex items-center gap-3 bg-[#070707] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white"
          >
            <Image src="/icons/x-icon.svg" alt="" width={30} height={30} />X
            Profile
          </div>
          {/* <Link
          href={{
            pathname: API_URL + `/users/api/v1/social-media/connect`,
            query: { profile: "Blogger" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#F06A35] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/blogger-icon.svg" alt="" width={30} height={30} />
            Blogger
          </div>
        </Link>
        <Link
          href={{
            pathname: API_URL + `/users/api/v1/social-media/connect`,
            query: { profile: "Pinterest" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#D7143A] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/pinterest-icon.svg" alt="" width={30} height={30} />
            Pinterest
          </div>
        </Link>
        <Link
          href={{
            pathname: API_URL + `/users/api/v1/social-media/connect`,
            query: { profile: "Google Business" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#4989F5] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/google-my-business-icon.svg" alt="" width={30} height={30} />
            Google business
          </div>
        </Link>
        <Link
          href={{
            pathname: API_URL + `/users/api/v1/social-media/connect`,
            query: { profile: "Blogger" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#314358] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/tumblr-icon.svg" alt="" width={30} height={30} />
            Blogger
          </div>
        </Link>
        <Link
          href={{
            pathname: API_URL + `/users/api/v1/social-media/connect`,
            query: { profile: "Reddit" },
          }}>
          <div className="h-14 w-full flex items-center gap-3 bg-[#FF4500] hover:bg-opacity-90 transition-all duration-300 cursor-pointer rounded-xl py-2.5 px-8 text-white">
            <Image src="/icons/reddit-icon.svg" alt="" width={40} height={40} />
            Reddit
          </div>
        </Link> */}
        </div>
      </div>
      <Loader display={loader} />
    </>
  );
}
