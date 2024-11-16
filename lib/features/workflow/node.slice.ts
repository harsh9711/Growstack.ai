import { NodeDataState, NodeState } from "@/types/workflows";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as NodeState[];

const nodeSlice = createSlice({
  name: "nodes",
  initialState: {
    nodeData: {} as NodeState,
  },
  reducers: {
    addNode: (state, action: PayloadAction<NodeState>) => {
      state.nodeData = action.payload;
    },

    removeNode: state => {
      console.log("----remove---");
      state.nodeData = {} as NodeState;
    },

    updateNode: (state, action: PayloadAction<NodeState[]>) => {},
  },
});

export default nodeSlice.reducer;

export const { addNode, removeNode, updateNode } = nodeSlice.actions;
