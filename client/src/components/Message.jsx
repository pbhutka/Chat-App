import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
  const scroll = useRef();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  // Logic: Adjust this if 'isSender' means 'Me' or the 'Selected User'
  const isMe = selectedUser && message.senderId !== selectedUser._id;

  const formatTime = (dateString) => {
    if (!dateString) return "00:00";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const time = formatTime(message.createdAt);

  return (
    <div
      ref={scroll}
      className={`flex w-full mb-1 ${isMe ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`relative max-w-[85%] md:max-w-[75%] px-3 py-1.5 shadow-sm text-[14.5px] leading-5 min-w-18 min-h-8.5 wrap-break-word ${
          isMe
            ? "bg-white dark:bg-[#202c33] text-[#303030] dark:text-[#e9edef] rounded-l-lg rounded-tr-lg rounded-br-none border-zinc-200"
            : "bg-white dark:bg-[#202c33] text-[#303030] dark:text-[#e9edef] rounded-r-lg rounded-tl-lg rounded-bl-none border-zinc-200"
        }`}
      >
        {/* The Message Text */}
        <div
          className="whitespace-pre-wrap break-words pr-15 pb-1 min-w-0"
          style={{ wordBreak: "break-word" }}
        >
          {message.message}
        </div>

        {/* The Timestamp & Ticks (Positioned in bottom right) */}
        <div className="absolute bottom-1 right-2 flex items-center gap-1 select-none">
          <time
            className={`text-[10px] uppercase opacity-60 ${isMe ? "text-[#667781]" : "text-[#667781] dark:text-[#8696a0]"}`}
          >
            {time}
          </time>

          {/* /for seen msg */}
          {false && (
            <span className="text-[#53bdeb] text-sm leading-none flex">
              {/* Double Tick SVG */}
              <svg
                viewBox="0 0 16 15"
                width="16"
                height="15"
                fill="currentColor"
              >
                <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-3.583-3.23a.32.32 0 0 0-.445.021l-.439.433a.319.319 0 0 0 .009.452l4.54 4.096a.32.32 0 0 0 .445-.021l5.773-7.838a.365.365 0 0 0-.063-.51zm-4.24 0l-.478-.372a.365.365 0 0 0-.51.063L4.926 9.879a.32.32 0 0 1-.484.033L1.517 7.038a.32.32 0 0 0-.445.021l-.439.433a.319.319 0 0 0 .009.452l4.54 4.096a.32.32 0 0 0 .445-.021l1.88-2.553a.32.32 0 0 1 .462-.053z" />
              </svg>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
