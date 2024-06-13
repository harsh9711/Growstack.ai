import { Plus, Search, Settings, X } from "lucide-react";
import { Fragment } from "react";
import BulkDialog from "./components/BulkDialog";
import Link from "next/link";

export default function WebScapping() {
  return (
    <Fragment>
      <div className="flex flex-col h-full flex-1">
        <div className="mt-8">
          <div className="space-y-2 w-full">
            <h1 className="text-2xl font-semibold">Web scraping</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">Google my business scraping tool </p>
          </div>
          <section className="bg-primary-green p-10 rounded-3xl mt-4 text-white">
            <h1 className="text-xl font-semibold">Search Terms</h1>
            <div className="flex items-center gap-4 mt-5">
              <span className="text-lg font-semibold">1.</span>
              <input type="text" className="h-12 bg-[#F2F2F2] rounded-xl px-5 w-full" placeholder="Restaurants" />
              <button className="bg-[#F2F2F2] p-3 rounded-full grid place-content-center">
                <X className="text-[#FF0000]" />
              </button>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-lg font-semibold">2.</span>
              <input type="text" className="h-12 bg-[#F2F2F2] rounded-xl px-5 w-full" placeholder="Search terms" />
              <button className="bg-[#F2F2F2] p-3 rounded-full grid place-content-center">
                <X className="text-[#FF0000]" />
              </button>
            </div>
            <div className="flex justify-between mt-6 ml-7 mr-16">
              <button className="bg-white h-12 px-7 rounded-xl text-primary-green flex items-center gap-3 font-medium">
                <Settings size={23} />
                Advance settings
              </button>
              <div className="flex items-center gap-4">
                <BulkDialog />
                <button className="bg-white h-12 px-8 rounded-xl text-primary-green flex items-center gap-3 font-medium">
                  <Plus size={23} />
                  Add field
                </button>
              </div>
            </div>
          </section>
          <section className="mt-8 space-y-2">
            <p className="font-medium">Location</p>
            <div className="bg-[#F2F2F2] border border-[#E4E4E4] py-2 pl-5 pr-2 flex items-center gap-4 rounded-xl focus-within:border-gray-300">
              <Search className="text-primary-green" />
              <input className="h-10 bg-transparent w-full" value="Kansas City, MO" />
              <Link href="/app/plan/web-scraping/add-prospect" className="w-full max-w-fit">
                <button className="flex items-center gap-3 hover:bg-primary-green/10 sheen min-w-fit py-3 px-4 rounded-lg transition-all duration-300">
                  <Search className="text-primary-green" />
                  Add prospect manually
                </button>
              </Link>
            </div>
          </section>
          <div className="mt-8">
            <iframe
              width="100%"
              height="600"
              src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=London+(Webbuddy)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
              <a href="https://www.maps.ie/">Webbuddy</a>
            </iframe>
          </div>
          <div className="flex justify-center mt-10">
            <button className="bg-primary-green h-14 text-white sheen w-full max-w-[200px] mx-auto rounded-xl">Save & Start</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
