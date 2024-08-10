"use client";

import { Fragment, useEffect, useState } from "react";
import ContactsTable from "./components/ContactsTable";

import { useRouter, useSearchParams } from "next/navigation";
import ProspectsTable from "./components/ProspectsTable";

export default function ContactsDashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");

  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);
  const tabs = ["Smart list", "Prospects"];

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setDistanceFromLeft(percentage);
  }, [tabQueryParam]);

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    router.push(`?${params.toString()}`);
  };

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <ContactsTable />;
      case 1:
        return <ProspectsTable />;
      // case 2:
      //   return <RestoreTable />;
      // case 3:
      //   return <TasksTable />;
      // case 4:
      //   return <CompanyTable />;
    }
  };
  const renderTitle = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">All contacts</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Create and manage all of your customers and leads at one place
            </p>
          </Fragment>
        );
      case 1:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Prospects</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Create and manage all of your customers and leads at one place
            </p>
          </Fragment>
        );
      // case 2:
      //   return (
      //     <Fragment>
      //       <h1 className="text-2xl font-semibold">Restored</h1>
      //       <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
      //         Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
      //         ultricies accumsan. Nec.{" "}
      //       </p>
      //     </Fragment>
      //   );
      // case 3:
      //   return (
      //     <Fragment>
      //       <h1 className="text-2xl font-semibold">Tasks list</h1>
      //       <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
      //         Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
      //         ultricies accumsan. Nec.{" "}
      //       </p>
      //     </Fragment>
      //   );
      // case 4:
      //   return (
      //     <Fragment>
      //       <h1 className="text-2xl font-semibold">Company</h1>
      //       <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
      //         Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
      //         ultricies accumsan. Nec.{" "}
      //       </p>
      //     </Fragment>
      //   );
    }
  };

  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">{renderTitle(selectedTabIndex)}</div>
          <div className="w-full flex items-center justify-end gap-3">
            <div className="w-full max-w-md bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                    }`}
                    onClick={() => handleTabClick(index)}>
                    {tab}
                  </div>
                ))}

                <div
                  className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                  style={{
                    left: `calc(${tabDistanceFromLeft}%)`,
                    width: `${100 / tabs.length}%`,
                  }}></div>
              </div>
            </div>
            {/* <Link href="/app/engage/contacts/settings">
              <button className="border Fborder-[#EBEBEB] rounded-lg p-3 hover:bg-primary-light-gray text-primary-black">
                <SettingsIcon size={20} />
              </button>
            </Link> */}
          </div>
        </div>

        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </main>
    </Fragment>
  );
}
