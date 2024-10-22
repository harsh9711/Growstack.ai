import Motion from "@/components/Motion";
import { TagIcon, WidgetIcon } from "@/components/svgs";
import { SettingsIcon } from "lucide-react";
import Image from "next/image";

const Sidebar = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (value: string) => void;
}) => {
  const renderContent = () => {
    switch (selectedTab) {
      case "Widgets":
        return <Widgets />;
      case "Tags":
        return <Tags />;
      case "Settings":
        return <Settings />;
    }
  };
  return (
    <div className="flex flex-col w-full max-w-[380px]">
      <div className="flex justify-between w-full">
        <button
          className={`p-4 flex items-center gap-2 transition-all duration-300 ${selectedTab === "Widgets" ? "text-primary-green" : "text-primary-grey"}`}
          onClick={() => setSelectedTab("Widgets")}
        >
          <WidgetIcon />
          Widgets
        </button>
        <button
          className={`p-4 flex items-center gap-2 transition-all duration-300 ${selectedTab === "Tags" ? "text-primary-green" : "text-primary-grey"}`}
          onClick={() => setSelectedTab("Tags")}
        >
          <TagIcon />
          Tags
        </button>
        <button
          className={`p-4 flex items-center gap-2 transition-all duration-300 ${selectedTab === "Settings" ? "text-primary-green" : "text-primary-grey"}`}
          onClick={() => setSelectedTab("Settings")}
        >
          <SettingsIcon />
          Settings
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default Sidebar;

const Widgets = () => {
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="bg-primary-green px-4 py-2.5 text-white text-sm">
        General
      </div>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4">
          {Array(20)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="bg-white border p-4 rounded-lg flex flex-col justify-center items-center gap-2"
              >
                <Image
                  src="/assets/widgets/rss.svg"
                  alt=""
                  width={50}
                  height={50}
                />
                <span className="text-[16px] font-medium">RSS</span>
              </div>
            ))}
        </div>
      </div>
    </Motion>
  );
};

const Tags = () => {
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="p-3">
        <div className="space-y-2 divide-y divide-gray-100">
          {Array(13)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex justify-between p-2 items-center"
              >
                <span>CONTACT_FIRST_NAME</span>
                <button className="text-primary-green hover:bg-primary-green hover:text-white py-2 px-3 rounded-full transition-all duration-300 text-sm">
                  Copy
                </button>
              </div>
            ))}
        </div>
      </div>
    </Motion>
  );
};

const Settings = () => {
  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div>Settings</div>
    </Motion>
  );
};
