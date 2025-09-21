import {User} from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwtConfig.js";


export const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        
        const isUsernameExist = await User.findOne({ username});
        if (isUsernameExist) {
            res.status(400).json({ message: "Username already exists"});
        }

        const isEmailExist= await User.findOne({ email});
        if(isEmailExist) {
            return res.status(400).json({ message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully"});


    } catch (error) {
        res.satus(500).json({ message: "Server error", error: error.message }); 
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {

        const isEmailExist= await User.findOne({ email});
        if(!isEmailExist) {
            return res.status(400).json({ message: "Email or password is incorrect"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, isEmailExist.password);
        
        if(!isPasswordCorrect) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }
        const token = generateToken(isEmailExist);
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}