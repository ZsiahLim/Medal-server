import { createError } from "../error.js"
import Music from '../models/Music.js'
import User from '../models/Users.js'

export const createMusic = async (req, res, next) => {
    const newMusic = new Music({ ...req.body })
    try {
        const saveMusic = await newMusic.save()
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}

export const deleteMusic = async (req, res, next) => {
    try {
        const music = await Music.findById(req.params.id)
        if (!music) {
            return next(createError(404, "not found"))
        }
        await Music.findByIdAndDelete(req.params.id)
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}

export const updateMusic = async (req, res, next) => {
    try {
        const tutorial = await Music.findById(req.params.id)
        if (!tutorial) {
            return next(createError(404, "not found"))
        }
        await Music.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json({ success: true })
    } catch (err) {
        next(err)
    }
}

export const getAll = async (req, res, next) => {
    try {
        const musics = await Music.find()
        res.status(200).json(musics)
    } catch (err) {
        next(err)
    }
}

export const getMusicsByType = async (req, res, next) => {
    try {
        const musics = await Music.find({ type: req.body.type })
        res.status(200).json(musics)
    } catch (err) {
        next(err)
    }
}