import React from "react";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type ChatGptNodeProps } from "./types";
import Image from "next/image";

const ChatGptNode = ({ data, id }: NodeProps<ChatGptNodeProps>) => {
    return (
        <div style={{ border: "1px solid #E5E5E5", padding: "20px", backgroundColor: "#ffffff", borderRadius: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-evenly", alignItems: "center", marginBottom: "10px" }}>
                {data.image && (
                    <Image
                        src={data.image.src}
                        alt="Search"
                        width={data.image.width}
                        height={data.image.height}
                    />
                )}
                <h4>{data.label}</h4>
            </div>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
                <label>System</label>
                <input type="text" style={{ border: "0.5px solid #E5E5E5", height: "35px", borderRadius: "5px" }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Prompt</label>
                <input type="text" style={{ border: "0.5px solid #E5E5E5", height: "35px", borderRadius: "5px" }} />
            </div>
            <Handle type="target" position={Position.Left} title="Prompt" style={{ top: '180px' }} />
            <Handle type="source" position={Position.Right} title="Response" />
        </div>
    );
};

export default ChatGptNode;
