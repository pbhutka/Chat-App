import express from "express";
import { getChattedUsers, getMessage, sendMessage } from "../controllers/chatController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = express.Router();


router.route("/users/chatted").get(isLoggedIn,getChattedUsers);
router.route("/send/:id").post(isLoggedIn,sendMessage);
router.route("/:id").get(isLoggedIn,getMessage);    
export default router;
