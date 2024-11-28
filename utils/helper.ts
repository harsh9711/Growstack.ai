import { NodeState } from "@/types/workflows";

export const calculateNextNodePosition = (
  lastNode: NodeState | undefined,
  maxX: number = 1600,
  offsetX: number = 250,
  offsetY: number = 200
) => {
  let nextNodeX = offsetX;
  let nextNodeY = 0;

  if (lastNode) {
    nextNodeX = lastNode.position.x + offsetX;
    nextNodeY = lastNode.position.y;

    if (nextNodeX > maxX) {
      nextNodeX = offsetX;
      nextNodeY += offsetY;
    }
  }

  return { nextNodeX, nextNodeY };
};
