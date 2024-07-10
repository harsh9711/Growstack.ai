import Image from "next/image";
import React from "react";

const icons = [
  <div className="bg-[#034737] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons1.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#6B66DA] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons2.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#10A1F3] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons3.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#F7A373] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons4.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#10A1F3] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons3.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#F7A373] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons4.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#E74694] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons5.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#FFCC29] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons6.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#C6D88F] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons7.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#034737] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons1.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#E74694] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons5.svg" alt="" width={40} height={40} />
  </div>,
  <div className="bg-[#FFCC29] h-20 w-20 grid place-content-center rounded-full">
    <Image src="/assets/home-icons6.svg" alt="" width={40} height={40} />
  </div>,
];

interface CircleProps {
  size: number;
  animation: string;
}

const Circle: React.FC<CircleProps> = ({ size, animation }) => {
  return (
    <div className={`absolute flex items-center justify-center rounded-full border ${animation}`} style={{ width: size, height: size }}>
      {icons.map((icon, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            transform: `rotate(${(index / icons.length) * 360}deg) translate(${size / 2}px) rotate(${-(index / icons.length) * 360}deg)`,
          }}>
          {icon}
        </div>
      ))}
      {/* <input auto /> */}
    </div>
  );
};

export default Circle;
