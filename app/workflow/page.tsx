"use client";
import React, { useEffect, useRef } from "react";
import { useCallback } from "react";
import Image from "next/image";
import {
    ReactFlowProvider,
    ReactFlow,
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    addEdge,
    useNodesState,
    useEdgesState,
    Panel,
    useReactFlow,
    type OnConnect,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import TopLeftPanel2nd from "./panels/TopLeftPanel2nd";
import TopRightPanel1st from "./panels/TopRightPanel1st";
import TopRightPanel2nd from "./panels/TopRightPanel2nd";
import BottomCenterPanel from "./panels/BottomCenterPanel";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getMasterNodes } from "@/lib/features/workflow/masterNode.slice";


interface DragEvent extends React.DragEvent<HTMLDivElement> { }

let id = 0;
const getId = () => `dndnode_${id++}`;

const WorkflowPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { screenToFlowPosition } = useReactFlow();
    const reactFlowWrapper = useRef(null);
    const { nodeData } = useAppSelector(state => state.nodes);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    useEffect(() => {
        dispatch(getMasterNodes());
    }, [dispatch]);



    const onConnect: OnConnect = useCallback(
        connection => setEdges(edges => addEdge(connection, edges)),
        [setEdges]
    );


    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);


    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!nodeData) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode: any = {
                ...nodeData,
                id: getId(),
                position,
            };

            setNodes(nds => nds.concat(newNode));
        },
        [screenToFlowPosition, nodeData]
    );

    return (
        <div
            style={{ height: "100vh", width: "100%" }}
            className="reactflow-wrapper"
            ref={reactFlowWrapper}
        >
            <ReactFlow
                nodes={nodes}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                edges={edges}
                edgeTypes={edgeTypes}
                snapToGrid={true}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
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

export default () => (
    <ReactFlowProvider>
        <WorkflowPage />
    </ReactFlowProvider>
);
