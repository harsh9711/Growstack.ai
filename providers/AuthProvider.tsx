"use client";

import { isAuthenticated } from "@/lib/features/auth/auth.selector";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = isAuthenticated();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
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
