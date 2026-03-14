import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import axios from "axios";
import useGetRealTimeMessages from "../hooks/useGetRealTimeMessages.jsx";

function Dashboard() {
  const { authUser, selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useGetRealTimeMessages();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/me", {
          withCredentials: true,
        });

        dispatch(setAuthUser(res.data));
      } catch (err) {
        dispatch(setAuthUser(null));
      }
    };

    checkAuth();
  }, []);
  return (
    <div className="flex h-[100dvh] w-full bg-white dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* Sidebar: Show on mobile only if NO user is selected. Always show on sm+ */}
      <div
        className={`${
          selectedUser ? "hidden sm:flex" : "flex"
        } w-full sm:w-80 lg:w-96 border-r border-zinc-200 dark:border-zinc-800 flex-col`}
      >
        <Sidebar />
      </div>

      {/* Message Area: Show on mobile only if user is selected. Always show on sm+ */}
      <div
        className={`${
          selectedUser ? "flex" : "hidden sm:flex"
        } flex-1 flex-col`}
      >
        <ChatWindow />
      </div>
    </div>
  );
}

export default Dashboard;
