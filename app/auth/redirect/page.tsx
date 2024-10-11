"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation"; // Correct import for useRouter
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/auth.slice";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import instance from "@/config/axios.config";
import { API_URL } from "@/lib/api";


export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const fetchUserAfterRedirectionSuccess = async () => {
    try {
      const userData = (await instance.get(`${API_URL}/users/api/v1`)).data?.data;
      if (!userData) {
        router.push("/auth/login");
      }

      dispatch(login(userData));

      if (!userData.isSubscribed) {
        router.push("/Payment");
      } else if (userData.isSubscribed === "true" && userData.isExpired === "true") {
        router.push("/account/billings/settings/due");
      } else {
        router.push("/app");
      }
      toast.success("Successfully logged in...");
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setCookie("token", token, {
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      fetchUserAfterRedirectionSuccess()
    } else {
      router.push("/auth/login");
    }
  }, [searchParams, router, dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Wait Redirecting to dashboard...</h2>
      <div className="itemh-screen">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute border-8 border-solid border-green-500 border-t-transparent"></div>
      </div>
    </div>
  );
}
