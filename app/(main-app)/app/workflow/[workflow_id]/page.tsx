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
  clearWorkFlowData,
  getWorkFlowById,
  updateWorkFlowById,
} from "@/lib/features/workflow/workflow.slice";
import ConnectionLine from "./components/edges/ConnectionLine";
import {
  addNode,
  clearNodeData,
  createNode,
  deleteNodeById,
  removeNodeById,
  updateNodeDependency,
} from "@/lib/features/workflow/node.slice";
import { unwrapResult } from "@reduxjs/toolkit";
import Run from "@/app/(main-app)/app/automation-hub/workflow-builder/workflows/[slug]/components/layout/RunV2";
import TimeLineTable from "@/components/timeLineTabel/TimeLineTabel";
import {
  convertToUnderscore,
  isValidEdges,
  prepareNodesPayload,
} from "@/utils/helper";
import { resolveWorkflowNodes } from "@/utils/dataResolver";
import { SnackbarProvider } from "./components/snackbar/SnackbarContext";
import { debounce } from "lodash";
import { NodeState } from "@/types/workflows";

interface DragEvent extends React.DragEvent<HTMLDivElement> { }
interface PageProps {
  params: {
    workflow_id: string;
  };
}

const Workflow = ({ workflow_id }: { workflow_id: string }) => {
  const dispatch = useAppDispatch();
  const { screenToFlowPosition } = useReactFlow();
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const {
    nodeData,
    isAddNodeLoading,
    nodes: reduxNode,
  } = useAppSelector(state => state.nodes);
  const { workFlowData } = useAppSelector(state => state.workflows);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [selectedExecutionId, setSelectedExecutionId] = useState<string>("");
  const [isFromTimeline, setFromTimeline] = useState(false);
  const [isLockCanvas, setIsLockCanvas] = useState<boolean>(true);
  const handleViewDetails = (executionId: string) => {
    setSelectedExecutionId(executionId);
    localStorage.setItem("workflowActiveTab", "1");
    localStorage.setItem("isFromTimeline", "true");
    setActiveTab(1);
    setFromTimeline(true);
  };

  useEffect(() => {
    dispatch(getMasterNodes());
    getWorkFlowDetails();
    return () => { };
  }, [dispatch, workflow_id]);

  const saveData = () => {
    const bodyPayload = {
      name: workFlowData?.name,
      description: workFlowData?.description || "",
      nodes: prepareNodesPayload(reduxNode, workFlowData._id || ""),
      edges: edges,
    };

    dispatch(
      updateWorkFlowById({
        id: workFlowData._id || "",
        data: bodyPayload,
      })
    );
  };

  const debouncedSaveData = useCallback(debounce(saveData, 2000), [
    edges,
    reduxNode,
    workFlowData,
  ]);

  useEffect(() => {
    if (!workFlowData?._id) return;
    debouncedSaveData();

    return () => {
      debouncedSaveData.cancel();
    };
  }, [edges, reduxNode, workFlowData, debouncedSaveData]);

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

      try {
        const nodeId = await handleAddNode({
          workflowId: workflow_id || workFlowData?._id,
          nodeMasterId: nodeData.id,
          name: nodeData.data?.label,
          type: nodeData?.type,
          description: nodeData.data?.descriptions || "",
          position,
          parameters: {},
        });

        if (!nodeId) return;

        let newNode = {} as NodeState;

        if (nodeData.data.label !== "Generate Image") {
          newNode = {
            ...nodeData,
            data: {
              ...nodeData.data,
              parameters: {
                ...nodeData.data.parameters,
                variableName: {
                  ...(nodeData.data.parameters?.variableName ?? {}),
                  value: toolsNodes?.length
                    ? `${nodeData.data.parameters?.variableName?.value}${toolsNodes.length}`
                    : nodeData.data.parameters?.variableName?.value,
                  label: nodeData.data.parameters?.variableName?.label || "",
                  type: nodeData.data.parameters?.variableName?.type || "",
                  required:
                    nodeData.data.parameters?.variableName?.required ?? true,
                  placeholder:
                    nodeData.data.parameters?.variableName?.placeholder || "",
                  options:
                    nodeData.data.parameters?.variableName?.options || [],
                  description:
                    nodeData.data.parameters?.variableName?.description || "",
                  error: nodeData.data.parameters?.variableName?.error || "",
                },
              },
            },
            id: nodeId,
            position,
          };
        }

        if (nodeData.data.label === "Generate Image") {
          newNode = {
            ...nodeData,
            data: {
              ...nodeData.data,
              parameters: {
                ...nodeData.data.parameters,
                model: {
                  ...(nodeData.data.parameters?.model ?? {}),
                  value: "dall-e-3",
                },
                numberOfImages: {
                  ...(nodeData.data.parameters?.numberOfImages ?? {}),
                  value: 1,
                  disabled: true,
                },
                quality: {
                  ...(nodeData.data.parameters?.quality ?? {}),
                  value: "hd",
                },
                prompt: {
                  ...(nodeData.data.parameters?.prompt ?? {}),
                  maxLength: 4000,
                },
                style: {
                  ...(nodeData.data.parameters?.style ?? {}),
                  value: "vivid",
                },
                size: {
                  ...(nodeData.data.parameters?.size ?? {}),
                  options: [
                    { label: "1024x1024", value: "1024x1024" },
                    { label: "1792x1024", value: "1792x1024" },
                    { label: "1024x1792", value: "1024x1792" },
                  ],
                },
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
                  options:
                    nodeData.data.parameters?.variableName?.options || [],
                  description:
                    nodeData.data.parameters?.variableName?.description || "",
                  error: nodeData.data.parameters?.variableName?.error || "",
                },
              },
            },
            id: nodeId,
            position,
          };
        }

        //@ts-ignore
        setNodes(nds => nds.concat(newNode));
        dispatch(addNode(newNode));
      } catch (error: any) {
        console.log("--errorWhileAddingNode--", error?.message);
      }
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

      if (connectionState.fromHandle.type === connectionState.toHandle.type) {
        console.log(
          "Source and target handle types are the same, not adding edge"
        );
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

      const validEdge = isValidEdges(
        reduxNode,
        connectionState.fromNode.id,
        connectionState.toNode.id
      );
      if (!validEdge) {
        console.log("Invalid edge, not adding edge", validEdge);
        return;
      }
      console.log("connectionState--->", connectionState);

      const edgeId = `${[connectionState.fromNode.id, connectionState.toNode.id].sort().join("_")}`;
      const edge: any = {
        id: edgeId,
        source: connectionState.fromNode.id,
        target: connectionState.toNode.id,
        type: "custom",
        sourceHandle: connectionState.fromHandle.id,
        targetHandle: connectionState.toHandle.id,
      };
      // const updatedEdge: any = [...edges, edge];

      dispatch(
        updateNodeDependency({
          sourceId: connectionState.fromNode.id,
          targetId: connectionState.toNode.id,
        })
      );

      // const bodyPayload = {
      //   name: workFlowData?.name,
      //   description: workFlowData?.description || "",
      //   // userId: workFlowData?.userId,
      //   nodes: prepareNodesPayload(reduxNode, workFlowData._id || ""),
      //   edges: updatedEdge,
      // };

      // dispatch(
      //   updateWorkFlowById({
      //     id: workflow_id || "",
      //     data: bodyPayload,
      //   })
      // );

      // dispatch(
      //   updateNodeDependency({
      //     sourceId: connectionState.fromNode.id,
      //     targetId: connectionState.toNode.id,
      //   })
      // );

      setEdges(eds => eds.concat(edge));
    },
    [edges, screenToFlowPosition]
  );

  const onNodesDelete = useCallback(
    (deleted: any) => {
      setEdges((edges: any) => {
        const updatedEdges = edges.filter(
          (edge: any) =>
            edge?.source !== deleted[0]?.id && edge?.target !== deleted[0]?.id
        );

        return updatedEdges;
      });
      dispatch(removeNodeById(deleted[0]?.id));
      dispatch(deleteNodeById(deleted[0]?.id));
    },
    [nodes, edges, reduxNode]
  );

  const onDragNode = useCallback(
    async (node: any) => {
      console.log("node in callback", node)
      // const bodyPayload = {
      //   name: workFlowData?.name,
      //   description: workFlowData?.description || "",
      //   edges: edges,
      //   nodes: prepareNodesPayload(node, workFlowData._id || ""),
      // };
      // console.log("bodyPayload ------", bodyPayload)

      // dispatch(
      //   updateWorkFlowById({
      //     id: workflow_id || "",
      //     data: bodyPayload,
      //   })
      // );
      const resultAction = await dispatch(getWorkFlowById(workflow_id));
      // console.log("resultAction", resultAction)

      const result = unwrapResult(resultAction);
      // console.log("result", result)
      const updatedNode = resolveWorkflowNodes(result.nodes);
      console.log("updated", updatedNode)
      // const updatedNodes: any = updatedNode.map((n: any) =>
      //   n.id === node.id ? { ...n, position: node.position } : n
      // );
      const updatedNodes: any = updatedNode.map((n: any) => {
        // Find the corresponding node in the node array
        const matchingNode = node.find((nd: any) => nd.id === n.id);
        // If a matching node is found, update its position
        return matchingNode ? { ...n, position: matchingNode.position } : n;
      });


      const bodyPayload = {
        name: workFlowData?.name,
        description: workFlowData?.description || "",
        edges: edges,
        nodes: prepareNodesPayload(updatedNodes, workFlowData._id || ""),
      };
      dispatch(
        updateWorkFlowById({
          id: workflow_id || "",
          data: bodyPayload,
        })
      );
      
    },
    [nodes, edges]
  );

  return (
    <div className="reactflow-wrapper h-[100vh] w-full" ref={reactFlowWrapper}>
      <TopRightPanel2nd
        activeTab={activeTab}
        setActiveTab={(activeTab: number) => {
          setSelectedExecutionId("");
          setActiveTab(activeTab);
          setFromTimeline(false);
        }}
        timeline={isFromTimeline}
        setIsFromTimeline={setFromTimeline}

      />
      {activeTab === 0 && (
        <div className="reactflow-wrapper h-[calc(100vh-140px)] w-full">
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
            onNodesDelete={onNodesDelete}
            onNodeDragStop={(event, node: any) => {
              const updatedNodes: any = nodes.map((n: any) =>
                n.id === node.id ? { ...node, position: node.position } : n
              );
              onDragNode(updatedNodes);
              // onDragNode(node)
            }}
            nodesDraggable={isLockCanvas}
            nodesConnectable={isLockCanvas}
            elementsSelectable={isLockCanvas}
            defaultViewport={{ zoom: 0.9, x: 350, y: 100 }}
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
            {/* <Controls /> */}
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
              <BottomCenterPanel
                onLockIconClick={() => setIsLockCanvas(!isLockCanvas)}
                isLockCanvas={isLockCanvas}
              />
            </Panel>
          </ReactFlow>
        </div>
      )}
      {activeTab === 1 && (
        <Run
          workflowId={workflow_id}
          executionId={selectedExecutionId}
          timeline={isFromTimeline}
        />
      )}
      {activeTab === 2 && (
        <TimeLineTable
          workflow_id={workflow_id}
          onViewDetails={handleViewDetails}
          workflowName={workFlowData.name}
        />
      )}
      {isAddNodeLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-t-4 border-gray-300 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-t-4 border-t-[#2da771] border-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

const WorkflowPage: React.FC<PageProps> = ({ params: { workflow_id } }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearNodeData());
      dispatch(clearWorkFlowData());
    };
  }, [workflow_id]);

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
