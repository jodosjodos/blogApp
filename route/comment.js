import express from "express";
export const commentRouter = express.Router();


import { authGuard } from "../middlwares/authMiddlware.js";
import { createComment, deleteComment, updateComment } from "../controllers/commentControllers.js";

commentRouter.route("/").post(authGuard,createComment)
commentRouter.route("/:commentId").put(authGuard,updateComment).delete(authGuard,deleteComment) 