import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import User from "../models/User.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    let chat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    chat = await User.populate(chat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (chat.length > 0) {
      res.send(chat[0]);
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({
          _id: createdChat._id,
        })
          .populate("users", "-password")
          .populate("latestMessage");
        res.status(200).json(FullChat);
      } catch (error) {
        throw new Error(error.message);
      }
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.id;
    const { message } = req.body;
    let conversation = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Chat.create({
        users: [senderId, receiverId],
      });
    }
    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({ newMessage });
  } catch (error) {
    console.log("SEND MESSAGE ROUTE ERROR", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.user._id;
    const conversation = await Chat.findOne({
      users: { $all: [senderId, receiverId] },
    }).populate("messages");

    // Mark all unread messages sent by `receiverId` to `senderId` as read
    await Message.updateMany(
      {
        senderId: receiverId,
        receiverId: senderId,
        read: false,
      },
      {
        $set: { read: true },
      },
    );

    res.status(200).json(conversation);
  } catch (error) {
    console.log("GET MESSAGE ROUTE ERROR", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChattedUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch all users with whom the current user has chatted
    const senderIds = await Message.distinct("senderId", {
      receiverId: userId,
    });
    const receiverIds = await Message.distinct("receiverId", {
      senderId: userId,
    });
    const userIds = [...new Set([...senderIds, ...receiverIds])];

    const users = await User.find({ _id: { $in: userIds } })
      .select("-password")
      .lean(); // Use lean() since we will mutate the objects

    // For each user, find the latest message and unread count
    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        // Find latest message between current user and this user
        const latestMessage = await Message.findOne({
          $or: [
            { senderId: userId, receiverId: user._id },
            { senderId: user._id, receiverId: userId },
          ],
        }).sort({ createdAt: -1 });

        // Count unread messages *from* this user *to* current user
        const unreadCount = await Message.countDocuments({
          senderId: user._id,
          receiverId: userId,
          read: false,
        });

        return {
          ...user,
          latestMessage,
          unreadCount,
        };
      }),
    );

    // Sort by latest message timestamp, descending
    usersWithDetails.sort((a, b) => {
      const timeA = a.latestMessage
        ? new Date(a.latestMessage.createdAt).getTime()
        : 0;
      const timeB = b.latestMessage
        ? new Date(b.latestMessage.createdAt).getTime()
        : 0;
      return timeB - timeA;
    });

    res.status(200).json(usersWithDetails);
  } catch (error) {
    console.log("CHAT USERS ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
