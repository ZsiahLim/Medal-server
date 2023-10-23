import { createError } from "../error.js"
import Message from '../models/Message.js'
import Conversation from '../models/Conversation.js'
import User from '../models/Users.js'

export const sendMessage = async (req, res, next) => {
    const conversationId = req.body.conversationId
    const newMessage = new Message({ ...req.body, sender: req.user.id })
    try {
        await Message.updateMany({
            conversationId: req.params.conversationId,
            receiver: req.user.id
        }, {
            $set: { readed: true }
        })
        await Conversation.findByIdAndUpdate(conversationId, {
            $set: { lastWords: req.body.msgValue, lastWordType: req.body.msgType }
        })
        const savedMessage = await newMessage.save()
        const newConversation = await Conversation.findById(conversationId)
        res.status(200).json({ savedMessage, conversation: newConversation })
    } catch (err) {
        next(err)
    }
}

export const getMessage = async (req, res, next) => {
    try {
        await Message.updateMany({
            conversationId: req.params.conversationId,
            receiver: req.user.id
        }, {
            $set: { readed: true }
        })
        const messages = await Message.find({
            conversationId: req.params.conversationId
        })
        res.status(200).json(messages)
    } catch (err) {
        next(err)
    }
}

export const getUnreadedMessages = async (req, res, next) => {
    const userID = req.user.id
    try {
        const unreadedMessages = await Message.find(
            {
                receiver: userID,
                readed: false
            }
        )
        res.status(200).json(unreadedMessages)
    } catch (err) {
        next(err)
    }
}