import React from "react";
import ContactItem from "./ContactItem.jsx";
import useGetOtherUsers from "../hooks/useGetOtherUsers.jsx";
import { useSelector } from "react-redux";
import useGetChatUsers from "../hooks/useGetChatUsers.jsx";

const ContactList = () => {
  useGetOtherUsers();
  useGetChatUsers();
  const { chatUsers } = useSelector((store) => store.user);

  if (!chatUsers) return;

  return (
    <div className="overflow-auto flex-1">
      {chatUsers?.map((user) => (
        <ContactItem key={user._id} user={user} />
      ))}
    </div>
  );
};

export default ContactList;
