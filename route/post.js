import express from "express"
export const postRouter=express.Router()


import {createPost, updatePost} from "../controllers/postControllers.js"
import { adminGaurd, authGuard } from "../middlwares/authMiddlware.js"

postRouter.post("/",authGuard,adminGaurd,createPost)
postRouter.put("/:slug",authGuard,adminGaurd,updatePost)

