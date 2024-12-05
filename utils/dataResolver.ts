import { MasterNodeProps, WorkflowNodeState } from "@/types/workflows";

export const convertNodeData = (data: MasterNodeProps) => {
  const {
    _id,
    functionToExecute,
    type,
    subNodes,
    parameters,
    dynamicParams,
    ...rest
  } = data;

  return {
    node: {
      id: _id,
      position: { x: 0, y: 0 },
      type,
      data: {
        nodeMasterId: _id,
        parameters,
        subNodes,
        dynamicParams,
        functionToExecute,
        label: data.name,
        description: data.description,
        icon: data.logoUrl,
      },
    },
    ...rest,
  };
};

export const convertSubNodeData = (data: MasterNodeProps) => {
  const {
    _id,
    functionToExecute,
    type,
    parameters,
    subNodes,
    dynamicParams,
    ...rest
  } = data;

  return {
    node: {
      id: _id,
      position: { x: 0, y: 0 },
      type,
      data: {
        nodeMasterId: _id,
        subNodes,
        dynamicParams,
        functionToExecute,
        label: data.name,
        icon: data.logoUrl,
      },
    },
    ...rest,
  };
};

export const getTypeFromParam = (paramType: string): string => {
  return paramType.split("_")[0];
};

export const extractParameterValues = (parameters: { [key: string]: any }) => {
  const result: { [key: string]: string } = {};

  console.log(parameters, "extractParameterValues");

  Object.entries(parameters).forEach(([key, param]) => {
    result[key] = param.value;
  });

  return result;
};

// export const resolveWorkflowNodes = (nodes?: WorkflowNodeState[]) => {
//   if (!nodes) return [];

//   const updatedNodes = nodes?.map(node => {
//     const updatedParameters = Object.entries(
//       (node.nodeMasterId as any).parameters
//     ).reduce((acc: { [key: string]: any }, [key, param]) => {
//       acc[key] = {
//         ...(typeof param === "object" && param !== null ? param : {}),
//         value: node.parameters?.[key] || "",
//       };
//       return acc;
//     }, {});

//     return {
//       id: node._id,
//       position: node.position,
//       type: node.type,
//       data: {
//         nodeMasterId: (node.nodeMasterId as any)?._id,
//         parameters: updatedParameters,
//         subNodes: node.subNodes || [],
//         dynamicParams: (node.nodeMasterId as any)?.dynamicParams || [],
//         functionToExecute: (node.nodeMasterId as any)?.functionToExecute,
//         label: (node.nodeMasterId as any)?.name,
//         description: (node.nodeMasterId as any)?.description,
//         icon: (node.nodeMasterId as any)?.logoUrl,
//       },
//     };
//   });

//   return updatedNodes;
// };

// export const resolveWorkflowNodes = (nodes?: WorkflowNodeState[]) => {
//   if (!nodes) return [];

//   const updatedNodes = nodes?.map(node => {
//     const updatedParameters = Object.entries(
//       (node.nodeMasterId as any).parameters
//     ).reduce((acc: { [key: string]: any }, [key, param]) => {
//       acc[key] = {
//         ...(typeof param === "object" && param !== null ? param : {}),
//         value: node.parameters?.[key] || "",
//       };
//       return acc;
//     }, {});

//     // Update subNodes parameters if node type is "form"
//     const updatedSubNodes =
//       node.type === "form"
//         ? node.subNodes.map((subNode: any) => {
//             const matchingSubNode = (node.nodeMasterId as any).subNodes.find(
//               (sn: any) => sn.nodeMasterId === subNode.nodeMasterId
//             );

//             const updatedSubNodeParameters = Object.entries(
//               (node.nodeMasterId as any).subNodes.find(
//                 (sn: any) => sn.nodeMasterId === subNode.nodeMasterId
//               ).parameters
//             ).reduce((acc: { [key: string]: any }, [key, param]) => {
//               acc[key] = {
//                 ...(typeof param === "object" && param !== null ? param : {}),
//                 value: subNode.parameters?.[key] || "",
//               };
//               return acc;
//             }, {});

//             return {
//               ...(typeof subNode === "object" && subNode !== null
//                 ? subNode
//                 : {}),
//               name: matchingSubNode?.name || "",
//               parameters: updatedSubNodeParameters,
//             };
//           })
//         : node.subNodes;

//     return {
//       id: node._id,
//       position: node.position,
//       type: node.type,
//       data: {
//         nodeMasterId: (node.nodeMasterId as any)?._id,
//         parameters: updatedParameters,
//         subNodes: updatedSubNodes || [],
//         dynamicParams: (node.nodeMasterId as any)?.dynamicParams || [],
//         functionToExecute: (node.nodeMasterId as any)?.functionToExecute,
//         label: (node.nodeMasterId as any)?.name,
//         description: (node.nodeMasterId as any)?.description,
//         icon: (node.nodeMasterId as any)?.logoUrl,
//       },
//     };
//   });

//   return updatedNodes;
// };

export const resolveWorkflowNodes = (nodes?: WorkflowNodeState[]) => {
  if (!nodes) return [];

  const updatedNodes = nodes?.map(node => {
    const updatedParameters = Object.entries(
      (node.nodeMasterId as any).parameters
    ).reduce((acc: { [key: string]: any }, [key, param]: [string, any]) => {
      acc[key] = {
        ...(typeof param === "object" && param !== null ? param : {}),
        value: node.parameters?.[key] || param?.value || "",
      };
      return acc;
    }, {});

    const updatedSubNodes =
      node.type === "form"
        ? (node.nodeMasterId as any).subNodes.map((sn: any) => {
            const matchingSubNode = node.subNodes.find(
              (subNode: any) => subNode.nodeMasterId === sn.nodeMasterId
            ) as { parameters?: { [key: string]: any } } | undefined;

            const updatedSubNodeParameters = Object.entries(
              sn.parameters
            ).reduce(
              (acc: { [key: string]: any }, [key, param]: [string, any]) => {
                acc[key] = {
                  ...(typeof param === "object" && param !== null ? param : {}),
                  value:
                    matchingSubNode?.parameters?.[key] || param?.value || "",
                };
                return acc;
              },
              {}
            );

            return {
              ...(typeof matchingSubNode === "object" &&
              matchingSubNode !== null
                ? matchingSubNode
                : {}),
              nodeMasterId: sn.nodeMasterId,
              name: sn.name || "",
              parameters: updatedSubNodeParameters,
            };
          })
        : node.subNodes;

    return {
      id: node._id,
      position: node.position,
      type: node.type,
      data: {
        nodeMasterId: (node.nodeMasterId as any)?._id,
        parameters: updatedParameters,
        subNodes: updatedSubNodes || [],
        dynamicParams: (node.nodeMasterId as any)?.dynamicParams || [],
        functionToExecute: (node.nodeMasterId as any)?.functionToExecute,
        label: (node.nodeMasterId as any)?.name,
        description: (node.nodeMasterId as any)?.description,
        icon: (node.nodeMasterId as any)?.logoUrl,
      },
    };
  });

  return updatedNodes;
};
