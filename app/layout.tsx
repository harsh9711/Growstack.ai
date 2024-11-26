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
import "aos/dist/aos.css";
import "../styles/new.css";
import Script from "next/script";
import ClientProviders from "@/providers/ClientProvider";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  adjustFontFallback: true,
  preload: true,
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
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
      <head>
        <link rel="icon" href="/logo/growstack-mini.svg" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CLCETMEDBL"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CLCETMEDBL');
          `}
        </Script>
        <Script id="happierleads" strategy="lazyOnload">
          {`
            !function(){var e="rest.happierleads.com/v3/script?clientId=ehacgbpBj346Npwip2yrSJ&version=4.0.0",
            t=document.createElement("script");window.location.protocol.split(":")[0];
            t.src="https://"+e;var c=document.getElementsByTagName("script")[0];
            t.async = true;
            t.onload = function(){ new Happierleads.default };
            c.parentNode.insertBefore(t,c)}();
          `}
        </Script>
        <Script
          src="https://app.10xlaunch.ai/widget"
          data-app-id="889a8e5c-0c2c-44cb-8494-a1978142001e"
          async
          defer
        ></Script>
      </head>
      <body className={poppins.variable}>
        <StateProvider>
          <Suspense fallback={<SuspenseLoader />}>
            <Progressbar>
              <ClientProviders>
                {" "}
                {/* Moved client-specific providers here */}
                <main className="w-full">{children}</main>
              </ClientProviders>
            </Progressbar>
            <Toaster />
          </Suspense>
        </StateProvider>
      </body>
      <GoogleAnalytics gaId="G-4F6RLEFEVZ" />
    </html>
  );
}
