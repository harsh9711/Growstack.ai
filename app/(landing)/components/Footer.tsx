import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RiFacebookLine, RiLinkedinLine, RiPinterestLine, RiTwitterXLine } from "react-icons/ri";
import "@/styles/button.css";

export default function Footer() {
  return (
    <footer className="mt-20 px-3 md:px-12 bg-primary-light-gray">
      <div className="flex justify-between max-w-[1480px] mx-auto py-20 items-center">
        <h1 className="text-[42px] font-semibold max-w-lg leading-relaxed text-primary-green">Ready to see a personalized demo?</h1>
        <div className="flex gap-4">
          <button className="bg-white hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-10 py-5 rounded-xl font-semibold">
            View Demo
          </button>
          <button className="bg-transparent ring-1 ring-primary-green ring-inset hover:bg-primary-green hover:text-white sheen transition duration-500 text-primary-green px-5 py-5 rounded-xl font-semibold">
            Get 14-day free trial
          </button>
        </div>
      </div>
      <div className="max-w-[1860px] mx-auto bg-primary-green rounded-t-[50px] text-white">
        <div className="max-w-[1480px] mx-auto pt-20">
          <div className="w-full flex flex-col lg:flex-row gap-10 justify-between mt-6">
            <div className="w-full flex justify-between">
              <h1 className="text-2xl w-full max-w-[200px]">
                Grow<span className="font-semibold">Stack</span>
              </h1>
              <div className="space-y-6">
                <h1 className="font-semibold text-lg">Company</h1>
                <ul className="space-y-5">
                  <li className="hover:underline">
                    <Link href="#">Pricing</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Get the App</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Blog</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">FAQ</Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h1 className="font-semibold text-lg">Features</h1>
                <ul className="!space-y-5">
                  <li className="hover:underline">
                    <Link href="#">Research assistant</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">AI Marketing & Sales Apps</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Imaginate app</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Marketing and sales assistants</Link>
                  </li>
                </ul>
              </div>
              <div className="space-y-6">
                <h1 className="font-semibold text-lg">Support</h1>
                <ul className="!space-y-5">
                  <li className="hover:underline">
                    <Link href="#">Support</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Terms & Condition</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Privacy Policy</Link>
                  </li>
                  <li className="hover:underline">
                    <Link href="#">Community</Link>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:max-w-[380px]">
                <h1 className="font-semibold text-lg">Newsletter</h1>
                <p className="mt-12">Subscribe to our newsletter</p>
                <div className="bg-transparent ring-1 ring-[white]/80 p-2 flex rounded-2xl gap-2 mt-6">
                  <Image src="/icons/sms.svg" alt="sms" width={22} height={22} className="ml-4" />
                  <input
                    type="text"
                    className="bg-transparent w-full flex-1 outline-none px-2 rounded-xl placeholder:text-white text-white"
                    placeholder="Enter your email"
                  />
                  <button className="bg-primary-blue text-white p-[20px] rounded-xl bg-primary-light-green hover:bg-[#8eff7d] transition">
                    <ArrowRight className="text-primary-green" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E0E4EB] flex flex-col-reverse md:flex-row gap-8 justify-between items-center py-10 mt-20">
            <p>©2024 Company Name. All right reserved.</p>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-transparent hover:bg-white text-white hover:text-primary-green ring-1 ring-[white]/80 p-4 flex justify-center items-center rounded-full hover:bg-primary-blue transition duration-300">
                <RiTwitterXLine size={20} />
              </Link>
              <Link
                href="https://facebook.com"
                target="_blank"
                className="bg-transparent hover:bg-white text-white hover:text-primary-green ring-1 ring-[white]/80 p-4 flex justify-center items-center rounded-full hover:bg-primary-blue transition duration-300">
                <RiFacebookLine size={20} />
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                className="bg-transparent hover:bg-white text-white hover:text-primary-green ring-1 ring-[white]/80 p-4 flex justify-center items-center rounded-full hover:bg-primary-blue transition duration-300">
                <RiLinkedinLine size={20} />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="bg-transparent hover:bg-white text-white hover:text-primary-green ring-1 ring-[white]/80 p-4 flex justify-center items-center rounded-full hover:bg-primary-blue transition duration-300">
                <RiPinterestLine size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
