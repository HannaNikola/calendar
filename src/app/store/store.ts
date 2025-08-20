import { configureStore } from "@reduxjs/toolkit";
import { eventReducer } from "@/app/store/events/eventReducer";
import { modalReducer } from "@/app/store/events/modalReducer";
import logger from "redux-logger";
import { filterReduser } from "./filters/filterReducer";
import { todoReducer } from "./todo/todoReducer";



export const store = configureStore({
  reducer: {
    eventData: eventReducer,
    modal: modalReducer,
    filter: filterReduser,
    todo: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    }).concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


