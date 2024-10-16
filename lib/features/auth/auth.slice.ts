import { persistor } from "@/lib/store";
import { UserPlan } from "@/types/common";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  initialized: boolean;
  user: any;
  isUserFetching: boolean;
  isCurrentPlanFetching: boolean;
  currentPlan: UserPlan | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  initialized: false,
  user: null,
  isUserFetching: false,
  isCurrentPlanFetching: false,
  currentPlan: {} as UserPlan
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setInitialized: (state: AuthState, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
    login: (state, action: PayloadAction<any>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentPlan = {} as UserPlan;
    },
    setUserPlan: (state, action: PayloadAction<UserPlan | null>) => {
      state.currentPlan = action.payload;
    },
    setPlanLoading: (state, action: PayloadAction<boolean>) => {
      state.isCurrentPlanFetching = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    }
  },
});

export const { login, logout, setInitialized, setUserPlan, setPlanLoading, setUserLoading } = authSlice.actions;
export default authSlice.reducer;
