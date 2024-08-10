"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import ContentLoader from "react-content-loader";
import toast from "react-hot-toast";

type CustomGpt = {
  description: string;
  icon: string;
  name: string;
  _id: string;
  show: boolean;
};

export default function Customgpts() {
  const [customGpts, setCustomGpts] = useState<CustomGpt[]>([]);
  const [loading, setLoading] = useState(false);

  const getCustomGpts = async () => {
    setLoading(true);
    try {
      const {
        data: { data },
      } = await instance.get(`${API_URL}/ai/api/v1/customgpt`);

      setCustomGpts(data.map((d: any) => ({ ...d, show: true })));
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

  useEffect(() => {
    getCustomGpts();
  }, []);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI custom GPT</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">All custom GPTs apps</p>
          </div>
          <div className="w-full flex justify-end gap-2">
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-xl flex gap-3 items-center w-full max-w-md">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[40px] w-full"
                placeholder="Search GPTs"
                onChange={(e) => {
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
            <Link href="/app/plan/custom-gpts/new">
              <button className="bg-primary-green text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
                <Plus size={20} />
                Create new GPT
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-8">
          {loading ? (
            Array(7)
              .fill(null)
              .map((_, index) => <SkeletonLoader key={index} />)
          ) : customGpts.length < 1 ? (
            <div className="mt-4 flex flex-col justify-center items-center space-y-4 col-span-3 py-8">
              <h2 className="text-lg text-center font-semibold">You have Custom GPTs Created yet</h2>
              <p>A custom GPT is specialized version of the GPT model, tailored to address specific needs or tasks</p>
              <Link href="/app/plan/custom-gpts/new">
                <button className="bg-primary-green text-white h-14 px-6 rounded-xl sheen">Create new GPT</button>
              </Link>
            </div>
          ) : (
            customGpts.map(
              ({ description, icon, name, _id, show }, index) =>
                show && (
                  <Link href={`/app/plan/custom-gpts/gpt?custom_gpt_id=${_id}`}>
                    <div
                      key={index}
                      className="bg-white border border-[#E8E8E8] rounded-2xl p-4 hover:shadow-2xl hover:shadow-gray-200 cursor-pointer transition-all duration-300 flex items-center gap-5">
                      <Image src={icon} alt="" width={100} height={100} className="rounded-2xl w-[90px] h-[90px] object-cover" />
                      <div className="space-y-2">
                        <h1 className="text-lg font-semibold">{name}</h1>
                        <p className="text-primary-black text-opacity-50 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </Link>
                )
            )
          )}
        </div>
      </main>
    </Fragment>
  );
}

const SkeletonLoader: React.FC = () => {
  return (
    <ContentLoader speed={2} width="100%" height="80px" viewBox="0 0 600 80" backgroundColor="#f3f3f3" foregroundColor="#ecebeb" className="w-full">
      <rect x="0" y="0" rx="10" ry="10" width="70" height="70" />
      <rect x="90" y="10" rx="8" ry="8" width="350" height="15" />
      <rect x="90" y="35" rx="8" ry="8" width="420" height="15" />
    </ContentLoader>
  );
};
