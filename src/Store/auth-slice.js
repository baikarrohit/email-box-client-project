import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  token: localStorage.getItem("token"),
  userEmail: localStorage.getItem("userEmail"),
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
    },
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
