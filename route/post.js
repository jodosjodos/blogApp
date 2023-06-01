import express from "express";
export const postRouter = express.Router();

import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/postControllers.js";
import { adminGaurd, authGuard } from "../middlwares/authMiddlware.js";

postRouter.post("/", authGuard, adminGaurd, createPost);
postRouter
  .route("/:slug")
  .put(authGuard, adminGaurd, updatePost)
  .delete(authGuard, adminGaurd, deletePost)
  .get(getPost)
