import Admin from '../models/Admin.js'
import Feedback from '../models/Feedback.js'
import { createError } from '../error.js'
import jwt from 'jsonwebtoken'
import User from '../models/Users.js'
import Tutorial from '../models/Tutorial.js'
import Blog from '../models/Blog.js'
import Report from '../models/Report.js'
import Comment from '../models/Comment.js'
import Notification from '../models/Notification.js'

export const signin = async (req, res, next) => {
    try {
        const { name, password } = req.body
        const admin = await Admin.findOne({ name })
        console.log("admin", admin);
        console.log("admin name", name);
        console.log("pas", password);
        const handleSendAfterSuccess = () => {
            const token = jwt.sign({ id: admin._id }, process.env.JWT)
            const response = { token, admin: admin._doc }
            res.status(200).json(response)
            // .set({
            //     'Access-Control-Allow-Origin': 'http://localhost:5173',
            //     "Content-Type": "application/json;charset=utf-8",
            //     "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Access-Token",
            // })
        }
        let isVerified = password === admin.password ? true : false
        const verifyProcess = async (isVerified) => {
            !isVerified ? next(createError(400, "wrong information")) : handleSendAfterSuccess()
        }
        !admin ? next(createError(404, "admin not found")) : verifyProcess(isVerified)
    } catch (err) {
        next(err)
    }
}

export const checkToken = async (req, res, next) => {
    try {
        var decoded = jwt.verify(req.body.token, process.env.JWT);
        decoded?.id ? res.status(200).json({ logged: true }) : next(createError(300, { logged: false }))
    } catch (err) {
        next(err)
    }
}

export const getAllFeedbacks = async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find({}).lean()
        res.status(200).json(feedbacks)
    } catch (err) {
        next(err)
    }
}

export const getAllReports = async (req, res, next) => {
    try {
        const reports = await Report.find({}).lean()
        res.status(200).json(reports)
    } catch (err) {
        next(err)
    }
}

export const getOverview = async (req, res, next) => {
    try {
        const usersPromise = User.find({}).lean()
        const tutorialsPromise = Tutorial.find({}).lean()
        const blogsPromise = Blog.find({}).lean()
        const reportsPromise = Report.find({}).lean()
        const feedbacksPromise = Feedback.find({ status: 'waiting' }).lean()
        const commentsPromise = Comment.find({ status: 'waiting' }).lean()
        const [users, tutorials, blogs, reports, feedbacks, comments] = await Promise.all([usersPromise, tutorialsPromise, blogsPromise, reportsPromise, feedbacksPromise, commentsPromise])
        const overview = {
            usersNum: users.length,
            tutorialsNum: tutorials.length,
            blogsNum: blogs.length,
            reportsNum: reports.length,
            feedbacksNum: feedbacks.length,
            commentsNum: comments.length,
        }
        res.status(200).json(overview)
    } catch (err) {
        next(createError(400, "get data error"))
    }
}

// delete
export const deleteBlog = async (req, res, next) => {
    try {
        const { blogID, reporterID, reportID } = req.body
        const blog = await Blog.findById(blogID).lean()
        if (!blog) {
            return next(createError(404, "not found"))
        } else {
            const reportedUserID = blog.userID
            await Blog.findByIdAndUpdate(blogID, { status: 'blocked' })
            await Report.findByIdAndUpdate(reportID, { status: 'done', adminResponse: 'already deleted' })
            const NotificationForReporter = new Notification({ userID: reporterID, type: 'reportfeedback', title: 'the blog u report has been deleted, tq', targetID: blogID, targetType: 'blog' })
            const NotificationForReportedUser = new Notification({ userID: reportedUserID, type: 'reportedfeedback', title: 'ur blog has been deleted', targetID: blogID, targetType: 'blog' })
            await NotificationForReporter.save()
            await NotificationForReportedUser.save()
            res.status(200).json({ success: true })
        }
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { commentID, reporterID, reportID } = req.body
        console.log(req.body);
        const comment = await Comment.findById(commentID).lean()
        console.log(comment);
        if (!comment) {
            return next(createError(404, "not found"))
        } else {
            const reportedUserID = comment.userID
            await Comment.findByIdAndUpdate(commentID, { status: 'blocked' })
            await Report.findByIdAndUpdate(reportID, { status: 'done', adminResponse: 'already deleted' })
            const NotificationForReporter = new Notification({ userID: reporterID, type: 'reportfeedback', title: 'the comment u report has been deleted, tq', targetID: commentID, targetType: 'comment' })
            const NotificationForReportedUser = new Notification({ userID: reportedUserID, type: 'reportedfeedback', title: 'ur comment has been deleted', targetID: commentID, targetType: 'comment' })
            await NotificationForReporter.save()
            await NotificationForReportedUser.save()
            res.status(200).json({ success: true })
        }
    } catch (err) {
        next(err)
    }
}

export const reply = async (req, res, next) => {
    try {
        const targetID = req.params.id

    } catch (err) {
        next(err)
    }
}

export const publicPost = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
}

export const operateUser = async (req, res, next) => {
    try {
        const { operationType, userID, reporterID, reportID } = req.body
        if (operationType === 'mute') {
            const { muteDate } = req.body
            await User.findByIdAndUpdate(userID, { status: operationType, muteDate })
        } else {
            await User.findByIdAndUpdate(userID, { status: operationType })
        }
        await Report.findByIdAndUpdate(reportID, { status: 'done', adminResponse: `already ${operationType} your report user` })
        const NotificationForReporter = new Notification({ userID: reporterID, type: 'reportfeedback', title: `the account u report has been ${operationType}, tq`, targetID: userID, targetType: 'user' })
        const NotificationForReportedUser = new Notification({ userID, type: 'reportedfeedback', title: `ur account has been ${operationType}` })
        await NotificationForReporter.save()
        await NotificationForReportedUser.save()
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}
