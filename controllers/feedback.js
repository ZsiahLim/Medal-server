import Feedback from '../models/Feedback.js'

export const createFeedback = async (req, res, next) => {
    try {
        const userID = req.user.id
        console.log("userID", userID);
        const newFeedback = new Feedback({ ...req.body, userID })
        console.log("zhe", newFeedback);
        const feedback = await newFeedback.save();
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}