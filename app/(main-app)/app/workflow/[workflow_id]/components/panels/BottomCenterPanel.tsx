import React from "react";
import Image from "next/image";

const BottomCenterPanel = () => {

    return (
        <div className="flex">
            <div className="h-[44px] w-[44px] border-[1px] border-[#ECECEC] rounded-full flex justify-center items-center shadow-md bg-white mr-2.5">
                <Image
                    src="/images/workflow/book.svg"
                    alt="plus"
                    width={18}
                    height={16}
                    className="cursor-pointer"
                />
            </div>

            <div className="h-[44px] w-[44px] border-[1px] border-[#ECECEC] rounded-full flex justify-center shadow-md items-center bg-white mr-2.5">
                <Image
                    src="/images/workflow/zoom.svg"
                    alt="plus"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                />
            </div>

            <div className="flex justify-center items-center border-[1px] border-[#ECECEC] bg-white shadow-md p-[13px] rounded-full mr-2.5">
                <Image
                    src="/images/workflow/rectangle.svg"
                    alt="plus"
                    width={18}
                    height={18}
                    className="cursor-pointer"
                />
                <Image
                    src="/images/workflow/hand.svg"
                    alt="plus"
                    width={15}
                    height={18}
                    className="mx-[22px] cursor-pointer"
                />
                <Image
                    src="/images/workflow/arrow.svg"
                    alt="plus"
                    width={15}
                    height={17}
                    className="cursor-pointer"
                />
            </div>

            <div className="flex justify-center items-center border-[1px] border-[#ECECEC] bg-white shadow-md p-[13px] rounded-full mr-2.5">
                <Image
                    src="/images/workflow/redo.svg"
                    alt="plus"
                    width={15}
                    height={15}
                    className="mr-5 cursor-pointer"
                />
                <Image
                    src="/images/workflow/undo.svg"
                    alt="plus"
                    width={15}
                    height={15}
                    className="cursor-pointer"
                />
            </div>

            <div className="flex justify-center items-center border-[1px] border-[#ECECEC] bg-white shadow-md p-[13px] rounded-full cursor-pointer">
                <p className="text-sm font-normal mr-1">100%</p>
                <Image
                    src="/images/workflow/chevron.svg"
                    alt="plus"
                    width={12}
                    height={6}
                />
            </div>
        </div>
    )
}

export default BottomCenterPanel;