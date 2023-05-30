import mongoose from "mongoose";

export const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/blogApp");
    console.log("db is connected");
    return db;
  } catch (err) {
    console.log(err);
    process.exit(1)
  }

};
