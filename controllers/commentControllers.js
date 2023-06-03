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


export const updateComment=async(req,res)=>{
    try {
        const {desc}=req.body
        const {commentId}=req.params
       const comment=await Comment.findById({_id:commentId})
       if(!comment){
        throw createError.NotFound("sorry comment doesn't found")
       }

       comment.desc=desc | comment.desc


        const updatedComment=await  comment.save()
        return res.status(StatusCodes.CREATED).json(updatedComment)
    } catch (error) {
        next(error)
    }
}

export const deleteComment=async(req,res)=>{
    try {
     
        const {commentId}=req.params
       const comment=await Comment.findByIdAndDelete({_id:commentId})
       if(!comment){
           throw createError.NotFound("sorry comment doesn't found")
        }
        await Comment.deleteMany({parent:comment._id})

      
        return res.status(StatusCodes.CREATED).json({msg:"post deleted successfully"})
    } catch (error) {
        next(error)
    }
}