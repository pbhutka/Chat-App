import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice.js";
import { useSelector } from "react-redux";

const ContactItem = ({ user }) => {

  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);
  const { onlineUsers } = useSelector((state) => state.user);
  const { chatUsers } = useSelector((state) => state.user);

  const selectedUserHandler = (selectedUser) => {
    dispatch(setSelectedUser(selectedUser));

    // Clear unread count locally when clicking on the user
    if (user.unreadCount > 0) {
      const updatedChatUsers = chatUsers.map((u) =>
        u._id === user._id ? { ...u, unreadCount: 0 } : u
      );
      dispatch({ type: "user/setChatUsers", payload: updatedChatUsers });
    }
  };

  // Format time for latest message
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`${selectedUser?._id === user?._id ? "bg-zinc-100 dark:bg-zinc-900" : ""} flex items-center gap-3 p-4 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-b border-zinc-50 dark:border-zinc-900/50`}
    >
      <div className="relative">
        <div className="h-12 w-12 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-400 font-bold">
          <img
            className="w-full h-full rounded-full object-cover"
            src={
              user.pic ||
              "https://imgs.search.brave.com/3SWuWnQgFhsq940CBhII9PGkgIV5tXJjcCca6NOApjE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzU5MjUwNi92ZWN0/b3IvZGVmYXVsdC1h/dmF0YXItcGhvdG8t/cGxhY2Vob2xkZXIt/aWNvbi1ncmV5LXBy/b2ZpbGUtcGljdHVy/ZS1idXNpbmVzcy1t/YW4uanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUJwUjBGVmFF/YTVGMjRHSXc3Szhu/TVdpaUdtYmI4cW1o/ZmtwWGNwMWRoUWc9"
            }
            alt="profile"
          />
        </div>
        {onlineUsers?.includes(user._id) && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white dark:ring-zinc-950" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
            {user.firstName} {user.lastName}
          </h3>
          <span className="text-xs text-zinc-500 whitespace-nowrap ml-2">
            {formatTime(user.latestMessage?.createdAt)}
          </span>
        </div>
        <div className="flex justify-between items-center mt-1">
          <p className="text-sm text-zinc-500 truncate pr-2">
            {user.latestMessage?.message || "No messages yet"}
          </p>
          {user.unreadCount > 0 && (
            <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full min-w-5 text-center">
              {user.unreadCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
