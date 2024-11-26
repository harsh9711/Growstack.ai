export type CategoriesTypes =
  | "general"
  | "ai-templates"
  | "integrations"
  | "tools"
  | "ai-assistant"
  | "llms";

export interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface AiModel {
  id: string;
  type: string;
  category: string;
  image: ImageProps;
}

export interface InputState {
  variable_type: string;
  variable_label: string;
  variable_value: string;
  variable_values: string[];
}

export interface PositionState {
  x: number;
  y: number;
}

export interface NodeDataState {
  [key: string]: unknown;
  nodeMasterId: string;
  label: string;
  functionToExecute?: string;
  dynamicParams?: string[];
  icon?: string;
  parameters?: {
    [key: string]: NodeParameter;
  };
}

export interface NodeState {
  id: string;
  type: string;
  position: PositionState;
  data: NodeDataState;
}

export interface AllDataState {
  id: number;
  thirdparty?: string;
  description?: string;
  name: string;
  category: CategoriesTypes;
  subCategory: string;
  image?: ImageProps;
  node: NodeState;
}

export interface NodeParameter {
  label: string;
  type: string;
  required: boolean;
  options?: any[];
  description?: string;
}

export interface MasterNodeProps {
  _id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  subCategory: string;
  functionToExecute: string;
  logoUrl?: string;
  parameters: {
    [key: string]: NodeParameter;
  };
  dynamicParams?: string[];
  __v: number;
}

export interface MasterNodeState {
  masterNode: MasterNodeProps[];
  isLoading: boolean;
  error: any;
}
