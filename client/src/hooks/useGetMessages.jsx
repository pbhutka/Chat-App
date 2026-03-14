import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setConversation } from "../redux/messageSlice.js";

const useGetMessages = () => {
  const { selectedUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${selectedUser._id}`,
          { withCredentials: true },
        );
        dispatch(setConversation(res.data));
      } catch (err) {
        console.log("GET MESSAGES ERROR:", err.response?.data || err.message);
      }
    };

    fetchMessages();
  }, [selectedUser]);
};

export default useGetMessages;
