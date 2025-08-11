import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Slice imports
import authReducer from "./slices/authSlice";

// Persist configuration
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated"], // accessToken은 메모리에서만 관리
  serialize: true,
  deserialize: true,
  // SSR 안정성을 위한 추가 설정
  timeout: 0,
  debug: process.env.NODE_ENV === "development",
};

// Root reducer
const rootReducer = {
  auth: persistReducer(authPersistConfig, authReducer),
};

// Store configuration
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
        ignoredPaths: ["persist"],
        // 추가 안정성 설정
        warnAfter: 128,
      },
      immutableCheck: {
        ignoredPaths: ["persist"],
        warnAfter: 128,
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
  // 추가 안정성 설정
  preloadedState: {},
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persistor
export const persistor = persistStore(store);
