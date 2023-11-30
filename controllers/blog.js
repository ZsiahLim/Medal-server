import { createError } from "../error.js"
import Blog from '../models/Blog.js'
import User from '../models/Users.js'

export const createBlog = async (req, res, next) => {
    try {
        const newBlog = new Blog({ userID: req.user.id, ...req.body })
        const blog = await newBlog.save()
        const user = await User.findByIdAndUpdate(req.user.id, { $addToSet: { blogs: blog._id } })
        res.status(200).json({ blog, user })
    } catch (err) {
        next(err)
    }
}

export const removeBlog = async (req, res, next) => {
    try {
        await Blog.findByIdAndDelete(req.params.id)
        const user = await User.findByIdAndUpdate(req.user.id, { $pull: { blogs: req.params.id } })
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }).populate("userID")
        console.log("updatedBlog", updatedBlog);
        res.status(200).json(updatedBlog)
    } catch (err) {
        next(err)
    }
}

export const getBlog = async (req, res, next) => {
    await Blog.findById(req.params.id).then(blog => {
        if (!blog) {
            return next(createError(404, "not found"))
        } else {
            res.status(200).json(blog)
        }
    }).catch(err => {
        next(err)
    })
}

export const random = async (req, res, next) => {
    try {
        const blogs = await Blog.aggregate([
            { $match: { deleted: false } },
            { $sample: { size: 10 } },
        ])
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}

export const mostLike = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ likeNum: -1 }).limit(20)
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}

export const contact = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const contacts = user.contactsUsers
        const list = await Promise.all(contacts.map(contactID => {
            return Blog.find({ userID: contactID, deleted: false })
        }))
        res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt))
    } catch (err) {
        next(err)
    }
}

export const tags = async (req, res, next) => {
    const tags = req.query.tags.split(',')
    try {
        const blogs = await Blog.find({ tags: { $in: tags }, deleted: false }).limit(20)
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}
export const search = async (req, res, next) => {
    const query = req.query.params
    try {
        // const blogs = await Blog.find({ title: { $regex: query, $options: 'i' } }).limit(40)//add more features
        const blogs = await Blog.find({
            deleted: false,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } },
                { tags: { $regex: query, $options: 'i' } }
            ]
        }).limit(40)//add more features
        res.status(200).json(blogs)
    } catch (err) {
        next(err)
    }
}

export const getMyBlog = async (req, res, next) => {
    try {
        const userID = req.user.id
        const userBlogs = await Blog.find({ userID })
        res.status(200).json(userBlogs)
    } catch (err) {
        next(err)
    }
}

export const getMyfavorBlogs = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id)
        const userfavorBlogs = await Blog.find({ _id: { $in: user.favoriteBlogs }, deleted: false })
        res.status(200).json(userfavorBlogs)
    } catch (err) {
        next(err)
    }
}