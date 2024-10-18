"use client";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { login } from "@/lib/features/auth/auth.slice";
import { ArrowRight, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import toast from "react-hot-toast";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { useDispatch } from "react-redux";
import ChatComponent from "./components/ChatComponent";
import AOS from "aos";
import "aos/dist/aos.css";
import "@/styles/globals.css";
import { useRouter } from "next/navigation";
import { ALL_ROUTES } from "@/utils/constant";
interface AiApp {
  _id: string;
  "ASSISTANT NAME": string;
  "ASSISTANT DESCRIPTION": string;
  icon: string;
  category: string;
}

export interface Assistant {
  id: string;
  name: string;
  avatar: string;
  role: string;
  slug: string;
  welcome_message: string;
}

export interface FavoriteAssistant {
  category: string;
  description: string;
  icon: string;
  isActivated: boolean;
  name: string;
  premium: boolean;
  _id: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const [assistants, setAssistants] = useState<Assistant[]>([]);

  const [aiAppsloading, setAiAppsLoading] = useState(true);
  const [aiAssistantsloading, setAiAssistantsLoading] = useState(true);
  const currentUser = getCurrentUser();

  const [hasRefreshed, setHasRefreshed] = useState(false);
  const router = useRouter();

  useLayoutEffect(() => {
    const hasRefreshedBefore = localStorage.getItem("hasRefreshed");

    if (!hasRefreshedBefore) {
      localStorage.setItem("hasRefreshed", "true");
      setHasRefreshed(true);
      router.refresh();
    } else {
      setHasRefreshed(true);
    }
  }, [router]);



  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, []);
  const fetchAssistants = async () => {
    try {
      const response = await instance.get(`${API_URL}/ai/api/v1/assistant`);
      setAssistants(response.data.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.log(error);
    } finally {
      setAiAppsLoading(false);
    }
  };





  const fetchSocialMediaProfile = async () => {
    try {
      const response = await instance.get(
        `${API_URL}/users/api/v1/social-media/profile`
      );
      if (response?.data?.data?.activeSocialAccounts?.length > 0) {
        localStorage.setItem(
          "activeSocialAccounts",
          JSON.stringify(response?.data?.data?.activeSocialAccounts)
        );
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleGetProfileData = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1`);
      const userData = response?.data?.data;
      dispatch(login(userData));
    } catch (error) {
      console.log("Error fetching workflows:", error);
      toast.error("Error fetching profile data");
    }
  };

  useEffect(() => {
    setAiAppsLoading(true);
    setAiAssistantsLoading(true);
    handleGetProfileData();
    fetchAssistants();
    fetchSocialMediaProfile();
  }, []);


  if (!hasRefreshed) {
    return null;
  }


  return (
    <main>
      <div className="bg-[#EBF0F6] h-[30%] w-full max-w-[96%] mx-auto absolute top-0 left-0 right-0 rounded-b-[60px]" />
      <div className="h-[calc(100vh-150px)] z-[1]">
        <div
          className="flex justify-between items-center mt-8"
          data-aos="fade-down"
        >
          <div className="space-y-2">
            <h1 className="text-base font-normal">
              Welcome back,{" "}
              {currentUser?.name
                ? currentUser.name
                : currentUser?.email.split(/[@.]/)[0]}
            </h1>
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-7 mt-4 h-[95%]" >
          <div className="w-full lg:w-2/3 space-y-6 " data-aos="fade-left">
            <ChatComponent />
          </div>
          <div
            className="w-full lg:w-1/3  min-h-[580px] overflow-y-auto bg-white p-8 rounded-3xl border border-[#E8E8E8] h-full"
            data-aos="fade-right"
          >
            <div className="space-y-3">
              <h1 className="text-xl font-semibold text-center">
                Most Used Features
              </h1>
              <p className="text-[#6C7275] text-center">
                Chat with the smartest AI - Experience the power of AI with us
              </p>
            </div>
            <div className="">
              <Link href={ALL_ROUTES.AI_TEMPLATE}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/ai-templates.svg"
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h2 className="font-medium">AI templates </h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
              <Link href={ALL_ROUTES.AI_ASSISTANT}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/chatbot.svg"
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h2 className="font-medium">AI assistants</h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
              <Link href={ALL_ROUTES.AI_CUSTOM_GPT}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/custom-gpts.svg"
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h2 className="font-medium">AI custom GPT </h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
              <Link href={ALL_ROUTES.TEXT_TO_AVATAR}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/media.svg" alt="" width={60} height={60} />
                    <h2 className="font-medium">Text to avatar </h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
              <Link href={ALL_ROUTES.WORKFLOW_BUILDER}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/workflow-builder.svg"
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h2 className="font-medium">Workflow builder</h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
              <Link href={ALL_ROUTES.AI_WIZARD}>
                <div
                  className="!mt-4 group bg-white border border-[#E8ECEF] rounded-2xl p-4 flex justify-between items-center cursor-pointer transition duration-300 hover:border-primary-green hover:shadow-xl hover:shadow-[#39bfc7]/10"
                >
                  <div className="flex gap-4 items-center">
                    <Image
                      className="w-10 h-10 md:w-12 md:h-12 xl:w-14 xl:h-14"
                      src="/icons/text-generator.svg"
                      alt=""
                      width={60}
                      height={60}
                    />
                    <h2 className="font-medium">AI article wizard</h2>
                  </div>
                  <button className="p-2 block md:hidden xl:block hover:bg-[#f2f2f2] rounded-lg transition">
                    <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                  </button>
                </div>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

const AiAppSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80px"
      viewBox="0 0 600 80"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
    >
      <rect x="0" y="0" rx="10" ry="10" width="70" height="70" />
      <rect x="90" y="10" rx="8" ry="8" width="350" height="15" />
      <rect x="90" y="35" rx="8" ry="8" width="420" height="15" />
    </ContentLoader>
  );
};
const AiAssistantSkeletonLoader: React.FC = () => {
  return (
    <ContentLoader
      speed={2}
      width="100%"
      height="80px"
      viewBox="0 0 600 80"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
    >
      <rect x="0" y="0" rx="10" ry="10" width="70" height="70" />
      <rect x="90" y="13" rx="8" ry="8" width="250" height="15" />
      <rect x="90" y="38" rx="8" ry="8" width="200" height="15" />
      <rect x="480" y="13" rx="10" ry="10" width="80" height="40" />
    </ContentLoader>
  );
};