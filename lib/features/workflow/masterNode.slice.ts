import instance, { CustomAxiosInstance } from "@/config/axios.config";
import { MasterNodeState, MasterNodeProps } from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createMasterNode = createAsyncThunk(
  "workflow/createMasterNode",
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomAxiosInstance().post("nodemaster");
      // const data = await instance.post("/workflows/nodemaster");
      return data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const getMasterNodes = createAsyncThunk(
  "masterNodes/getMasterNodes",
  async (_, { rejectWithValue }) => {
    try {
      const result = await CustomAxiosInstance().get("nodemaster");

      // const result = await instance.get(`/workflows/nodemaster`);
      console.log("---data----", result);
      return result.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

const masterNodeSlice = createSlice({
  name: "nodes",
  initialState: {} as MasterNodeState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getMasterNodes.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getMasterNodes.fulfilled,
        (state, action: PayloadAction<MasterNodeProps[]>) => {
          state.masterNode = action.payload;
        }
      )
      .addCase(getMasterNodes.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(createMasterNode.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createMasterNode.fulfilled,
        (state, action: PayloadAction<MasterNodeProps[]>) => {
          state.masterNode = action.payload;
        }
      )
      .addCase(createMasterNode.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default masterNodeSlice.reducer;
