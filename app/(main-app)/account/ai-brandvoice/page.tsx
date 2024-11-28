"use client";
import React, { useState, useEffect } from "react";
import DocumentsTable from "./DocumentsTable";
import { Plus, Search } from "lucide-react";
import CreateBrandVoice from "./components/createBrandVoice";
import toast from "react-hot-toast";
import SubscribePlan from "@/components/subscribePlan/subscribePlan";
import GlobalModal from "@/components/modal/global.modal";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function BrandVoice() {
  const { user, currentPlan } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(search);
  const [openCreateBrandVoice, setOpenCreateBrandVoice] = useState(false);
  const [triggerFetchingBrandVoice, setTriggerFetchingBrandVoice] =
    useState<number>(0);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] =
    useState<boolean>(false);
  const [totalBrandVoiceCount, setTotalBrandVoiceCount] = React.useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  // useEffect(() => {
  //   if (currentPlan?.plan_type === "FREE") {
  //     setIsSubscriptionModalOpen(true);
  //   }
  // }, [currentPlan]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleBrandVoiceCreation = () => {
    setTriggerFetchingBrandVoice(prev => prev + 1);
    setOpenCreateBrandVoice(false);
  };

  return (
    <div>
      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="align-top">
            <h1 className="text-2xl font-semibold">Brand voice</h1>
            <p style={{ opacity: "50%" }}>
              Choose different brand voices to use in various instances -
              ensuring consistency of your AI-generated content.
            </p>
            <div className="bg-white border border-[#EBEBEB] px-4 py-1 rounded-md flex gap-3 items-center w-[30%] mt-2 ">
              <Search className="text-gray-500" size={20} />
              <input
                type="search"
                className="outline-none h-[30px] w-full"
                placeholder="Search"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <button
            onClick={() => {
              if (totalBrandVoiceCount >= 2) {
                toast.error("Maximum 2 brand voice allowed.");
              } else if (currentPlan?.plan_type === "FREE") {
                setIsSubscriptionModalOpen(true);
              } else {
                setOpenCreateBrandVoice(true);
              }
            }}
            className="bg-[#2DA771] text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2"
          >
            <Plus size={20} />
            Create brand voice
          </button>
        </div>

        <div className="mt-5">
          <DocumentsTable
            triggerFetchingBrandVoice={triggerFetchingBrandVoice}
            search={debouncedSearch}
            setTotalBrandVoiceCount={setTotalBrandVoiceCount}
          />
        </div>
      </div>

      <CreateBrandVoice
        isOpen={openCreateBrandVoice}
        setIsOpen={setOpenCreateBrandVoice}
        onSuccess={handleBrandVoiceCreation}
      />

      {/* <GlobalModal
        showCloseButton
        open={isUpgradeModalOpen}
        setOpen={() => {
          setIsUpgradeModalOpen(false);
        }}
      >
        <UpgradePlan
          goBackHandler={() => {
            setIsUpgradeModalOpen(false);
          }}
        />
      </GlobalModal> */}
      <GlobalModal
        showCloseButton
        open={isSubscriptionModalOpen}
        setOpen={() => {
          setIsSubscriptionModalOpen(false);
        }}
      >
        <SubscribePlan
          goBackHandler={() => {
            setIsSubscriptionModalOpen(false);
          }}
        />
      </GlobalModal>
    </div>
  );
}
