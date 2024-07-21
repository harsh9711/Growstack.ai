"use client";

import { isAuthenticated } from "@/lib/features/auth/auth.selector";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { getCookie } from "cookies-next";

import { usePathname } from "next/navigation";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const isLoggedIn = isAuthenticated();
  let isLoggedIn = false;
  console.log(getCookie("token"));
  if (getCookie("token")) {
    isLoggedIn = true;
  }
  const router = useRouter();
  const pathname = usePathname();

  console.log(pathname);
  useEffect(() => {
    if (pathname !== "/auth/redirect" && !isLoggedIn) {
      toast.error("Login to view this page!");
      router.push("/auth/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
