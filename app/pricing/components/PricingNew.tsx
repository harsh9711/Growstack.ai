"use client";
import "../../../styles/myanimation.css";
import "aos/dist/aos.css";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footer/Footer";
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
import { LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "@/lib/features/auth/auth.selector";
import { logout, setPlanLoading, setUserPlan } from "@/lib/features/auth/auth.slice";
import PlanCard from "@/components/planCard";
import { planIdsMap } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import withUnAuthGuard from "@/components/guard/unAuthGuard";

const PricingPage21: React.FC = () => {
    const { isAuthenticated } = useSelector((rootState: RootState) => rootState.auth);

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
        const tab = tabQueryParam ? Number(tabQueryParam) : 0;
        setSelectedTabIndex(tab);
        const totalTabs = tabs.length;
        const percentage = (tab / totalTabs) * 100;
        setDistanceFromLeft(percentage);
    }, [tabQueryParam]);

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
                const response = await instance.get(`${API_URL}/users/api/v1/payments/plans`);
                const fetchedPlans = response.data.data.map((plan: Plan) => {
                    let description = "";
                    switch (plan.plan) {
                        case PlanName.AI_ESSENTIALS:
                            description = "Essential AI features for individuals who need basic content creation and improvement.";
                            break;
                        case PlanName.AI_STUDIO:
                            description = "Advanced AI features with added control, security, team training, and tech support for professionals.";
                            break;
                        case PlanName.SOCIAL_PORTAL:
                            description = "Powerful AI tools designed for creators to enhance content generation and editing.";
                            break;
                        case PlanName.AUTOMATION_HUB:
                            description = "Enhanced AI capabilities with advanced tools, controls, and team collaboration for growing businesses.";
                            break;
                        case PlanName.BUSINESS:
                            description = "Comprehensive AI features, security, and collaboration tools for businesses to scale operations.";
                            break;
                        default:
                            description = "Standard AI features for various needs.";
                    }
                    return {
                        id: plan.plan_id,
                        stripe_price_id: plan.stripe_price_id,
                        title: plan.plan,
                        monthlyPrice: plan.plan_type === "MONTHLY" && plan.price !== null && plan.price !== undefined ? plan.price : null,
                        yearlyPrice: plan.plan_type === "YEARLY" && plan.price !== null && plan.price !== undefined ? plan.price : null,
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
        .filter((plan) => (view === "monthly" && plan.planType === "MONTHLY") || (view === "yearly" && plan.planType === "YEARLY"))
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

            const isBusinessPlanA = planIdsMap.BUSINESS.some((val) => val === a?.id);
            const isBusinessPlanB = planIdsMap.BUSINESS.some((val) => val === b?.id);

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

    return (
        <div data-aos='zoom-in' data-aos-duration='500' onClick={(e) => e.stopPropagation()}>
            <section className='p-4 overflow-y-auto'>
                <div className='w-full border max-w-md flex gap-2 justify-center mx-auto item-center bg-[#F5F5F5] shadow-2xl shadow-gray-200 px-3 py-2 mt-4 rounded-xl'>
                    <div className='w-full flex gap-2 flex-1 relative'>
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
                        className='!text-[#034737] mt-2.5 text-center w-fit transition-opacity duration-300'
                        style={{
                            opacity: selectedTabIndex === 1 ? 1 : 0.3,
                        }}
                    >
                        (2 Months Free)
                    </h2>
                </div>
                <div className='overflow-auto pt-8'>
                    {isLoading ? (
                        <div className='flex justify-center items-center px-6'>
                            <PlanSkeleton />
                        </div>
                    ) : (
                        <div
                            className='w-full'
                            style={{
                                containerType: "inline-size",
                            }}
                        >
                            <div className='w-fit sm:w-full mx-auto flex-1 sm:flex justify-center item-center flex-col sm:flex-row  overflow-y-auto sm:overflow-y-hidden p-2 space-x-0 sm:space-x-3  space-y-3 sm:space-y-0 custom-scrollbar mt-2 sm:mt-1 '>
                                {filteredPlans.map((plan, idx) => (
                                    <PlanCard key={idx} isReadOnly={true} plan={plan} selectedTabIndex={selectedTabIndex} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};
interface PricingRowProps {
    description: string;
    value1: string;
    value2: string;
    value3: string;
    bgColor: string;
}

const PricingNew: React.FC = () => {
    const CustomIcon = () => (
        <svg width='30' height='33' viewBox='0 0 30 33' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
                d='M30 1.63802C30 1.63802 29.0103 15.6437 26.2786 21.3244C21.1637 31.9686 15.0004 32.9899 15.0004 32.9899C15.0004 32.9899 8.8377 31.9686 3.7214 21.3244C0.991845 15.6437 0 1.63802 0 1.63802L14.9996 0L30 1.63802Z'
                fill='#034737'
            />
            <path d='M21.0562 10.1919L22.3012 11.4369L13.485 20.2531L9.09375 15.8597L10.3388 14.6154L13.4871 17.7638L21.0562 10.1919Z' fill='white' />
        </svg>
    );
    const pricingData = [
        {
            description:
                "AI Apps, AI Chat, AI Assistants, AI Playground, Custom GPT, Mobile App + Chrome Extension, AI Article Wizard, Image Generation",
            value1: "Yes",
            value2: "Yes",
            value3: "Yes",
            bgColor: "bg-[#034737]/10",
        },
        {
            description: "Product AI",
            value1: "$0.4 cents per image",
            value2: "$0.3 Cents Per Image",
            value3: "$0.3 Cents Per Image",
            bgColor: "bg-[#FBFBFB]",
        },
        {
            description: "Text to Videos",
            value1: "$3 per video",
            value2: "$2 per video",
            value3: "$1.5 Per Video",
            bgColor: "bg-[#034737]/10",
        },
        {
            description: "Social Media Sharing and Scheduler, Social Media Conversation hub",
            value1: "No",
            value2: "Yes",
            value3: "Yes",
            bgColor: "bg-[#FBFBFB]",
        },
        {
            description: "AI Workflows",
            value1: "No",
            value2: "Yes",
            value3: "Yes, Credit Based, 2k Workflow Credits / Mo.",
            bgColor: "bg-[#034737]/10",
        },
        {
            description: "Social Media Analytics",
            value1: "No",
            value2: "Yes",
            value3: "Yes",
            bgColor: "bg-[#FBFBFB]",
        },
        {
            description: "Webscraping, Contact (Consent & Verification is extra)",
            value1: "No",
            value2: "No",
            value3: "No",
            bgColor: "bg-[#034737]/10",
        },
        {
            description: "Max discount for yearly plans",
            value1: "25% Off",
            value2: "50% Discount",
            value3: "30% Discount",
            bgColor: "bg-[#FBFBFB]",
        },
    ];
    const [billingPeriod, setBillingPeriod] = useState("Monthly");
    const isMonthly = billingPeriod === "Monthly";

    const handleBillingPeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBillingPeriod(e.target.value);
    };
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className='bg-[#FBFBFB] border rounded-[20px] px-2 w-full relative' data-aos='fade-up'>
            <PricingPage21 />
        </div>
    );
};

export default withUnAuthGuard(PricingNew);

