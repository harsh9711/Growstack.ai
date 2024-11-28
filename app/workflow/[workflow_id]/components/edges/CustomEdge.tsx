// CustomEdge.tsx
import React from 'react';
import { getBezierPath, EdgeProps } from 'reactflow';

const CustomEdge = ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
}: EdgeProps) => {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        sourcePosition,
        targetX,
        targetY,
        targetPosition,
    });

    return (
        <>
            <path
                id={id}
                style={{ ...style, strokeDasharray: '10, 10' }}
                className="react-flow__edge-path"
                d={edgePath}
                markerEnd={markerEnd}
            />
            <foreignObject
                width={40}
                height={40}
                x={(sourceX + targetX) / 2 - 20}
                y={(sourceY + targetY) / 2 - 20}
                className="edgebutton-foreignobject"
                requiredExtensions="http://www.w3.org/1999/xhtml"
            >
                <body>
                    <button className="edgebutton" onClick={() => alert('Connect nodes')}>
                        +
                    </button>
                </body>
            </foreignObject>
        </>
    );
};

export default CustomEdge;