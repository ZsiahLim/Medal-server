import { createError } from "../error.js"
import Session from '../models/Sessions.js'
import User from '../models/Users.js'

export const createSession = async (req, res, next) => {
    try {
        const userID = req.user.id
        const newSession = new Session({ ...req.body, user: userID })
        const session = await newSession.save();
        const user = await User.findByIdAndUpdate(userID, { $push: { sessions: session._id } });
        const updatedSessions = await Session.find({ user: userID }).populate('tutorial')
        if (!user) {
            return next(createError(404, "not found"))
        } else {
            res.status(200).json({ user, updatedSessions })
        }
    } catch (err) {
        next(err)
    }
}

export const getSessions = async (req, res, next) => {
    try {
        const userID = req.user.id
        const userSessions = await Session.find({ user: userID }).populate('tutorial').lean()
        console.log(userSessions);
        // const user = await User.findById(userID);
        // if (!user) {
        //     return next(createError(404, "not found"))
        // } else {
        //     res.status(200).json(user)
        // }
        res.status(200).json(userSessions)
    } catch (err) {
        next(err)
    }
}

export const getSpecificDayCompletedTutorials = async (req, res, next) => {
    try {
        // Find sessions that are marked as completed and populate the 'tutorial' field
        const completedSessions = await Session.find({ completed: true }).populate('tutorial').exec();
        console.log("completedSessions", completedSessions);
        // Extract the tutorials from the completed sessions
        // const completedTutorials = completedSessions.map(session => session.tutorial);

        // return completedTutorials;
    } catch (error) {
        next(error)
    }
}


export const getSpecificDayUncompletedTutorials = async (req, res, next) => {
    try {
        const completedSessions = await Session.find({ completed: false }).populate('tutorial').exec();
        console.log("completedSessions", completedSessions);
        // const user = await User.findById(userID);
        // if (!user) {
        //     return next(createError(404, "not found"))
        // } else {
        //     res.status(200).json(user)
        // }
    } catch (err) {
        next(err)
    }
}


