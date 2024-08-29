import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import mineReducer from "./mineSlice";
import walletReducer from "./walletSlice";

const rootReducer = {
  mine: mineReducer,
  wallet: walletReducer
};

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export const wrapper = createWrapper(makeStore);
