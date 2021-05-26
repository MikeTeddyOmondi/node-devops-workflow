const User = require("../models/User.model")

const bcrypt = require("bcryptjs")

exports.signup = async(req, res) => {
    const { username, password } = req.body

    try {
        const hashpassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashpassword
        })
        req.session.user = newUser
        res.status(201).json({
            status: "success",
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "failed!",
            message: "Error occurred while signing up..."
        })
    }
}

exports.login = async(req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({
            username
        })

        if (!user) {
            return res.status(404).json({
                status: "failed",
                message: "User not found!"
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password)

        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: "success",
                message: "User logged in..."
            })
        } else {
            res.status(400).json({
                status: "failed",
                message: "Incorrect username or password..."
            })
        }
    } catch (error) {
        res.status(400).json({
            status: "failed!",
            message: "Error occurred while signing up..."
        })
    }
}