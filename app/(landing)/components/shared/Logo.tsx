import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/">
      <Image
        src="/logo.png"
        alt=""
        width={180}
        height={40}
        draggable={false}
        className="select-none min-w-[180px] max-h-14"
      />
    </Link>
  );
}
