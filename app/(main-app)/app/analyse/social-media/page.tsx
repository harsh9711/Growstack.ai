"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import BarGraph from "./components/BarGraph";
import DetailsTable from "./components/DetailsTable";
import { API_URL } from "@/lib/api";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";

export default function SocialMediaAnalyticsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram");
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metaData, setMetaData] = useState<any>({});
  const [graphData, setGraphData] = useState<any>({});
  const [analyticsData, setAnalyticsData] = useState<{
    followers: number;
    accountReached: number;
    postActivity: number;
    statistics: any[];
  } | null>(null);

  const fetchAnalytics = async (platform: string) => {
    setLoading(true)
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/analytics?platform=${platform.toLowerCase()}`
      );
      setAnalyticsData(response.data);
      setMetaData(response.data.data.metadata);
      setGraphData(response.data.data.graphs);
      toast.success(response.data.message);
    } catch (error: any) {
      // toast.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
      setAnalyticsData(null)
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchAnalytics(selectedPlatform);
  }, [selectedPlatform]);

  const platforms = [
    { name: "Instagram", icon: "/assets/brand-instagram.png" },
    { name: "Facebook", icon: "/assets/brand-facebook.png" },
    { name: "Twitter (X)", icon: "/assets/brand-x.png" },
    { name: "Linkedin", icon: "/assets/brand-linkedin.png" },
    { name: "Telegram", icon: "/assets/brand-telegram.png" },
  ];

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">Social media analytics</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Platform{" "}
            </p>
          </div>
        </div>
        <div className="flex mt-6 gap-5">
          <div className="w-full max-w-[400px] space-y-3">
            {platforms.map((platform) => (
              <div
                key={platform.name}
                className={`group bg-white border border-[#F3F3F3] rounded-xl p-3 flex gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100 ${
                  selectedPlatform === platform.name ? "bg-gray-100" : ""
                }`}
                onClick={() => setSelectedPlatform(platform.name)}
              >
                <Image src={platform.icon} alt="" width={60} height={60} />
                <h2 className="font-semibold text-[16px]">{platform.name}</h2>
              </div>
            ))}
            <div className="!bg-white shadow-box rounded-3xl p-7">
              <h1 className="text-[17px] font-semibold">Account</h1>
              <div className="flex flex-col justify-center items-center space-y-4 mt-4">
                <Image
                  src="/logo/growstack-mini.png"
                  alt=""
                  width={50}
                  height={50}
                />
                <h2 className="text-[17px] font-medium text-center">
                  GrowStack_AI
                </h2>
                <p className="text-primary-black text-opacity-50 text-sm text-center !mt-2">
                  @growstack_ai
                </p>
              </div>
              <div className="flex justify-between mt-8">
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold">
                    {metaData?.followersCount || 0}
                  </h1>
                  <p className="text-sm text-primary-black text-opacity-50">
                    Followers
                  </p>
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold">
                    {metaData?.followingCount || 0}
                  </h1>
                  <p className="text-sm text-primary-black text-opacity-50">
                    Following
                  </p>
                </div>
                <div className="space-y-2">
                  <h1 className="text-xl font-semibold">134</h1>
                  <p className="text-sm text-primary-black text-opacity-50">
                    Posts
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white border border-[#DFDFDF] rounded-3xl">
            {loading ? (
              <div className="flex-1 h-full flex flex-col gap-5 justify-center items-center">
                <Spinner color="black" size={100} />
                Loading...
              </div>
            ) : analyticsData ? (
              <>
                <div className="px-10 py-5">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Overview</h1>
                  </div>
                  <div className="flex justify-between mt-3">
                    <div className="space-y-5">
                      <p className="text-[15px] text-primary-black text-opacity-50">
                        Followers
                      </p>
                      <h1 className="text-3xl font-semibold">
                        {metaData?.followersCount || 0}
                      </h1>
                      {/* <div className="flex gap-2">
                        <TrendingUp className="text-[#00B69B]" />
                        <span className="text-[#00B69B] font-semibold">
                          0%{" "}
                        </span>
                        Up from yesterday
                      </div> */}
                    </div>
                    <div className="space-y-5">
                      <p className="text-[15px] text-primary-black text-opacity-50">
                        Account reached
                      </p>
                      <h1 className="text-3xl font-semibold">
                        {metaData?.currentMonthAccountReach}
                      </h1>
                      <div className="flex gap-2">
                        {/* <TrendingDown className="text-[#F93C65]" />
                        <span className="text-[#F93C65] font-semibold"> */}
                        <TrendingUp className="text-[#00B69B]" />
                        <span className="text-[#00B69B] font-semibold">
                          {metaData?.accountReachIncreasePercentage}%{" "}
                        </span>
                        Down from yesterday
                      </div>
                    </div>
                    <div className="space-y-5">
                      <p className="text-[15px] text-primary-black text-opacity-50">
                        Post activity
                      </p>
                      <h1 className="text-3xl font-semibold">
                        {metaData?.currentMonthPostActivity}
                      </h1>
                      <div className="flex gap-2">
                        <TrendingUp className="text-[#00B69B]" />
                        <span className="text-[#00B69B] font-semibold">
                          {metaData?.postActivityIncreasePercentage}%{" "}
                        </span>
                        Up from yesterday
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shadow-top px-10 py-7 rounded-t-3xl mt-5">
                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Statistics</h1>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-green" />
                      <span>Followers</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#248D74]" />
                      <span>Account reached</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#46DEBA]" />
                      <span>Post activity</span>
                    </p>
                  </div>
                  <div className="h-[500px] mt-8">
                    {/* @ts-ignore */}
                    <BarGraph graphData={graphData} />
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center h-full">
                <p>{errorMessage ? errorMessage : "Loading..."}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </Fragment>
  );
}
