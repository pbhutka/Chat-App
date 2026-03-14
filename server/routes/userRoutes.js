import express from "express";
import { getMe, getOtherUsers, loginUser, logoutUser, registerUser } from "../controllers/userController.js";
import isLoggedIn from "../middleware/isLoggedIn.js";
const router = express.Router();


router.route("/").get(isLoggedIn, getOtherUsers);
router.route("/me").get(isLoggedIn, getMe);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(isLoggedIn, logoutUser);

export default router;
