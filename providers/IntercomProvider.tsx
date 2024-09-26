import React, { Fragment, useEffect, useState } from "react";
import Intercom, { onUnreadCountChange } from "@intercom/messenger-js-sdk";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function IntercomProvider({ children }: { children: React.ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    Intercom({
      app_id: "v4t5atvn",
      custom_launcher_selector: "#intercom-launcher",
      hide_default_launcher: true,
    });

    const checkUnreadMessages = setInterval(() => {
      onUnreadCountChange(function (unreadCount: number) {
        console.log(unreadCount)
        if (unreadCount > 0) {
          setUnreadCount(unreadCount);
        } else {
          setUnreadCount(0);
        }
      });
    }, 5000);
    return () => {
      clearInterval(checkUnreadMessages);
    };
  }, []);

  const isAppRoute = pathname === "/app";

  return (
    <Fragment>
      {children}
      <div
        typeof="button"
        id="intercom-launcher"
        className=" rounded-full  absolute cursor-pointer bottom-10 right-10"
      >
        {
          isAppRoute && (
            <div className="relative z-50">
              <Image src="/assets/chat.png" alt="Chat icon" width={40} height={40} />
              {unreadCount > 0 && (
                <span
                  style={{
                    right: "-0.6rem",
                    top: "-0.4rem",
                  }}
                  className="absolute top-0  bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {unreadCount}
                </span>
              )}
            </div>
          )
        }
      </div>
    </Fragment>
  );
}
