import React from "react";
import Image from "next/image";
import { dummyData2 } from "../data";

const TopRightPanel1st = (): React.ReactElement => {
    return (
        <div className="flex items-center">
            {dummyData2.map((item, index) => (
                <div
                    key={index.toString()}
                    className="h-[44px] w-[54px] border-2 border-white flex justify-center rounded-lg items-center bg-gradient-to-b from-[#F8F8FA] to-[#F8F8FA] mx-2.5 cursor-pointer"
                >
                    <Image
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                    />
                </div>
            ))}

            <button className="h-[52px] w-[98px] bg-[#2DA771] rounded-lg text-white">
                Publish
            </button>
        </div>
    );
};
export default TopRightPanel1st;
