import { StatusCodes } from "http-status-codes";
import { v4 as uuid4 } from "uuid";
import createError from "http-errors";

import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import { uploadPicture } from "../middlwares/uploadPictureMiddlware.js";
import { fileRemover } from "../utils/fileRemover.js";

export const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "sample title",
      caption: "sample caption",
      slug: uuid4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "",
      user: req.user._id,
    });

    const createPost = await post.save();
    return res.status(StatusCodes.CREATED).json(createPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const post = await Post.findOne({ slug });
    if (!post) {
      throw createError.NotFound("post not found or ur slug not found");
    }

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();

      return res.status(StatusCodes.CREATED).json(updatedPost);
    };

    const uploadAsync = () => {
      return new Promise((resolve, reject) => {
        const upload = uploadPicture.single("postPicture");
        upload(req, res, (err) => {
          if (err) {
            reject(
              createError.BadRequest(
                "An unknown error occurred during file upload",
                err
              )
            );
          } else {
            resolve();
          }
        });
      });
    };

    await uploadAsync();

    if (req.file) {
      let filename = post.photo;

      if (filename) {
        fileRemover(filename);
      }
      post.photo = req.file.filename;
      await handleUpdatePostData(req.body.document);
    } else {
      let filename = post.photo;
      post.photo = "";

      if (filename) {
        fileRemover(filename);
      }
      await handleUpdatePostData(req.body.document);
    }
  } catch (err) {
    next(err);
  }
};

// dellete post
export const deletePost = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const deletedPost = await Post.deleteOne({ slug });

    if (deletedPost.deletedCount === 0) {
      throw createError.NotFound("Post not found");
    }

    const deleteCommentsPromise = Comment.deleteMany({ post: deletedPost._id });
    // Perform other asynchronous tasks here, if any

    await Promise.all([deleteCommentsPromise]);

    return res.status(StatusCodes.OK).json({
      message: "Post has been deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const { slug, page = 1, limit = 10 } = req.params;
    const skip = (page - 1) * limit;

    const post = await Post.findOne({ slug })
      .populate({
        path: "user",
        select: ["avatar", "username"],
      })
      .populate({
        path: "comments",
        match: {
          check: false,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "username"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            select: ["field1", "field2","desc"], // Select only the required fields
          },
        ],
        options: {
          skip,
          limit,
        },
      })
      .select("-secretField") // Exclude any sensitive or unnecessary fields
      .lean();

    if (!post) {
      throw createError.NotFound("Post not found");
    }

    return res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

