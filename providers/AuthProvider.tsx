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
import { setUserPlan } from "@/lib/features/auth/auth.slice";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!getCookie("token");
  const user = useSelector((state: RootState) => state.auth.user);
  const isSubscribed = user?.isSubscribed || false;

  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  const fetchPlanUsage = async () => {
    try {
      const response = (await instance.get(`${API_URL}/users/api/v1/plan-usage`)).data;
      const userCurrentPlan: UserPlan = response.data;
      dispatch(setUserPlan(userCurrentPlan)); // Dispatch action to set user plan in Redux store
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error('Error fetching plan usage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (pathname !== "/auth/redirect" && !isLoggedIn) {
      router.push("/auth/login");
    } else if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      !isSubscribed
    ) {
      console.log("You need a subscription to view this page!");
      // toast.error("You need a subscription to view this page!");
      router.push("/Payment");
    } else if (isLoggedIn && isSubscribed && pathname === "/auth/login") {
      router.push("/app");
    }
  }, [isLoggedIn, isSubscribed, pathname, router]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchPlanUsage();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading || !isLoggedIn || !isSubscribed) {
    return <Spinner />;
  }

  return <>{children}</>;
};

export default AuthProvider;
