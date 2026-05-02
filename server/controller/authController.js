import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// Register a new user
export const registerUser = async (req, res) => {
    const { name, email, rollNo, accessCode, mobileNo, githubUsername } = req.body;
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Create new user
        user = new User({
            name,
            email,
            rollNo,
            accessCode,
            mobileNo,
            githubUsername
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const loginUser = async (req, res) => {
    const { email, accessCode } = req.body;
    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check if access code matches
        const isMatch = await bcrypt.compare(accessCode, user.accessCode);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
