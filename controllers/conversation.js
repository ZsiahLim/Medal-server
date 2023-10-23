import { createError } from "../error.js"
import Conversation from '../models/Conversation.js'
import Message from "../models/Message.js"
import User from '../models/Users.js'

export const newConversation = async (req, res, next) => {
    try {
        const thisMembers = [req.user.id, req.body.receiverId]
        const conversation = await Conversation.findOne({ members: { $all: thisMembers } })
        console.log(conversation)
        if (conversation) {
            res.status(200).json(conversation)
        } else {
            const newConversation = new Conversation({ members: thisMembers })
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
        }
    } catch (err) {
        next(err)
    }
}

export const getConversation = async (req, res, next) => {
    const userID = req.user.id
    try {
        const conversation = await Conversation.find({
            members: { $in: [userID] }
        })
        res.status(200).json(conversation)
    } catch (err) {
        next(err)
    }
}

export const getSpecificConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findById(req.params.id)
        res.status(200).json(conversation)
    } catch (err) {
        next(err)
    }
}

export const getSpecificConversationUnreadedMessage = async (req, res, next) => {
    try {
        const conversationID = req.params.id
        const msgs = await Message.find({
            conversationId: conversationID,
            readed: false,
            receiver: req.user.id
        })
        res.status(200).json(msgs)
    } catch (err) {
        next(err)
    }
}

export const deleteConversation = async (req, res, next) => {
    try {
        const conversationID = req.params.id
        const messages = await Message.deleteMany({
            conversationId: conversationID
        })
        console.log('message bei shanchu le', messages);
        await Conversation.findByIdAndDelete(req.params.id)
        res.status(200).json("Conversation has been deleted successfully")
    } catch (err) {
        next(err)
    }
}

export const setMessagesReaded = async (req, res, next) => {
    try {
        const conversationID = req.params.id
        await Message.updateMany({
            conversationId: conversationID
        }, { $set: { readed: true } })
        res.status(200).json('successfully')
    } catch (err) {
        next(err)
    }
}