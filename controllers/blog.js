import { createError } from "../error.js"
import Blog from '../models/Blog.js'
import User from '../models/Users.js'

export const createBlog = async (req, res, next) => {
    const newBlog = new Blog({ userID: req.user.id, ...req.body })
    try {
        const saveBlog = await newBlog.save()
        res.status(200).json(saveBlog)
    } catch (err) {
        next(err)
    }
}

export const removeBlog = async (req, res, next) => {
    try {
        // const blog = await Blog.findById(req.params.id)
        // if (!blog) {
        //     return next(createError(404, "not found"))
        // }
        // if (req.user.id === blog.userID) {
        //     await Blog.findByIdAndDelete(req.params.id)
        //     res.status(200).json('remove successfully')
        // } else {
        //     return next(createError(403, "can only delete your blog"))
        // }
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return next(createError(404, "not found"))
        }
        const updatedBlog = await Blog.updateOne({ _id: req.params.id }, { $set: { deleted: true } })
        console.log("updateBlog", updatedBlog);
        res.status(200).json(updatedBlog)
    } catch (err) {
        next(err)
    }
}

export const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return next(createError(404, "not found"))
        }
        if (req.user.id === blog.userID) {
            const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updatedBlog)
        } else {
            return next(createError(403, "can only update your blog"))
        }
    } catch (err) {
        next(err)
    }
}

export const getBlog = async (req, res, next) => {
    await Blog.findById(req.params.id).then(blog => {
        console.log(blog);
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
        const blogs = await Blog.find({ deleted: false }).sort({ likeNum: -1 })
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