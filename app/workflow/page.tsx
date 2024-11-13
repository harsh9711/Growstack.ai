"use client";
import React from "react";
import { useCallback } from "react";
import Image from "next/image";
import {
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel,
    type OnConnect,
    applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import TopLeftPanel2nd from "./panels/TopLeftPanel2nd";
import TopRightPanel1st from "./panels/TopRightPanel1st";
import TopRightPanel2nd from "./panels/TopRightPanel2nd";
import BottomCenterPanel from "./panels/BottomCenterPanel";

const WorkflowPage: React.FC = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect: OnConnect = useCallback(
        connection => setEdges(edges => addEdge(connection, edges)),
        [setEdges]
    );

    //need to add this function and manage it by redux
    // const onNodeChange = useCallback((changes: any) => {
    //     applyNodeChanges(changes, nodesData);
    // }, []);

    return (
        <div style={{ height: "100vh", width: "100%" }}>
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={edges}
                edgeTypes={edgeTypes}
                snapToGrid={true}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                // fitViewOptions={{ minZoom: 0.1, padding: 0.1, maxZoom: 1.5 }}
                defaultViewport={{ zoom: 0.9, x: 0, y: 0 }}
            >
                <Background
                    variant={BackgroundVariant.Lines}
                    style={{
                        backgroundColor: "#F8F8FA",
                        background:
                            "linear-gradient(180deg, rgba(248, 248, 250, 1), rgba(248, 248, 250, 0))",
                    }}
                />
                <MiniMap />
                <Controls />
                <Panel
                    position="top-left"
                    className="border-2 border-white rounded-lg p-1.5 bg-[#F8F8FA] left-[40px] cursor-pointer"
                >
                    <div className="w-[198px] h-[44px] flex justify-center items-center">
                        <Image
                            src="/images/workflow/back.svg"
                            alt="back"
                            width={24}
                            height={24}
                        />
                        <p className="text-[14px] font-semibold leading-[21px] font-poppins ml-2.5">
                            Untitled workflow
                        </p>
                    </div>
                </Panel>

                <Panel
                    position="top-left"
                    className="absolute top-[75px] p-3 bg-white rounded-2xl left-[40px] backdrop-blur-sm shadow-md"
                >
                    <TopLeftPanel2nd setNodes={setNodes} />
                </Panel>

                <Panel position="top-right" style={{ right: "40px" }}>
                    <TopRightPanel1st />
                </Panel>

                <Panel position="top-right" style={{ top: "60px", right: "40px" }}>
                    <TopRightPanel2nd />
                </Panel>

                <Panel position="bottom-center" style={{ bottom: "20px" }}>
                    <BottomCenterPanel />
                </Panel>
            </ReactFlow>
        </div>
    );
};

export default WorkflowPage;
