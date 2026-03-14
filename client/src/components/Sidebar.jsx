import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ContactList from "./ContactList.jsx";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Search, Moon, Sun } from "lucide-react";
import {
  setOtherUsers,
  setSearchUsers,
  setSelectedUser,
  setAuthUser,
} from "../redux/userSlice.js";
import useGetChatUsers from "../hooks/useGetChatUsers.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";

function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Controls the "Pop-up" state
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" || false
  );

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  };

  // Custom Hooks
  useGetChatUsers();
  useGetOtherUsers();

  const { authUser, otherUsers, searchUsers } = useSelector(
    (store) => store.user,
  );

  const logoutHandler = async () => {
    try {
      const res = await axios.post("http://localhost:5000/user/logout", {},
        {withCredentials: true}
      );
      dispatch(setOtherUsers(null));
      dispatch(setAuthUser(null));
      dispatch(setSearchUsers(null));
      dispatch(setSelectedUser(null));
      navigate("/login");
      toast.success(res.data.message);
    } catch (err) {
      // console.log("Logout Error:", err.response?.data || err.message);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      setIsSearching(false);
      return;
    }

    const filteredUsers = otherUsers?.filter((user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()),
    );

    if (filteredUsers && filteredUsers.length > 0) {
      dispatch(setSearchUsers(filteredUsers));
      setIsSearching(true); // Show the search results overlay
    } else {
      toast.error("User not found");
      setIsSearching(false);
    }
  };

  const handleSelectSearchedUser = (user) => {
    dispatch(setSelectedUser(user));
    setIsSearching(false);
    setSearch("");
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-zinc-950 border-r dark:border-zinc-800">
      {/* Sidebar Header & Search */}
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white google-sans-bold">
            Chats
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        <div className="relative">
          <form
            onSubmit={searchSubmitHandler}
            className="relative w-full group"
          >
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border border-transparent focus:bg-white dark:focus:bg-zinc-800"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-500 transition-colors"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        {isSearching && (
          <div className="absolute inset-0 z-20 bg-white dark:bg-zinc-950 flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="px-4 py-2 border-b dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/50">
              <span className="text-xs font-bold text-zinc-500 uppercase">
                Search Results
              </span>
              <button
                onClick={() => {
                  setSearch("");
                  setIsSearching(false);
                }}
                className="text-xs text-blue-500 font-medium hover:text-blue-600"
              >
                Back to Chats
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {searchUsers?.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleSelectSearchedUser(user)}
                  className="flex items-center gap-3 p-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 cursor-pointer transition-colors"
                >
                  <div className="avatar">
                    <div className="w-12 h-12 rounded-full border dark:border-zinc-700">
                      <img src={user.pic} alt="user profile" />
                    </div>
                  </div>
                  <div className="flex flex-col border-b dark:border-zinc-800 pb-2 w-full">
                    <span className="font-semibold text-zinc-900 dark:text-white">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs text-zinc-500">View Profile</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- DEFAULT CHAT LIST --- */}
        <div className="flex-1 overflow-y-auto">
          <ContactList />
        </div>
      </div>

      {/* Footer / User Profile Section */}
      <div className="w-full flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-t dark:border-zinc-800">
        <div className="flex flex-col max-w-[150px]">
          <p className="text-xs text-zinc-500 font-bold tracking-tighter leading-none mb-1 truncate">
            {authUser?.email}
          </p>
          <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">
            {authUser?.firstName} {authUser?.lastName}
          </p>
        </div>

        <div className="dropdown dropdown-top dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost m-1 w-10 h-10 rounded-full p-0 overflow-hidden border-2 border-blue-500"
          >
            <img
              className="w-full h-full object-cover"
              src={authUser?.pic}
              alt="profile"
            />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white dark:bg-zinc-800 rounded-box z-[50] w-52 p-2 shadow-2xl border dark:border-zinc-700"
          >
            <li>
              <button className="text-zinc-700 dark:text-zinc-300">
                Edit Profile
              </button>
            </li>
            <li>
              <button
                className="text-red-500 font-bold"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
