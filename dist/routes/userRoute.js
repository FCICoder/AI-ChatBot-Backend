import { Router } from "express";
import { getAllUsers, loginUser, signupUser, verifyUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoute = Router();
userRoute.get('/', getAllUsers);
userRoute.post('/signup', validate(signupValidator), signupUser);
userRoute.post('/login', validate(loginValidator), loginUser);
userRoute.get('/auth-status', verifyToken, verifyUser);
export default userRoute;
//# sourceMappingURL=userRoute.js.map