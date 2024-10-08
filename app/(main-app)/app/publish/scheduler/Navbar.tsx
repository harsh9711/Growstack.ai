import { FC, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaPinterestP,
  FaLinkedinIn,
} from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import Image from "next/image";

const socialMediaIcons = [
  { icon: FaFacebookF, name: "Facebook", bgColor: "bg-blue-600" },
  { icon: FaInstagram, name: "Instagram", bgColor: "bg-pink-500" },
  { icon: FaTiktok, name: "TikTok", bgColor: "bg-black" },
  { icon: RiTwitterXLine, name: "Twitter", bgColor: "bg-black" },
  { icon: FaPinterestP, name: "Pinterest", bgColor: "bg-red-600" },
  { icon: FaLinkedinIn, name: "LinkedIn", bgColor: "bg-blue-700" },
];

interface SocialNavBarProps {
  setOpen: (open: boolean) => void; // setOpen is a function that takes a boolean
}

const SocialNavBar: FC<SocialNavBarProps> = ({ setOpen }) => {
  const [selectedIcon, setSelectedIcon] = useState("Facebook");
  const handleDialogToggle = () => {
    // Toggle dialog open/close state
    setOpen(true);
};
  return (
    <div
      className="fixed top-20 left-0 right-0 w-[90%] mx-auto flex items-center justify-between p-4 shadow-lg z-50 rounded-l-full rounded-r-full"
      style={{ backgroundColor: "#EBF0F6" }}
    >
      
      <div className="flex items-center">
        <button className="flex items-center text-sm bg-white border font-semibold px-3 py-3 py-1 rounded-l-full rounded-r-full ml-4">
          <Image
            src="/assets/layout-distribute-horizontal.svg"
            alt=""
            width={20}
            height={20}
            color="black"
          />
          <span className="px-1">Feed view</span>
          <Image
            src="/assets/chevron-down.svg"
            alt=""
            width={24}
            height={24}
            color="black"
          />
        </button>
      </div>

      <div className="flex items-center space-x-8">
        <div className="flex space-x-4 items-center">
          {socialMediaIcons.map(({ icon: Icon, name, bgColor }) => (
            <div
              key={name}
              className={`flex items-center justify-center w-12 h-12 rounded-full border border-white bg-white cursor-pointer ${
                selectedIcon === name ? "ring-2" : ""
              }`}
              style={{
                boxShadow: selectedIcon === name ? "0 0 0 1px #034737" : "none",
              }}
              onClick={() => setSelectedIcon(name)}
            >
              <div className={`${bgColor} p-1 rounded-full`}>
                <Icon className="text-white hover:opacity-80" size={20} />{" "}
                {/* Smaller icon size */}
              </div>
            </div>
          ))}
        </div>

        <div
          className="border-l border-white h-6"
          style={{ borderLeftWidth: "3px" }}
        ></div>

        <div className="flex items-center">
          <button
            className="flex items-center justify-center w-12 h-12 text-white rounded-full"
            style={{ backgroundColor: "#034737" }}
          >
            <span className="text-4xl font-normal">+</span>
          </button>
          <span className="ml-2 flex items-center font-semibold">
            Add Account
          </span>{" "}
        </div>
      </div>

      <div className="flex items-center">
        <button className="flex items-center text-sm bg-white border font-semibold px-4 py-3 py-1 rounded-lg mr-4">
          <Image
            src="/assets/edit-circle.svg"
            alt=""
            width={32}
            height={32}
            color="white"
          />
          <span className="text-primary-green" onClick={handleDialogToggle}>Compose</span>
        </button>
      </div>
    </div>
  );
};

export default SocialNavBar;
