import { CustomAxiosInstance } from "@/config/axios.config";
import { NodeDataState, NodeState } from "@/types/workflows";
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

const nodeSlice = createSlice({
  name: "nodes",
  initialState: {
    isLoading: false,
    nodeData: {} as NodeState,
    nodes: [] as NodeState[],
  },
  reducers: {
    addNodeData: (state, action: PayloadAction<NodeState>) => {
      state.nodeData = action.payload;
    },

    addNode: (state, action: PayloadAction<NodeState>) => {
      state.nodes.push(action.payload);
    },

    removeNode: state => {
      console.log("----remove---");
      state.nodeData = {} as NodeState;
    },

    updateNode: (state, action: PayloadAction<NodeState[]>) => {},
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
      });
  },
});

export default nodeSlice.reducer;

export const { addNodeData, addNode, removeNode, updateNode } =
  nodeSlice.actions;
