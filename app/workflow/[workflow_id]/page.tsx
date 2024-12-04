"use client";
import React, { useEffect, useRef, useState } from "react";
import { useCallback } from "react";
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
import { edgeTypes } from "./components/edges";
import TopLeftPanel2nd from "./components/panels/TopLeftPanel2nd";
import TopRightPanel2nd from "./components/panels/TopRightPanel2nd";
import BottomCenterPanel from "./components/panels/BottomCenterPanel";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getMasterNodes } from "@/lib/features/workflow/masterNode.slice";
import {
  getWorkFlowById,
  updateWorkFlowById,
} from "@/lib/features/workflow/workflow.slice";
import { useRouter } from "next/navigation";
import ConnectionLine from "./components/edges/ConnectionLine";
import { addNode, createNode } from "@/lib/features/workflow/node.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import Run from "@/app/(main-app)/app/automation-hub/workflow-builder/workflows/[slug]/components/layout/RunV2";
import TimeLineTable from "@/components/timeLineTabel/TimeLineTabel";
import { convertToUnderscore } from "@/utils/helper";
import { resolveWorkflowNodes } from "@/utils/dataResolver";
import { SnackbarProvider } from "./components/snackbar/SnackbarContext";

interface DragEvent extends React.DragEvent<HTMLDivElement> {}
interface PageProps {
  params: {
    workflow_id: string;
  };
}

const Workflow = ({ workflow_id }: { workflow_id: string }) => {
  // const route = useRouter();

  // const nodesData = useAppSelector(state => state.nodes.nodes);

  const dispatch = useAppDispatch();
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { nodeData } = useAppSelector(state => state.nodes);
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string>("");

  const handleViewDetails = (executionId: string) => {
    setSelectedExecutionId(executionId);
    setActiveTab(1);
  };

  useEffect(() => {
    dispatch(getMasterNodes());
    getWorkFlowDetails();
  }, [dispatch, workflow_id]);

  const getWorkFlowDetails = async () => {
    if (!workflow_id) return;
    try {
      const resultAction = await dispatch(getWorkFlowById(workflow_id));

      const result = unwrapResult(resultAction);

      const updatedNodes = resolveWorkflowNodes(result.nodes);

      // @ts-ignore
      setNodes(updatedNodes);
      // @ts-ignore
      setEdges(result.edges || []);
      // @ts-ignore
      dispatch(addNode(updatedNodes));

      // console.log("Result--------------->", JSON.stringify(result, null, 2));
    } catch (error) {
      console.log("error", error);
    }
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
      const resultAction = await dispatch(createNode(data));
      const result = unwrapResult(resultAction);
      console.log("result", result);
      return result._id;
    } catch (error) {
      console.log("error", error);
    }
  };

  const onDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      if (!nodeData) {
        return;
      }

      if (!reactFlowWrapper.current) return;
      const toolsNodes = nodes?.filter(
        //@ts-ignore
        nds => nds?.data?.label === nodeData.data.label
      );

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

      const position = screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeId = await handleAddNode({
        workflowId: workflow_id || workFlowData?._id,
        nodeMasterId: nodeData.id,
        name: nodeData.data?.label,
        type: nodeData?.type,
        description: nodeData.data?.descriptions || "",
        position,
        parameters: {},
      });

      const newNode = {
        ...nodeData,
        data: {
          ...nodeData.data,
          parameters: {
            ...nodeData.data.parameters,
            variableName: {
              ...(nodeData.data.parameters?.variableName ?? {}),
              value: toolsNodes?.length
                ? `${convertToUnderscore(nodeData.data.label)}${toolsNodes.length}`
                : convertToUnderscore(nodeData.data.label),
              label: nodeData.data.parameters?.variableName?.label || "",
              type: nodeData.data.parameters?.variableName?.type || "",
              required:
                nodeData.data.parameters?.variableName?.required ?? true,
              placeholder:
                nodeData.data.parameters?.variableName?.placeholder || "",
              options: nodeData.data.parameters?.variableName?.options || [],
              description:
                nodeData.data.parameters?.variableName?.description || "",
              error: nodeData.data.parameters?.variableName?.error || "",
            },
          },
        },
        id: nodeId,
        position,
      };

      //@ts-ignore
      setNodes(nds => nds.concat(newNode));
      dispatch(addNode(newNode));
    },
    [screenToFlowPosition, nodeData]
  );

  const onConnectEnd = useCallback(
    (event: any, connectionState: any) => {
      console.log("connectionState", connectionState);

      if (!workflow_id) {
        console.log("Workflow ID not found, not adding edge");
        return;
      }

      if (
        connectionState.isValid === null ||
        connectionState.isValid === undefined
      ) {
        console.log("Invalid connection state, not adding edge");
        return;
      }

      if (connectionState.fromNode.id === connectionState.toNode.id) {
        console.log("Source and target nodes are the same, not adding edge");
        return;
      }

      const fromNodeExists =
        connectionState.fromNode && connectionState.fromNode.id;
      const toNodeExists = connectionState.toNode && connectionState.toNode.id;

      if (!fromNodeExists || !toNodeExists) {
        console.log("One or both nodes do not exist, not adding edge");
        return;
      }

      const existingEdge = edges?.find(
        (edge: any) =>
          (edge.source === connectionState.fromNode.id &&
            edge.target === connectionState.toNode.id) ||
          (edge.source === connectionState.toNode.id &&
            edge.target === connectionState.fromNode.id)
      );

      if (existingEdge) {
        console.log("Edge already exists, not adding new one");
        return;
      }
      const edgeId = `${[connectionState.fromNode.id, connectionState.toNode.id].sort().join("_")}`;
      const edge: any = {
        id: edgeId,
        source: connectionState.fromNode.id,
        target: connectionState.toNode.id,
        type: "custom",
        sourceHandle: connectionState.fromHandle.id,
        targetHandle: connectionState.toHandle.id,
      };
      const updatedEdge: any = [...edges, edge];

      dispatch(
        updateWorkFlowById({
          id: workflow_id || "",
          data: {
            edges: updatedEdge,
          },
        })
      );

      console.log("connectionState", connectionState);

      setEdges(eds => eds.concat(edge));
    },
    [edges, screenToFlowPosition]
  );

  return (
    <div className="reactflow-wrapper h-[100vh] w-full" ref={reactFlowWrapper}>
      <TopRightPanel2nd
        activeTab={activeTab}
        setActiveTab={activeTab => {
          setSelectedExecutionId("");
          setActiveTab(activeTab);
        }}
      />
      {activeTab === 0 && (
        <div className="reactflow-wrapper h-[calc(100vh-60px)] w-full">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            edges={edges}
            edgeTypes={edgeTypes}
            snapToGrid={true}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectEnd={onConnectEnd}
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
            {/* <Panel
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
                </Panel> */}

            <Panel
              position="top-left"
              className="absolute top-[10px] left-[20px] p-[1px] bg-gradient-to-b from-white from-10% via-[#FFFFFF] via-5% to-[#99999947] rounded-[20px] backdrop-blur-md"
            >
              <div className="bg-white rounded-[20px] p-3">
                <TopLeftPanel2nd setNodes={setNodes} />
              </div>
            </Panel>

            {/* <Panel position="top-right" style={{ right: "40px" }}>
                    <TopRightPanel1st />
                </Panel> */}
            {/* 
                <Panel position="top-right" style={{ top: "60px", right: "40px" }}>
                    <TopRightPanel2nd />
                </Panel> */}

            <Panel position="bottom-center" style={{ bottom: "20px" }}>
              <BottomCenterPanel />
            </Panel>
          </ReactFlow>
        </div>
      )}
      {activeTab === 1 && (
        <Run workflowId={workflow_id} executionId={selectedExecutionId} />
      )}
      {activeTab === 2 && (
        <TimeLineTable
          workflow_id={workflow_id}
          onViewDetails={handleViewDetails}
        />
      )}
    </div>
  );
};

const WorkflowPage: React.FC<PageProps> = ({ params: { workflow_id } }) => {
  console.log("workflow_id", workflow_id);

  // const dispatch = useAppDispatch();
  // const [activeTab, setActiveTab] = useState(0);

  // const { setNodes } = useReactFlow();

  // useEffect(() => {
  //     getWorkFlowDetails();
  // }, [workflow_id]);

  // const getWorkFlowDetails = async () => {
  //     if (!workflow_id) return;
  //     try {
  //         const resultAction = await dispatch(getWorkFlowById(workflow_id));

  //         const result = unwrapResult(resultAction);

  //         const updatedNodes = resolveWorkflowNodes(result.nodes);

  //         //@ts-ignore
  //         setNodes(updatedNodes);
  //         //@ts-ignore
  //         setEdges(result.edges || []);
  //         //@ts-ignore
  //         dispatch(addNode(updatedNodes));

  //         console.log("Result--------------->", JSON.stringify(result, null, 2));

  //     } catch (error) {
  //         console.log("error", error);
  //     }
  //
  // };

  return (
    <div className="h-[calc(100vh-60px)] w-full">
      {/* <TopRightPanel2nd setActiveTab={setActiveTab} /> */}
      <SnackbarProvider>
        <ReactFlowProvider>
          <Workflow workflow_id={workflow_id} />
          {/* {activeTab === 0 && <Workflow workflow_id={workflow_id} />}
                {activeTab === 1 && <Run workflowId={workflow_id} />}
                {activeTab === 2 && <TimeLineTable workflow_id={workflow_id} />} */}
        </ReactFlowProvider>
      </SnackbarProvider>
    </div>
  );
};

export default WorkflowPage;
