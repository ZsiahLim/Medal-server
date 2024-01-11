import express from 'express'
import { contact, createBlog, getBlog, mostLike, random, removeBlog, updateBlog, tags, search, getMyBlog, getMyfavorBlogs, getSubscribedUsersBlogs, latest } from '../controllers/blog.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

// create a blog
// router.post('/', createBlog)
router.post('/', verifyToken, createBlog)

// router.put('/:id', updateBlog)
router.put('/:id', verifyToken, updateBlog)

// router.delete('/:id', removeBlog)
router.delete('/:id', verifyToken, removeBlog)

router.get('/find/:id', getBlog)

router.get('/mostlike', mostLike)

router.get('/latest', latest)
// router.get('/contact', contact)
router.get('/contact', verifyToken, contact)

router.get('/random', random)

router.get('/tags', tags)
// router.get('/search', search)
router.get('/search', verifyToken, search)

router.get('/getmyblog', verifyToken, getMyBlog)

router.get('/getfavoriteblogs', verifyToken, getMyfavorBlogs)

router.get('/getsubscribedusersblogs', verifyToken, getSubscribedUsersBlogs)

export default router