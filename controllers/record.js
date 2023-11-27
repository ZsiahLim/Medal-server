import { createError } from "../error.js"
import Record from '../models/Record.js'
import User from '../models/Users.js'

export const uploadRecord = async (req, res, next) => {
    try {
        const userID = req.user.id
        const { date } = req.body;

        const updatedRecord = await Record.findOneAndUpdate(
            { user: userID, date },
            req.body,
            { new: true, upsert: true }
        );

        const user = await User.findByIdAndUpdate(userID, { $addToSet: { records: updatedRecord._id } });
        const updatedRecords = await Record.find({ user: userID });


        // const startOfDay = new Date(date);
        // startOfDay.setHours(0, 0, 0, 0);
        // const endOfDay = new Date(date);
        // endOfDay.setHours(23, 59, 59, 999);
        // const updatedRecord = await Record.findOneAndUpdate({ user: userID, date: { $gte: startOfDay, $lte: endOfDay } }, req.body, { new: true, upsert: true });
        // const user = await User.findByIdAndUpdate(userID, { $addToSet: { records: updatedRecord._id } });
        // // }
        // const updatedRecords = await Record.find({ user: userID })
        res.status(200).json({ user, updatedRecords })
    } catch (err) {
        console.log("err", err);
        next(err)
    }
}

export const deleteRecord = async (req, res, next) => {
    try {
        const userID = req.user.id
        const RecordID = req.params.id
        const record = await Record.findByIdAndDelete(RecordID)
        const user = await User.findByIdAndUpdate(userID, { $pull: { records: record._id } });
        const updatedRecords = await Record.find({ user: userID })
        if (!user) {
            return next(createError(404, "not found"))
        } else {
            res.status(200).json({ user, updatedRecords })
        }
    } catch (err) {
        next(err)
    }
}

export const getRecords = async (req, res, next) => {
    try {
        const userID = req.user.id
        const records = await Record.find({ user: userID }).sort({ date: 1 })
        res.status(200).json(records)
    } catch (err) {
        next(err)
    }
}

export const getLatestRecord = async (req, res, next) => {
    try {
        const userID = req.user.id
        const latestRecord = await Record.findOne({ user: userID })
            .sort({ date: -1 }) // 按日期降序排序
            .exec();
        res.status(200).json(latestRecord)
    } catch (error) {
        next(error)
    }
}
