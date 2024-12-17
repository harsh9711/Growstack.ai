import instance, { CustomAxiosInstance } from "@/config/axios.config";
import {
  NodeDataState,
  NodeState,
  Option,
  WorkflowNodeState,
} from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createNode = createAsyncThunk(
  "workflow/createNode",
  async (data: any, { rejectWithValue }) => {
    try {
      const result = await instance.post("/node", data);

      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const updateNodeById = createAsyncThunk(
  "workflow/updateNodeById",
  async (
    { id, data }: { id: string; data: WorkflowNodeState },
    { rejectWithValue }
  ) => {
    try {
      // const result = await CustomAxiosInstance("http://localhost:5000/").patch(
      //   `node/${id}`,
      //   data
      // );

      const result = await instance.patch(`/node/${id}`, data);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const deleteNodeById = createAsyncThunk(
  "workflow/deleteNodeById",
  async (id: string, { rejectWithValue }) => {
    try {
      // const result = await CustomAxiosInstance("http://localhost:5000/").delete(
      //   `node/${id}`
      // );

      const result = await instance.delete(`/node/${id}`);
      return result.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

const nodeSlice = createSlice({
  name: "nodes",
  initialState: {
    isLoading: false,
    isAddNodeLoading: false,
    nodeData: {} as NodeState,
    nodes: [] as NodeState[],
    variables: [] as {
      workflowID: string;
      nodeID: string;
      variableType: string;
      variableName: string;
      variableValue?: string;
    }[],
  },
  reducers: {
    addNodeData: (state, action: PayloadAction<NodeState>) => {
      state.nodeData = action.payload;
    },

    addNode: (state, action: PayloadAction<NodeState>) => {
      // if (Array.isArray(action.payload) && !action.payload.length) return;
      // if (Array.isArray(action.payload) && action.payload.length > 0) {
      //   state.nodes = action.payload;
      //   return;
      // }
      // state.nodes.push(action.payload);

      const payload = action.payload;

      if (Array.isArray(payload)) {
        if (payload.length === 0) return;
        state.nodes = payload;
        return;
      }

      state.nodes.push(payload);

      // if (payload.data.label === "Generate Image") {
      //   const { model, numberOfImages, quality, prompt, style, size } =
      //     payload.data.parameters;

      //   payload.data.parameters = {
      //     ...payload.data.parameters,
      //     model: {
      //       ...model,
      //       value: "dall-e-3",
      //     },
      //     numberOfImages: {
      //       ...numberOfImages,
      //       value: 1,
      //       disabled: true,
      //     },
      //     quality: {
      //       ...quality,
      //       value: "hd",
      //     },
      //     prompt: {
      //       ...prompt,
      //       maxLength: 4000,
      //     },
      //     style: {
      //       ...style,
      //       value: "vivid",
      //     },
      //     size: {
      //       ...size,
      //       options: [
      //         {
      //           label: "1024x1024",
      //           value: "1024x1024",
      //         },
      //         {
      //           label: "1792x1024",
      //           value: "1792x1024",
      //         },
      //         {
      //           label: "1024x1792",
      //           value: "1024x1792",
      //         },
      //       ],
      //     },
      //   };
      // }
    },

    updateNodeDescription: (
      state,
      action: PayloadAction<{ nodeId: string; value: string }>
    ) => {
      const { nodeId, value } = action.payload;
      const nodeResult = state.nodes.find(nds => nds.id === nodeId);
      if (nodeResult) {
        nodeResult.data.description = value;
      }
    },

    updateNodeDependency: (
      state,
      action: PayloadAction<{
        sourceId: string;
        targetId: string;
      }>
    ) => {
      const { sourceId, targetId } = action.payload;
      const nodeResult = state.nodes.find(node => node.id === targetId);
      if (nodeResult) {
        if (!nodeResult.data.dependencies) {
          nodeResult.data.dependencies = [];
        }
        nodeResult.data.dependencies.push(sourceId);
        nodeResult.data.dependencies = [
          ...Array.from(new Set(nodeResult.data.dependencies)),
        ];
        // console.log(
        //   "----nodeResultAdd---->",
        //   JSON.stringify(nodeResult, null, 2)
        // );
      }
    },

    removeNodeDependency: (
      state,
      action: PayloadAction<{
        sourceId: string;
        targetId: string;
      }>
    ) => {
      const { sourceId, targetId } = action.payload;
      const nodeResult = state.nodes.find(node => node.id === targetId);

      if (nodeResult && nodeResult.data?.dependencies) {
        nodeResult.data.dependencies = nodeResult.data.dependencies.filter(
          dep => dep !== sourceId
        );
        // console.log(
        //   "----nodeResultRemove---->",
        //   JSON.stringify(nodeResult, null, 2)
        // );
      }
    },

    updateNodeParameter: (
      state,
      action: PayloadAction<{
        nodeId: string;
        key: string;
        type: string;
        value: any;
        label?: string;
        placeholder?: string;
        required?: boolean;
        options?: Option[];
        description?: string;
        error?: string;
      }>
    ) => {
      const {
        nodeId,
        key,
        type,
        value,
        placeholder,
        required,
        options,
        label,
        description,
        error,
      } = action.payload;

      // console.log("---actionPayload----->", action.payload);
      const nodeResult: any = state.nodes.find(node => node.id === nodeId);
      if (nodeResult) {
        const updatedValue =
          typeof value === "boolean"
            ? value
            : type === "text_variable_name"
              ? value.replace(/\s+/g, "_")?.toLowerCase()
              : value;
        if (type === "error") {
          nodeResult.data.parameters[key].error = value as string;
          return;
        }
        if (!nodeResult.data.parameters[key]) {
          nodeResult.data.parameters[key] = {
            label: label,
            type: type,
            placeholder: placeholder,
            required: required,
            options: options,
            description: description,
            value: value,
            error: error,
          };
          return;
        }

        if (key === "nextParameter") {
          nodeResult.data.parameters[key].label = label || "";
          nodeResult.data.parameters[key].type = type;
          nodeResult.data.parameters[key].placeholder = placeholder || "";
          nodeResult.data.parameters[key].options = options || [];
          nodeResult.data.parameters[key].description = description || "";
          nodeResult.data.parameters[key].required = required || false;
          nodeResult.data.parameters[key].value = updatedValue;
          nodeResult.data.parameters[key].error = "";
          return;
        }

        nodeResult.data.parameters[key].value = updatedValue;
        nodeResult.data.parameters[key].error = "";

        if (type === "text_input_label") {
          const variableNameKey = Object.keys(nodeResult.data.parameters).find(
            k =>
              nodeResult.data.parameters &&
              nodeResult.data.parameters[k].type === "text_variable_name"
          );
          if (variableNameKey) {
            nodeResult.data.parameters[variableNameKey].value =
              typeof value === "string"
                ? value.replace(/\s+/g, "_")?.toLowerCase()
                : value;
            nodeResult.data.parameters[variableNameKey].error = "";
          } else {
            console.error(`Variable name key not found in node ${nodeId}`);
          }
        }

        if (nodeResult.data.label === "Generate Image") {
          const { model, numberOfImages, quality, prompt, size, style } =
            nodeResult.data.parameters;

          if (key === "model") {
            switch (model?.value) {
              case "dall-e-2":
                numberOfImages.maxValue = 10;
                numberOfImages.disabled = false;
                quality.value = "standard";
                quality.disabled = true;
                prompt.maxLength = 1000;
                style.value = "";
                style.disabled = true;
                size.value = "";
                size.options = [
                  {
                    label: "256x256",
                    value: "256x256",
                  },
                  {
                    label: "512x512",
                    value: "512x512",
                  },
                  {
                    label: "1024x1024",
                    value: "1024x1024",
                  },
                ];
                break;

              case "dall-e-3":
                numberOfImages.value = 1;
                numberOfImages.disabled = true;
                quality.disabled = false;
                quality.value = "hd";
                style.value = "vivid";
                size.value = "";
                style.disabled = false;
                prompt.maxLength = 4000;
                size.options = [
                  {
                    label: "1024x1024",
                    value: "1024x1024",
                  },
                  {
                    label: "1792x1024",
                    value: "1792x1024",
                  },
                  {
                    label: "1024x1792",
                    value: "1024x1792",
                  },
                ];
                break;

              default:
                break;
            }
          }

          // switch (model?.value) {
          //   case "dall-e-2":
          //     numberOfImages.maxValue = 10;
          //     quality.value = "standard";
          //     quality.disabled = true;
          //     prompt.maxLength = 1000;
          //     style.value = "";
          //     style.disabled = true;
          //     size.options = [
          //       {
          //         label: "256x256",
          //         value: "256x256",
          //       },
          //       {
          //         label: "512x512",
          //         value: "512x512",
          //       },
          //       {
          //         label: "1024x1024",
          //         value: "1024x1024",
          //       },
          //     ];
          //     break;

          //   case "dall-e-3":
          //     numberOfImages.value = 1;
          //     numberOfImages.disabled = true;
          //     quality.disabled = false;
          //     // quality.value = "hd";
          //     // style.value = "vivid";
          //     // size.value = "";
          //     style.disabled = false;
          //     prompt.maxLength = 4000;
          //     size.options = [
          //       {
          //         label: "1024x1024",
          //         value: "1024x1024",
          //       },
          //       {
          //         label: "1792x1024",
          //         value: "1792x1024",
          //       },
          //       {
          //         label: "1024x1792",
          //         value: "1024x1792",
          //       },
          //     ];
          //     break;

          //   default:
          //     break;
          // }
        }
      } else {
        console.error(`Node with id ${nodeId} not found`);
      }
    },

    updateSubNodeParameter: (
      state,
      action: PayloadAction<{
        nodeId: string;
        nodeMasterId: string;
        key: string;
        type: string;
        value: any;
        label?: string;
        placeholder?: string;
        required?: boolean;
        options?: Option[];
        description?: string;
        error?: string;
      }>
    ) => {
      const {
        nodeId,
        nodeMasterId,
        key,
        type,
        value,
        placeholder,
        required,
        options,
        label,
        description,
        error,
      } = action.payload;

      const nodeResult = state.nodes.find(node => node.id === nodeId);

      if (nodeResult) {
        const subNode = nodeResult.data.subNodes?.find(
          subNode => subNode.nodeMasterId === nodeMasterId
        );

        if (subNode) {
          const updatedValue =
            typeof value === "boolean"
              ? value
              : type === "text_variable_name"
                ? value.replace(/\s+/g, "_")?.toLowerCase()
                : value;

          if (type === "error") {
            subNode.parameters[key].error = value as string;
            return;
          }

          if (!subNode.parameters[key]) {
            subNode.parameters[key] = {
              label: label || "",
              type: type,
              placeholder: placeholder,
              required: required || false,
              options: options,
              description: description,
              value: value,
              error: error,
            };
            return;
          }

          if (key === "nextParameter") {
            subNode.parameters[key].label = label || "";
            subNode.parameters[key].type = type;
            subNode.parameters[key].placeholder = placeholder || "";
            subNode.parameters[key].options = options || [];
            subNode.parameters[key].description = description || "";
            subNode.parameters[key].required = required || false;
            subNode.parameters[key].value = updatedValue;
            subNode.parameters[key].error = "";
            return;
          }

          subNode.parameters[key].value = updatedValue;
          subNode.parameters[key].error = "";

          if (type === "text_input_label") {
            const variableNameKey = Object.keys(subNode.parameters).find(
              k =>
                subNode.parameters &&
                subNode.parameters[k].type === "text_variable_name"
            );
            if (variableNameKey) {
              subNode.parameters[variableNameKey].value =
                typeof value === "string"
                  ? value.replace(/\s+/g, "_")?.toLowerCase()
                  : value;
              subNode.parameters[variableNameKey].error = "";
            } else {
              console.error(
                `Variable name key not found in sub-node ${nodeMasterId}`
              );
            }
          }
        } else {
          console.error(
            `Sub-node with nodeMasterId ${nodeMasterId} not found in node ${nodeId}`
          );
        }
      } else {
        console.error(`Node with id ${nodeId} not found`);
      }
    },

    resetSubNodeParameter: (
      state,
      action: PayloadAction<{
        nodeId: string;
        nodeMasterId: string;
        key?: string;
        type?: string;
        value?: any;
        label?: string;
        placeholder?: string;
        required?: boolean;
        options?: Option[];
        description?: string;
        error?: string;
      }>
    ) => {
      const { nodeId, nodeMasterId } = action.payload;

      const nodeResult = state.nodes.find(node => node.id === nodeId);

      if (nodeResult) {
        const subNode = nodeResult.data.subNodes?.find(
          subNode => subNode.nodeMasterId === nodeMasterId
        );

        if (subNode) {
          Object.keys(subNode.parameters).forEach(key => {
            Object.keys(subNode.parameters).forEach(key => {
              delete subNode.parameters[key].value;
            });
          });

          if (subNode.parameters.nextParameter) {
            delete subNode.parameters.nextParameter;
          }
        } else {
          console.error(
            `Sub-node with nodeMasterId ${nodeMasterId} not found in node ${nodeId}`
          );
        }
      } else {
        console.error(`Node with id ${nodeId} not found`);
      }
    },

    addDynamicParameterToNode: (
      state,
      action: PayloadAction<{
        nodeId: string;
        key: string;
        label: string;
        type: string;
        value: any;
        placeholder: string;
        required: boolean;
        options?: Option[];
        description: string;
        error?: string;
      }>
    ) => {
      const {
        nodeId,
        key,
        label,
        type,
        value,
        placeholder,
        required,
        options,
        description,
        error,
      } = action.payload;
      const nodeResult: any = state.nodes.find(node => node.id === nodeId);

      if (nodeResult) {
        if (!nodeResult.data.parameters[key]) {
          nodeResult.data.parameters[key] = {
            label: label,
            type: type,
            placeholder: placeholder,
            required: required,
            options: options,
            description: description,
            value: value,
            error: error,
          };
        }
        return;
      }
      console.error(`Node with id ${nodeId} not found`);
    },

    addVariable: (
      state,
      action: PayloadAction<{
        nodeID: string;
        variableName: string;
        workflowID: string;
        variableValue?: string;
        variableType: string;
      }>
    ) => {
      const existingVariableIndex = state.variables.findIndex(
        variable => variable.nodeID === action.payload.nodeID
      );

      if (existingVariableIndex !== -1) {
        state.variables[existingVariableIndex] = action.payload;
      } else {
        state.variables.push(action.payload);
      }
    },

    updateNode: (state, action: PayloadAction<NodeState>) => {
      state.nodes = state.nodes.map(node =>
        node.id === action.payload.id ? action.payload : node
      );
    },
    removeNode: state => {
      console.log("----remove---");
      state.nodeData = {} as NodeState;
    },

    clearNodeData: state => {
      state.nodeData = {} as NodeState;
      state.nodes = [] as NodeState[];
      state.variables = [];
    },

    removeNodeById: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);

      state.nodes?.forEach(node => {
        if (node.data.dependencies) {
          node.data.dependencies = node.data?.dependencies?.filter(
            dep => dep !== action.payload
          );
        }
      });
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createNode.pending, state => {
        state.isAddNodeLoading = true;
      })
      .addCase(
        createNode.fulfilled,
        (state, action: PayloadAction<NodeDataState>) => {
          state.isAddNodeLoading = false;
        }
      )
      .addCase(createNode.rejected, state => {
        state.isAddNodeLoading = false;
      })
      .addCase(updateNodeById.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateNodeById.fulfilled,
        (state, action: PayloadAction<NodeDataState>) => {
          state.isLoading = false;
        }
      )
      .addCase(updateNodeById.rejected, state => {
        state.isLoading = false;
      })
      .addCase(deleteNodeById.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        deleteNodeById.fulfilled,
        (state, action: PayloadAction<NodeDataState>) => {
          state.isLoading = false;
        }
      )
      .addCase(deleteNodeById.rejected, state => {
        state.isLoading = false;
      });
  },
});

export default nodeSlice.reducer;

export const {
  addNodeData,
  addNode,
  clearNodeData,
  removeNode,
  updateNode,
  updateNodeDependency,
  removeNodeDependency,
  removeNodeById,
  addVariable,
  updateNodeParameter,
  updateSubNodeParameter,
  resetSubNodeParameter,
  addDynamicParameterToNode,
  updateNodeDescription,
} = nodeSlice.actions;
