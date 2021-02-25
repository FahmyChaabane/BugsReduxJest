import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "../reducers/reducer";
import { logger } from "../middlewares/logger";

// eslint-disable-next-line
export default () =>
  configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), logger],
  });
