"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContactsTable from "./MonthlyCard";
import ProspectsTable from "./YearlyCard";
import "../../../styles/myanimation.css";

const Pricing = () => {
  const tabs = ["Monthly billing", "Yearly billing"];
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);

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
    history.replaceState(null, "", `?${params.toString()}`);
    setSelectedTabIndex(index);
  };

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return <ContactsTable />;
      case 1:
        return <ProspectsTable />;
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        className="absolute -translate-y-96 translate-x-64"
        width="31"
        height="56"
        viewBox="0 0 31 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="arrow-path"
          d="M22.2579 49.62L20.9666 50.1513C23.5384 47.8123 26.0597 45.3914 26.9537 41.8855C28.2309 36.8994 24.7454 32.5244 20.5544 30.3342C18.1275 29.0681 15.4788 28.338 12.9036 27.467C10.8697 26.7827 6.54029 25.5681 7.05045 22.6331C7.27084 21.3986 8.18761 20.2689 8.94041 19.3161C9.82447 18.1923 10.8262 17.1669 11.8043 16.1276C13.2849 14.5549 14.9236 12.7089 15.0982 10.4298C15.2994 7.82312 13.1837 5.78917 11.0606 4.68703C8.69155 3.46611 6.09722 3.05642 3.50228 3.58248L3.62063 4.47189C5.9968 4.33373 8.44344 4.75704 10.5429 5.95216C12.7791 7.23186 14.6972 9.4661 13.1075 12.0383C11.8392 14.094 9.72022 15.6186 8.1185 17.3999C6.74863 18.9168 5.14882 20.8651 5.13476 23.0404C5.10242 27.8542 12.0349 29.1064 15.4468 30.2438C19.7252 31.6627 25.5952 34.3957 25.524 39.8003C25.4865 42.4526 23.8919 44.772 22.1902 46.6495C21.0556 47.904 19.8661 49.0924 18.7183 50.3188L19.1585 48.7856C19.3019 47.9993 18.1377 47.353 17.7713 48.2022C17.1348 49.6637 16.5888 51.1646 15.9687 52.6337C15.5742 53.5594 16.4088 54.5108 17.3561 54.0281C19.2046 53.0929 21.1645 52.3392 22.9784 51.3497C23.888 50.8542 23.2684 49.2881 22.2579 49.62Z"
          fill="#034737"
        />
      </svg>

      <div className="w-full flex flex-col gap-y-6 items-center justify-center">
        <div className="max-w-[400px]">
          <p className="tracking-normal w-full text-[16px] font-medium text-center">
            GrowStack plans & pricing are designed to meet your needs as you
            grow
          </p>
        </div>
        <div className="w-full max-w-md flex gap-2 justify-center mx-auto item-center bg-[#034737] shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
          <div className="w-full flex relative">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${selectedTabIndex === index
                  ? "!text-[#034737] font-semibold"
                  : "!text-white"
                  }`}
                onClick={() => handleTabClick(index)}
              >
                {tab}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-white custom-transition rounded-xl"
              style={{
                left: `calc(${tabDistanceFromLeft}%)`,
                width: `${100 / tabs.length}%`,
              }}
            ></div>
          </div>
          <h2
            className="text-white mt-3.5 text-center w-full max-w-[100px] transition-opacity duration-300"
            style={{
              opacity: selectedTabIndex === 1 ? 1 : 0.3,
            }}
          >
            (2 Months Free)
          </h2>
        </div>
        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </div>
    </div>
  );
};

export default Pricing;
