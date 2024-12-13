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

  Object?.entries(parameters).forEach(([key, param]) => {
    if (key !== "nextParameter") {
      result[key] = param.value;
    }
    // result[key] = param.value;
  });

  return result;
};

// export const resolveWorkflowNodes = (nodes?: WorkflowNodeState[]) => {
//   if (!nodes) return [];

//   const updatedNodes = nodes?.map(node => {
//     const updatedParameters = Object.entries(
//       (node.nodeMasterId as any).parameters
//     ).reduce((acc: { [key: string]: any }, [key, param]: [string, any]) => {
//       acc[key] = {
//         ...(typeof param === "object" && param !== null ? param : {}),
//         value: node.parameters?.[key] || param?.value || "",
//       };
//       return acc;
//     }, {});

//     const updatedSubNodes =
//       node.type === "form"
//         ? (node.nodeMasterId as any).subNodes.map((sn: any) => {
//             const matchingSubNode = node.subNodes.find(
//               (subNode: any) => subNode.nodeMasterId === sn.nodeMasterId
//             ) as { parameters?: { [key: string]: any } } | undefined;

//             const updatedSubNodeParameters = Object.entries(
//               sn.parameters
//             ).reduce(
//               (acc: { [key: string]: any }, [key, param]: [string, any]) => {
//                 acc[key] = {
//                   ...(typeof param === "object" && param !== null ? param : {}),
//                   value:
//                     matchingSubNode?.parameters?.[key] || param?.value || "",
//                 };
//                 return acc;
//               },
//               {}
//             );

//             return {
//               ...(typeof matchingSubNode === "object" &&
//               matchingSubNode !== null
//                 ? matchingSubNode
//                 : {}),
//               nodeMasterId: sn.nodeMasterId,
//               name: sn.name || "",
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
//         // description: (node.nodeMasterId as any)?.description,
//         description: node?.description || "",
//         icon: (node.nodeMasterId as any)?.logoUrl,
//         dependencies: node.dependencies || [],
//       },
//     };
//   });

//   return updatedNodes;
// };

export const resolveWorkflowNodes = (nodes?: WorkflowNodeState[]) => {
  if (!nodes) return [];

  const updatedNodes = nodes.map(node => {
    const updatedParameters = Object.entries(
      (node.nodeMasterId as any).parameters
    ).reduce((acc: { [key: string]: any }, [key, param]: [string, any]) => {
      acc[key] = {
        ...(typeof param === "object" && param !== null ? param : {}),
        value: node.parameters?.[key] || param?.value || "",
      };
      return acc;
    }, {});

    if ((node.nodeMasterId as any).name === "Generate Image") {
      const { model, numberOfImages, quality, prompt, size, style } =
        updatedParameters;

      switch (model?.value) {
        case "dall-e-2":
          numberOfImages.maxValue = 10;
          numberOfImages.disabled = false;
          quality.value = quality?.value || "standard";
          quality.disabled = true;
          prompt.maxLength = 1000;
          style.value = style?.value || "";
          style.disabled = true;
          size.value = size?.value || "";
          size.options = [
            { label: "256x256", value: "256x256" },
            { label: "512x512", value: "512x512" },
            { label: "1024x1024", value: "1024x1024" },
          ];
          break;

        case "dall-e-3":
          numberOfImages.value = 1;
          numberOfImages.disabled = true;
          quality.disabled = false;
          quality.value = quality?.value || "hd";
          style.value = style?.value || "vivid";
          size.value = size?.value || "";
          style.disabled = false;
          prompt.maxLength = 4000;
          size.options = [
            { label: "1024x1024", value: "1024x1024" },
            { label: "1792x1024", value: "1792x1024" },
            { label: "1024x1792", value: "1024x1792" },
          ];
          break;

        default:
          break;
      }
    }

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
        description: node?.description || "",
        icon: (node.nodeMasterId as any)?.logoUrl,
        dependencies: node.dependencies || [],
      },
    };
  });

  return updatedNodes;
};
