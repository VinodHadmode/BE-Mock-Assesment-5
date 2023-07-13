const express = require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { UserModel } = require("../models/user.models");

const userRouter = express.Router()

userRouter.post("/register", async (req, res) => {
    const { email, password, confirm_password } = req.body
    try {
        if (password === confirm_password) {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.status(400).json({ err: err })
                } else {
                    const user = new UserModel({ email, password: hash, confirm_password: hash })
                    await user.save()
                    res.status(200).json({ msg: "New user has been registered!!" })
                }
            });
        } else {
            res.status(200).json({ msg: "Enter correct password!!" })
        }


    } catch (error) {
        res.status(400).json({ err: error })
    }
})

userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, "masai")
                    res.status(200).json({ msg: "Login Sucessfull!!", token })
                } else {
                    res.status(400).json({ err: err.message })
                }
            });
        } else {
            res.status(200).json({ msg: "User doesn't exist!!" })
        }
    } catch (error) {
        res.status(400).json({ error: error })
    }
})


module.exports = {
    userRouter
}
