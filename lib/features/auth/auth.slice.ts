import { UserPlan } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  isCurrentPlanFetching: boolean;
  currentPlan: UserPlan | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isCurrentPlanFetching : false,
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
    },
    setPlanLoading:(state, action: PayloadAction<boolean>) => {
      state.isCurrentPlanFetching = action.payload;
    }
  },
});

export const { login, logout, setUserPlan, setPlanLoading } = authSlice.actions;
export default authSlice.reducer;
