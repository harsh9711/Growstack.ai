import React from 'react'
import Lock from '../svgs/lock'
import { RootState } from '@/lib/store';
import { ALL_ROUTES } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UpgradePlan = () => {
    const { user } = useSelector(
        (rootState: RootState) => rootState.auth
    );

    const isSubscribed = user?.isSubscribed || false;
    const router = useRouter();

    return (
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
                    className={`w-full py-2 px-6 rounded-md flex gap-3 bg-primary-green text-white sheen transition-all duration-300 `}
                    href={isSubscribed ? ALL_ROUTES.UPGRADE : ALL_ROUTES.PAYMENT}
                >
                    Upgrade Plan
                </Link>
            </div>
        </div>
    )
}

export default UpgradePlan