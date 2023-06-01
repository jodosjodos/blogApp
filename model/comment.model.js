import mongoose, { Schema, model } from "mongoose";

export const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    postId: { type: Schema.Types.ObjectId, ref: "Pist", required: true },
    check: { type: Boolean, default: false },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replyOnUser: {
      type: Schema.Types.ObjectId,
      ref: "USer",
      default: null,
    },
  },
  { timestamps: true }
);

CommentSchema.virtual("replies",{
    ref:"Comment",
    localField:"_id",
    foreignField:"parent"
})

const Comment = model("Comment", CommentSchema);
export default Comment;
