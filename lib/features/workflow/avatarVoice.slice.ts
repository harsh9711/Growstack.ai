import instance from "@/config/axios.config";
import { AvatarVoiceState, VoiceProps, AvatarProps } from "@/types/workflows";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const getAvatars = createAsyncThunk(
  "getAvatar",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance.get("/ai/api/v1/video/avatars");
      return result.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

export const getVoices = createAsyncThunk(
  "getVoice",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance.get("/ai/api/v1/video/voices");
      return result.data.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error?.response?.data?.error_message || error?.message
      );
    }
  }
);

const masterNodeSlice = createSlice({
  name: "avatarVoice",
  initialState: {} as AvatarVoiceState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(getVoices.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getVoices.fulfilled,
        (state, action: PayloadAction<VoiceProps[]>) => {
          state.voices = action.payload;
        }
      )
      .addCase(getVoices.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(getAvatars.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        getAvatars.fulfilled,
        (state, action: PayloadAction<AvatarProps[]>) => {
          state.avatars = action.payload;
        }
      )
      .addCase(getAvatars.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default masterNodeSlice.reducer;
