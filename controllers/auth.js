const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config();
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body
        // check if user already exist 
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User Already Exist!"
            })
        }
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (err) {
            return res.status(500).json({
                success: false,
                message: "Error in hashing password!"
            })
        }
        const user = await User.create({
            name, email, password: hashedPassword, role
        })
        return res.status(200).json({
            success: true,
            message: "User Created Successfully",
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            success: false,
            data: "USer Can not be register, please try again",
            message: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Field Are Required"
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User is not Registerd",
            })
        }
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,
        }
        if (await bcrypt.compare(password, user.password)) {
            let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' })
            user.token = token
            user.password = undefined

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User Logged in successfully",
            })
        } else {
            // 
            return res.status(403).json({
                success: false,
                message: "Password Incorrect",
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            success: false,
            message: "loggin failer",
        })
    }
}