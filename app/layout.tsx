import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";

const poppins = Poppins({
  weight: ["400"],
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
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
