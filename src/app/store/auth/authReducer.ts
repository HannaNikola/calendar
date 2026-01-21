import { createSlice } from "@reduxjs/toolkit";
import {
  registerApi,
  loginApi,
  fetchCurrentUser,
  fetchLogoutUser,
  fetchDeletedUser,
} from "@/app/api/authApi";

interface Auth {
  user: {
    id: string;
    email: string;
    name?: string;
    emailVerified?: boolean;
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
        state.error = null;
      })
      .addCase(registerApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(registerApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginApi.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.status = "idle";
      })
      .addCase(fetchLogoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "idle";
      })
      .addCase(fetchLogoutUser.rejected, (state) => {
        state.status = "idle";
      })
      .addCase(fetchDeletedUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDeletedUser.fulfilled, (state) => {
        state.status = "idle";
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(fetchDeletedUser.rejected, (state) => {
        state.status = "idle";
      });
  },
});
export const authReducer = authSlice.reducer;
