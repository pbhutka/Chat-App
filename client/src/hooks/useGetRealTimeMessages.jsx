import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConversation } from "../redux/messageSlice.js";
import { setChatUsers } from "../redux/userSlice.js";
import axios from "axios";

const useGetRealTimeMessages = () => {
  const { socket } = useSelector((store) => store.socket);
  const { conversation } = useSelector((store) => store.message);
  const { selectedUser, chatUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handler = async (newMessage) => {
      // 1. Only append the message to conversation if the chat is currently open
      const isChatOpen = selectedUser && selectedUser._id === newMessage.senderId;
      if (isChatOpen) {
        dispatch(
          setConversation({
            ...conversation,
            messages: [...(conversation?.messages || []), newMessage],
          })
        );
      }

      // 2. Add or update sender in the sidebar locally
      let updatedChatUsers = [...(chatUsers || [])];
      const senderIndex = updatedChatUsers.findIndex((user) => user._id === newMessage.senderId);

      if (senderIndex > -1) {
        // User is already in the list, move them to top and update details
        const sender = { ...updatedChatUsers[senderIndex] };
        sender.latestMessage = newMessage;
        if (!isChatOpen) {
          sender.unreadCount = (sender.unreadCount || 0) + 1;
        }
        updatedChatUsers.splice(senderIndex, 1);
        updatedChatUsers.unshift(sender);
        dispatch(setChatUsers(updatedChatUsers));
      } else {
        // User not in list, fetch from backend to get full user details
        try {
          const res = await axios.get("http://localhost:5000/messages/users/chatted", {
            withCredentials: true,
          });
          dispatch(setChatUsers(res.data));
        } catch (err) {
          // console.log("Error fetching chat users:", err);
        }
      }
    };

    socket.on("newMessage", handler);

    return () => socket.off("newMessage", handler);
  }, [socket, conversation, selectedUser, chatUsers, dispatch]);
};

export default useGetRealTimeMessages;
