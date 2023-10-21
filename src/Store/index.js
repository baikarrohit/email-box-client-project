import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import inboxReducer from "./inbox-slice";
import sentemailReducer from './sentEmail-slice';

const store = configureStore({
  reducer: { auth: authReducer, inbox: inboxReducer, sentemail: sentemailReducer },
});

export default store;
