"use client";

import { DivideIcon, Plus, Search, Trash2 } from "lucide-react";
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
import { FaEllipsisV, FaUser } from "react-icons/fa";
import GlobalModal from "@/components/modal/global.modal";
type CustomGpt = {
  description: string;
  icon: string;
  name: string;
  _id: string;
  show: boolean;
  pre_built: boolean;
  is_public: boolean;
  userProfiles: [];
};
export default function Customgpts() {
  const [customGpts, setCustomGpts] = useState<CustomGpt[]>([]);
  const [customGptsUser, setCustomGptsUser] = useState<CustomGpt[]>([]);
  const [menuOpenIndex, setMenuOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [viewAll, setViewAll] = useState(false);
  const getCustomGpts = async () => {
    setLoading(true);
    try {
      const {
        data: { data, publicdata },
      } = await instance.get(`${API_URL}/ai/api/v1/customgpt`);
      publicdata
        ? setCustomGpts(
            publicdata
              .filter((d: any) => d.is_public === true)
              .map((d: any) => ({ ...d, show: true }))
          )
        : "";
      data
        ? setCustomGptsUser(
            data
              .filter((d: any) => d.is_delete === false)
              .map((d: any) => ({ ...d, show: true }))
          )
        : "";
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
  const CustomGptPublic = async (id: string, makePublic: boolean) => {
    setLoading(true);
    try {
      await instance.post(
        `${API_URL}/ai/api/v1/customgpt/changeToPublicAccess`,
        { _id: id, makePublic: makePublic }
      );
      setMenuOpenIndex(null);
      getCustomGpts();
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

  const deleteGpt = async () => {
    setLoading(true);
    setMenuOpenIndex(null);
    try {
      await instance.post(`${API_URL}/ai/api/v1/customgpt/deleteCustomGpt`, {
        _id: deleteId,
      });
      setIsDeleting(false);
      setMenuOpenIndex(null);
      getCustomGpts();
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsDeleting(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCustomGpts();
  }, []);
  const toggleMenu = (index: any) => {
    setMenuOpenIndex(menuOpenIndex === index ? null : index);
  };
  const visibleItems = viewAll ? customGpts : customGpts.slice(0, 5);

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
              <button className="bg-[#2DA771] text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
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
          ) : customGpts.length < 1 && customGptsUser.length < 1 ? (
            <div className="mt-4 hover:scale-120 flex flex-col justify-center items-center space-y-4 col-span-3 py-8">
              <h2 className="text-lg text-center font-semibold">
                You have Custom GPTs Created yet
              </h2>
              <p>
                A custom GPT is specialized version of the GPT model, tailored
                to address specific needs or tasks
              </p>
              <Link href={ALL_ROUTES.AI_CUSTOM_GPT_NEW}>
                <button className="bg-[#2DA771] text-white h-14 px-6 rounded-xl sheen">
                  Create new GPT
                </button>
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-semibold">GPTs by GrowStack</h1>
              <div className="grid grid-cols-3 gap-5 mt-8">
                {visibleItems.map(
                  (
                    { description, icon, name, _id, show, userProfiles },
                    index
                  ) =>
                    show && (
                      <div
                        key={_id}
                        className="bg-white border flex flex-col justify-between border-[#E8E8E8] rounded-2xl p-2 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer transition-all duration-300 relative"
                      >
                        <div className="flex justify-between">
                          <Link
                            href={`/app/ai-studio/custom-gpts/gpt?custom_gpt_id=${_id}`}
                          >
                            <div className="flex items-center gap-5">
                              <Image
                                src={icon}
                                alt=""
                                width={200}
                                height={200}
                                className="rounded-2xl w-[90px] h-[90px] object-cover"
                              />
                              <div className="space-y-2">
                                <h1 className="text-lg font-semibold">
                                  {name}
                                </h1>
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
                        </div>
                        <div className="mt-3 mb-3">
                          <DropdownMenuSeparator />
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`flex ${userProfiles.length > 1 ? "-space-x-4 rtl:space-x-reverse" : ""}`}
                          >
                            {userProfiles
                              .slice(0, 4)
                              .map((profile_img: any, index: number) => (
                                <Avatar key={index} className="">
                                  {profile_img.profile_img ? (
                                    <AvatarImage
                                      className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                      src={profile_img.profile_img}
                                    />
                                  ) : (
                                    <FaUser className="w-10 h-10 border-2 border-white rounded-full bg-[#e2e8f0]" />
                                  )}
                                </Avatar>
                              ))}
                            {userProfiles.length > 4 && (
                              <div className="flex items-center justify-center w-[50px] h-[50px] bg-gray-300 rounded-full border-2 border-white text-gray-700">
                                +{userProfiles.length - 4}
                              </div>
                            )}
                          </div>
                          <strong className="ml-4 text-gray-700">
                            {`Used by ${userProfiles.length} user${userProfiles.length > 1 ? "s" : ""}`}
                          </strong>
                        </div>
                      </div>
                    )
                )}

                {customGpts && customGpts.length > 5 && !viewAll && (
                  <button
                    onClick={() => setViewAll(true)}
                    className="mt-4 w-20px h-10px px-4 py-2 rounded text-green-500"
                  >
                    View All
                  </button>
                )}
              </div>
              {customGpts?.length == 0 && (
                <h1 className="text-center">
                  GPTs by GrowStack Records Not Available
                </h1>
              )}
              {/* <div className="mt-8 mb-3">
                <DropdownMenuSeparator />
              </div> */}
              <h1 className="text-2xl font-semibold mt-4">
                GPTs Created by users
              </h1>
              <div className="grid grid-cols-3 gap-5 mt-8">
                {customGptsUser &&
                  customGptsUser.map(
                    (
                      {
                        description,
                        icon,
                        name,
                        _id,
                        show,
                        pre_built,
                        is_public,
                      },
                      index
                    ) =>
                      show && (
                        <div className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-300 cursor-pointer transition-all duration-300 relative">
                          <div className="flex justify-between">
                            <Link
                              href={`/app/ai-studio/custom-gpts/gpt?custom_gpt_id=${_id}`}
                              key={_id}
                            >
                              <div className="flex items-center gap-5">
                                <Image
                                  src={icon}
                                  alt=""
                                  width={200}
                                  height={200}
                                  className="rounded-2xl w-[90px] h-[90px] object-cover"
                                />
                                <div className="space-y-2">
                                  <h1 className="text-lg font-semibold">
                                    {name}
                                  </h1>
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
                              <button
                                onClick={e => {
                                  e.preventDefault();
                                  toggleMenu(index);
                                }}
                              >
                                <FaEllipsisV className="text-gray-500" />
                              </button>
                              {menuOpenIndex === index && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
                                  <ul className="py-1">
                                    <li
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        CustomGptPublic(_id, true);
                                      }}
                                    >
                                      Set as public
                                    </li>
                                    <li
                                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                      onClick={() => {
                                        CustomGptPublic(_id, false);
                                      }}
                                    >
                                      Remove from public
                                    </li>
                                    <li
                                      className="px-4 py-2 cursor-pointer text-rose-600 hover:bg-gray-100"
                                      onClick={() => {
                                        setIsDeleting(true);
                                        setDeleteId(_id);
                                      }}
                                    >
                                      Delete
                                    </li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                  )}
              </div>
              {customGptsUser?.length == 0 && (
                <h1 className="text-center">
                  GPTs Created by users Records Not Available
                </h1>
              )}
            </>
          )}
        </div>
        <GlobalModal
          className=""
          open={isDeleting}
          setOpen={() => {
            setIsDeleting(false);
          }}
        >
          <div className="flex flex-col items-start justify-center px-6 pt-4 pb-8 gap-6 ">
            <h3 className="text-center text-xl font-semibold">
              Are you sure you want to delete <strong>GPT</strong>
            </h3>
            <p className="text-left text-gray-700 text-sm md:text-base">
              This action is irreversible. Once deleted, you will not be able to
              recover this GPT.
            </p>
            <div className="flex items-center justify-start gap-3">
              <button className="text-gray-500 border border-gray-500 bg-transparent text-nowrap py-2 px-8 rounded-md transition duration-300">
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGpt();
                }}
                className="text-white bg-red-500 text-nowrap flex items-center gap-1 py-2 px-6 rounded-md transition duration-300 hover:bg-red-600"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>
        </GlobalModal>
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
