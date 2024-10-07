"use client";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function SchedulerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>([]);

  useEffect(() => {
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
      setLoading(true)
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      );
      if (response.data.data.activeSocialAccounts.length > 0) {
        setProfile(response.data.data);
      }
    } catch (error) {
      console.log("Error fetching social profile:", error);
    } finally {
      setLoading(false)
    }
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

  if (loading) {
    return (
      <div className="flex-1 flex flex-col gap-5 justify-center items-center">
        <Spinner color="black" size={100} />
        Loading...
      </div>
    );
  }

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
    </>
  );
}
