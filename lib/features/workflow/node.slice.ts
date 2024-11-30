import { CustomAxiosInstance } from "@/config/axios.config";
import { NodeDataState, NodeState, WorkflowNodeState } from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createNode = createAsyncThunk(
  "workflow/createNode",
  async (data: any, { rejectWithValue }) => {
    try {
      const result = await CustomAxiosInstance("http://localhost:4500/").post(
        "node",
        data
      );
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
      const result = await CustomAxiosInstance("http://localhost:4500/").patch(
        `node/${id}`,
        data
      );
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
      const result = await CustomAxiosInstance("http://localhost:4500/").delete(
        `node/${id}`
      );
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
      state.nodes.push(action.payload);
    },

    updateNodeParameter: (
      state,
      action: PayloadAction<{
        nodeId: string;
        key: string;
        type: string;
        value: string | boolean;
      }>
    ) => {
      const { nodeId, key, type, value } = action.payload;
      const node: any = state.nodes.find(node => node.id === nodeId);
      if (node) {
        const updatedValue =
          typeof value === "boolean"
            ? value
            : type === "text_variable_name"
              ? value.replace(/\s+/g, "_")
              : value;
        if (node.data.parameters) {
          node.data.parameters[key].value = updatedValue;
          node.data.parameters[key].error = "";
        }

        if (type === "text_input_label") {
          if (node.data.parameters) {
            const variableNameKey = Object.keys(node.data.parameters).find(
              k =>
                node.data.parameters &&
                node.data.parameters[k].type === "text_variable_name"
            );
            if (variableNameKey) {
              node.data.parameters[variableNameKey].value =
                typeof value === "string" ? value.replace(/\s+/g, "_") : value;
              node.data.parameters[variableNameKey].error = "";
            }
          }
        }
      }
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

    removeNodeById: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(node => node.id !== action.payload);
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createNode.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createNode.fulfilled,
        (state, action: PayloadAction<NodeDataState>) => {
          state.isLoading = false;
        }
      )
      .addCase(createNode.rejected, state => {
        state.isLoading = false;
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
  removeNode,
  updateNode,
  removeNodeById,
  addVariable,
  updateNodeParameter,
} = nodeSlice.actions;
