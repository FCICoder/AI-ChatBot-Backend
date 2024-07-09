import { Router } from "express";
import { getAllUsers, signupUser } from "../controllers/userController.js";
import { signupValidator, validate } from "../utils/validators.js";

const userRoute = Router();
userRoute.get('/',getAllUsers);
userRoute.post('/signup',validate(signupValidator),signupUser)
export default userRoute;