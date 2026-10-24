import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: Boolean(sessionStorage.getItem("admin_token")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user } = action.payload || {};
      state.user = user || null;
      state.isAuthenticated = Boolean(sessionStorage.getItem("admin_token"));
    },
    clearCredentials: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      sessionStorage.removeItem("admin_token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
