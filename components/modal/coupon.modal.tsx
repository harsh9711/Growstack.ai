import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";
import toast from "react-hot-toast";
import clsx from "clsx";
import Spinner from "../Spinner";
import { RiCouponLine } from "react-icons/ri";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn, getUserFriendlyPlanName } from "@/lib/utils";
import { Feature } from "@/types/Box";
import { Tag, X } from "lucide-react";
import { PlanName } from "@/types/enums";
import { setUserPlan } from "@/lib/features/auth/auth.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const CouponCodeSchema = z.object({
  coupon_code: z.string(),
});

type CouponCodeFormValues = z.infer<typeof CouponCodeSchema>;

interface Props {
  plan: Feature;
  isOpen: boolean;
  loading: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const CouponModal = ({
  plan,
  isOpen,
  loading,
  setIsOpen,
  setLoading,
}: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [appliedPromoCode, setAppliedPromoCode] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CouponCodeFormValues>({
    resolver: zodResolver(CouponCodeSchema),
  });

  const handleSubscribePlan = async (coupon_code?: string) => {
    setLoading(true);
    try {
      const product = {
        plan_id: plan.id,
        plan_type: plan.planType,
        price_id: plan.stripe_price_id,
        ...(coupon_code && {
          coupon: coupon_code,
        }),
      };
      setIsOpen(false);
      const currentPath = localStorage.getItem("currentPathname");

      const response = await instance.post(
        `${API_URL}/users/api/v1/payments/create-checkout-session?currentPath=${currentPath}`,
        { product }
      );
      const { url, data } = response.data;
      if (url) {
        window.location.href = url;
      } else if (data) {
        dispatch(setUserPlan(data));
        toast.success("Subscription successful");
        router.push("/app");
      } else {
        toast.error("An error occurred");
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

  const onSubmit: SubmitHandler<CouponCodeFormValues> = async data => {
    setIsPending(true);
    try {
      const validatedData = CouponCodeSchema.parse(data);
      const response = (
        await instance.post(
          API_URL + "/users/api/v1/payments/check-coupon",
          validatedData
        )
      ).data;

      if (response.data.valid) {
        setAppliedPromoCode(data.coupon_code);
        await handleSubscribePlan(data.coupon_code);
      } else {
        setAppliedPromoCode("");
        setError("coupon_code", {
          type: "manual",
          message: "Coupon code not existed.",
        });
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data);
      } else {
        toast.error(error.message);
      }
      console.error("Couldn't apply the coupon!", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={cn(" max-w-xl p-0 border-0")}>
        <DialogHeader>
          <DialogTitle>
            <div className="bg-white px-6 py-2 text-white font-inter">
              <p className="text-lg font-semibold">
                Apply Coupon Code -{" "}
                {getUserFriendlyPlanName(plan.title as PlanName)}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="bg-white px-6 pb-6 w-full">
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-8">
              <div
                className={clsx(
                  "flex items-center  gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 transition-all focus-within:border-primary-green focus-within:ring-2 focus-within:ring-primary-green",
                  errors.coupon_code &&
                    "border-red-600 focus-within:border-red-600 focus-within:ring-red-600"
                )}
              >
                <RiCouponLine />
                <input
                  id="coupon_code"
                  autoComplete="off"
                  className="bg-transparent text-sm text-gray-800 w-full focus:outline-none"
                  placeholder="Enter your coupon code"
                  {...register("coupon_code")}
                />
              </div>
              {errors.coupon_code && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.coupon_code.message}
                </span>
              )}
              {!!appliedPromoCode && (
                <div className="flex gap-8 items-center mt-2">
                  <p className="flex uppercase text-sm items-center gap-1 text-green-500">
                    <Tag size={16} />
                    {appliedPromoCode} applied
                  </p>
                  <X
                    className="h-5 w-5 cursor-pointer"
                    onClick={() => {
                      setAppliedPromoCode("");
                      setValue("coupon_code", "");
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!watch("coupon_code")}
                className="flex items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit whitespace-nowrap"
              >
                {isPending || loading ? <Spinner /> : "Apply Coupon"}
              </button>
              <div
                onClick={() => {
                  handleSubscribePlan();
                }}
                className="flex cursor-pointer items-center gap-2 bg-primary-green text-white px-6 py-2 h-12 rounded-xl sheen w-full max-w-fit whitespace-nowrap"
              >
                {loading ? <Spinner /> : "Continue without Coupon"}
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CouponModal;
