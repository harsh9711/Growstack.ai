"use client";

import Spinner from "@/components/Spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import instance from "@/config/axios.config";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/auth.slice";

export default function Register() {
  const router = useRouter();
  const dispatch = useDispatch();

  const ValidationSchema = z
  .object({
    email: z
      .string()
      .email("Please enter a valid email address") // Basic email validation
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email must be a valid format (e.g., user@example.com)"
      ), // Stricter regex for proper email format
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can't exceed 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });


  const [isPending, setIsPending] = useState(false);

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
    defaultValues: { agreeToTerms: false },
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async (data) => {
    setIsPending(true);
    try {
      const { email, password } = data;
      const response = await instance.post(API_URL + "/users/api/v1/signup", {
        email,
        password,
      });
      toast.success(response.data.message);
      dispatch(login(response.data.data));
      router.push("/app");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Login failed:", error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main>
      <div className="flex flex-col-reverse xl:flex-row-reverse h-screen overflow-y-auto gap-10">
        <section className="w-full h-full flex justify-center items-center bg-white">
          <div className="w-full max-w-2xl max-h-[900px] h-full p-14 bg-[#F7FAFC] rounded-[30px]">
            <div className="slide-reveal w-full h-full max-w-[460px] mx-auto flex flex-col justify-between items-center md:items-start space-y-10">
              <Image src={"/logo/growstack.png"} alt="growstack" height={180} width={180} className="max-h-14" />
              <div className="space-y-6 w-full">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-center md:text-left">Get started</h1>
                  <p className="text-[#002030B2] text-base text-center md:text-left">Create your account now.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-7 !mt-7 w-full">
                  {/* styled input field for email */}
                  <div>
                    <div
                      className={clsx(
                        "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                        errors["email"] && "border-rose-600 focus-within:border-rose-600"
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
                          className="text-sm peer focus:ring-0 h-[60px] w-full"
                          placeholder="Enter your email..."
                          {...register("email")}
                        />
                      </div>
                    </div>
                    {errors.email && <span className="text-rose-600 text-sm">{errors.email?.message}</span>}
                  </div>

                  {/* styled input field for password */}
                  <div>
                    <div
                      className={clsx(
                        "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                        errors["password"] && "border-rose-600 focus-within:border-rose-600"
                      )}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.0089 0.667799C10.104 0.667799 11.8102 2.41153 11.8102 4.55489L11.8101 5.71098C13.0838 6.164 14 7.40324 14 8.85761V12.0026C14 13.8395 12.5385 15.3332 10.7412 15.3332H5.25883C3.46152 15.3332 2 13.8395 2 12.0026V8.85761C2 7.40351 2.91589 6.16447 4.18921 5.71123L4.1897 4.55489C4.19401 3.49898 4.59365 2.52445 5.31473 1.79411C6.03652 1.06304 6.98935 0.639935 8.0089 0.667799ZM10.7412 6.62699H5.25883C4.05489 6.62699 3.07623 7.62717 3.07623 8.85761V12.0026C3.07623 13.2331 4.05489 14.2333 5.25883 14.2333H10.7412C11.9444 14.2333 12.9238 13.2331 12.9238 12.0026V8.85761C12.9238 7.62717 11.9444 6.62699 10.7412 6.62699ZM7.99986 9.06571C8.2969 9.06571 8.53797 9.31209 8.53797 9.61567V11.2443C8.53797 11.5479 8.2969 11.7942 7.99986 11.7942C7.70282 11.7942 7.46174 11.5479 7.46174 11.2443V9.61567C7.46174 9.31209 7.70282 9.06571 7.99986 9.06571ZM8.00674 1.76771H7.99526C7.26845 1.76771 6.58755 2.05369 6.07311 2.57505C5.55508 3.09861 5.26881 3.79742 5.26594 4.54243L5.26529 5.52666H10.7333L10.7339 4.55489C10.7339 3.01795 9.5106 1.76771 8.00674 1.76771Z"
                          fill="#667085"
                        />
                      </svg>
                      <div className="relative group space-y-2 cursor-text w-full">
                        <input
                          type="password"
                          id="password"
                          autoComplete="password"
                          placeholder="Enter your password..."
                          className={clsx("text-sm peer focus:ring-0 h-[60px] w-full")}
                          {...register("password")}
                        />
                      </div>
                    </div>
                    {errors.password && <span className="text-rose-600 text-sm">{errors.password?.message}</span>}
                  </div>

                  {/* styled input field for password confirmation*/}
                  <div>
                    <div
                      className={clsx(
                        "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                        errors["confirmPassword"] && "border-rose-600 focus-within:border-rose-600"
                      )}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16" fill="none">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.0089 0.667799C10.104 0.667799 11.8102 2.41153 11.8102 4.55489L11.8101 5.71098C13.0838 6.164 14 7.40324 14 8.85761V12.0026C14 13.8395 12.5385 15.3332 10.7412 15.3332H5.25883C3.46152 15.3332 2 13.8395 2 12.0026V8.85761C2 7.40351 2.91589 6.16447 4.18921 5.71123L4.1897 4.55489C4.19401 3.49898 4.59365 2.52445 5.31473 1.79411C6.03652 1.06304 6.98935 0.639935 8.0089 0.667799ZM10.7412 6.62699H5.25883C4.05489 6.62699 3.07623 7.62717 3.07623 8.85761V12.0026C3.07623 13.2331 4.05489 14.2333 5.25883 14.2333H10.7412C11.9444 14.2333 12.9238 13.2331 12.9238 12.0026V8.85761C12.9238 7.62717 11.9444 6.62699 10.7412 6.62699ZM7.99986 9.06571C8.2969 9.06571 8.53797 9.31209 8.53797 9.61567V11.2443C8.53797 11.5479 8.2969 11.7942 7.99986 11.7942C7.70282 11.7942 7.46174 11.5479 7.46174 11.2443V9.61567C7.46174 9.31209 7.70282 9.06571 7.99986 9.06571ZM8.00674 1.76771H7.99526C7.26845 1.76771 6.58755 2.05369 6.07311 2.57505C5.55508 3.09861 5.26881 3.79742 5.26594 4.54243L5.26529 5.52666H10.7333L10.7339 4.55489C10.7339 3.01795 9.5106 1.76771 8.00674 1.76771Z"
                          fill="#667085"
                        />
                      </svg>
                      <div className="relative group space-y-2 cursor-text w-full">
                        <input
                          type="password"
                          id="confirm-password"
                          autoComplete="confirm-password"
                          placeholder="Confirm password"
                          className={clsx("text-sm peer focus:ring-0 h-[60px] w-full")}
                          {...register("confirmPassword")}
                        />
                      </div>
                    </div>
                    {errors.confirmPassword && <span className="text-rose-600 text-sm">{errors.confirmPassword?.message}</span>}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="agree-to-terms" defaultChecked={false} onCheckedChange={(checked) => setValue("agreeToTerms", Boolean(checked))} />
                      <label
                        htmlFor="agree-to-terms"
                        className="text-sm font-medium text-[#667085] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        I agree to the{" "}
                        <Link href="/user-agreements/terms-and-conditions" className="text-primary-green">
                          Terms & Conditions
                        </Link>{" "}
                        and{" "}
                        <Link href="/user-agreements/privacy-policy" className="text-primary-green">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {errors.agreeToTerms && <span className="text-rose-600 text-sm">{errors.agreeToTerms.message}</span>}
                  </div>
                  <button
                    type="submit"
                    className="bg-primary-green hover:bg-primary-green/90 text-white h-[60px] w-full rounded-xl flex justify-center items-center">
                    {isPending ? <Spinner /> : "Register"}
                  </button>
                </form>

                <div className="flex items-center text-[#667085] gap-2">
                  <div className="h-[2px] w-full bg-[#EFEFF4]" />
                  <span className="whitespace-nowrap">or, Sign up with</span>
                  <div className="h-[2px] w-full bg-[#EFEFF4]" />
                </div>
                <div className="space-y-3">
                  <Link
                    href={`${API_URL}/users/api/v1/auth/facebook`}
                    className="h-[56px] w-full border border-[#D0D5DD] flex justify-center items-center gap-2 px-4 rounded-xl hover:bg-primary-light-gray transition-all outline-none focus:ring focus:ring-[#00203021] textDecorationNone">
                    <Image src="/icons/facebook.svg" alt="" width={20} height={20} />
                    Continue with Facebook
                  </Link>
                  <Link
                    href={`${API_URL}/users/api/v1/auth/google`}
                    className="h-[56px] w-full border border-[#D0D5DD] flex justify-center items-center gap-2 px-4 rounded-xl hover:bg-primary-light-gray transition-all outline-none focus:ring focus:ring-[#00203021] textDecorationNone">
                    <Image src="/icons/google.svg" alt="" width={20} height={20} />
                    Continue with Google
                  </Link>
                </div>
                <p className="text-center text-[#667085]">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary-green font-semibold">
                    Login Now
                  </Link>
                </p>
              </div>
              <div />
            </div>
          </div>
        </section>
        <section className="w-full flex flex-col justify-center items-center p-5 py-12 md:py-20 gap-20 bg-[#F7FAFC] rounded-r-[60px]">
          <h1 className="text-2xl font-semibold">Unlock the Power of AI</h1>
          <Image src="/assets/auth-stats.png" alt="" width={550} height={550} />
        </section>
      </div>
    </main>
  );
}
