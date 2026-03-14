import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    chatUsers: [],
    selectedUser: null,
    searchUsers: [],
    onlineUsers: null
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setChatUsers: (state, action) => {
      state.chatUsers = action.payload;
    },
    setSearchUsers: (state, action) => {
      state.searchUsers = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    }
  },
});

export const { setAuthUser, setOtherUsers, setSearchUsers, setChatUsers, setSelectedUser, setOnlineUsers } =
  userSlice.actions;

export default userSlice.reducer;
