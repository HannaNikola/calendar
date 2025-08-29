import { addTodoApi, fetchTodosApi, updateTodotApi, deleteTodoApi, favoriteTodoApi } from "@/app/api/todoApi";
import { TodoStateProps } from "@/app/types/typesTodoApi";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoStateProps = {
  todos: [],
  status: "idle",
  error: null,
};

const todolSlice = createSlice({
  name: "todos",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodosApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(addTodoApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodoApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = [...state.todos, action.payload];
      })
      .addCase(addTodoApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      })
      .addCase(updateTodotApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodotApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = state.todos.map((item) =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(updateTodotApi.rejected,(state, action)=>{
        state.status = 'failed';
        state.error = action.error.message || "Unknown error";

      })
      .addCase(deleteTodoApi.pending,(state)=>{
        state.status = 'loading'
      })
      .addCase(deleteTodoApi.fulfilled, (state, action)=>{
        state.status = 'succeeded';
        state.todos = state.todos.filter((item)=> item._id !== action.payload)
      })
      .addCase(deleteTodoApi.rejected, (state, action)=>{
        state.status = 'failed'
        state.error = action.error.message || "Unknown error";
      })
      .addCase(favoriteTodoApi.pending, (state)=>{
        state.status='loading'
      })
      .addCase(favoriteTodoApi.fulfilled, (state, action)=>{
        state.status = 'succeeded';
        state.todos = state.todos.map((item)=> item._id === action.payload._id ? action.payload : item)
      })
      .addCase(favoriteTodoApi.rejected,(state, action)=>{
        state.status = 'failed';
        state.error = action.error.message || "Unknown error";
      })
  },
});

export const todoReducer = todolSlice.reducer;


