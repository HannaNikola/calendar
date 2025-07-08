import { configureStore } from '@reduxjs/toolkit';
import { eventReducer } from "@/app/store/redux/eventReducer";
import {modalReducer} from '@/app/store/redux/modalReducer'
import logger from 'redux-logger'



export const store = configureStore({
    reducer:{
        eventData: eventReducer,
        modal: modalReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(logger),
      devTools: process.env.NODE_ENV !== 'production'
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


