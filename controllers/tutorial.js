import { createError } from "../error.js"
import Tutorial from '../models/Tutorial.js'
import User from '../models/Users.js'

export const createTutorial = async (req, res, next) => {
    const newTutorial = new Tutorial({ ...req.body })
    try {
        const saveTutorial = await newTutorial.save()
        res.status(200).json(saveTutorial)
    } catch (err) {
        next(err)
    }
}

export const removeTutorial = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id)
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        await Tutorial.findByIdAndDelete(req.params.id)
        res.status(200).json('remove successfully')
    } catch (err) {
        next(err)
    }
}

export const updateTutorial = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id)
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        const updatedTutorial = await Tutorial.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedTutorial)
    } catch (err) {
        next(err)
    }
}

export const addTutorialToFavor = async (req, res, next) => {
    try {
        const userID = req.user.id
        const tutorialID = req.params.id
        const user = await User.findByIdAndUpdate(userID, { $push: { favoriteTutorials: tutorialID } });
        if (!user) {
            return next(createError(404, "not found"))
        }
        res.status(200).json(user)
    } catch (err) {
        next(err)
    }
}

export const getTutorial = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.findById(req.params.id)
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        res.status(200).json(tutorial)
    } catch (err) {
        next(err)
    }
}
export const getSpecificTypeTutorials = async (req, res, next) => {
    try {
        const { type } = req.body
        const tutorials = await Tutorial.find({ type })
        if (tutorials.length === 0) {
            res.status(200).json([])
        } else {
            res.status(200).json(tutorials)
        }
    } catch (err) {
        next(err)
    }
}

export const getAllTutorials = async (req, res, next) => {
    try {
        const tutorial = await Tutorial.find()
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        res.status(200).json(tutorial)
    } catch (err) {
        next(err)
    }
}

export const getRecommendTutorials = async (req, res, next) => {
    try {
        const userID = req.user.id
        const user = await User.findById(userID);
        const personalPrefer = user?.personalPrefer;

        if (!personalPrefer) {

        } else {

        }
        res.status(200).json(tutorial)
    } catch (err) {
        next(err)
    }
}