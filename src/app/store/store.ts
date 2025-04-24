import { configureStore } from '@reduxjs/toolkit';
import { eventReducer } from "@/app/store/slices/eventReducer";
import logger from 'redux-logger'

export const store = configureStore({
    reducer:{
        eventData: eventReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
      devTools: process.env.NODE_ENV !== 'production'
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch