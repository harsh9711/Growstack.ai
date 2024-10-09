"use client";
import React, { useState } from "react";
import "aos/dist/aos.css";
import instance from "@/config/axios.config";
import { Feature } from "@/types/Box";
import toast from "react-hot-toast";
import { API_URL } from "@/lib/api";
import Ticket from "@/components/svgs/ticket";
import { PlanName } from "@/types/enums";
import { getUserFriendlyPlanName, planIdsMap } from "@/lib/utils";
import { getCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Link from "next/link";
import GlobalModal from "./modal/global.modal";
import { useDispatch } from "react-redux";
import CouponModal from "./modal/coupon.modal";
import { ALL_ROUTES } from "@/utils/constant";

const PlanCard = ({
    plan,
    selectedTabIndex,
    isUpgradePlan = false,
    isReadOnly = false,
}: {
    plan: Feature;
    selectedTabIndex: number;
    isUpgradePlan?: boolean;
    isReadOnly?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { currentPlan, user } = useSelector((rootState: RootState) => rootState.auth);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const isLoggedIn = !!getCookie("token");

    const handleSubscribePlan = async () => {
        if (!isLoggedIn) {
            toast.error("Please log in to select a plan");
            return;
        }
        setIsOpen(true);
    };

    const handleUpgradePlan = async () => {
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

            const response = await instance.put(`${API_URL}/users/api/v1/payments/update-subscription`, { product });

            const { redirectLink, url } = response.data;
            if (url) {
                window.location.href = url;
            } else if (redirectLink) {
                window.location.href = redirectLink;
            }
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

    const isDowngrade =
        (isUpgradePlan &&
            currentPlan &&
            ((selectedTabIndex === 0 && parseFloat(plan.monthlyPrice!) < currentPlan.plan_amount) ||
                (selectedTabIndex === 1 && parseFloat(plan.yearlyPrice!) < currentPlan.plan_amount))) ||
        false;

    const isCurrentPlan = currentPlan?.plan_id === plan.id;

    const isBusinessPlan = planIdsMap.BUSINESS.some((val) => val === plan?.id);
    const isBasicPlan = planIdsMap[PlanName.AI_ESSENTIALS].some((val) => val === plan?.id);

    return (
        <>
            <div className='items-center justify-center mx-auto w-full bg-[#F5F5F5] rounded-xl flex flex-col py-6  hover:scale-[102%] border-transparent hover:shadow-lg hover:bg-white transition-all duration-500 shadow-sm hover:border-[4px]'>
                <div className='text-center w-full flex flex-col'>
                    <h2 className='px-8 text-[#000000] text-[20px] xl:text-[24px] font-extrabold'>
                        {getUserFriendlyPlanName(plan.title as PlanName)}
                    </h2>
                    {!isBusinessPlan ? (
                        <h2 className='px-8 text-[24px] xl:text-[48px] text-center justify-center font-bold flex gap-2 items-center text-[#034737]'>
                            $
                            {selectedTabIndex === 0
                                ? plan.monthlyPrice !== null && plan.monthlyPrice !== undefined
                                    ? parseFloat(plan.monthlyPrice.toString()).toFixed(2)
                                    : ""
                                : plan.yearlyPrice !== null && plan.yearlyPrice !== undefined
                                ? parseFloat(plan.yearlyPrice.toString()).toFixed(2)
                                : ""}
                            <span className='text-[20px] xl:text-[28px] opacity-20 text-black'>{suffix}</span>
                        </h2>
                    ) : (
                        <h2 className='px-8 h-[40px] xl:h-[70px] text-[24px] xl:text-[40px] text-center justify-center font-bold flex gap-2 items-center text-[#034737]'>
                            Custom
                        </h2>
                    )}
                    <p className='px-8  opacity-60 w-full h-full lg:h-[120px] xl:h-[110px]  mx-auto'>{plan.description}</p>
                    <div className='border-[#B8B8B8] px-10 border w-full mt-6 mb-6'></div>
                </div>
                <div className={`flex flex-col gap-y-2 px-4 ${marginBottom} w-full overflow-y-auto sm:h-[320px] sm:overflow-y-scroll`}>
                    {plan.featureList.map((feature, index) => (
                        <p
                            className={`flex text-[12px] xl:text-[18px] ${
                                index === 0 && !isBasicPlan ? "font-bold" : "font-medium"
                            } items-center gap-x-2`}
                            key={index}
                        >
                            <span className='w-5 h-5 flex items-center justify-center'>
                                <Ticket />
                            </span>
                            {feature}
                        </p>
                    ))}
                </div>
                {isReadOnly ? (
                    <div className='flex items-center justify-center w-full mt-auto px-3'>
                        {isBusinessPlan ? (
                            <Link
                                className={` ${plan.buttonStyle} text-center group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                                href='mailto:sales@growstack.ai'
                            >
                                Contact Us
                            </Link>
                        ) : (
                            <Link
                                className={` ${plan.buttonStyle} text-center group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                                href={ALL_ROUTES.LOGIN}
                            >
                                Start 7 days free trial
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className='flex items-center justify-center w-full mt-auto px-3'>
                        {isBusinessPlan ? (
                            <Link
                                className={` ${plan.buttonStyle} text-center group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                                href='mailto:sales@growstack.ai'
                            >
                                Contact Us
                            </Link>
                        ) : isCurrentPlan ? (
                            <div className='flex gap-2 flex-col w-full'>
                                <button className='bg-gray-300 text-gray-500 cursor-not-allowed rounded-xl py-4 w-full' disabled>
                                    Current Plan
                                </button>
                                <Link
                                    className={` ${plan.buttonStyle} text-center group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                                    href='/app'
                                >
                                    Go to Dashboard
                                </Link>
                            </div>
                        ) : (
                            <button
                                className={`  ${(loading || isDowngrade) && "cursor-not-allowed"} ${
                                    plan.buttonStyle
                                } group-hover:bg-[#034737] items-center justify-center mx-auto border-[#034737] rounded-xl py-4 w-full transition-all duration-300 hover:bg-[#034737] hover:text-white`}
                                onClick={isUpgradePlan ? handleUpgradePlan : handleSubscribePlan}
                                disabled={loading || isDowngrade}
                            >
                                {loading ? (
                                    <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white mx-auto'></div>
                                ) : (
                                    <h2>Select plan</h2>
                                )}
                            </button>
                        )}
                    </div>
                )}
            </div>
            <GlobalModal
                open={isModalOpen}
                setOpen={() => {
                    setIsModalOpen(false);
                }}
            >
                <div className='flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6'>
                    <div className='text-center'>
                        <h3 className='text-[28px] font-semibold text-green-600'>Yay!</h3>
                        <h4 className='text-[20px] font-medium text-gray-900 mt-2'>Your plan is changed successfully</h4>
                    </div>
                    <p className='text-center text-gray-600 md:text-base px-4'>
                        Enjoy our services with enhanced features and benefits. We're excited to have you onboard with the upgraded plan!
                    </p>
                    <div className='flex items-center justify-center'>
                        <Link
                            className='bg-primary-green no-underline text-white sheen transition duration-500 px-5 py-3 rounded-xl flex items-center gap-2'
                            href={ALL_ROUTES.APP}
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </GlobalModal>
            <CouponModal isOpen={isOpen} loading={loading} plan={plan} setIsOpen={setIsOpen} setLoading={setLoading} />
        </>
    );
};

export default PlanCard;
