"use client";
import React, { useState } from "react";
import "aos/dist/aos.css";
import instance from "@/config/axios.config";
import { Feature } from "@/types/Box";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import Ticket from "@/components/svgs/ticket";
import { PlanName } from "@/types/enums";
import { getUserFriendlyPlanName } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";

const PlanCard = ({
    plan,
    selectedTabIndex,
}: {
    plan: Feature;
    selectedTabIndex: number;
}) => {
    const { currentPlan } = useSelector((rootState: RootState) => rootState.auth);

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

    const isCurrentPlan = currentPlan?.plan_id === plan.id;

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
            <div className={`flex flex-col gap-y-2 px-4 ${marginBottom} w-full mb-6 overflow-y-auto  sm:h-[400px] sm:overflow-y-scroll`}>
                {plan.featureList.map((feature, index) => (
                    <React.Fragment key={index}>
                        <p className="flex text-[12px] xl:text-[18px] font-medium items-center gap-x-2" data-aos="fade-left">
                            <div>
                                <span className="w-5 h-5 flex items-center justify-center">
                                    <Ticket />
                                </span>
                            </div>
                            {feature}
                        </p>
                    </React.Fragment>
                ))}
            </div>
            <div className="flex items-center justify-center w-full mt-auto px-3">
                {isCurrentPlan ? (
                    <div className="flex gap-2 flex-col w-full">
                        <button
                            className="bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl py-4 max-w-[405px] w-full"
                            disabled
                        >
                            Current Plan
                        </button>
                        <Link
                            className={` ${plan.buttonStyle}  text-center  group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 max-w-[405px] w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                            href="/app" >
                            Go to Dashboard
                        </Link>
                    </div>
                ) : (
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
                )}
            </div>
        </div>
    );
};

export default PlanCard;
