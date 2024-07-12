import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

// ? get All users
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await userModel.find();
    return res.status(200).json({ message: "Ok", users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error" });
  }
};

//? signup user
export const signupUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await hash(password, 10);
    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    user = new userModel({ name, email, password: hashedPassword });
    await user.save();
   // create token and store cookie 
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain:"localhost" ,
      signed: true,
      path: "/"
    });
    const token = createToken(user._id.toString(),user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME, token , {path: "/" , domain:"localhost" , expires , httpOnly:true, signed: true});
    
    res.status(201).json({ message: "OK", name:user.name , password:user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//? login user
export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(403).json({ message: "Incorrect Password.. " });
    res.clearCookie(COOKIE_NAME, {
      httpOnly: true,
      domain:"localhost" ,
      signed: true,
      path: "/"
    });
    const token = createToken(user._id.toString(),user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate()+7);
    res.cookie(COOKIE_NAME, token , {path: "/" , domain:"localhost" , expires , httpOnly:true, signed: true});
    res.status(200).json({ message: "OK", name:user.name , email:user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {  
  try {
    const user = await userModel.findById(res.locals.jwtData.id );
   
    if (!user) return res.status(400).json({ message: "Token malfunctioned" });

    if(user._id.toString() !== res.locals.jwtData.id){
      res.status(401).json({ message: " Permisson did not match" });
    }

    res.status(200).json({ message: "OK", name:user.name , password:user.email });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
};
