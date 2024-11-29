import { CustomAxiosInstance } from "@/config/axios.config";
import { WorkflowDataState, WorkflowState } from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const createWorkFlow = createAsyncThunk(
  "createWorkflow",
  async (data: WorkflowDataState, { rejectWithValue }) => {
    try {
      const result = await CustomAxiosInstance().post("workflow", data);
      return result.data as WorkflowDataState;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const getWorkFlowById = createAsyncThunk(
  "getWorkFlowById",
  async (workFlowId: string, { rejectWithValue }) => {
    try {
      const result = await CustomAxiosInstance().get(`workflow/${workFlowId}`);
      return result.data as WorkflowDataState;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const updateWorkFlowById = createAsyncThunk(
  "updateWorkFlowById",
  async (
    { id, data }: { id: string; data: WorkflowDataState },
    { rejectWithValue }
  ) => {
    try {
      const result = await CustomAxiosInstance().patch(`workflow/${id}`, data);
      return result.data as WorkflowDataState;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

const workflowSlice = createSlice({
  name: "workflow",
  initialState: {} as WorkflowState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createWorkFlow.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createWorkFlow.fulfilled,
        (state, action: PayloadAction<WorkflowDataState>) => {
          state.isLoading = false;
          state.workFlowData = action.payload;
        }
      )
      .addCase(createWorkFlow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getWorkFlowById.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getWorkFlowById.fulfilled,
        (state, action: PayloadAction<WorkflowDataState>) => {
          state.isLoading = false;
          state.workFlowData = action.payload;
        }
      )
      .addCase(getWorkFlowById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default workflowSlice.reducer;
