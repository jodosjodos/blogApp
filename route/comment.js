import express from "express";
export const commentRouter = express.Router();


import { authGuard } from "../middlwares/authMiddlware.js";
import { createComment } from "../controllers/commentControllers.js";

commentRouter.route("/").post(authGuard,createComment)