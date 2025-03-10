"use client";

import { BrowserCheckIcon, FormsIcon, SurveyIcon } from "@/components/svgs";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeLinkIndex, setActiveLinkIndex] = useState(0);

  useEffect(() => {
    if (pathname === "/account/billings/settings") {
      setActiveLinkIndex(0);
    } else if (pathname === "/account/billings/settings/history") {
      setActiveLinkIndex(1);
    }
  }, [pathname]);

  return (
    <main className="mt-10">
      {/* <div className="flex gap-2">
        <Link href="/account/billings/settings">
          <span className="cursor-pointer">Settings</span>
        </Link>
        <ChevronRight size={20} />
        <Link href={activeLinkIndex === 0 ? "/account/billings/settings" : "/account/billings/settings/history"}>
          <span className="text-primary-green font-medium cursor-pointer">
            {activeLinkIndex === 0 ? "Billing Overview" : "Billing History"}
          </span>
        </Link>
      </div> */}

      <div className="w-full flex items-start gap-8 mt-5">
        <div className="!bg-white shadow-box p-5 !rounded-3xl w-full max-w-[350px]">
          <Link href="/account/billings/settings">
            <div
              className={clsx(
                "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
                pathname === "/account/billings/settings" &&
                  "bg-[#2DA771] text-white hover:bg-[#2DA771]/90"
              )}
            >
              <div className="flex items-center gap-2">
                <BrowserCheckIcon />
                <span>Billing Overview</span>
              </div>
              <ChevronRight size={20} />
            </div>
          </Link>
          {/* <Link href="/account/billings/settings/credits">
            <div
              className={clsx(
                "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
                pathname === "/account/billings/settings/credits" && "bg-primary-green text-white hover:bg-primary-green/90"
              )}>
              <div className="flex items-center gap-2">
                <FormsIcon />
                <span>Credits</span>
              </div>
              <ChevronRight size={20} />
            </div>
          </Link> */}
          <Link href="/account/billings/settings/history">
            <div
              className={clsx(
                "w-full flex justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition mt-3",
                pathname === "/account/billings/settings/history" &&
                  "bg-[#2DA771] text-white hover:bg-[#2DA771]/90"
              )}
            >
              <div className="flex items-center gap-2">
                <SurveyIcon />
                <span>Billing History</span>
              </div>
              <ChevronRight size={20} />
            </div>
          </Link>
        </div>
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
}
