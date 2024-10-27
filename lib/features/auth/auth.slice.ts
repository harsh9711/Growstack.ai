import { isEmptyObject } from "@/lib/utils";
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

const defaultPlan: UserPlan = {
  _id: "",
  user_id: "",
  plan_name: "",
  plan_amount: 0,
  plan_id: "grs/free",
  usage_expiry_date: new Date("9999-12-31").toDateString(),
  plan_type: "FREE",
  ai_background_generator_cost: 0,
  smart_ai_messages: 0,
  fast_ai_messages: 0,
  no_of_messages: 0,
  usage_amount: 0,
  usage: {
    ai_chat: true,
    ai_playground: false,
    ai_assistant: false,
    ai_custom_gpt: false,
    ai_templates: false,
    ai_wizard: false,
    no_of_text_to_avatar: 0,
    no_of_text_to_video: 0,
    ai_background_generator_credits: 0,
    social_media_posting: false,
    social_media_conversation: false,
    whatsapp_automation: false,
    telegram_automation: false,
    social_media_analytics: false,
    social_media_ai_insights: false,
    recommendation_engine: false,
    content_calendar: false,
    ai_worfklow_credits: 0,
    webscraping: false,
    contacts_repository: false,
    contact_intelligence: false,
    linkedin_agent: false,
    mdr_agent: false,
  },
  createdAt: "",
  updatedAt: "",
  __v: 0,
};

const initialState: AuthState = {
  isAuthenticated: false,
  initialized: false,
  user: null,
  isUserFetching: false,
  isCurrentPlanFetching: false,
  currentPlan: {} as UserPlan,
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
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentPlan = {} as UserPlan;
    },
    setUserPlan: (state, action: PayloadAction<UserPlan | null>) => {
      if (isEmptyObject(action.payload)) {
        state.currentPlan = defaultPlan;
        return;
      } else {
        state.currentPlan = action.payload;
      }
    },
    setPlanLoading: (state, action: PayloadAction<boolean>) => {
      state.isCurrentPlanFetching = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserFetching = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setInitialized,
  setUserPlan,
  setPlanLoading,
  setUserLoading,
} = authSlice.actions;
export default authSlice.reducer;
