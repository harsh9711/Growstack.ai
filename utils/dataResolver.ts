import { MasterNodeProps } from "@/types/workflows";

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

  console.log(parameters, "asdasdas");

  Object.entries(parameters).forEach(([key, param]) => {
    // if (param?.value) {
    result[key] = param.value;
    // }
  });

  return result;
};
