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

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/auth/redirect" && !isLoggedIn) {
      router.push("/auth/login");
    } else if (
      pathname !== "/auth/redirect" &&
      pathname !== "/Payment" &&
      !isSubscribed
    ) {
      console.log("You need a subscription to view this page!");
      // toast.error("You need a subscription to view this page!");
      router.push("/Payment");
    } else if (isLoggedIn && isSubscribed && pathname === "/auth/login") {
      router.push("/app");
    }
  }, [isLoggedIn, isSubscribed, pathname, router]);

  if (!isLoggedIn || !isSubscribed) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
