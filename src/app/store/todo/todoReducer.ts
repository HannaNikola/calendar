import { addTodoApi, fetchTodosApi } from "@/app/api/todoApi";
import { TodoStateProps } from "@/app/types/typesTodoApi";
import { createSlice } from "@reduxjs/toolkit";



const initialState:TodoStateProps = {
    todos: [],
    status: "idle",
    error: null

}

const todolSlice = createSlice({
    name: 'todos',
    initialState,

    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(fetchTodosApi.pending, (state)=>{
            state.status ="loading"
        })
        .addCase(fetchTodosApi.fulfilled, (state, action)=>{
            state.status = "succeeded"
            state.todos = action.payload;
        })
        .addCase(fetchTodosApi.rejected, (state, action)=>{
            state.status = "failed"
            state.error = action.error.message || "Unknown error";
        })
        .addCase(addTodoApi.pending, (state)=>{
            state.status = 'loading'
        })
        .addCase(addTodoApi.fulfilled, (state, action)=>{
            state.status = 'succeeded'
            state.todos = [...state.todos, action.payload]
        })
        .addCase(addTodoApi.rejected, (state, action)=>{
            state.status = 'failed'
            state.error = action.error.message || "Unknown error";
        })
    }
})

export const todoReducer = todolSlice.reducer