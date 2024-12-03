import { CustomAxiosInstance } from "@/config/axios.config";
import { MasterNodeState, MasterNodeProps } from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createMasterNode = createAsyncThunk(
  "workflow/createMasterNode",
  async (_, { rejectWithValue }) => {
    try {
      const data = await CustomAxiosInstance("http://localhost:5000/").post(
        "nodemaster"
      );
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
      const data = await CustomAxiosInstance("http://localhost:5000/").get(
        "nodemaster"
      );
      console.log("---data----", data);
      return data.data;
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
