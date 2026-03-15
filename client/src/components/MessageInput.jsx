import React, { useState } from "react";
import { Send } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setConversation } from "../redux/messageSlice.js";
import { setChatUsers } from "../redux/userSlice.js";

const MessageInput = () => {
  const dispatch = useDispatch();
  const { selectedUser, chatUsers } = useSelector((store) => store.user);
  const { conversation } = useSelector((store) => store.message);
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/messages/send/${selectedUser._id}`,
      { message },
      { withCredentials: true },
    );

    // Update local chatUsers list to bump user to top and update latest message
    let updatedChatUsers = [...(chatUsers || [])];
    const userIndex = updatedChatUsers.findIndex(
      (user) => user._id === selectedUser._id,
    );

    const sentMessage = res?.data?.newMessage;

    if (userIndex > -1) {
      // User exists, move to top and update latest message
      const user = { ...updatedChatUsers[userIndex] };
      user.latestMessage = sentMessage;
      updatedChatUsers.splice(userIndex, 1);
      updatedChatUsers.unshift(user);
    } else {
      // User doesn't exist in chat list yet, add to top
      const newUser = {
        ...selectedUser,
        latestMessage: sentMessage,
        unreadCount: 0,
      };
      updatedChatUsers.unshift(newUser);
    }

    dispatch(setChatUsers(updatedChatUsers));

    dispatch(
      setConversation({
        ...conversation,
        messages: [...(conversation?.messages || []), res?.data?.newMessage],
      }),
    );
    setMessage("");
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 shrink-0">
      <form className="flex gap-4" onSubmit={handleSendMessage}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Write a message..."
          className="flex-1 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors flex items-center justify-center"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
