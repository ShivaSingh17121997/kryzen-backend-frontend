const express = require("express");
const { userModel } = require("../Model/user.model");
const userRouter = express.Router();


userRouter.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const newUser = new userModel({
            username,
            email,
            password
        });

        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Login successful", user: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


userRouter.post("/login", (req, res) => {

})

module.exports = {
    userRouter
};


module.exports = {
    userRouter
}