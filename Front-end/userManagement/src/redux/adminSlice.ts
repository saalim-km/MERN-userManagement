import { createSlice } from "@reduxjs/toolkit";

const adminDataFromLocalStorage = localStorage.getItem("admin");
const adminIsAuth = localStorage.getItem("adminIsAuth");
const initialState = {
  admin: adminDataFromLocalStorage ? JSON.parse(adminDataFromLocalStorage) : null,
  isAuthenticated: adminIsAuth ? JSON.parse(adminIsAuth) : false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.admin = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("admin", JSON.stringify(action.payload));
      localStorage.setItem("adminIsAuth", JSON.stringify(true));
    },
    logout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      localStorage.removeItem("admin");
      localStorage.removeItem("adminIsAuth");
      localStorage.removeItem("adminAccess");
      localStorage.removeItem("adminRefresh");
    },
  },
});

const { login, logout } = adminSlice.actions;
export { login, logout };

export default adminSlice.reducer;
