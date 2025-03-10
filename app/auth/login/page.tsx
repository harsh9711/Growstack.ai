"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next-nprogress-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { API_URL } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/config/axios.config";
import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/auth.slice";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoginBackgroundImg, LoginRightImg, LoginRightImg2 } from "@/components/svgs";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import withUnAuthGuard from "@/components/guard/unAuthGuard";

const Login = () => {
  const { isAuthenticated } = useSelector(
    (rootState: RootState) => rootState.auth
  );

  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [fieldHeight, setFieldHeight] = useState("55px");
  const [zoom, setZoom] = useState("1");
  const [largeScreen, setLargeScreen] = useState(true);


  useEffect(() => {
    const handleResize = () => {
      setFieldHeight(window.innerWidth <= 1422 ? "44px" : "55px");
      setZoom(window.innerWidth <= 1422 ? "0.8" : "1")
      setLargeScreen(window.innerWidth <= 1600 ? false : true)
    };

    // Set initial height based on window width
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect runs once on mount

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const ValidationSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password can't exceed 20 characters"),
    remember_me: z.boolean().optional().default(false),
  });
  const [isPending, setIsPending] = useState(false);

  type ValidationSchemaType = z.infer<typeof ValidationSchema>;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/app");
    }
  }, [isAuthenticated]);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchemaType>({
    resolver: zodResolver(ValidationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchemaType> = async data => {
    setIsPending(true);
    try {
      const validatedData = ValidationSchema.parse(data);
      const response = await axios.post(
        API_URL + "/users/api/v1/auth/login",
        validatedData
      );
      const expiryTime = watch("remember_me")
        ? 30 * 24 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000;

      setCookie("token", response.data.data.token, {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + expiryTime),
        // domain: process.env.NEXT_PUBLIC_APP_BASE_URL,
      });

      const userData = await handleGetProfileData();
      dispatch(login(userData));
      router.push("/app");
      toast.success(response.data.message);
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

  const handleGetProfileData = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/api/v1`);
      const userData = response?.data?.data;
      return userData;
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <LoginBackgroundImg
        className="absolute bottom-0 left-0 h-auto"
        style={{ zoom: "0.65", marginTop: "0px" }}
      />
      {/* Left Section */}
      <div className="flex justify-center">
        <section
          className="w-[65%] h-full flex justify-center items-center transform lg:scale-90"
          style={{ zoom: zoom }} // Apply zoom directly with inline styles
        >
          <div className="w-full p-14 bg-[#F7FAFC] rounded-[30px]">
            <div className="slide-reveal w-full h-full max-w-[660px] mx-auto flex flex-col items-center md:items-start space-y-10">
              <Image
                src="/logo/growstack1.png"
                alt="growstack"
                height={180}
                width={180}
                className="max-h-14"
              />
              <div className="space-y-3 w-full">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold text-center md:text-left  ">
                    Sign in to your account
                  </h1>
                  <p className="text-[#002030B2] text-base text-center md:text-left">
                    Welcome back! Nice too see you again
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-7 !mt-7 w-full"
                >
                  {/* styled input field for email */}
                  <div>
                    <div
                      className={clsx(
                        "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                        errors["email"] &&
                        "border-rose-600 focus-within:border-rose-600"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
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
                          autoComplete="email" style={{ height: fieldHeight }}
                          className={`text-sm peer bg-white focus:ring-0 w-full`}
                          placeholder="Enter your email..."
                          {...register("email")}
                        />

                      </div>
                    </div>
                    {errors.email && (
                      <span className="text-rose-600 text-sm">
                        {errors.email?.message}
                      </span>
                    )}
                  </div>

                  {/* styled input field for password */}
                  <div>
                    <div
                      className={clsx(
                        "w-full h-full flex items-center gap-3 bg-white outline-none border border-[#00203056] rounded-xl px-4 transition-all focus-within:border-primary-green",
                        errors["password"] &&
                        "border-rose-600 focus-within:border-rose-600"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.0089 0.667799C10.104 0.667799 11.8102 2.41153 11.8102 4.55489L11.8101 5.71098C13.0838 6.164 14 7.40324 14 8.85761V12.0026C14 13.8395 12.5385 15.3332 10.7412 15.3332H5.25883C3.46152 15.3332 2 13.8395 2 12.0026V8.85761C2 7.40351 2.91589 6.16447 4.18921 5.71123L4.1897 4.55489C4.19401 3.49898 4.59365 2.52445 5.31473 1.79411C6.03652 1.06304 6.98935 0.639935 8.0089 0.667799ZM10.7412 6.62699H5.25883C4.05489 6.62699 3.07623 7.62717 3.07623 8.85761V12.0026C3.07623 13.2331 4.05489 14.2333 5.25883 14.2333H10.7412C11.9444 14.2333 12.9238 13.2331 12.9238 12.0026V8.85761C12.9238 7.62717 11.9444 6.62699 10.7412 6.62699ZM7.99986 9.06571C8.2969 9.06571 8.53797 9.31209 8.53797 9.61567V11.2443C8.53797 11.5479 8.2969 11.7942 7.99986 11.7942C7.70282 11.7942 7.46174 11.5479 7.46174 11.2443V9.61567C7.46174 9.31209 7.70282 9.06571 7.99986 9.06571ZM8.00674 1.76771H7.99526C7.26845 1.76771 6.58755 2.05369 6.07311 2.57505C5.55508 3.09861 5.26881 3.79742 5.26594 4.54243L5.26529 5.52666H10.7333L10.7339 4.55489C10.7339 3.01795 9.5106 1.76771 8.00674 1.76771Z"
                          fill="#667085"
                        />
                      </svg>
                      <div className="relative w-full">
                        <style jsx>{`
                          input[type="password"]::-ms-reveal,
                          input[type="password"]::-ms-clear,
                          input[type="password"]::-webkit-inner-spin-button {
                            display: none;
                          }
                        `}</style>
                        <input
                          type={passwordVisible ? "text" : "password"}
                          id="password"
                          autoComplete="password"
                          placeholder="Enter your password..." style={{ height: fieldHeight }}
                          className={`text-sm peer bg-white focus:ring-0  w-full`}
                          {...register("password")}
                        />
                        <span
                          style={{ marginLeft: "20px", opacity: "0.6" }}
                          onClick={togglePasswordVisibility}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                        >
                          {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>
                    {errors.password && (
                      <span className="text-rose-600 text-sm">
                        {errors.password?.message}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="remember_me"
                        checked={watch("remember_me")}
                        onCheckedChange={() => {
                          setValue("remember_me", !watch("remember_me"));
                        }}
                      />
                      <label
                        htmlFor="remember-me"
                        className="text-sm font-medium text-[#667085] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Remember me
                      </label>
                    </div>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[#2DA771]"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit" style={{ height: fieldHeight }}
                    className={`bg-[#2DA771] hover:bg-[#2DA771]/90 text-white w-full rounded-xl flex justify-center items-center `}
                  >
                    {isPending ? <Spinner /> : "Login"}
                  </button>
                </form>

                <div className="flex items-center text-[#667085] gap-2">
                  <div className="h-[2px] w-full bg-[#EFEFF4]" />
                  <span className="whitespace-nowrap">or, Login with</span>
                  <div className="h-[2px] w-full bg-[#EFEFF4]" />
                </div>
                <div className="space-y-3">
                  <Link
                    href={`${API_URL}/users/api/v1/auth/facebook`} style={{ height: fieldHeight }}
                    className={`w-full border border-[#D0D5DD] flex justify-center items-center gap-2 px-4 rounded-xl hover:bg-primary-light-gray transition-all outline-none focus:ring focus:ring-[#00203021] textDecorationNone`}
                  >
                    <Image
                      src="/icons/facebook.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    Continue with Facebook
                  </Link>
                  <Link
                    href={`${API_URL}/users/api/v1/auth/google`} style={{ height: fieldHeight }}
                    className={`w-full border border-[#D0D5DD] flex justify-center items-center gap-2 px-4 rounded-xl hover:bg-primary-light-gray transition-all outline-none focus:ring focus:ring-[#00203021] textDecorationNone `}
                  >
                    <Image
                      src="/icons/google.svg"
                      alt=""
                      width={20}
                      height={20}
                    />
                    Continue with Google
                  </Link>
                </div>

                <p className="text-center text-[#667085]">
                  Do not have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-[#2DA771] font-semibold"
                  >
                    Register Now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Right Section */}
      <section className="hidden md:flex flex-col justify-center items-center text-center bg-[#F7FAFC]">
        <div className="relative text-center flex justify-center items-center">
          <h1 className="absolute text-2xl font-semibold top-10">
            Unlock the Power of AI
          </h1>
          <div className="scale-[0.6] md:scale-75 lg:scale-100 ">
            {largeScreen ? (
              <LoginRightImg className="w-[100%] h-[100%]" />
            ) : (
              <LoginRightImg2 className="w-[100%] h-[100%]" />
            )}
          </div>
        </div>

      </section>
    </div>

  );
};

export default withUnAuthGuard(Login);
