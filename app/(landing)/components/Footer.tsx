import Image from "next/image";
import Link from "next/link";
import { RiFacebookLine, RiLinkedinLine, RiPinterestLine, RiTwitterXLine } from "react-icons/ri";
import Logo from "./shared/Logo";

export default function Footer() {
  return (
    <footer className="mt-20 px-3 md:px-12">
      <div className="max-w-[1860px] mx-auto bg-primary-green rounded-t-[50px] text-white">
        <div className="max-w-[1560px] mx-auto pt-20">
          <div className="w-full flex flex-col lg:flex-row gap-10 justify-between mt-6">
            <div className="w-full flex justify-between">
              <h1 className="text-2xl w-full max-w-[200px]">
                Grow<span className="font-semibold">Stack</span>
              </h1>
              <div className="space-y-6">
                <h1 className="font-bold text-lg">Company</h1>
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
                <h1 className="font-bold text-lg">Features</h1>
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
                <h1 className="font-bold text-lg">Support</h1>
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
              <div className="">
                <h1 className="font-bold text-lg">Newsletter</h1>
                <p className="mt-3">Subscribe to our newsletter</p>
                <div className="bg-transparent ring-1 ring-[white]/80 p-3.5 flex rounded-2xl gap-2 mt-7 lg:max-w-2xl">
                  <Image src="/icons/sms.svg" alt="sms" width={20} height={20} />
                  <input type="text" className="bg-transparent w-full flex-1 outline-none px-2 rounded-xl" placeholder="Enter your email" />
                  <button className="bg-primary-blue text-white px-8 py-4 rounded-xl">Subscribe</button>
                </div>
                <p className="mt-6">
                  By subscribing you agree to with our{" "}
                  <Link href="#" className="text-primary-blue underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-[#E0E4EB] flex flex-col-reverse md:flex-row gap-8 justify-between items-center py-10 mt-16">
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
