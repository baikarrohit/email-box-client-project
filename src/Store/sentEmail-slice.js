import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sentemailItem: [],
  sentMessageOpen: JSON.parse(localStorage.getItem("sentMessage open")),
};
const SentEmailSlice = createSlice({
  name: "sentemail",
  initialState,
  reducers: {
    addItems(state, action) {
      state.sentemailItem = action.payload;
    },
    addMessageOpen(state, action) {
      state.sentMessageOpen = action.payload[1];
      const msgOpen = JSON.stringify(action.payload[1]);
      localStorage.setItem("sentMessage open", msgOpen);
    },
    removeItem(state, action) {
      const filterItems = state.sentemailItem.filter(
        (ele) => ele[0] !== action.payload[0]
      );
      state.sentemailItem = filterItems;
    },
  },
});

export const SentEmailActions = SentEmailSlice.actions;

export const SentEmailItemFill = (email) => {
  return async (dispatch) => {
    try {
      const useremail = email.replace(/[.@]/g, "");
      const res = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${useremail}/sentemails.json`
      );
      const data = await res.json();
      console.log("sentEmail render");
      if (res.ok) {
        dispatch(SentEmailActions.addItems(Object.entries(data)));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export default SentEmailSlice.reducer;
