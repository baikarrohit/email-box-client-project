import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inboxItems: [],
  messageOpen: JSON.parse(localStorage.getItem("message open")),
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState,
  reducers: {
    addItem(state, action) {
      state.inboxItems = action.payload;
    },
    addMessageOpen(state, action) {
      state.messageOpen = action.payload[1];
      const msgOpen = JSON.stringify(action.payload[1]);
      localStorage.setItem("message open", msgOpen);
    },
    removeItem(state, action) {
      const filterItems = state.inboxItems.filter(
        (ele) => ele[0] !== action.payload[0]
      );
      state.inboxItems = filterItems;
    },
    onLogoutInboxNull(state){
      state.inboxItems = []
    }
  },
});

export const inboxActions = inboxSlice.actions;

export const inboxItemFill = (email) => {
  return async (dispatch) => {
    try {
      const userEmail = email.replace(/[.@]/g, "");
      const resInbox = await fetch(
        `https://email-box-fb572-default-rtdb.firebaseio.com/${userEmail}/recievedemails.json`
      );
      const data = await resInbox.json();
      if (resInbox.ok && data !== null) {
        dispatch(inboxActions.addItem(Object.entries(data)));
      }else{
        throw new Error("Failed to fetch inbox")
      }
    } catch (error) {
      console.log(error);
    }
  };
};
export default inboxSlice.reducer;
