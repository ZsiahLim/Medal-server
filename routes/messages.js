import express from 'express'
import { sendMessage, getMessage, getUnreadedMessages } from '../controllers/message.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

// start message
router.post('/', verifyToken, sendMessage)

// get unread message
router.get('/unreadmsgs', verifyToken, getUnreadedMessages)

// get message
router.get('/:conversationId', verifyToken, getMessage)

export default router