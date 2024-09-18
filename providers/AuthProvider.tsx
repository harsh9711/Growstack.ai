"use client";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import { RootState } from "@/lib/store";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { UserPlan } from "@/types/common";
import { setPlanLoading, setUserPlan } from "@/lib/features/auth/auth.slice";
import GlobalModal from "@/components/modal/global.modal";
import Link from "next/link";
import Lock from "@/components/svgs/lock";
import { hasAccessToRoute, planIdsMap } from "@/lib/utils";
import { ALL_ROUTES } from "@/utils/constant";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!getCookie("token");
  const { user, currentPlan, isCurrentPlanFetching } = useSelector((rootState: RootState) => rootState.auth);

  const isSubscribed = user?.isSubscribed || false;
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();


  const fetchPlanUsage = async () => {
    try {
      dispatch(setPlanLoading(true));
      const response = (await instance.get(`${API_URL}/users/api/v1/plan-usage`)).data;
      const userCurrentPlan: UserPlan = response.data;
      dispatch(setUserPlan(userCurrentPlan));
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error fetching plan usage:', error);
    } finally {
      dispatch(setPlanLoading(false));
    }
  };


  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    if (!currentPlan) {
      return;
    }


    if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      (!isSubscribed && !planIdsMap.BASIC.some((val) => val === currentPlan.plan_id))
    ) {
      console.log("You need a subscription to view this page!");
      router.push("/Payment");
    } else if (isLoggedIn && pathname === "/auth/login") {
      router.push("/app");
    }
  }, [isLoggedIn, isSubscribed, pathname, router, currentPlan]);


  useEffect(() => {
    if (isLoggedIn && currentPlan) {
      const hasAccess = hasAccessToRoute(currentPlan.usage, pathname);
      if (!hasAccess) {
        setIsAddOnModalOpen(true);
      } else {
        setIsAddOnModalOpen(false);
      }
    }
  }, [isLoggedIn, user, pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlanUsage();
    }
  }, [isLoggedIn]);

  if (isCurrentPlanFetching || !isLoggedIn) {
    return <Spinner />;
  }


  return (<>
    {children}
    <GlobalModal showCloseButton={false} disableCloseOnOverlayClick={true} open={isAddOnModalOpen} setOpen={() => { setIsAddOnModalOpen(false) }}>
      <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
        <Lock />
        <h3 className="text-center text-[28px] font-semibold">Upgrade Required</h3>
        <p className="text-center text-gray-700 text-sm md:text-base px-4">
          This feature is not included in your current plan. To access it, please upgrade your plan. Choose a plan that fits your needs and unlock this feature!
        </p>
        <div className="flex items-center justify-between gap-3">
          <button
            className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-6 rounded-md transition duration-300"
            onClick={() => router.back()}
          >
            Go back
          </button>
          <Link
            className="bg-primary-green text-white text-nowrap py-2 px-6 rounded-md transition duration-300 hover:bg-green-600"
            href={isSubscribed ? ALL_ROUTES.UPGRADE : ALL_ROUTES.PAYMENT}>
            Upgrade Plan
          </Link>
        </div>
      </div>
    </GlobalModal>
  </>);
};

export default AuthProvider;
