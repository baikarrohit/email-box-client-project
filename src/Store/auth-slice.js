import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  userEmail: localStorage.getItem("userEmail"),
  isLoggedIn: localStorage.getItem("isLoggedIn"),
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload.tokenId;
      state.userEmail = action.payload.email;
      localStorage.setItem("token", action.payload.tokenId);
      localStorage.setItem("userEmail", action.payload.email);
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      localStorage.removeItem("token")
      localStorage.removeItem("userEmail")
      localStorage.removeItem("isLoggedIn")
      state.isLoggedIn = false
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
