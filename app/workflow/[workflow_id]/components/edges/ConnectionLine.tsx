import { useConnection } from '@xyflow/react';

export default ({ fromX, fromY, toX, toY }: any) => {
    const { fromHandle } = useConnection();


    return (
        <g>
            <path
                fill="none"
                stroke={"#2DA771"}
                strokeWidth={2}
                className="animated"
                d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
            />
            <polygon
                points={`${toX - 10},${toY - 6} ${toX},${toY} ${toX - 10},${toY + 6}`}
                fill="#2DA771"
                stroke="#2DA771"
                strokeWidth={1}
            />
        </g>
    );
}