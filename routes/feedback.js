import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { createFeedback } from '../controllers/feedback.js'

const router = express.Router()
// router.post('/', createBlog)
router.post('/', verifyToken, createFeedback)
export default router