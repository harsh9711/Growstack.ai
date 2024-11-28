import React, { useState } from "react";
import { dummyData3 } from "../data";

const TopRightPanel2nd = (props: any) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <div className="flex items-center border-2 border-white rounded-lg bg-gradient-to-b from-[#F8F8FA] to-[#F8F8FA]">
            {dummyData3.map((item, index) => (
                <button
                    key={index.toString()}
                    className={`flex justify-center items-center m-2 cursor-pointer px-2.5 py-1.5 rounded-md text-base font-normal ${activeIndex === index
                        ? "text-white bg-[#2DA771]"
                        : "text-black bg-transparent"
                        }`}
                    onClick={() => handleClick(index)}
                >
                    {item.text}
                </button>
            ))}
        </div>
    );
};

export default TopRightPanel2nd;
