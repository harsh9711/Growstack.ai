import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface AuthState {
  [key: string]: {
    status: boolean;
    data?: any; // Add extra data dynamically
  };
}

const initialState: AuthState = {};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set a platform's sign-in status
    setSignInStatus: (
      state,
      action: PayloadAction<{ platform: string; data: any; status: boolean }>
    ) => {
      const { platform, data, status } = action.payload;
      state[platform] = { status, data };
    },
  },
});

// Export actions
export const { setSignInStatus } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
