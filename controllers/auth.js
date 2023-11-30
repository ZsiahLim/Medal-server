import mongoose from 'mongoose'
import User from '../models/Users.js'
import bcrypt from 'bcryptjs'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'
const webUrl = ['https://fitness-app-client-pi.vercel.app', 'http://localhost:3000']
export const signup = async (req, res, next) => {
    try {
        const reqUser = req.body
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(reqUser.password, salt)
        const CryptUser = { ...reqUser, password: hash }
        const newUser = new User(CryptUser)
        const token = jwt.sign({ id: newUser._id }, process.env.JWT)
        const user = await newUser.save()
        const resData = { user: user._doc, token }
        res.status(200).json(resData)
    } catch (err) {
        console.log(err);
        next(err)
    }
}

export const signin = async (req, res, next) => {
    // console.log('signup');
    try {
        const { name, password } = req.body
        const user = await User.findOne({ name }).lean()
        console.log(user);
        const handleSendAfterSuccess = () => {
            const token = jwt.sign({ id: user._id }, process.env.JWT)
            const resData = { user, token }
            res.status(200).json(resData)
            // .set({
            //     'Access-Control-Allow-Origin': webUrl[0],
            //     "Content-Type": "application/json;charset=utf-8",
            //     "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Access-Token",
            //     "Access-Control-Allow-Credentials": true
            // })
            // .cookie("access_token", token, {
            //     httpOnly: true
            // })
        }
        const isVerified = await bcrypt.compare(password, user.password)
        const verifyProcess = async (isVerified) => {
            !isVerified ? next(createError(400, "wrong information")) : handleSendAfterSuccess()
        }
        !user ? next(createError(404, "user not found")) : verifyProcess(isVerified)
    } catch (err) {
        next(err)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email }).lean()
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT)
            const resData = { user, token }
            res.status(200).json(resData)
            // .set({ 'Access-Control-Allow-Origin': webUrl[0] })
            //     .cookie("access_token", token, {
            //         httpOnly: true
            //     })
        } else {
            const newUser = new User({
                ...req.body,
                fromGoogle: true
            })
            const savedUser = await newUser.save()
            const token = jwt.sign({ id: savedUser._id }, process.env.JWT)
            const resData = { user: savedUser._doc, token }
            res.status(200).json(resData)
            // .set({ 'Access-Control-Allow-Origin': webUrl[0] })
            // .cookie("access_token", token, {
            //     httpOnly: true
            // })
        }
    } catch (err) {
        next(err)
    }
}