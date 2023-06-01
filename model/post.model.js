import mongoose, { Schema, model } from "mongoose";

export const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "please title"],
    },
    caption: {
      type: String,
      require: [true, "please provide caption"],
    },
    slug: {
      type: String,
      require: [true, "please provide email"],
      unique: true,
    },
    body: {
      type: Object,

      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: false,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    tags: { type: [String] },
    categories: [{ type: Schema.Types.ObjectId, ref: "PostCategories" }],
  },
  { timestamps: true , toJSON:{virtuals:true} }
);


// 
PostSchema.virtual("comments",{
    ref:"Comment",
    localField:"_id",
    foreignField:"post"
})

export const Post = model("Post", PostSchema);

