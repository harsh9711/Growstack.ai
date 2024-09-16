import { UserPlan } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  currentPlan: UserPlan | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  currentPlan: {} as UserPlan
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUserPlan: (state, action: PayloadAction<UserPlan | null>) => {
      state.currentPlan = action.payload;
    }
  },
});

export const { login, logout, setUserPlan } = authSlice.actions;
export default authSlice.reducer;
