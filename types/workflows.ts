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
  subNodes?: SubNodeProps[];
  descriptions?: string;
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

export interface Option {
  label: string;
  value: string;
}

export interface NodeParameter {
  [x: string]: any;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: Option[] | undefined;
  description?: string;
  value?: any;
  error?: string;
}

export interface MasterNodeProps {
  _id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  path: string;
  subCategory: string;
  functionToExecute: string;
  logoUrl?: string;
  subNodes?: SubNodeProps[];
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

export interface WorkflowNodeState {
  _id: string;
  workflowId: string;
  nodeMasterId: string;
  position: PositionState;
  type: string;
  parameters: {
    [key: string]: NodeParameter;
  };
  dependencies: string[];
  subNodes: [];
  __v: 0;
}

export interface SubNodeProps {
  nodeMasterId: string;
  name: string;
  isDefault: boolean;
  parameters: {
    [key: string]: NodeParameter;
  };
}

interface WorkflowEdgesState {
  id: string;
  source: string;
  sourceHandler: string;
  target: string;
  targetHandler: string;
  type: string;
}

export interface WorkflowDataState {
  _id?: string;
  name?: string;
  description?: string;
  nodes?: WorkflowNodeState[];
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
  edges?: WorkflowEdgesState[];
  __v?: number;
}

export interface WorkflowState {
  workFlowData: WorkflowDataState;
  isLoading: boolean;
  error: any;
}

export interface VariableNameProps {
  nodeId: string;
  variableName: string;
}

export interface DynamicInputProps {
  param: NodeParameter;
  inputKey: string;
  handleInputChange: (
    key: string,
    type: string,
    value: boolean | any,
    dependencies?: string
  ) => void;
  variableNames?: any[];
  focusedInputKey?: string | null;
  setFocusedInputKey?: React.Dispatch<React.SetStateAction<string | null>>;
}
