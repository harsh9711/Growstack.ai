import instance, { CustomAxiosInstance } from "@/config/axios.config";
import { WorkflowDataState, WorkflowState } from "@/types/workflows";
import { resolveWorkflowNodes } from "@/utils/dataResolver";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { conforms } from "lodash";

export const createWorkFlow = createAsyncThunk(
  "createWorkflow",
  async (data: WorkflowDataState, { rejectWithValue }) => {
    try {
      const result = await CustomAxiosInstance().post("workflow", data);

      // const result = await instance.post("/workflows", data);
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
      // const result = await instance.get(`/workflows/${workFlowId}`);
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
      // const result = await instance.patch(`/workflows/${id}`, data);
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
          // console.log(
          //   "action.payload---workFloe---->",
          //   JSON.stringify(action.payload, null, 2)
          // );
          state.isLoading = false;
          // state.workFlowData = action.payload;

          // const updatedNodes = action.payload.nodes?.map(node => {
          //   const updatedParameters = Object.entries(
          //     (node.nodeMasterId as any).parameters
          //   ).reduce((acc: { [key: string]: any }, [key, param]) => {
          //     acc[key] = {
          //       ...(typeof param === "object" && param !== null ? param : {}),
          //       value: node.parameters?.[key] || "",
          //     };
          //     return acc;
          //   }, {});

          //   return {
          //     id: node._id,
          //     position: node.position,
          //     type: node.type,
          //     data: {
          //       nodeMasterId: node.nodeMasterId._id,
          //       parameters: updatedParameters,
          //       subNodes: node.subNodes || [],
          //       dynamicParams: node.nodeMasterId.dynamicParams || [],
          //       functionToExecute: node.nodeMasterId.functionToExecute,
          //       label: node.nodeMasterId.name,
          //       description: node.nodeMasterId.description,
          //       icon: node.nodeMasterId.logoUrl,
          //     },
          //   };
          // });
          const updatedNodes = resolveWorkflowNodes(action.payload.nodes);
          state.workFlowData = {
            ...action.payload,
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
