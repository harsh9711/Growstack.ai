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
import { nodeTypes } from "./components/nodes";
import { initialEdges, edgeTypes } from "./components/edges";
import TopLeftPanel2nd from "./components/panels/TopLeftPanel2nd";
import TopRightPanel1st from "./components/panels/TopRightPanel1st";
import TopRightPanel2nd from "./components/panels/TopRightPanel2nd";
import BottomCenterPanel from "./components/panels/BottomCenterPanel";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getMasterNodes } from "@/lib/features/workflow/masterNode.slice";
import {
    createWorkFlow,
    getWorkFlowById,
} from "@/lib/features/workflow/workflow.slice";
import { useRouter } from "next/navigation";
import ConnectionLine from "./components/edges/ConnectionLine";
import { addNode, createNode } from "@/lib/features/workflow/node.slice";
import { unwrapResult } from "@reduxjs/toolkit";

interface DragEvent extends React.DragEvent<HTMLDivElement> { }
interface PageProps {
    params: {
        workflow_id: string;
    };
}

let id = 0;
const getId = () => `dndnode_${id++}`;

const Workflow = ({ workflow_id }: { workflow_id: string }) => {
    console.log("workflow_id--------->", workflow_id);
    const route = useRouter();

    const dispatch = useAppDispatch();
    const { screenToFlowPosition } = useReactFlow();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { nodeData } = useAppSelector(state => state.nodes);
    const { workFlowData } = useAppSelector(state => state.workflows);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    useEffect(() => {
        dispatch(getMasterNodes());
        getWorkFlowDetails();
    }, [dispatch, workflow_id]);

    const getWorkFlowDetails = () => {
        if (!workflow_id) return;
        if (workFlowData && workFlowData._id) return;
        dispatch(getWorkFlowById(workflow_id));
    };

    const onConnect: OnConnect = useCallback(
        connection => setEdges(edges => addEdge(connection, edges)),
        [setEdges]
    );

    const onDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const handleAddNode = async (data: any) => {
        try {
            const resultAction = await dispatch(createNode(data))
            const result = unwrapResult(resultAction)
            console.log("result", result)
            return result._id
        } catch (error) {
            console.log("error", error)
        }
    }

    const onDrop = useCallback(
        async (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!nodeData) {
                return;
            }

            if (!reactFlowWrapper.current) return;

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

            const position = screenToFlowPosition({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            const nodeId = await handleAddNode({
                workflowId: workFlowData._id,
                nodeMasterId: nodeData.id,
                position,
                parameters: {},
            })

            console.log("nodeId====>", nodeId)

            const newNode: any = {
                ...nodeData,
                id: nodeId,
                position,
            };

            setNodes(nds => nds.concat(newNode));
            dispatch(addNode(newNode))
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
                connectionLineComponent={ConnectionLine}
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
                    <div
                        className="w-[198px] h-[44px] flex justify-center items-center"
                        onClick={() => {
                            route.back();
                        }}
                    >
                        <Image
                            src="/images/workflow/back.svg"
                            alt="back"
                            width={24}
                            height={24}
                        />
                        <p className="text-[14px] font-semibold leading-[21px] font-poppins ml-2.5">
                            {workFlowData?.name || ""}
                        </p>
                    </div>
                </Panel>

                <Panel
                    position="top-left"
                    className="absolute top-[75px] left-[40px] p-[1px] bg-gradient-to-b from-white from-10% via-[#FFFFFF] via-5% to-[#99999947] rounded-[20px] backdrop-blur-md"
                >
                    <div className="bg-white rounded-[20px] p-3">
                        <TopLeftPanel2nd setNodes={setNodes} />
                    </div>
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

const WorkflowPage: React.FC<PageProps> = ({ params: { workflow_id } }) => {
    return (
        <ReactFlowProvider>
            <Workflow workflow_id={workflow_id} />
        </ReactFlowProvider>
    );
};

export default WorkflowPage;
