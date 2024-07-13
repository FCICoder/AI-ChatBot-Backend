import { Router } from "express";
import { getAllUsers, loginUser, signupUser, userLogout, verifyUser } from "../controllers/userController.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { verifyToken } from "../utils/token-manager.js";
const userRoute = Router();
userRoute.get('/', getAllUsers);
userRoute.post('/signup', validate(signupValidator), signupUser);
userRoute.post('/login', validate(loginValidator), loginUser);
userRoute.get('/auth-status', verifyToken, verifyUser);
userRoute.get('/logout', verifyToken, userLogout);
export default userRoute;
//# sourceMappingURL=userRoute.js.map