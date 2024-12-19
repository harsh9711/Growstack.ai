import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/auth/auth.slice";
import documentSlice from "./features/documents/document.slice";
import nodeSlice from "./features/workflow/node.slice";
import nodeAuthSlice from "./features/workflow/nodeAuth.slice";
import masterNodeSlice from "./features/workflow/masterNode.slice";
import workflowSlice from "./features/workflow/workflow.slice";
import avatarVoiceSlice from "./features/workflow/avatarVoice.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentSlice,
  nodes: nodeSlice,
  masterNode: masterNodeSlice,
  workflows: workflowSlice,
  avatarVoice: avatarVoiceSlice,
  nodeAuth: nodeAuthSlice
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["nodes", "masterNode", "workflows", "avatarVoice"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { persistor, type RootState, type AppDispatch };
