import { createError } from "../error.js"
import Notification from '../models/Notification.js'

export const createNotification = async (req, res, next) => {
    const newNotification = new Notification({ ...req.body })
    try {
        const saveNotification = await newNotification.save()
        res.status(200).json(saveNotification)
    } catch (err) {
        next(err)
    }
}

export const removeNotification = async (req, res, next) => {
    try {
        const notification = await Notification.findById(req.params.id)
        if (!notification) {
            return next(createError(404, "not found"))
        }
        if (req.user.id === notification.userID) {
            console.log("daozhele");
            await Notification.findByIdAndDelete(req.params.id)
            res.status(200).json({ success: true })
        } else {
            return next(createError(403, "can only delete your Notification"))
        }
    } catch (err) {
        next(err)
    }
}

export const updateNotification = async (req, res, next) => {
    try {
        const Notification = await Notification.findById(req.params.id)
        if (!Notification) {
            return next(createError(404, "not found"))
        }
        if (req.user.id === Notification.userID) {
            const updatedNotification = await Notification.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedNotification)
        } else {
            return next(createError(403, "can only update your Notification"))
        }
    } catch (err) {
        next(err)
    }
}

export const getNotification = async (req, res, next) => {
    try {
        const Notification = await Notification.findById(req.params.id)
        if (!Notification) {
            return next(createError(404, "not found"))
        }
        res.status(200).json(Notification)
    } catch (err) {
        next(err)
    }
}

export const getMyNotification = async (req, res, next) => {
    try {
        const userID = req.user.id
        const userNotifications = await Notification.find({ userID })
        res.status(200).json(userNotifications)
    } catch (err) {
        next(err)
    }
}