import React from "react";
import Lock from "../svgs/lock";
import { ALL_ROUTES } from "@/utils/constant";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Props {
  goBackHandler?: () => void;
}

const SubscribePlan = ({ goBackHandler }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-4 pb-8 gap-6 space-x-6">
      <Lock />
      <h3 className="text-center text-[28px] font-semibold">
        Subscription Required
      </h3>
      <p className="text-center text-gray-700 text-sm md:text-base px-4">
        To access this feature, a subscription is required. Choose a plan that
        meets your needs and start benefiting from all the features today!
      </p>
      <div className="flex items-center justify-between gap-3">
        <button
          className="text-red-500 border border-red-500 bg-transparent text-nowrap py-2 px-6 rounded-md transition duration-300"
          onClick={() => (goBackHandler ? goBackHandler() : router.back())}
        >
          Go back
        </button>
        <Link
          className="w-full py-2 px-6 rounded-md flex gap-3 bg-[#2DA771] text-white sheen transition-all duration-300"
          href={ALL_ROUTES.PAYMENT}
        >
          Subscribe Now
        </Link>
      </div>
    </div>
  );
};

export default SubscribePlan;
