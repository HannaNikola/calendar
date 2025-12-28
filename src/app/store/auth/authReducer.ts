import { createSlice } from "@reduxjs/toolkit";
import { registerApi, loginApi } from "@/app/api/authApi";

interface Auth {
  user: {
    id: string;
    email: string;
    name?: string;
  } | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerApi.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const authReducer = authSlice.reducer;
