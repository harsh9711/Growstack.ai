import React, { Fragment } from "react";
import Intercom from "@intercom/messenger-js-sdk";

export default function IntercomProvider({ children }: { children: React.ReactNode }) {
  Intercom({
    app_id: "v4t5atvn",
    custom_launcher_selector: "#intercom-launcher",
    hide_default_launcher: true,
  });

  return <Fragment>{children}</Fragment>;
}
