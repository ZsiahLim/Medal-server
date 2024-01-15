import { createError } from "../error.js"
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'
import User from '../models/Users.js'

export const addComment = async (req, res, next) => {
    const newComment = new Comment({ userID: req.user.id, ...req.body })
    try {
        await newComment.save()
        res.status(200).json("add comment successfully")
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(req.params.id)
        const blog = await Blog.findById(comment.blogID)
        if (req.user.id === comment.userID || blog.userID === req.user.id) {
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("Comment has been deleted")
        } else {
            next(createError(403, 'only can delete your comment'))
        }
    } catch (err) {
        next(err)
    }
}

export const getComments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ blogID: req.params.blogid })
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}
export const getCommentById = async (req, res, next) => {
    try {
        const comments = await Comment.findById(req.params.id)
        res.status(200).json(comments)
    } catch (err) {
        next(err)
    }
}