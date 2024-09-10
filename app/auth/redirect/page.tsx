"use client";

import Spinner from "@/components/Spinner";
import { useRouter } from "next-nprogress-bar";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "@/lib/features/auth/auth.slice";
import { setCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  toast.success("Wait Redirecting to dashboard...");
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      const user_name = searchParams.get("user_name");
      const id = searchParams.get("id");
      const email = searchParams.get("email");
      const avatar = searchParams.get("avatar");
      const isSubscribed = searchParams.get("isSubscribed");
      const isExpired = searchParams.get("isExpired");

      //   console.log(token);
      setCookie("token", token, {
        secure: true,
        // path: "/",
        sameSite: "none",
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      });
      const user = {
        user_name,
        email,
        id,
        avatar,
        isSubscribed,
        isExpired,
      };

      console.log(isSubscribed);
      dispatch(login(user));
      // if (!isSubscribed) {
      //   router.push("/Payment");
      // } else if (isSubscribed && isExpired) {
      //   router.push("/account/billings/settings/due");
      // }else {
      //   router.push("/app")
      // }
      toast.success("Successfully logged in...");
    } else {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2>Wait Redirecting to dashboard...</h2>
      <div className="itemh-screen">
        <div className="w-12 h-12 rounded-full absolute border-8 border-solid border-gray-200"></div>
        <div className="w-12 h-12 rounded-full animate-spin absolute  border-8 border-solid border-green-500 border-t-transparent"></div>
      </div>
    </div>
  );
}
