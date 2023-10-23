import { createError } from "../error.js"
import Competition from '../models/Competition.js'
import User from '../models/Users.js'

// createCompetition, updateCompetition, removeCompetition, getCompetition 
export const createCompetition = async (req, res, next) => {
    const newCompetition = new Competition({ ...req.body })
    try {
        const saveCompetition = await newCompetition.save()
        res.status(200).json(saveCompetition)
    } catch (err) {
        next(err)
    }
}

export const removeCompetition = async (req, res, next) => {
    try {
        const competition = await Competition.findById(req.params.id)
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        await Competition.findByIdAndDelete(req.params.id)
        res.status(200).json('remove successfully')
    } catch (err) {
        next(err)
    }
}

export const updateCompetition = async (req, res, next) => {
    try {
        const competition = await Competition.findById(req.params.id)
        if (!competition) {
            return next(createError(404, "not found"))
        }
        const updatedCompetition = await Competition.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedCompetition)
    } catch (err) {
        next(err)
    }
}

export const getCompetition = async (req, res, next) => {
    try {
        const competition = await Competition.findById(req.params.id)
        if (!competition) {
            return next(createError(404, "not found"))
        }
        res.status(200).json(competition)
    } catch (err) {
        next(err)
    }
}