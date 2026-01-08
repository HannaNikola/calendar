import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "./api";
import { AxiosError } from "axios";

// authRouter.post("/register", celebrate(registerShema), authRegister);
// authRouter.post("/login", celebrate(loginShema), authLogin);
// authRouter.post("/refresh", authRefresh);
// authRouter.post("/logout", tokenAuth, authLogout);
// authRouter.post("/logout-all", tokenAuth, authLogoutAll);

// authRouter.get("/current", tokenAuth, authCurrent);
// authRouter.delete("/delete", tokenAuth, authDeleteUser);

export const registerApi = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const response = await api.post("/api/users/register", data);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const loginApi = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post("/api/users/login", data);
      return response.data.user;
    } catch (error) {
      const err = error as AxiosError;
      return thunkAPI.rejectWithValue(
        err.response?.data || "Something went wrong"
      );
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/users/current");
      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || null);
    }
  }
);

// export const fetchLogoutUser = createAsyncThunk(
//     "auth/fetchLogoutUser",
//     async(_, thunkAPI)=>{
//         try{
//             const response =  await axios.post("/api/users/logout")
//             return response.data.user
//         }catch(error: any){
//          return thunkAPI.rejectWithValue(error.response?.data || null);
//         }
//     }
// )
