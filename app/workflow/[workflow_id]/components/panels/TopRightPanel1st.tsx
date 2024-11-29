import React from "react";
import Image from "next/image";
import { dummyData2 } from "../data";
import { CustomAxiosInstance } from "@/config/axios.config";
import { useAppSelector } from "@/lib/hooks";

const TopRightPanel1st = (): React.ReactElement => {

    const { workFlowData } = useAppSelector(state => state.workflows);

    const runWorkFlow = async () => {
        try {
            if (!workFlowData._id) return;
            const result = await CustomAxiosInstance().post(`workflow/${workFlowData?._id}/run/`);
            console.log("Run Workflow", result);
        } catch (error) {
            console.log("Run Workflow Error", error);
        }
    }

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

            <button className="h-[52px] w-[98px] bg-[#2DA771] rounded-lg text-white" onClick={runWorkFlow}>
                Publish
            </button>
        </div>
    );
};
export default TopRightPanel1st;
