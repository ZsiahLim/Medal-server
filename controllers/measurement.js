import { createError } from "../error.js"
import Measurement from '../models/Measurements.js'
import User from '../models/Users.js'

export const uploadMeasurement = async (req, res, next) => {
    try {
        const userID = req.user.id
        const newMeasurement = new Measurement({ ...req.body, user: userID })
        const measurement = await newMeasurement.save();
        const user = await User.findByIdAndUpdate(userID, { $push: { measurements: measurement._id } });
        const updatedMeasurements = await Measurement.find({ user: userID }).sort({ date: 1 })
        if (!user) {
            return next(createError(404, "not found"))
        } else {
            res.status(200).json({ user, updatedMeasurements, measurement })
        }
    } catch (err) {
        next(err)
    }
}

export const updateMeasurement = async (req, res, next) => {
    try {
        const userID = req.user.id
        const MeasurementID = req.params.id
        await Measurement.findByIdAndUpdate(MeasurementID, { $set: req.body }, { new: true });
        const updatedMeasurements = await Measurement.find({ user: userID }).sort({ date: 1 })
        res.status(200).json(updatedMeasurements)
    } catch (err) {
        next(err)
    }
}

export const deleteMeasurement = async (req, res, next) => {
    try {
        const userID = req.user.id
        const MeasurementID = req.params.id
        const measurement = await Measurement.findByIdAndDelete(MeasurementID)
        const user = await User.findByIdAndUpdate(userID, { $pull: { measurements: measurement._id } });
        let updatedMeasurements;
        let retMeasurement;
        if (user.measurements.length === 0) {
            updatedMeasurements = []
            retMeasurement = {}
        } else {
            updatedMeasurements = await Measurement.find({ user: userID }).sort({ date: 1 })
            retMeasurement = await Measurement.findOne().sort({ date: -1 }).exec();
        }
        res.status(200).json({ user, updatedMeasurements, measurement: retMeasurement })
    } catch (err) {
        next(err)
    }
}

export const getMeasurements = async (req, res, next) => {
    try {
        const userID = req.user.id
        const measurements = await Measurement.find({ user: userID }).sort({ date: 1 })
        res.status(200).json(measurements)
    } catch (err) {
        next(err)
    }
}

export const getLatestMeasurement = async (req, res, next) => {
    try {
        const userID = req.user.id
        const latestMeasurement = await Measurement.findOne({ user: userID })
            .sort({ date: -1 }) // 按日期降序排序
            .exec();
        res.status(200).json(latestMeasurement)
    } catch (error) {
        next(error)
    }
}
