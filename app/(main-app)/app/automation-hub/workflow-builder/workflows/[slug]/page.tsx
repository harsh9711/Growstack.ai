"use client";

import { ArrowBack } from "@/components/svgs";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import History from "./components/layout/History";
import Schedules from "./components/layout/Schedules";
import Run from "./components/layout/Run";
import { ALL_ROUTES } from "@/utils/constant";

const Page = () => {
  const [workflowId, setWorkflowId] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);
  const [workFlowData, setWorkFlowData] = useState<WorkFlowData>({
    name: "",
    actions: [],
    input_configs: [],
    output_configs: [],
    social_media_requirement: false,
    status: "",
    workflow_id: "",
  });
  const [tabs, setTabs] = useState(["Run", "History", "Schedules"]);
  const [runnerId, setRunnerId] = useState("");

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setDistanceFromLeft(percentage);
  }, [tabQueryParam, tabs]);

  useEffect(() => {
    const id = searchParams.get("workflow_id");
    if (id) {
      setWorkflowId(id);
      fetchWorkflowData(id);
    }
  }, [searchParams]);
  const handleTabChange = (RunnerId: any) => {
    setRunnerId(RunnerId);
    handleTabClick(1);
  };
  useEffect(() => {
    if (!workFlowData.social_media_requirement) {
      setTabs(["Run", "History"]);
      if (selectedTabIndex === 2) {
        setSelectedTabIndex(0);
      }
    } else {
      setTabs(["Run", "History", "Schedules"]);
    }
  }, [workFlowData]);

  const fetchWorkflowData = async (id: string) => {
    try {
      const response = await instance.get(`${API_URL}/workflow/api/v1/${id}`);
      setWorkFlowData(response.data.data);
    } catch (error) {}
  };

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    router.push(`?${params.toString()}`);
  };

  const renderContent = (selectedTabIndex: number) => {
    switch (selectedTabIndex) {
      case 0:
        return (
          <Run
            onTabChange={(runnerId: any) => handleTabChange(runnerId)}
            workflowId={workflowId}
          />
        );
      case 1:
        return <History runnerId={runnerId} workflowId={workflowId} />;
      case 2:
        return <Schedules workflowId={workflowId} />;
      default:
        return (
          <Run
            onTabChange={(runnerId: any) => handleTabChange(runnerId)}
            workflowId={workflowId}
          />
        );
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-3">
        <Link href={ALL_ROUTES.WORKFLOW_BUILDER}>
          <button className="text-[#212833] hover:bg-primary-green/10 sheen flex gap-2 px-3.5 py-2 rounded-full font-medium items-center">
            <ArrowBack />
            <h2 className="text-md font-medium">Back / {workFlowData.name}</h2>
          </button>
        </Link>
        <div className="flex justify-center">
          <div className="w-full max-w-[320px]">
            <div className="w-full flex relative">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`w-full h-[40px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                    selectedTabIndex === index
                      ? "!text-primary-green"
                      : "!text-primary-grey"
                  }`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab}
                </div>
              ))}
              <div
                className="absolute bottom-0 h-[40px] bg-gray-100 custom-transition rounded-lg"
                style={{
                  left: `calc(${tabDistanceFromLeft}%)`,
                  width: `${100 / tabs.length}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div />
      </div>
      <div>
        <div className="mt-5">{renderContent(selectedTabIndex)}</div>
      </div>
    </div>
  );
};

export default Page;
