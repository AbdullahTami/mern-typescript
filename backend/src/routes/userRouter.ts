import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();
router.get("/", userController.getAuthenticatedUser);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/logout", userController.logout);

export default router;
