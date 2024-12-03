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

export const convertToUnderscore = (value: string): string => {
  return value.toLowerCase().replace(/\s+/g, "_");
};

export const getVariableName = (nodes: NodeState[], position: number) => {
  if (!nodes.length || position < 0 || position >= nodes.length) return [];

  const nodeVariables = nodes
    .filter((_, index) => index !== position)
    .map(nds => {
      const variableValue = nds.data?.parameters?.variableName?.value;
      return variableValue
        ? { nodeId: nds.id, variableName: variableValue }
        : null;
    })
    .filter(Boolean);

  if (!nodeVariables.length) return [];

  return nodeVariables;
};

export const isSpecialType = (type: string): boolean => {
  const specialTypes = ["text_area", "textarea", "text_input_label", "text"];

  return specialTypes.includes(type);
};
