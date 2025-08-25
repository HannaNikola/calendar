import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CalendarTodo } from "../types/typesTodoApi";

axios.defaults.baseURL = "https://calendar-back-end-s3b2.onrender.com";

export const fetchTodosApi = createAsyncThunk(
  "allTodo/fethcAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/todo");
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const addTodoApi = createAsyncThunk(
  "todoData/addTodo",
  async (
    newTodo: {
      title: string;
      description: string;
      isImportant: boolean;
      isCompleted: boolean;
      end: Date | string;
      allDay: boolean;
      eventId: string;
      repeat: string;
      reminder: {
        triggerBefore: string;
        notifyAt: Date | null;
        notified: boolean;
      };
    },
    thunkAPI
  ) => {
    try {
      const payload = {
        ...newTodo,
      };
      const response = await axios.post("/api/todo", payload);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);


export const updateTodotApi = createAsyncThunk(
    "todoData/updateTodo",
    async(payload:{id:string; todoData:Partial<CalendarTodo> }, thunkAPI)=>{
        try{
            const { ...sanitizedTodoData } = payload.todoData;
            const response = await axios.patch(
                `/api/todo/${payload.id}`, sanitizedTodoData
            );
            console.log("updateTodo", response.data)
            return response.data;
        }catch(error){
            const err = error as AxiosError;
            return thunkAPI.rejectWithValue(
               err.response?.data || "Something went wrong" 
            )
        }
    }
)


export const deleteTodoApi = createAsyncThunk<string,string>(
    "todoData/deleteTodo",
    async(id:string, thunkAPI)=>{
        try{
            const response = await axios.delete(`/api/todo/${id}`);
            console.log('delete', response.data._id)
            return response.data.data._id
        }catch(error){
            const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      )
        }
    }
)