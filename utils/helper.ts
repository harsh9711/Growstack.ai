import { NodeState, VariableNameProps } from "@/types/workflows";
import { extractParameterValues } from "./dataResolver";

export const calculateNextNodePosition = (
  lastNode: NodeState | undefined,
  maxX: number = 1600,
  offsetX: number = 400,
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

// export const getVariableName = (nodes: NodeState[], position: number) => {
//   if (!nodes.length || position < 0 || position >= nodes.length) return [];

//   const nodeVariables = nodes
//     .filter((_, index) => index !== position)
//     .map(nds => {
//       const variableValue = nds.data?.parameters?.variableName?.value;
//       return variableValue
//         ? { nodeId: nds.id, variableName: variableValue }
//         : null;
//     })
//     .filter(Boolean);

//   if (!nodeVariables.length) return [] as VariableNameProps[];

//   return nodeVariables;
// };

export const getVariableName = (nodes: NodeState[], position: number) => {
  if (!nodes.length || position < 0 || position >= nodes.length) return [];

  const nodeVariables = nodes
    .filter((_, index) => index !== position)
    .flatMap(nds => {
      const mainNodeVariable = nds.data?.parameters?.variableName?.value
        ? {
            nodeId: nds.id,
            variableName: nds.data.parameters.variableName.value,
          }
        : null;

      const subNodeVariables =
        nds.data?.subNodes
          ?.flatMap(subNode => {
            const subNodeVariableValue =
              subNode.parameters?.variableName?.value;
            return subNodeVariableValue
              ? {
                  nodeId: subNode.nodeMasterId,
                  variableName: subNodeVariableValue,
                }
              : null;
          })
          .filter(Boolean) || [];

      return [mainNodeVariable, ...subNodeVariables].filter(Boolean);
    });

  if (!nodeVariables.length) return [] as VariableNameProps[];

  return nodeVariables;
};

export const isSpecialType = (type: string): boolean => {
  const specialTypes = ["text_area", "textarea", "text_input_label", "text"];

  return specialTypes.includes(type);
};

export const getInputType = (label: string) => {
  switch (label) {
    case "Short Text":
      return "text";
    case "Long Text":
      return "text_area";
    case "Number":
      return "number";
    case "Boolean":
      return "switch";
    case "File Upload":
      return "button_upload";
    case "Checklist":
      return "checkbox_field";
    default:
      return "text";
  }
};

export const prepareNodesPayload = (
  nodes: NodeState[],
  workFlowDataId: string
) => {
  if (!nodes.length) return [];

  return nodes?.map(node => {
    const updatedValue = extractParameterValues(node?.data?.parameters);
    const dependencies = node.data?.dependencies || [];

    const nodePayload: any = {
      _id: node.id,
      workflowId: workFlowDataId,
      nodeMasterId: node.data.nodeMasterId,
      position: node.position,
      dependencies: dependencies,
      parameters: updatedValue,
      name: node.data.label || "",
      description: node.data.description || "",
      type: node.type,
    };
    let subNodes: any[] = node.data?.subNodes as any[];

    if (node.type === "form") {
      subNodes = subNodes.filter((item, index, self) => {
        return (
          self.findIndex(i => i.nodeMasterId === item.nodeMasterId) !== index
        );
      });
    }

    if (subNodes && subNodes?.length > 0) {
      const filteredSubNodes = subNodes
        .map(subNode => {
          return {
            nodeMasterId: subNode.nodeMasterId,
            parameters: extractParameterValues(subNode.parameters),
            name: subNode?.name ?? "form-node",
          };
        })
        .filter(subNode => {
          return Object.values(subNode.parameters).some((param: any) => {
            return param;
          });
        });

      nodePayload.subNodes =
        filteredSubNodes.length > 0 ? filteredSubNodes : [];
    }

    return nodePayload;
  });
};

export const isValidEdges = (
  nodes: NodeState[],
  sourceId: string,
  targetId: string
): boolean => {
  console.log("sourceId", sourceId);
  console.log("targetId", targetId);

  const visited = new Set<string>();

  const checkDependencies = (currentId: string): boolean => {
    // console.log("--step1---", currentId);
    if (visited.has(currentId)) return true;
    visited.add(currentId);
    // console.log("--step2---", currentId);
    const currentNode = nodes.find(node => node.id === currentId);
    if (!currentNode) return true;
    // console.log("--step3---");
    if (
      !currentNode.data.dependencies ||
      currentNode.data.dependencies.length === 0
    ) {
      // console.log("--step4---");
      return true;
    }

    if (currentNode.data.dependencies.some(dep => dep === targetId)) {
      return false;
    }
    // console.log("--step5---");
    for (const dep of currentNode.data.dependencies) {
      // console.log("dep--->", dep);
      if (!checkDependencies(dep)) {
        return false;
      }
    }

    return true;
  };

  return checkDependencies(sourceId);
};

export const validateNodes = (nodes: NodeState[]) => {
  for (const node of nodes) {

    if (node.type === 'form') {
      continue;
    }

    const requiredParams = Object.entries(node.data.parameters)
      .filter(([key, param]) => key !== "nextParameter" && param.required)
      .map(([key, param]) => param);

    const allRequiredParamsFilled = requiredParams.every(param => param?.value);
    console.log("requiredParams", requiredParams);
    if (!allRequiredParamsFilled) {
      return {
        isValid: false,
        node: node,
        missingParams: requiredParams.filter(param => !param.value),
      };
    }
  }
  return true;
};