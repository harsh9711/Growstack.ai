import { NodeProps } from "@xyflow/react";
import React from "react";
import { FanOutNodeProps } from "./types";

const FanOut = ({ data, id, isConnectable }: NodeProps<FanOutNodeProps>) => {
    return (
        <div
            style={{
                width: "200px",
                height: "200px",
                border: "2px dashed #2DA771",
                background: "transparent",
            }}
        >
            <h1>FanOut</h1>
        </div>
    );
};

export default FanOut;
