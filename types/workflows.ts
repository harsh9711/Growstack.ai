export type CategoriesTypes =
  | "general"
  | "ai-templates"
  | "integrations"
  | "tools"
  | "ai-assistant"
  | "googleDocs"
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
  nodeMasterId?: string;
  label: string;
  functionToExecute?: string;
  dynamicParams?: string[];
  icon?: string;
  subNodes?: SubNodeProps[];
  description?: string;
  dependencies?: string[];
  parameters?: {
    [key: string]: NodeParameter;
  };
}

export interface NodeState {
  id: string;
  type: string;
  position: PositionState;
  data: NodeDataState;
  parentId?: string;
  extent?: string;
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
  isEditable?: boolean;
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
  description?: string;
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
  userId?: string;
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

export interface IntegrationResultProps {
  enabled: string;
  allCredentials: [
    {
      id: string;
      dateCreated: string;
      dateUpdated: string;
      projectId: string;
      integrationId: string;
      personaId: string;
      isPreviewCredential: false;
      providerId: string;
      providerData: {};
      status: string;
      dateRefreshed: string;
      dateValidUntil: string;
      refreshTokenValidUntilDate: string | null;
      refreshFailureCount: 0;
      configurations: [
        {
          id: string;
          dateCreated: string;
          dateUpdated: string;
          connectCredentialId: string;
          workflowSettings: {};
          sharedSettings: {};
          configMeta: {
            isIntegrationEnableTriggered: true;
          };
          isDefault: true;
          externalId: null;
        },
      ];
      config: {
        id: string;
        dateCreated: string;
        dateUpdated: string;
        connectCredentialId: string;
        sharedSettings: {};
        configMeta: {
          isIntegrationEnableTriggered: boolean;
        };
        isDefault: boolean;
        externalId: string | null;
        configuredWorkflows: {};
      };
    },
  ];
  configMeta: {
    isIntegrationEnableTriggered: boolean;
  };
  configuredWorkflows: {};
  credentialId: string;
  credentialStatus: string;
  providerId: string;
  providerData: {};
  sharedSettings: {};
  workflowSettings: {};
  isIntegrationEnableTriggered: boolean;
}

export interface AvatarProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  gestures: { label: string; slug: string; startFrame: number }[];
  status: string;
  width: number;
  height: number;
  thumbnailUrl: string;
  extras?: any;
}

export interface VoiceProps {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  sampleUrl: string;
}
export interface AvatarVoiceState {
  avatars: AvatarProps[];
  voices: VoiceProps[];
  isLoading: boolean;
  error: any;
}
