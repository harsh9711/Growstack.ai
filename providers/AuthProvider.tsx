"use client";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteCookie, getCookie } from "cookies-next";
import { RootState } from "@/lib/store";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { UserPlan } from "@/types/common";
import { setPlanLoading, setUserPlan, login, setUserLoading, logout } from "@/lib/features/auth/auth.slice"; // Import login action
import GlobalModal from "@/components/modal/global.modal";
import Link from "next/link";
import Lock from "@/components/svgs/lock";
import { hasAccessToRoute, planIdsMap } from "@/lib/utils";
import { ALL_ROUTES } from "@/utils/constant";
import Spinner2 from "@/components/Spinner2/Spinner2";
import UpgradePlan from "@/components/upgradePlan/upgradePlan";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!getCookie("token");
  const { user, currentPlan, isUserFetching, isCurrentPlanFetching } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const isSubscribed = user?.isSubscribed || false;
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const fetchPlanUsage = async () => {
    try {
      dispatch(setPlanLoading(true));
      const response = (await instance.get(`${API_URL}/users/api/v1/plan-usage`))
        .data;
      const userCurrentPlan: UserPlan = response.data
      dispatch(setUserPlan(userCurrentPlan));
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching plan usage:", error);
    } finally {
      dispatch(setPlanLoading(false));
    }
  };

  const handleLogout = () => {
    deleteCookie("token");
    localStorage.clear();
    dispatch(logout());
    router.push("/auth/login");
  };

  const fetchUserProfile = async () => {
    try {
      dispatch(setUserLoading(true));
      const response = await instance.get(`${API_URL}/users/api/v1`);
      const userData = response.data.data;
      dispatch(login(userData));
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleLogout();
          toast.error("Session expired. Please log in again.");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(error.message);
      }
      console.error("Error fetching user profile:", error);
    } finally {
      dispatch(setUserLoading(false));
    }
  };


  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    fetchUserProfile();

    if (!currentPlan) {
      return;
    }

    if (isUserFetching) {
      return;
    }

    if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      (!isSubscribed &&
        !planIdsMap.BASIC.some((val) => val === currentPlan.plan_id))
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
    return <Spinner2 />;
  }

  return (
    <>
      {children}
      <GlobalModal
        showCloseButton={false}
        disableCloseOnOverlayClick={true}
        open={isAddOnModalOpen}
        setOpen={() => {
          setIsAddOnModalOpen(false);
        }}
      >
        <UpgradePlan />
      </GlobalModal>
    </>
  );
};

export default AuthProvider;
