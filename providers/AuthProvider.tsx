"use client";

import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";
import { RootState } from "@/lib/store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!getCookie("token");
  const user = useSelector((state: RootState) => state.auth.user);
  const isSubscribed = user?.isSubscribed || false;

  console.log(isSubscribed);

  const router = useRouter();
  const pathname = usePathname();
  console.log("subscrie", isSubscribed);
  useEffect(() => {
    if (pathname !== "/auth/redirect" && !isLoggedIn) {
      toast.error("Login to view this page!");
      router.push("/auth/login");
    } else if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      isSubscribed == "false"
    ) {
      toast.error("You need a subscription to view this page!");
      router.push("/Payment");
    } else {
      router.push("/app");
    }
  }, [isLoggedIn, isSubscribed]);

  // if (!isLoggedIn || !isSubscribed) {
  //   return null;
  // }

  return <>{children}</>;
};

export default AuthProvider;
