import express from "express";
export const postRouter = express.Router();

import {
  createPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postControllers.js";
import { adminGaurd, authGuard } from "../middlwares/authMiddlware.js";

postRouter.route("/").post(authGuard, adminGaurd, createPost).get(getAllPosts);
postRouter
  .route("/:slug")
  .put(authGuard, adminGaurd, updatePost)
  .delete(authGuard, adminGaurd, deletePost)
  .get(getPost);
