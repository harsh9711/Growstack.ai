"use client";
import OverviewSection from "./sections/OverViewSection";
import React, { useEffect, useState } from "react";
import instance from "@/config/axios.config";
import toast from "react-hot-toast";
import "../../../../../styles/loading.css";
import AddCreditDialog from "./components/AddCreditDialog";
import Motion from "@/components/Motion";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";
import { API_URL } from "@/lib/api";
// import { BillHistory } from "@/types/billHistory";
import clsx from "clsx";
import { PlanUsage } from "@/types/common";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DollarSign } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Spinner from "@/components/Spinner";
import { PlanIcon } from "@/components/svgs";
import { getUserFriendlyPlanName, planIdsMap } from "@/lib/utils";
import { PlanName } from "@/types/enums";
import GlobalModal from "@/components/modal/global.modal";
import UpgradePlan from "@/components/upgradePlan/upgradePlan";
import { useRouter } from "next/navigation";
import { ALL_ROUTES } from "@/utils/constant";

interface BillingHistoryItem {
  amount: ReactNode;
  payment_id: ReactNode;
  updatedAt: string | number | Date;
  plan_id: string;
  status: string;
  created_at: string;
  invoice: string;
}

const OverViewSection = () => {
  const { currentPlan } = useSelector((rootState: RootState) => rootState.auth);
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false); // Add state for cancel button loading
  const [isCreditLoading, setIsCreditLoading] = useState<boolean>(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState<boolean>(false);
  const [isCreditInputDialogBoxOpen, setIsCreditInputDialogBoxOpen] =
    useState<boolean>(false);
  const [amount, setAmount] = useState<number | "">(0);
  const [isAmountError, setIsAmountError] = useState(false);

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreditClick = async () => {
    if (Number(amount) < 5 || Number(amount) > 100) {
      toast.error("Please enter an amount between $5 and $100.");
      return;
    }

    try {
      setIsCreditLoading(true);
      const product = {
        plan_id: planUsage?.plan_id,
        plan_type: planUsage?.plan_type,
        subscription_id: planUsage?.stripe_subscription_id,
        amount: amount,
      };
      const currentPath = localStorage.getItem("currentPathname");
      const response = await instance.post(
        `${API_URL}/users/api/v1/payments/adds-on?currentPath=${currentPath}`,
        { product, currency: "usd" }
      );
      window.location.href = response.data.url;
      toast.success("Payment added successfully");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error adding payment:", error);
    } finally {
      setIsCreditLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    try {
      const response = await instance.put(
        `${API_URL}/users/api/v1/payments/cancel-subscription`
      );
      toast.success("Subscription canceled successfully");
      window.location.href = "/Payment";
      console.log("Cancel Subscription Response:", response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error cancelling subscription:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-card">
          <div className="card-chip"></div>
          <div className="card-lines">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="card-wave"></div>
        </div>
        <p>Showing your credits...</p>
      </div>
    );
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAmountError(false);
    const value = e.target.value;
    const numberValue = Number(value);
    setAmount(value === "" ? "" : numberValue);
    if (value !== "" && !(numberValue >= 5 && numberValue <= 100)) {
      setIsAmountError(true);
    }
  };

  const closeInputDialogModal = () => {
    setIsCreditInputDialogBoxOpen(false);
  };

  return (
    <Motion
      transition={{ duration: 0.5 }}
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
    >
      <div className="mt-10 flex items-center justify-between">
        <div className="space-y-2">
          <h2 className="text-primary-black text-opacity-50">Credit balance</h2>
          <div className=" flex gap-3 items-center">
            <div className="flex flex-col">
            <h1 className="text-4xl font-semibold">
              <strong>Tokens : </strong> {planUsage?.usage_amount ? planUsage.usage_amount * 100 : 0}
            </h1>
            </div>
        

            <button
              className={`w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-[#2DA771] text-white sheen transition-all duration-300 ${isCreditLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={() => {
                const isBasicPlan = planIdsMap[PlanName.AI_ESSENTIALS].some(
                  val => val === currentPlan?.plan_id
                );

                if (isBasicPlan) {
                  setIsUpgradeModalOpen(true);
                } else {
                  setIsCreditInputDialogBoxOpen(true);
                }
              }}
              disabled={isCreditLoading}
            >
              Add Credit
            </button>
          </div>
        </div>
        <Dialog
          open={isCreditInputDialogBoxOpen}
          onOpenChange={closeInputDialogModal}
        >
          <DialogContent className="max-w-[584px]">
            <DialogHeader>
              <DialogTitle>Add to credit balance</DialogTitle>
           
            </DialogHeader>
            <div>
              <div className="space-y-2 mt-3">
                <div className="flex">
                <label className="font-semibold">Amount to add</label>

                <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={21}
                    className="ml-2 text-primary-black text-opacity-50 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-white">
                  <p>1$ = 100 <strong>Tokens</strong></p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
                </div>
                <div className="border border-[#2DA771] rounded-xl p-2 flex items-center gap-2">
                  <DollarSign className="text-primary-green" />
                  <input
                    type="number"
                    className="h-10 w-full"
                    value={amount === "" ? "" : amount}
                    onChange={handleAmountChange}
                  />
                </div>
                <p
                  className={` text-opacity-50 ${isAmountError ? "text-destructive" : "text-primary-black"
                    }`}
                >
                  Enter an amount between <span>$</span>5 and <span>$</span>100
                </p>
              </div>
              <button
                className="w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-[#2DA771] text-white sheen transition-all duration-300 mt-5"
                onClick={handleCreditClick}
              >
                {isCreditLoading ? "Redirecting..." : "Add Amount"}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <GlobalModal
          showCloseButton
          open={isUpgradeModalOpen}
          setOpen={() => {
            setIsUpgradeModalOpen(false);
          }}
        >
          <UpgradePlan />
        </GlobalModal>
      </div>
    </Motion>
  );
};

export default function SettingsPage() {
  const { user, currentPlan, isCurrentPlanFetching } = useSelector(
    (rootState: RootState) => rootState.auth
  );
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const router = useRouter();
  const tabs = ["Overview", "Billing history"];
  // const renderContent = () => {
  //   switch (selectedTabIndex) {
  //     case 0:
  //       return <OverviewSection />;
  //     case 1:
  //       return <BillingHistorySection />;
  //   }
  // };
  const [planUsage, setPlanUsage] = useState<PlanUsage | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cancelLoading, setCancelLoading] = useState<boolean>(false); // Add state for cancel button loading

  const fetchPlanUsage = async () => {
    try {
      const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
      const data: PlanUsage = response.data.data;
      setPlanUsage(data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    setCancelLoading(true);
    try {
      const response = await instance.put(
        `${API_URL}/users/api/v1/payments/cancel-subscription`
      );
      await fetchPlanUsage();
      toast.success("Subscription canceled successfully");
      router.push(ALL_ROUTES.APP);
      console.log("Cancel Subscription Response:", response.data);
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error cancelling subscription:", error);
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanUsage();
  }, []);

  return (
    <main>
      <div className="flex w-full justify-between ">
        <h1 className="text-2xl font-semibold">Billing</h1>
        {!isCurrentPlanFetching || !currentPlan ? (
          <>
            <div className="flex gap-x-2 items-center">
              <PlanIcon />
              {getUserFriendlyPlanName(currentPlan?.plan_name as PlanName)} Plan
              ({currentPlan?.plan_type})
            </div>
          </>
        ) : (
          <Spinner color="#000" />
        )}
      </div>
      <div className="flex flex-wrap gap-10 justify-between pb-6">
        <div className="space-y-3">
          <p className="text-primary-black text-opacity-50">
            We believe Growstack should be accessible to all companies, no
            matter the Size
          </p>
        </div>{" "}
        <div className="flex flex-row gap-x-6 items-end">
          <AddCreditDialog />
          {user?.isSubscribed && !planUsage?.isFreeCouponApplied && (
            <button
              className={`w-full max-w-fit h-12 px-4 py-3 rounded-xl flex gap-3 bg-white border-red-500 border hover:font-semibold hover:border-2 text-red-500 sheen transition-all duration-300 ${cancelLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              onClick={handleCancelSubscription}
              disabled={cancelLoading}
            >
              {cancelLoading ? "Canceling..." : "Cancel Subscription"}
            </button>
          )}
        </div>
        {/* <div className="w-full max-w-[320px] bg-white shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
          <div className="w-full flex relative">
            {tabs.map((tab, index) => (
              <div
                key={index}
                className={`w-full h-[48px] flex gap-x-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                  selectedTabIndex === index ? "!text-white" : "!text-primary-grey"
                }`}
                onClick={() => {
                  const totalTabs = tabs.length;
                  const percentage = (index / totalTabs) * 100;
                  setSelectedTabIndex(index);
                  setTabUnderlineLeft(percentage);
                }}>
                {tab}
              </div>
            ))}
            <div
              className="absolute bottom-0 h-[48px] bg-primary-green custom-transition rounded-lg"
              style={{ left: `calc(${tabUnderlineLeft}%)`, width: `${100 / tabs.length}%` }}></div>
          </div>
        </div> */}
      </div>
      {/* {renderContent()} */}
      <OverViewSection />
    </main>
  );
}
