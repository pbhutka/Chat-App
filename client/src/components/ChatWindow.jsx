import React from "react";
import { useSelector, useDispatch } from "react-redux";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import { ArrowLeft } from "lucide-react";
import { setSelectedUser } from "../redux/userSlice.js";

function ChatWindow() {
  const { selectedUser } = useSelector((store) => store.user);
  const { onlineUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  if (!selectedUser)
    return (
      <div className="flex-1 flex items-center justify-center text-zinc-500">
        Select a user to start chatting
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-zinc-950">
      {/* 1. HEADER */}
      <div className="px-4 sm:px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between shrink-0 shadow-sm z-10 transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="sm:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <img
            src={
              selectedUser.pic ||
              "https://imgs.search.brave.com/3SWuWnQgFhsq940CBhII9PGkgIV5tXJjcCca6NOApjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzU5MjUwNi92ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcGhvdG8t/cGxhY2Vob2xkZXIt/aWNvbi1ncmV5LXBy/b2ZpbGUtcGljdHVy/ZS1idXNpbmVzcy1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUJwUjBGVmFF/YTVGMjRHSXc3Szhu/TVdpaUdtYmI4cW1o/ZmtwWGNwMWRoUWc9"
            }
            alt={`${selectedUser.firstName} profile`}
            className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
          />
          <div>
            <h2 className="font-bold text-zinc-900 dark:text-white leading-tight">
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p className={`pt-1 text-xs flex items-center gap-1 ${onlineUsers?.includes(selectedUser._id) ? "text-green-500" : "text-red-500"}`}>
              <span className={`w-2 h-2 ${onlineUsers?.includes(selectedUser._id) ? "bg-green-500" : "bg-red-500"} rounded-full inline-block`}></span>
              {onlineUsers?.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. MESSAGES DISPLAY AREA */}
      <div className="flex-1 overflow-hidden flex flex-col bg-zinc-50 dark:bg-zinc-950">
        <MessageList selectedUser={selectedUser} />
      </div>

      {/* 3. INPUT AREA */}
      <MessageInput />
    </div>
  );
}

export default ChatWindow;
