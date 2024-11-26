"use client";
import TickIcon from "./TickIcon";
import DashIcon from "./DashIcon";
import { ContentBoxProps } from "@/types/Box";
import "aos/dist/aos.css";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import { Feature } from "@/types/Box";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import { Plan, UserPlan } from "@/types/common";
import { PlanName } from "@/types/enums";
import PlanSkeleton from "@/components/skeletons/PlanSkeleton";
import { deleteCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import {
  logout,
  setPlanLoading,
  setUserPlan,
} from "@/lib/features/auth/auth.slice";
import PlanCard from "@/components/planCard";
import { planIdsMap } from "@/lib/utils";
import { persistor, RootState } from "@/lib/store";
import { useSelector } from "react-redux";

const PricingPage: React.FC = () => {
  const { isAuthenticated } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  useEffect(() => {
    AOS.init();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const tabs = ["Monthly billing", "Yearly billing"];
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");

  const defaultTabIndex = tabQueryParam ? parseInt(tabQueryParam, 10) : 1;
  const [selectedTabIndex, setSelectedTabIndex] = useState(defaultTabIndex);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);
  const [plans, setPlans] = useState<Feature[]>([]);

  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useLayoutEffect(() => {
    const hasRefreshedBefore = localStorage.getItem("hasRefreshed");

    if (!hasRefreshedBefore) {
      localStorage.setItem("hasRefreshed", "true");
      setHasRefreshed(true);
      router.refresh();
    } else {
      setHasRefreshed(true);
    }
  }, [router]);

  useEffect(() => {
    if (!tabQueryParam) {
      const params = new URLSearchParams(window.location.search);
      params.set("tab", defaultTabIndex.toString());
      history.replaceState(null, "", `?${params.toString()}`);
    }

    setDistanceFromLeft((defaultTabIndex / tabs.length) * 100);
  }, [tabQueryParam]);

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
    if (isAuthenticated) {
      fetchPlanUsage();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/users/api/v1/payments/plans`
        );
        const fetchedPlans = response.data.data.map((plan: Plan) => {
          let description = "";
          switch (plan.plan) {
            case PlanName.AI_ESSENTIALS:
              description =
                "Essential AI features for individuals who need basic content creation and improvement.";
              break;
            case PlanName.AI_STUDIO:
              description =
                "Advanced AI features with added control, security, team training, and tech support for professionals.";
              break;
            case PlanName.SOCIAL_PORTAL:
              description =
                "Powerful AI tools designed for creators to enhance content generation and editing.";
              break;
            case PlanName.AUTOMATION_HUB:
              description =
                "Enhanced AI capabilities with advanced tools, controls, and team collaboration for growing businesses.";
              break;
            case PlanName.BUSINESS:
              description =
                "Comprehensive AI features, security, and collaboration tools for businesses to scale operations.";
              break;
            default:
              description = "Standard AI features for various needs.";
          }
          return {
            id: plan.plan_id,
            stripe_price_id: plan.stripe_price_id,
            title: plan.plan,
            monthlyPrice:
              plan.plan_type === "MONTHLY" &&
              plan.price !== null &&
              plan.price !== undefined
                ? plan.price
                : null,
            yearlyPrice:
              plan.plan_type === "YEARLY" &&
              plan.price !== null &&
              plan.price !== undefined
                ? plan.price
                : null,
            priceSuffix: "/mo",
            description,
            planType: plan.plan_type,
            buttonLabel: "Contact sales",
            buttonStyle: "bg-[#034737]/10 text-[#034737]",
            featureList: plan.features,
          };
        });
        setPlans(fetchedPlans);
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error(error.message || "An error occurred");
        }
        console.error("Error fetching plans:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const view = selectedTabIndex === 0 ? "monthly" : "yearly";

  const filteredPlans = plans
    .filter(
      plan =>
        (view === "monthly" && plan.planType === "MONTHLY") ||
        (view === "yearly" && plan.planType === "YEARLY")
    )
    .sort((a, b) => {
      const priceA =
        view === "monthly"
          ? a.monthlyPrice !== null && a.monthlyPrice !== undefined
            ? parseFloat(a.monthlyPrice)
            : Infinity
          : a.yearlyPrice !== null && a.yearlyPrice !== undefined
            ? parseFloat(a.yearlyPrice)
            : Infinity;

      const priceB =
        view === "monthly"
          ? b.monthlyPrice !== null && b.monthlyPrice !== undefined
            ? parseFloat(b.monthlyPrice)
            : Infinity
          : b.yearlyPrice !== null && b.yearlyPrice !== undefined
            ? parseFloat(b.yearlyPrice)
            : Infinity;

      const isBusinessPlanA = planIdsMap.BUSINESS.some(val => val === a?.id);
      const isBusinessPlanB = planIdsMap.BUSINESS.some(val => val === b?.id);

      if (isBusinessPlanA && !isBusinessPlanB) return 1;
      if (!isBusinessPlanA && isBusinessPlanB) return -1;

      if (priceA === 0 && priceB !== 0) return -1;
      if (priceB === 0 && priceA !== 0) return 1;

      return priceA - priceB;
    });

  const handleTabClick = (index: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", index.toString());
    history.replaceState(null, "", `?${params.toString()}`);
    setSelectedTabIndex(index);
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in-out",
    });
  }, []);

  if (!hasRefreshed) {
    return null;
  }

  const handleLogout = () => {
    localStorage.clear();
    dispatch(logout());
    persistor.purge();
    deleteCookie("token");
    router.push("/auth/login");
  };

  return (
    <div
      style={{
        zoom: "0.75",
      }}
      className="flex flex-col min-h-screen"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-12">
        <div
          className="relative overflow-y-auto bg-white w-full md:w-3xl md:max-h-[70%]  xl:max-h-[70%] h-full max-w-[1600px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-2xl shadow-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
          onClick={e => e.stopPropagation()}
        >
          <div
            className="p-6 mx-auto flex md:flex-row flex-col gap-y-4 gap-x-10 overflow-hidden w-full  items-center justify-between"
            data-aos="fade-right"
          >
            <div
              className="flex xl:p-0 p-2 flex-col w-full gap-4"
              data-aos="fade-up"
            >
              <h2
                className="text-black w-full font-bold xl:text-[28px] text-[14px] tracking-normal"
                data-aos="zoom-in"
              >
                Choose a plan
              </h2>
              <p className="justify-end text-black text-[18px] font-extralight">
                Upgrade your plan anytime for more advanced features
              </p>
            </div>
            {isAuthenticated ? (
              <div
                className="border-[#034737]  gap-4 text-[#034737] flex-wrap w-full flex justify-center sm:justify-end"
                data-aos="fade-left"
              >
                <Link
                  className="border-[#034737] flex items-center justify-between gap-2  border rounded-xl font-semibold text-[#034737] px-8 py-4 "
                  href="/app"
                >
                  Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="border-[#034737] flex items-center justify-between gap-2  border rounded-xl font-semibold text-[#034737] px-10 py-4 "
                >
                  <LogOut size={20} />
                  Sign out
                </button>
              </div>
            ) : (
              <div
                className="border-[#034737] text-[#034737] w-full flex justify-end"
                data-aos="fade-left"
              >
                <Link href="/auth/register">
                  <button className="border-[#034737]  border rounded-xl font-semibold text-[#034737] px-10 py-4 ">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
          <div className="border "></div>
          <section className="p-4 overflow-y-auto">
            <div className="w-full border max-w-md flex gap-2 justify-center mx-auto item-center bg-[#F5F5F5] shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex gap-2 flex-1 relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full flex p-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${
                      selectedTabIndex === index
                        ? "!text-white font-semibold bg-[#034737] custom-transition rounded-xl"
                        : "!text-[#034737]"
                    }`}
                    onClick={() => handleTabClick(index)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
              <h2
                className="!text-[#034737] mt-2.5 text-center w-fit transition-opacity duration-300"
                style={{
                  opacity: selectedTabIndex === 1 ? 1 : 0.3,
                }}
              >
                (2 Months Free)
              </h2>
            </div>

            <div className="overflow-auto pt-6">
              {isLoading ? (
                <div className="flex justify-center items-center px-6">
                  <PlanSkeleton />
                </div>
              ) : (
                <div
                  className="w-full"
                  style={{
                    containerType: "inline-size",
                  }}
                >
                  <div className="w-fit sm:w-full mx-auto flex-1 sm:flex justify-center item-center flex-col sm:flex-row  overflow-y-auto sm:overflow-y-hidden p-2 space-x-0 sm:space-x-3  space-y-3 sm:space-y-0 custom-scrollbar mt-2 sm:mt-1 ">
                    {filteredPlans.map((plan, idx) => (
                      <PlanCard
                        key={idx}
                        plan={plan}
                        selectedTabIndex={selectedTabIndex}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const ContentBox: React.FC<ContentBoxProps> = ({ sections }) => {
  const allFeatures = sections.flatMap(section => section.features);

  return (
    <div className="max-w-[1400px] w-full px-4 mx-auto">
      {" "}
      <PricingPage />
    </div>
  );
};

export default ContentBox;
