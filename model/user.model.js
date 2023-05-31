import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

export const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "please provide username"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "please provide password"],
  },
  email: {
    type: String,
    require: [true, "please provide email"],
    unique: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationCode: {
    type: String,
    require: false,
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

//
UserSchema.statics.signUp = async function (username, email, password) {
  // Validation
  if (!email || !password || !username) {
    throw new Error("All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please provide a valid email");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please provide a strong and valid password");
  }

  const existingUser = await this.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser) {
    throw new Error("Username or email already taken");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hashedPassword });
  return user;
};

// login verification
UserSchema.statics.login = async function (email, password) {
  if (!email || !password) throw Error("all fields are required");

  const user = await this.findOne({ email });
  if (!user) throw Error("incorrect credentials");
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error("invalid credentials");
  return user;
};

export default mongoose.model("User", UserSchema);
