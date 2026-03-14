import React from "react";
import useGetMessages from "../hooks/useGetMessages.jsx";
import { useSelector } from "react-redux";
import Message from "./Message.jsx";

const MessageList = ({ selectedUser }) => {
  useGetMessages();

  const { conversation } = useSelector((store) => store.message);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-zinc-50 dark:bg-zinc-950 space-y-2">
      {conversation && conversation?.messages?.length > 0 ? (
        conversation.messages.map((m) => (
          <Message selectedUser={selectedUser} key={m._id} message={m} />
        ))
      ) : (
        <div className="text-center text-zinc-500 mt-10">
          No conversation yet. Say hi!
        </div>
      )}
    </div>
  );
};

export default MessageList;
