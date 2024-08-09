import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import Progressbar from "@/providers/Progressbar";
import { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { GoogleAnalytics } from "@next/third-parties/google";
import StateProvider from "@/providers/StateProvider";
import SuspenseLoader from "@/components/SuspenseLoader";
import "./layout.scss";
import 'aos/dist/aos.css';
import "../styles/new.css";
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <StateProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <Progressbar>{children}</Progressbar>
            <Toaster />
          </Suspense>
        </StateProvider>
      </body>
      <GoogleAnalytics gaId="G-4F6RLEFEVZ" />
    </html>
  );
}
