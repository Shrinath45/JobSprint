import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
  getMyProfile, // ✅ import new controller
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { singleUpload } from "../middlewares/mutler.js";
import { multiUpload } from "../middlewares/mutler.js";
import { getSavedJobsByUser } from "../controllers/savedJob.controller.js";
import { singleUpload } from "../middlewares/mutler.js";
const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/user", isAuthenticated, getSavedJobsByUser);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);
// router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/me").get(isAuthenticated, getMyProfile); // ✅ new route for getting logged-in user

export default router;


