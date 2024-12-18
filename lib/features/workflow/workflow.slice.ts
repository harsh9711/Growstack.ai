import instance, { automation, CustomAxiosInstance } from "@/config/axios.config";
import { WorkflowDataState, WorkflowState } from "@/types/workflows";
import { resolveWorkflowNodes } from "@/utils/dataResolver";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conforms } from "lodash";

export const createWorkFlow = createAsyncThunk(
  "createWorkflow",
  async (data: WorkflowDataState, { rejectWithValue }) => {
    try {
      const result = await instance.post(`${automation}/workflow`, data);
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
      // const result = await CustomAxiosInstance().get(`workflow/${workFlowId}`);
      const result = await instance.get(`${automation}/workflow/${workFlowId}`);
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
      // const result = await CustomAxiosInstance().patch(`workflow/${id}`, data);
      const result = await instance.patch(`${automation}/workflow/${id}`, data);
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
  reducers: {
    onChangeWorkFlowData: (
      state,
      action: PayloadAction<{ key: keyof WorkflowDataState; value: any }>
    ) => {
      state.workFlowData[action.payload.key] = action.payload.value;
    },

    updateWorkflowStatus: (state, action) => {
      state.workFlowData.status = action.payload;
    },

    clearWorkFlowData: state => {
      state.workFlowData = {} as WorkflowDataState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createWorkFlow.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        createWorkFlow.fulfilled,
        (state, action: PayloadAction<WorkflowDataState>) => {
          state.isLoading = false;
          state.workFlowData = { ...action.payload, description: "" };
        }
      )
      .addCase(createWorkFlow.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateWorkFlowById.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        updateWorkFlowById.fulfilled,
        (state, action: PayloadAction<WorkflowDataState>) => {
          state.isLoading = false;
        }
      )
      .addCase(updateWorkFlowById.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getWorkFlowById.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getWorkFlowById.fulfilled,
        (state, action: PayloadAction<WorkflowDataState>) => {
          state.isLoading = false;
          const updatedNodes = resolveWorkflowNodes(action.payload.nodes);

          state.workFlowData = {
            ...action.payload,
            description: action.payload.description || "",
            //@ts-ignore
            nodes: updatedNodes,
          };
        }
      )
      .addCase(getWorkFlowById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default workflowSlice.reducer;
export const { clearWorkFlowData, onChangeWorkFlowData, updateWorkflowStatus } =
  workflowSlice.actions;
