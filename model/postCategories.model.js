import mongoose, { Schema, model } from "mongoose";

export const PostCategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "please title"],
    },
  },
  { timestamps: true }
);

const PostCategories = model("PostCategories", PostCategoriesSchema);
export default PostCategories;
