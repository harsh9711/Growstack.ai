/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div
      className="
        flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-4xl">404</h1>
      <Image
        alt="missing site"
        src="https://illustrations.popsy.co/green/resistance-band.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-slate-500">
        "Blimey! You've found a page that doesn't exist."
      </p>
      <Button className="bg-primary-green mt-8 text-white sheen transition duration-500 px-5 py-4 rounded-xl flex items-center gap-2">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
