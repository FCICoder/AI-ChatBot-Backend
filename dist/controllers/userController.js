import userModel from "../models/userModel.js";
import { hash } from "bcrypt";
// ? get All users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({ message: "Ok", users });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Error" });
    }
};
//? signup user
export const signupUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await hash(password, 10);
        // Check if user already exists
        let user = await userModel.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });
        user = new userModel({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "OK", id: user._id.toString() });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};
//# sourceMappingURL=userController.js.map