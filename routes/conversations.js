import express from 'express'
import { newConversation, deleteConversation, getConversation, getSpecificConversation, setMessagesReaded, getSpecificConversationUnreadedMessage } from '../controllers/conversation.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

// start a conversation
router.post('/', verifyToken, newConversation)

// get user's conversations
router.get('/', verifyToken, getConversation)

router.get('/:id', verifyToken, getSpecificConversation)

router.get('/unreadnum/:id', verifyToken, getSpecificConversationUnreadedMessage)

router.delete('/:id', verifyToken, deleteConversation)

router.put('/setmessagesreaded', verifyToken, setMessagesReaded)

export default router