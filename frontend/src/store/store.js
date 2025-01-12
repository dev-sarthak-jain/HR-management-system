import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createReduxEnhancer } from "@sentry/react";
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
import authSlice from "./auth/slice";
import botChats from "../redux/Slices/chatBotSlice"
import toggleBackgroundReducer from "../redux/Slices/toggleBackgroundSlice"
import userReducer from "../redux/Slices/userSlice"
import commentSliceReducer from "../redux/Slices/commentSlice";
import shared_useEffectReducer from "../redux/Slices/sharedUseEffectSlice"
import pagenationSliceReducer from "../redux/Slices/pagenationSlice";


import thunk from "redux-thunk"; // Import Redux Thunk middleware
const persistConfig = {
  key: "root",
  version: 1,
  storage,
  //   whitelist: [AUTH_NAME, CHAT_NAME, COMMON_NAME],
};

const sentryReduxEnhancer = createReduxEnhancer();

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice.reducer,
  })
);

const store = configureStore({
  reducer: {
    persistedReducer,
    users: userReducer,
    botChats,
    backgroundMode: toggleBackgroundReducer,
    pagenation: pagenationSliceReducer,
    all_comments: commentSliceReducer,
    shared_useEffect: shared_useEffectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
  enhancers: [sentryReduxEnhancer],
});

const persistor = persistStore(store);

export { store, persistor };
