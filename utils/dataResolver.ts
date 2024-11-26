import { MasterNodeProps } from "@/types/workflows";

export const convertNodeData = (data: MasterNodeProps) => {
  const { _id, functionToExecute, type, parameters, dynamicParams, ...rest } =
    data;

  return {
    node: {
      id: _id,
      position: { x: 0, y: 0 },
      type,
      data: {
        nodeMasterId: _id,
        parameters,
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

  Object.entries(parameters).forEach(([key, param]) => {
    if (param?.value) {
      result[key] = param.value;
    }
  });

  return result;
};
