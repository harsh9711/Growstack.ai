"use client";

import { DivideIcon, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import ContentLoader from "react-content-loader";
import toast from "react-hot-toast";
import { ALL_ROUTES } from "@/utils/constant";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { FaEllipsisV } from "react-icons/fa";
type CustomGpt = {
  description: string;
  icon: string;
  name: string;
  _id: string;
  show: boolean;
  pre_built: boolean;
  is_public: boolean;
};
export default function Customgpts() {
  const [customGpts, setCustomGpts] = useState<CustomGpt[]>([]);
  const [customGptsUser, setCustomGptsUser] = useState<CustomGpt[]>([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCustomGpts = async () => {
    setLoading(true);
    try {
      const { data: { data, publicdata } } = await instance.get(`${API_URL}/ai/api/v1/customgpt`);
      setCustomGpts(publicdata.map((d: any) => ({ ...d, show: true })));
      setCustomGpts(
        publicdata
          .filter((d: any) => d.is_public === true)
          .map((d: any) => ({ ...d, show: true }))
      );
      setCustomGptsUser(data.filter((d: any) => d.is_public === false)
        .map((d: any) => ({ ...d, show: true })))
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const CustomGptPublic = async (id: string) => {
    setLoading(true);
    try {
      await instance.post(`${API_URL}/ai/api/v1/customgpt/customgpt_public`, { "_id": id });
      getCustomGpts()
    }
    catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCustomGpts();
  }, []);
  const toggleMenu = (index: any) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search GPTs"
                onChange={e => {
                  const value = e.target.value;
                  setCustomGpts(
                    customGpts.map((d: any) => ({
                      ...d,
                      show: d.name.toLowerCase().includes(value.toLowerCase()),
                    }))
                  );
                }}
              />
            </div>
            <Link href={ALL_ROUTES.AI_CUSTOM_GPT_NEW}>
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Create new GPT
              </button>
            </Link>
          </div>
        </div>
        <div>
          {loading ? (
            Array(7)
              .fill(null)
              .map((_, index) => <SkeletonLoader key={index} />)
          ) : customGpts.length < 1 ? (
            <div className="mt-4 hover:scale-120 flex flex-col justify-center items-center space-y-4 col-span-3 py-8">
              <h2 className="text-lg text-center font-semibold">
                You have Custom GPTs Created yet
              </h2>
              <p>
                A custom GPT is specialized version of the GPT model, tailored
                to address specific needs or tasks
              </p>
              <Link href={ALL_ROUTES.AI_CUSTOM_GPT_NEW}>
                <button className="bg-primary-green text-white h-14 px-6 rounded-xl sheen">
                  Create new GPT
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">GPTs by GrowStack</h1>
              <div className="grid grid-cols-3 gap-5 mt-8">
                {customGpts.map(({ description, icon, name, _id, show, pre_built, is_public }, index) =>
                  show && (
                    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer transition-all duration-300 relative">
                      <div className="flex justify-between">
                        <Link href={`/app/ai-studio/custom-gpts/gpt?custom_gpt_id=${_id}`} key={_id}>

                          <div className="flex items-center gap-5">
                            <Image
                              src={icon}
                              alt=""
                              width={200}
                              height={200}
                              className="rounded-2xl w-[90px] h-[90px] object-cover"
                            />
                            <div className="space-y-2">
                              <h1 className="text-lg font-semibold">{name}</h1>
                              <p
                                className="text-primary-black text-opacity-50 leading-relaxed"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  width: "80%",
                                }}
                              >
                                {description}...
                              </p>
                            </div>
                          </div>
                        </Link>
                        {/* <div className="relative">
                          <button onClick={(e) => { e.preventDefault(); toggleMenu(index); }}>
                            <FaEllipsisV className="text-gray-500" />
                          </button>
                          {menuOpenIndex === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                              <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                  Public
                                </li>
                              </ul>
                            </div>
                          )}
                        </div> */}
                      </div>
                      {/* <div className="mt-3 mb-3">
                        <DropdownMenuSeparator />
                      </div>
                      <div className="flex items-center">
                        <div className="flex -space-x-3">
                          {avatars.map((avatar, idx) => (
                            <Avatar key={idx} className="w-[60%] h-[60%]">
                              <AvatarImage
                                style={{
                                  borderRadius: "50%",
                                  border: idx > 0 ? "3px solid white" : "none",
                                }}
                                className="w-[50px] h-[50px]"
                                src={icon}
                              />
                              <AvatarFallback>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <strong className="ml-4 text-gray-700">Used by: 10 users</strong>
                      </div> */}
                    </div>
                  )
                )}
              </div>
              {customGpts?.length == 0 && <h1 className="text-center">GPTs by GrowStack Records Not Available</h1>}
              <div className="mt-8 mb-3">
                <DropdownMenuSeparator />
              </div>
              <h1 className="text-2xl font-semibold mt-4">GPTs Created by users</h1>
              <div className="grid grid-cols-3 gap-5 mt-8">
                {customGptsUser.map(({ description, icon, name, _id, show, pre_built, is_public }, index) =>
                  show && !is_public && (
                    <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer transition-all duration-300 relative">
                      <div className="flex justify-between">
                        <Link href={`/app/ai-studio/custom-gpts/gpt?custom_gpt_id=${_id}`} key={_id}>

                          <div className="flex items-center gap-5">
                            <Image
                              src={icon}
                              alt=""
                              width={200}
                              height={200}
                              className="rounded-2xl w-[90px] h-[90px] object-cover"
                            />
                            <div className="space-y-2">
                              <h1 className="text-lg font-semibold">{name}</h1>
                              <p
                                className="text-primary-black text-opacity-50 leading-relaxed"
                                style={{
                                  display: "-webkit-box",
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: "vertical",
                                  overflow: "hidden",
                                  width: "80%",
                                }}
                              >
                                {description}...
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="relative">
                          <button onClick={(e) => { e.preventDefault(); toggleMenu(index); }}>
                            <FaEllipsisV className="text-gray-500" />
                          </button>
                          {menuOpenIndex === index && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                              <ul className="py-1">
                                <button className="px-4 py-2 cursor-pointer" onClick={() => { CustomGptPublic(_id) }}>
                                  Public
                                </button>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* <div className="mt-3 mb-3">
                        <DropdownMenuSeparator />
                      </div>
                      <div className="flex items-center">
                        <div className="flex -space-x-3">
                          {avatars.map((avatar, idx) => (
                            <Avatar key={idx} className="w-[60%] h-[60%]">
                              <AvatarImage
                                style={{
                                  borderRadius: "50%",
                                  border: idx > 0 ? "3px solid white" : "none",
                                }}
                                className="w-[50px] h-[50px]"
                                src={icon}
                              />
                              <AvatarFallback>{avatar.fallback}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <strong className="ml-4 text-gray-700">Used by: 10 users</strong>
                      </div> */}
                    </div>
                  )
                )}
              </div>
              {customGptsUser?.length == 0 && <h1 className="text-center">GPTs Created by users Records Not Available</h1>}
            </>
          )}
        </div>
      </main>
    </Fragment>
  );
}

const SkeletonLoader: React.FC = () => {
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
