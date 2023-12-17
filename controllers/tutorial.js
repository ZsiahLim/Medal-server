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
    await Tutorial.findById(req.params.id).then(tutorial => {
        if (!tutorial) {
            return next(createError(404, "not found"))
        } else {
            res.status(200).json(tutorial)
        }
    }).catch(err => {
        next(err)
    })
}
export const getSpecificTypeTutorials = async (req, res, next) => {
    try {
        const { type } = req.query
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
        let fitTututorials;
        if (personalPrefer && Object.keys(personalPrefer).length !== 0) {

            const queryConditions = [];
            // 当evaluationAnswer.goal存在时，添加type条件
            if (personalPrefer?.goal) {
                queryConditions.push({ type: { $eq: personalPrefer.goal } });
            }

            // 当evaluationAnswer.level存在时，添加level条件
            if (personalPrefer?.level) {
                queryConditions.push({ level: personalPrefer.level });
            }

            // 当evaluationAnswer.duration存在且其lowRangeValue和higherRangeValue存在时，添加duration条件
            if (personalPrefer?.duration && Object.keys(personalPrefer?.duration).length !== 0 && typeof personalPrefer.duration.lowRangeValue !== 'undefined' && typeof personalPrefer.duration.higherRangeValue !== 'undefined') {
                queryConditions.push({ duration: { $gte: personalPrefer.duration.lowRangeValue, $lte: personalPrefer.duration.higherRangeValue } });
            }

            // 当evaluationAnswer.calorie存在且其lowRangeValue和higherRangeValue存在时，添加calorie条件
            if (personalPrefer?.calorie && Object.keys(personalPrefer?.calorie).length !== 0 && typeof personalPrefer.calorie.lowRangeValue !== 'undefined' && typeof personalPrefer.calorie.higherRangeValue !== 'undefined') {
                const calorieRangeCondition = {
                    $or: [
                        { lowerEstimateColorie: { $gte: personalPrefer.calorie.lowRangeValue, $lte: personalPrefer.calorie.higherRangeValue } },
                        { higherEstimateColorie: { $gte: personalPrefer.calorie.lowRangeValue, $lte: personalPrefer.calorie.higherRangeValue } },
                    ]
                };
                queryConditions.push(calorieRangeCondition);
            }

            // 使用$and操作符，只有当queryConditions非空时才添加到查询中
            const query = queryConditions.length > 0 ? { $and: queryConditions } : {};
            fitTututorials = await Tutorial.find(query)
            console.log(fitTututorials.length);
        } else {
            fitTututorials = []
        }
        res.status(200).json(fitTututorials)
    } catch (err) {
        next(err)
    }
}