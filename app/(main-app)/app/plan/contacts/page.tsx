"use client";

import { SettingsIcon } from "lucide-react";
import { Fragment, useState } from "react";
import BulkActionsTable from "./components/BulkActionsTable";
import CompanyTable from "./components/CompanyTable";
import ContactsTable from "./components/ContactsTable";
import RestoreTable from "./components/RestoreTable";
import TasksTable from "./components/TasksTable";
import Link from "next/link";
import { CiCirclePlus } from "react-icons/ci";
import Prospects from "./components/ProspectsTable";

export default function ContactsDashboard() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabs = ["Smart list ", "Restore", "Prospects"];

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <ContactsTable />;

      case 1:
        return <RestoreTable />;

      case 2:
        return <Prospects />;
    }
  };
  const renderTitle = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">All contacts</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );

      case 1:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Restored</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
      case 2:
        return (
          <Fragment>
            <h1 className="text-2xl font-semibold">Prospects</h1>
            <p className="flex items-center gap-2 text-[#3D3D3D] text-opacity-50 text-[15px]">
              Lorem ipsum dolor sit amet consectetur. Vitae leo amet aliquam
              ultricies accumsan. Nec.{" "}
            </p>
          </Fragment>
        );
    }
  };
  return (
    <Fragment>
      <main className="">
        <div className="flex justify-between items-center mt-8">
          <div className="space-y-2 w-full">
            {renderTitle(selectedTabIndex)}
          </div>
          <div className="w-full flex items-center justify-end gap-3">
            <div className="w-full max-w-[620px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index
                        ? "!text-white"
                        : "!text-primary-grey"
                    }`}
                    onClick={() => {
                      const totalTabs = tabs.length;
                      const percentage = (index / totalTabs) * 100;
                      setSelectedTabIndex(index);
                      setTabUnderlineLeft(percentage);
                    }}
                  >
                    {tab}
                  </div>
                ))}

                <div
                  className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
                  style={{
                    left: `calc(${tabUnderlineLeft}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                ></div>
              </div>
            </div>
            {/* <Link href="/app/plan/contacts/settings">
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
