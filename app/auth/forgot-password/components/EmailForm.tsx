"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import clsx from "clsx";
import toast from "react-hot-toast";
import Spinner from "@/components/Spinner";
import { API_URL } from "@/lib/api";
import Motion from "@/components/Motion";
import Link from "next/link";

const EmailValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailValidationSchemaType = z.infer<typeof EmailValidationSchema>;

interface EmailFormProps {
  onEmailSubmitted: (email: string) => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ onEmailSubmitted }) => {
  const [isPending, setIsPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailValidationSchemaType>({
    resolver: zodResolver(EmailValidationSchema),
  });

  const onSubmit: SubmitHandler<EmailValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const validatedData = EmailValidationSchema.parse(data);
      const response = await axios.post(API_URL + "/users/api/v1/password-reset-request", validatedData);
      toast.success(response.data.message);
      onEmailSubmitted(data.email); // Call the callback function to proceed to OTP verification
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.error || error.response.data);
      } else {
        toast.error(error.message);
      }
      console.error("Couldn't send password reset link!", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Motion transition={{ duration: 0.2 }} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
      <div className="space-y-6 w-full">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-center">Forgot password?</h1>
          <p className="text-[#002030B2] text-base text-center">Enter your email to receive password reset OTP</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 !mt-7 w-full">
          <div>
            <div
              className={clsx(
                "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                errors.email && "border-rose-600 focus-within:border-rose-600"
              )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.3487 1.3335C13.6204 1.3335 15.3333 3.19127 15.3333 5.65486V10.3509C15.3333 11.6118 14.8885 12.7509 14.0801 13.5591C13.355 14.2832 12.4143 14.6668 11.3596 14.6668H4.63822C3.58563 14.6668 2.6456 14.2839 1.91977 13.5591C1.1114 12.7509 0.666626 11.6118 0.666626 10.3509V5.65486C0.666626 3.19127 2.37956 1.3335 4.65118 1.3335H11.3487ZM11.3487 2.35914H4.65118C2.93552 2.35914 1.68988 3.74512 1.68988 5.65486V10.3509C1.68988 11.3376 2.02824 12.219 2.64219 12.8323C3.17156 13.3622 3.8626 13.6412 4.64027 13.6412H11.3487C11.3501 13.6398 11.3556 13.6412 11.3596 13.6412C12.138 13.6412 12.8284 13.3622 13.3577 12.8323C13.9724 12.219 14.31 11.3376 14.31 10.3509V5.65486C14.31 3.74512 13.0644 2.35914 11.3487 2.35914ZM12.4238 5.52413C12.6019 5.74362 12.5685 6.06635 12.3495 6.2455L9.31791 8.71524C8.93453 9.0202 8.47611 9.17268 8.01838 9.17268C7.56201 9.17268 7.107 9.02156 6.72635 8.71934L3.66681 6.24686C3.44647 6.06909 3.41236 5.74567 3.58904 5.5255C3.76709 5.30601 4.08908 5.27114 4.30873 5.44823L7.36554 7.91798C7.7496 8.22293 8.29056 8.22293 8.67735 7.91524L11.7035 5.4496C11.9231 5.26977 12.2451 5.30396 12.4238 5.52413Z"
                  fill="#667085"
                />
              </svg>
              <div className="relative group space-y-2 cursor-text w-full">
                <input
                  id="email"
                  autoComplete="email"
                  className="text-sm  focus:ring-0 h-[60px] w-full"
                  placeholder="Enter your email..."
                  {...register("email")}
                />
              </div>
            </div>
            {errors.email && <span className="text-rose-600 text-sm">{errors.email?.message}</span>}
          </div>

          <button type="submit" className="bg-primary-green hover:bg-primary-green/90 text-white h-[60px] w-full rounded-xl flex justify-center items-center">
            {isPending ? <Spinner /> : "Reset password"}
          </button>
        </form>
        <Link href="/auth/login" className="text-[#14171B] text-center flex items-center gap-4 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#14171B" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to login
        </Link>
      </div>
    </Motion>
  );
};

export default EmailForm;
