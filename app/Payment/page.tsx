"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter, useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import { Feature } from "@/types/Box";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import Link from "next/link";
import Ticket from "@/components/svgs/ticket";
import { Plan } from "@/types/common";
import { PlanName } from "@/types/enums";
import PlanSkeleton from "@/components/skeletons/PlanSkeleton";
import { getUserFriendlyPlanName } from "@/lib/utils";
import { getCookie } from "cookies-next";
interface PlanUsage {
  usage_amount: number;
}

const PlanCard = ({
  plan,
  selectedTabIndex,
}: {
  plan: Feature;
  selectedTabIndex: number;
}) => {
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!getCookie("token");

  const handleButtonClick = async () => {
    if (!isLoggedIn) {
    toast.error("Please log in to select a plan");
    return;
  }
    setLoading(true);
    try {
      const product = {
        plan_id: plan.id,
        plan_type: plan.title,
        price_id: plan.stripe_price_id,
      };

      const currency = "usd";
      const response = await instance.post(
        `${API_URL}/users/api/v1/payments/create-checkout-session`,
        { product }
      );
      const { url } = response.data;
      window.location.href = url;
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error(error.message || "An error occurred");
      }
      console.error("Error creating checkout session:", error);
    } finally {
      setLoading(false);
    }
  };

  const suffix = selectedTabIndex === 0 ? "/mo" : "/yr";
  const marginBottom = plan.title === "INFLUENCER" ? "mb-20" : "mb-4";

  return (
    <div
      className="items-center justify-center mx-auto w-full bg-[#F5F5F5] rounded-xl flex flex-col py-6  hover:scale-[102%]   border-transparent hover:shadow-lg hover:bg-white  transition-all duration-500 shadow-sm hover:border-[4px]"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      <div className="text-center w-full flex flex-col">
        <h2
          className="px-8 text-[#000000] text-[20px] xl:text-[24px] font-extrabold"
          data-aos="fade-down"
        >

          {getUserFriendlyPlanName(plan.title as PlanName)}
        </h2>
        <h2
          className="px-8 text-[24px] xl:text-[48px] text-center justify-center font-bold flex gap-2 items-center text-[#034737]"
          data-aos="fade-up"
        >
          $
          {selectedTabIndex === 0
            ? plan.monthlyPrice !== null && plan.monthlyPrice !== undefined
              ? parseFloat(plan.monthlyPrice.toString()).toFixed(2)
              : ""
            : plan.yearlyPrice !== null && plan.yearlyPrice !== undefined
              ? parseFloat(plan.yearlyPrice.toString()).toFixed(2)
              : ""}
          <span className="text-[20px] xl:text-[28px] opacity-20 text-black">
            {suffix}
          </span>
        </h2>


        <p
          className="px-8 opacity-60 w-full max-w-[450px] mx-auto"
          data-aos="fade-up"
        >
          {plan.description}
        </p>
        <div className="border-[#B8B8B8] px-10 border w-full mt-4 mb-6"></div>
      </div>
      <div className={`flex flex-col gap-y-2 px-4 ${marginBottom} w-full mb-6 overflow-y-auto  sm:h-[400px] sm:overflow-y-scroll `}>
        {plan.featureList.map((feature, index) => (
          <React.Fragment key={index}>
            <p
              className="flex text-[12px] xl:text-[18px] font-medium items-center gap-x-2"
              data-aos="fade-left"
            >
              <div>
                <span
                  className={`w-5 h-5 flex items-center justify-center`}
                >
                  <Ticket />
                </span>
              </div>
              {feature}
            </p>
          </React.Fragment>
        ))}
      </div>
      <div className="flex items-center justify-center w-full mt-auto px-3">
        <button
          className={` ${plan.buttonStyle} group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 max-w-[405px] w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto"></div>
          ) : (
            <h2>Select plan</h2>
          )}
        </button>
      </div>
    </div>
  );
};

const PricingPage: React.FC = () => {
  const isLoggedIn = !!getCookie("token");

  useEffect(() => {
    AOS.init();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const tabs = ["Monthly billing", "Yearly billing"];
  const searchParams = useSearchParams();
  const tabQueryParam = searchParams.get("tab");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [tabDistanceFromLeft, setDistanceFromLeft] = useState(0);
  const [plans, setPlans] = useState<Feature[]>([]);

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
    const fetchPlanUsage = async () => {
      try {
        setIsLoading(true);
        const response = await instance.get(`${API_URL}/users/api/v1/plan-usage`);
        const planUsageData = response.data.data;
        if (planUsageData) {
          const currentDate = new Date();
          const expiryDate = new Date(planUsageData?.usage_expiry_date);
          if (expiryDate > currentDate) {
            toast.success('You are already subscribed. Redirecting to app...');
            router.push("/app");
          }
        }
      } catch (error: any) {
        console.error('Error fetching plan usage:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlanUsage();
  }, []);

  useEffect(() => {
    const tab = tabQueryParam ? Number(tabQueryParam) : 0;
    setSelectedTabIndex(tab);
    const totalTabs = tabs.length;
    const percentage = (tab / totalTabs) * 100;
    setDistanceFromLeft(percentage);
  }, [tabQueryParam]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await instance.get(
          `${API_URL}/users/api/v1/payments/plans`
        );
        const fetchedPlans = response.data.data.map((plan: Plan) => {
          let description = "";
          switch (plan.plan) {
            case PlanName.BASIC:
              description =
                "Essential AI features for individuals who need basic content creation and improvement.";
              break;
            case PlanName.PRO:
              description =
                "Advanced AI features with added control, security, team training, and tech support for professionals.";
              break;
            case PlanName.CREATOR:
              description =
                "Powerful AI tools designed for creators to enhance content generation and editing.";
              break;
            case PlanName.ADVANCED_PRO:
              description =
                "Enhanced AI capabilities with advanced tools, controls, and team collaboration for growing businesses.";
              break;
            case PlanName.BUSINESS:
              description =
                "Comprehensive AI features, security, and collaboration tools for businesses to scale operations.";
              break;
            case PlanName.ENTERPRISE:
              description =
                "Custom AI solutions tailored for enterprises, offering top-tier security, support, and scalability.";
              break;
            default:
              description = "Standard AI features for various needs.";
          }
          return {
            id: plan.plan_id,
            stripe_price_id: plan.stripe_price_id,
            title: plan.plan,
            monthlyPrice: plan.plan_type === "MONTHLY" && plan.price !== null && plan.price !== undefined
              ? plan.price
              : null,
            yearlyPrice: plan.plan_type === "YEARLY" && plan.price !== null && plan.price !== undefined
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
      }
    };
    fetchPlans();
  }, []);


  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const tab = params.get("tab");
  //   if (tab) {
  //     setSelectedTabIndex(parseInt(tab, 10));
  //   }
  // }, [location.search]);

  const view = selectedTabIndex === 0 ? "monthly" : "yearly";


  const filteredPlans = plans
    .filter(
      (plan) =>
        (view === "monthly" && plan.planType === "MONTHLY") ||
        (view === "yearly" && plan.planType === "YEARLY")
    )
    .sort((a, b) => {
      const priceA =
        view === "monthly"
          ? (a.monthlyPrice !== null && a.monthlyPrice !== undefined
            ? parseFloat(a.monthlyPrice)
            : Infinity)
          : (a.yearlyPrice !== null && a.yearlyPrice !== undefined
            ? parseFloat(a.yearlyPrice)
            : Infinity);

      const priceB =
        view === "monthly"
          ? (b.monthlyPrice !== null && b.monthlyPrice !== undefined
            ? parseFloat(b.monthlyPrice)
            : Infinity)
          : (b.yearlyPrice !== null && b.yearlyPrice !== undefined
            ? parseFloat(b.yearlyPrice)
            : Infinity);

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
  console.log(filteredPlans)

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-12">
        <div
          className="relative overflow-y-auto bg-white w-full md:w-3xl h-fit xl:max-h-[1024] max-w-[1600px] mx-4 sm:mx-6 md:mx-8 lg:mx-auto rounded-2xl shadow-lg"
          data-aos="zoom-in"
          data-aos-duration="500"
          onClick={(e) => e.stopPropagation()}
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
            {
              isLoggedIn ? (
                <div
                  className="border-[#034737] text-[#034737] w-full flex justify-end"
                  data-aos="fade-left"
                >
                  <Link href="/">
                    <button className="border-[#034737]  border rounded-xl font-semibold text-[#034737] px-10 py-4 ">
                      Sign out
                    </button>
                  </Link>
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
              )
            }

          </div>
          <div className="border "></div>
          <section className="p-4 overflow-y-auto">
            <div className="w-full border max-w-md flex gap-4 justify-center mx-auto item-center bg-[#F5F5F5] shadow-2xl shadow-gray-200 px-3 py-2 rounded-xl">
              <div className="w-full flex gap-2 flex-1 relative">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`w-full flex p-2 justify-center items-center relative cursor-pointer z-[1] transition-all duration-500 ${selectedTabIndex === index
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
                (Save ~20%)
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

export default PricingPage;
