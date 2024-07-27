"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";

type CustomGpt = {
  description: string;
  icon: string;
  name: string;
  _id: string;
  show: boolean;
};


export default function Customgpts() {
  const [customGpts, setCustomGpts] = useState<CustomGpt[]>([]);

  const getCustomGpts = async () => {
    try {
      const {
        data: { data },
      } = await instance.get(`${API_URL}/ai/api/v1/customgpt`);

      setCustomGpts(data.map((d: any) => ({ ...d, show: true })));
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    try {
      getCustomGpts();
    } catch (error: any) {
      console.error(error);
    }
  }, []);

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">AI custom GPT</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              All custom GPTs apps
            </p>
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
          {customGpts.map(
            ({ description, icon, name, _id, show }, index) =>
              show && (
                <Link href={`/app/plan/custom-gpts/gpt?custom_gpt_id=${_id}`}>
                  <div
                    key={index}
                    className="bg-white border border-[#E8E8E8] rounded-2xl p-6 hover:shadow-2xl hover:shadow-gray-200 cursor-pointer transition-all duration-300 flex items-center gap-5"
                  >
                <Image
                  src={icon}
                  alt=""
                  width={90}
                  height={90}
                  className="rounded-xl"
                />
                    <div className="space-y-2">
                      <h1 className="text-lg font-semibold">{name}</h1>
                      <p className="text-primary-black text-opacity-50 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </Link>
          ))}
        </div>
      </main>
    </Fragment>
  );
}
