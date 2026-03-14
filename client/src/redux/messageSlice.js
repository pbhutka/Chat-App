import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    conversation: [],
  },
  reducers: {
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
  },
});

export const { setConversation } = messageSlice.actions;
export default messageSlice.reducer;
