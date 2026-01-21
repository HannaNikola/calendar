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

// Optional: добавить Redux state для isRefreshing, чтобы UI мог показывать «Loading…»

export const registerApi = createAsyncThunk(
  "auth/register",
  async (data: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const response = await api.post("/api/users/register", data);
      return response.data.user;
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "User already exists";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const registerApi = createAsyncThunk(
//   "auth/register",
//   async (data: { email: string; password: string; name: string }, thunkAPI) => {
//     try {
//       const response = await api.post("/api/users/register", data);
//       return response.data;
//     } catch (error: any) {
//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "User already exists";
//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );

// export const verifyEmailApi = createAsyncThunk(
//   "auth/verifyEmail",
//   async (token: string, thunkAPI) => {
//     try {
//       const response = await api.get(`/api/users/verify-email?token=${token}`);
//       return response.data.user;
//     } catch (error: any) {
//       const message =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Email verification failed";

//       return thunkAPI.rejectWithValue(message);
//     }
//   },
// );


export const loginApi = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post("/api/users/login", data);
      return response.data.user;
    } catch (error: any) {
      const message =
        (error.response?.data?.message as string) ||
        (error.response?.data?.error as string) ||
        error.message ||
        "Invalid email or password";
      return thunkAPI.rejectWithValue(message);
    }
  },
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
  },
);

export const fetchLogoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post("/api/users/logout");
      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || null);
    }
  },
);

export const fetchDeletedUser = createAsyncThunk(
  "auth/delete",
  async (_, thunkAPI) => {
    try {
      await api.delete("api/users/delete");
      return;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(null);
    }
  },
);











