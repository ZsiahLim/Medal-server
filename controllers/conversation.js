import { createError } from "../error.js"
import Conversation from '../models/Conversation.js'
import Message from "../models/Message.js"
import User from '../models/Users.js'

export const newConversation = async (req, res, next) => {
    try {
        const userID = req.user.id
        const thisMembers = [req.user.id, req.body.receiverId]
        const foundedConversation = await Conversation.findOne({ members: { $all: thisMembers } })
        console.log(foundedConversation);
        let user;
        if (foundedConversation) {
            user = await User.findByIdAndUpdate(userID, { $addToSet: { conversations: foundedConversation._id } }, { new: true })
            res.status(200).json({ conversation: foundedConversation, user })
        } else {
            const newConversation = new Conversation({ members: thisMembers })
            const conversation = await newConversation.save()
            user = await User.findByIdAndUpdate(userID, { $addToSet: { conversations: conversation._id } }, { new: true })
            res.status(200).json({ conversation, user })
        }
    } catch (err) {
        console.log(err);
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
        const userID = req.user.id
        const conversationID = req.params.id
        const messages = await Message.deleteMany({
            conversationId: conversationID
        })
        await Conversation.findByIdAndDelete(req.params.id)
        const conversations = await Conversation.find({
            members: { $in: [userID] }
        })
        console.log("conversations", conversations);
        res.status(200).json(conversations)
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