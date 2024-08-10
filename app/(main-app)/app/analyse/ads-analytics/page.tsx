import { DollarExachangeIcon } from "@/components/svgs";
import { ArrowRight, Eye, Search, TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { Fragment } from "react";
import { BsEye } from "react-icons/bs";
import { PiCursor } from "react-icons/pi";
import AdsGraph from "./components/AdGraph";
import AnalyticsGraph from "./components/AnalyticsGraph";
import CostGraph from "./components/CostGraph";

export default function AdsAnalyticsPage() {
  return (
    <Fragment>
      <main className="">
        <h1 className="text-2xl font-semibold mt-6">Social media analytics</h1>
        <div className="flex items-start mt-6 gap-5">
          <div className="w-full max-w-[540px] space-y-5 !bg-white shadow-box p-8 rounded-2xl">
            <h1 className="text-xl font-semibold pb-4 border-b border-primary-black/10">Platforms</h1>
            <div className="bg-[#F2F2F2] px-4 py-1 rounded-xl flex gap-3 items-center w-full">
              <Search className="text-gray-500" size={20} />
              <input type="search" className="outline-none h-[40px] w-full bg-transparent" placeholder="Search" />
            </div>
            <div className="space-y-3">
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-facebook.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Facebook Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-instagram.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Instagram Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-linkedin.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Linkedin Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-tumblr.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Tumblr Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>

              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-twitter.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Twitter Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>

              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-reddit.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Reddit Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-pinterest.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Pinterest Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-gmb.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Google my business Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <Image src="/assets/brand-blogger.png" alt="" width={50} height={50} />
                  <h2 className="font-medium text-[16px]">Blogger Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>

              <div className="group bg-white border border-[#F3F3F3] rounded-xl p-3 flex justify-between gap-4 items-center cursor-pointer transition duration-300 hover:shadow-xl hover:shadow-gray-100">
                <div className="flex gap-4 items-center">
                  <div className="bg-[#F0F0F0] rounded-lg p-3">
                    <Image src="/assets/brand-google-ads.png" alt="" width={30} height={30} />
                  </div>
                  <h2 className="font-medium text-[16px]">Google Ads</h2>
                </div>
                <button className="p-2 hover:bg-[#f2f2f2] rounded-lg transition">
                  <ArrowRight className="text-gray-400 group-hover:text-primary-green transition-all duration-300" />
                </button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-5">
              <div className="relative w-full !bg-white shadow-box p-5 rounded-2xl border border-[#EBEBEB]">
                <div className="space-y-3">
                  <p className="text-[15px] text-primary-black text-opacity-50">Followers</p>
                  <h1 className="text-3xl font-semibold">20,226</h1>
                  <div className="flex gap-2">
                    <TrendingUp className="text-[#00B69B]" />
                    <span className="text-[#00B69B] font-semibold">8.5% </span>
                    Up from yesterday
                  </div>
                  <div className="h-16">
                    <AnalyticsGraph color="#034737" />
                  </div>
                </div>
                <Eye size={40} className="text-primary-green absolute top-4 right-6" />
              </div>
              <div className="relative w-full !bg-white shadow-box p-5 rounded-2xl border border-[#EBEBEB]">
                <div className="space-y-3">
                  <p className="text-[15px] text-primary-black text-opacity-50">Account reached</p>
                  <h1 className="text-3xl font-semibold">49,612</h1>
                  <div className="flex gap-2">
                    <TrendingDown className="text-[#F93C65]" />
                    <span className="text-[#F93C65] font-semibold">4.2% </span>
                    Down from yesterday
                  </div>
                  <div className="h-16">
                    <AnalyticsGraph color="#CF0000" />
                  </div>
                </div>
                <DollarExachangeIcon className="text-primary-green absolute top-4 right-6" />
              </div>
            </div>
            <div className="mt-6 relative w-full !bg-white shadow-box p-7 rounded-2xl border border-[#EBEBEB]">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Cost per reach vs cost per impression</h1>
                <div className="flex items-center gap-6">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-green" />
                    <span>Cost per reach</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#248D74]" />
                    <span>Cost per impression</span>
                  </p>
                </div>
              </div>
              <div className="h-[500px] mt-8">
                <CostGraph />
              </div>
            </div>
            <div className="flex gap-5 w-full mt-5">
              <div className="relative w-full !bg-white shadow-box p-5 rounded-2xl border border-[#EBEBEB]">
                <div className="flex justify-between">
                  <h1 className="text-xl font-semibold">Lead by date</h1>
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary-green" />
                    <span>Active users</span>
                  </p>
                </div>
                <div className="h-80 w-full mt-6">
                  <AdsGraph />
                </div>
              </div>
              <div className="relative w-full !bg-white shadow-box p-5 rounded-2xl border border-[#EBEBEB] space-y-3">
                <h1 className="text-xl font-semibold">Top performing Ad</h1>
                <Image src="/dummy/facebook-ad.png" alt="" width={800} height={800} className="max-h-[560px]" />
                <div className="flex divide-x-2 divide-primary-green !mt-7">
                  <div className="w-full flex justify-center items-center gap-2 text-primary-green text-lg">
                    <BsEye size={25} />
                    14,932
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 text-primary-green text-lg">
                    <PiCursor size={25} />
                    14,932
                  </div>
                  <div className="w-full flex justify-center items-center gap-2 text-primary-green text-lg">
                    <BsEye size={25} />
                    14,932
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
