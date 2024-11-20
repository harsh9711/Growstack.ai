// ClientProviders.tsx
"use client";

import { ReactNode } from "react";
import IntercomProvider from "@/providers/IntercomProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <IntercomProvider>{children}</IntercomProvider>;
}
