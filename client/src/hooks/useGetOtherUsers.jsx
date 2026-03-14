import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";
const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/", {
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (err) {
        console.log("GET OTHER USERS ERROR: ", err);
      }
    };

    fetchOtherUsers();
  }, []);
};

export default useGetOtherUsers;