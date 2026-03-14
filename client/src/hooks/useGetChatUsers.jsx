import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setChatUsers } from "../redux/userSlice.js";
const useGetChatUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/users/chatted",
          {
            withCredentials: true,
          },
        );
        dispatch(setChatUsers(res.data));
      } catch (err) {
        console.log("GET CHATTED USERS ERROR: ", err);
      }
    };

    fetchChatUsers();
  }, [dispatch]);
};

export default useGetChatUsers;
