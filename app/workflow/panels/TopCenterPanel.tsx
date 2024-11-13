import React from "react";
import Image from "next/image";

const TopCenterPanel = () => {
    return (
        <div className="flex justify-center items-center w-[100px] h-[100px] border-2 border-white rounded-[22px] bg-gradient-to-b from-[#F8F8FA] to-[#F8F8FA]">
            <Image
                src="/images/workflow/ellipse.svg"
                alt="plus"
                width={80}
                height={80}
                className="cursor-pointer animate-spin"
            />
        </div>
    );
};

export default TopCenterPanel;
