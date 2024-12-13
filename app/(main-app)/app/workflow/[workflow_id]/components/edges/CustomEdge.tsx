import React, { memo } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, useReactFlow, EdgeProps } from '@xyflow/react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { updateWorkFlowById } from '@/lib/features/workflow/workflow.slice';
import { removeNodeDependency } from '@/lib/features/workflow/node.slice';
import { prepareNodesPayload } from '@/utils/helper';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    source,
    target,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const { workFlowData } = useAppSelector((state) => state.workflows);
    const { nodes } = useAppSelector((state) => state.nodes);
    const dispatch = useAppDispatch();
    const { setEdges } = useReactFlow();

    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
        sourcePosition,
        targetPosition,
    });




    const customStyle = {
        ...style,
        stroke: '#2DA771',
        strokeWidth: 2,
        strokeDasharray: '5 5',
        animation: 'dash-animation 1s linear infinite',
    };

    const handleEdgeClick = () => {
        setEdges((edges: any[]) => {
            console.log('---edges---', edges);
            console.log('source====>', source);
            console.log('target====>', target);
            const updatedEdges = edges.filter((edge) => edge.id !== id);
            dispatch(removeNodeDependency({ sourceId: source, targetId: target }));

            // const bodyPayload = {
            //     name: workFlowData?.name,
            //     description: workFlowData?.description || "",
            //     nodes: prepareNodesPayload(nodes, workFlowData._id || ""),
            //     edges: updatedEdges,
            // };

            // dispatch(updateWorkFlowById({
            //     id: workFlowData._id || "",
            //     data: bodyPayload,
            // }));

            console.log('updatedEdges', updatedEdges);

            return updatedEdges;

        });

    };

    return (
        <>
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <marker
                        id="custom-marker-m"
                        markerWidth="10"
                        markerHeight="10"
                        refX="10"
                        refY="5"
                        orient="auto"
                        markerUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 0 0 L 10 5 L 0 10 Z"
                            fill="#2DA771"
                        />
                    </marker>
                </defs>
            </svg>

            <BaseEdge id={id} path={edgePath} style={customStyle} markerEnd="url(#custom-marker-m)" />
            <EdgeLabelRenderer>
                <div
                    className="absolute pointer-events-auto border border-[#2DA771] h-[20px] w-[20px] rounded-full flex justify-center items-center bg-white"
                    style={{
                        transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`
                    }}
                >
                    <button onClick={handleEdgeClick} style={{ color: "#000", padding: 0, margin: 0, lineHeight: 0 }}>
                        ×
                    </button>
                </div>
            </EdgeLabelRenderer>
        </>
    );
};

const styles = `
@keyframes dash-animation {
    to {
        stroke-dashoffset: -10;
    }
}
`;

const StyleInjector = () => (
    <style>
        {styles}
    </style>
);


const AnimatedEdge = memo(({ ...props }: EdgeProps) => (
    <>
        <StyleInjector />
        <CustomEdge {...props} />
    </>
));

export default AnimatedEdge;
