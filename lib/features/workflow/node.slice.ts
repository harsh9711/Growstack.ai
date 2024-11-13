import { NodeDataState, NodeState } from "@/types/workflows";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as NodeState[];

const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<NodeState>) => {
      state.push(action.payload);
    },

    removeNode: (state, action: PayloadAction<string>) => {
      return state.filter(node => node.id !== action.payload);
    },

    updateNode: (state, action: PayloadAction<NodeState[]>) => {
      state = action.payload;
    },
  },
});

export default nodeSlice.reducer;

export const { addNode, removeNode, updateNode } = nodeSlice.actions;
