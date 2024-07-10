import { Router } from "express";
import { getAllUsers, loginUser, signupUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";

const userRoute = Router();

userRoute.get('/',getAllUsers);
userRoute.post('/signup',validate(signupValidator),signupUser);
userRoute.post('/login',validate(loginValidator),loginUser);

export default userRoute;