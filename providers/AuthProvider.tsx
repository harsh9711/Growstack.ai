"use client";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteCookie, getCookie } from "cookies-next";
import { persistor, RootState } from "@/lib/store";
import Spinner from "@/components/Spinner";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import { UserPlan } from "@/types/common";
import {
  setPlanLoading,
  setUserPlan,
  login,
  setUserLoading,
  setInitialized,
  logout,
} from "@/lib/features/auth/auth.slice"; // Import login action
import GlobalModal from "@/components/modal/global.modal";
import Link from "next/link";
import Lock from "@/components/svgs/lock";
import { hasAccessToRoute, isMobile, planIdsMap } from "@/lib/utils";
import { ALL_ROUTES } from "@/utils/constant";
import Spinner2 from "@/components/Spinner2/Spinner2";
import { PlanName } from "@/types/enums";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const {
    user,
    currentPlan,
    isUserFetching,
    isCurrentPlanFetching,
    isAuthenticated: isLoggedIn,
    initialized,
  } = useSelector((rootState: RootState) => rootState.auth);

  const init = async () => {
    const token = getCookie("token");
    if (token) {
      try {
        dispatch(setUserLoading(true));
        const response = await instance.get(`${API_URL}/users/api/v1`);
        const userData = response.data.data;
        dispatch(login(userData));
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
        localStorage.clear();
        dispatch(logout());
        deleteCookie("token");
        persistor.purge();
        console.error("Error fetching user profile:", error);
      } finally {
        dispatch(setUserLoading(false));
      }
    } else {
      localStorage.clear();
      dispatch(logout());
      persistor.purge();
    }
    dispatch(setInitialized(true));
  };

  useLayoutEffect(() => {
    init();
  }, []);

  const isSubscribed = user?.isSubscribed || false;
  const [isAddOnModalOpen, setIsAddOnModalOpen] = useState<boolean>(false);

  const fetchPlanUsage = async () => {
    try {
      dispatch(setPlanLoading(true));
      const response = (
        await instance.get(`${API_URL}/users/api/v1/plan-usage`)
      ).data;
      const userCurrentPlan: UserPlan = response.data;
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

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    if (!currentPlan) {
      return;
    }

    if (isUserFetching) {
      return;
    }

    if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      !isSubscribed &&
      user?.user_type !== "ADMIN" &&
      !planIdsMap[PlanName.AI_ESSENTIALS].some(
        val => val === currentPlan.plan_id
      )
    ) {
      console.log("You need a subscription to view this page!");
      router.push("/Payment");
    } else if (isLoggedIn && pathname === "/auth/login") {
      router.push("/app");
    }
  }, [isLoggedIn, isSubscribed, pathname, router, currentPlan]);

  useEffect(() => {
    if (isLoggedIn && currentPlan) {
      if (user?.user_type === "ADMIN") {
        return;
      }
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

  if (isCurrentPlanFetching || !initialized || !isLoggedIn) {
    return <Spinner2 />;
  }

  if (isMobile()) {
    return (
      <>
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6">
          <Lock />
          <h3 className="text-center mt-4 text-black  text-2xl font-bold mb-4">
            Mobile Access Restricted
          </h3>
          <p className="text-center text-sm md:text-base mb-6">
            This application is not accessible on mobile devices. Please switch
            to a laptop or desktop for the best experience.
          </p>
          <h3 className="text-center  text-black text-md font-bold mb-4">
            Mobile app coming soon
          </h3>
          <Link href="/" className="no-underline">
            <p className="text-center no-underline text-sm md:text-base mb-6">
              Go back{" "}
            </p>
          </Link>
          {/* <div className="flex  gap-4">
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/playStore.svg" alt="banner" />
                  </Link>
                  <Link href="/auth/register">
                    <img src="/images_growstack/banner/apple.svg" alt="banner" />
                  </Link> 
              </div>  */}
          {/* <button className="bg-white text-blue-600 px-6 py-6 rounded-full text-sm font-medium hover:bg-gray-100 transition-all">
    Learn More
  </button> */}
        </div>
      </>
    );
  }

  return (
    <>
      {children}
      <GlobalModal
        showCloseButton={false}
        disableCloseOnOverlayClick
        open={isAddOnModalOpen}
        setOpen={() => {
          setIsAddOnModalOpen(false);
        }}
      >
        <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
          <Lock />
          <h3 className="text-center text-[28px] font-semibold">
            Upgrade Required
          </h3>
          <p className="text-center text-gray-700 text-sm md:text-base px-4">
            This feature is not included in your current plan. To access it,
            please upgrade your plan. Choose a plan that fits your needs and
            unlock this feature!
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
              href={isSubscribed ? ALL_ROUTES.UPGRADE : ALL_ROUTES.PAYMENT}
            >
              Upgrade Plan
            </Link>
          </div>
        </div>
      </GlobalModal>
    </>
  );
};

export default AuthProvider;
