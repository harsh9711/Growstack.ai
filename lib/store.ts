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
import masterNodeSlice from "./features/workflow/masterNode.slice";
import workflowSlice from "./features/workflow/workflow.slice";

const rootReducer = combineReducers({
  auth: authReducer,
  document: documentSlice,
  nodes: nodeSlice,
  masterNode: masterNodeSlice,
  workflows: workflowSlice,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: ["nodes", "masterNode", "workflows"],
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
