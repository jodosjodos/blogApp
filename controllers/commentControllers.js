import { StatusCodes } from "http-status-codes"
import createError from "http-errors"

import { Comment } from "../model/comment.model.js"
import { Post } from "../model/post.model.js"
export const createComment =async(req,res,next)=>{
    try {
        const {desc,slug,parent,replyOnUSer}=req.body
        const post=await  Post.findOne({slug})
        if(!post){
            throw createError.NotFound("sorry post doesn't found")
        }
        const newComment=new Comment({
            user:req.user._id,
            desc,
            post:post._id,
            parent,
            replyOnUSer
        })

        const savedComment=await  newComment.save()
        return res.status(StatusCodes.CREATED).json(savedComment)
    } catch (error) {
        next(error)
    }
}