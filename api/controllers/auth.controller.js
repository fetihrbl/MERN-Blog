import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return next(errorHandler(400, 'All fields are required'));
    }
    try {
      const hashedPassword = await bcryptjs.hash(password, 10);
  
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
      
      res.status(201).json({
        message: 'Sign up successful',
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });
    } catch (error) {
      next(error);
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, 'All fields are required'));
  }

  try {

    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // 
    );

    //Converting a Mongoose Document to a pure JavaScript object
    const userObject = validUser.toObject();
    delete userObject.password;

    res.status(200).cookie('access_token', token, {
      httpOnly: true
    }).json(userObject);

  } catch (error) {
    next(error)
  }
}
  
export const googleAuth = async (req, res, next) => {
  const { email, name, googlePhotoURL } = req.body; 
  try { 
    const user = await User.findOne({ email });
    console.log("User found:", user);
    if (user) {
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );

      const userObject = user.toObject();
      delete userObject.password;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "strict", 
          secure: process.env.NODE_ENV === "production", 
        })
        .json(userObject);
    } else { 
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });

      await newUser.save();
  
      const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
      );

      const userObject = newUser.toObject();
      delete userObject.password;

      return res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
        })
        .json(userObject);
    }
  } catch (error) {
    next(error);
}};
