import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Progressbar from "@/providers/Progressbar";
import { Suspense } from "react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  adjustFontFallback: true,
  preload: true,
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrowStack Ai",
  description: "GrowStack Ai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<div style={{ height: "100vh", display: "flex", alignContent: "center", justifyContent: "center" }}>Loading...</div>}>
          <Progressbar>{children}</Progressbar>
        </Suspense>
      </body>
    </html>
  );
}
