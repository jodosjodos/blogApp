import User from "../model/user.model.js";
import * as dotenv from "dotenv";
import { createToken } from "../controllers/userController.js";
import { StatusCodes } from "http-status-codes";
import { validationResult } from "express-validator";

dotenv.config();

export const savingUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      
      return res.status(StatusCodes.BAD_REQUEST).json(errorMessages);
    }

    const username = req.user.name.familyName;
    const email = req.user.emails[0].value;
    const password = process.env.DEFAULT_PASSWORD;
    const user = await User.signUp(username, email, password);
    const token = await createToken(user._id);
    console.log(user);
   return res.redirect('http://localhost:5173/login');

  } catch (err) {
    console.log(err);
    res.status(StatusCodes.UNAUTHORIZED).json(err.message);
    // res.redirect('http://localhost:5173/register')
  }
};
